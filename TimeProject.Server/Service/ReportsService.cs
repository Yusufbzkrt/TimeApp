using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System.Xml.Linq;
using TimeProject.Models;
using TimeProject.Server.Data;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Service
{
    public class ReportsService
    {
        private readonly TimeProjectDbContext _context;
        private readonly ILogger<ReportsService> _logger;

        public ReportsService(TimeProjectDbContext context, ILogger<ReportsService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ReportsDto.StatsDto> GetStatsAsync(int userId, string timeRange)
        {
            var dateRange = GetDateRange(timeRange);
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId && t.CreatedDate >= dateRange.Start && t.CreatedDate <= dateRange.End)
                .ToListAsync();

            var totalTasks = tasks.Count;
            var completedTasks = tasks.Count(t => t.Status.ToLower() == "completed");
            var totalTimeSpent = tasks.Sum(t => CalculateTaskDuration(t));

            return new ReportsDto.StatsDto
            {
                Productivity = totalTasks > 0 ? (completedTasks * 100) / totalTasks : 0,
                TasksCompleted = completedTasks,
                TimeSpent = totalTimeSpent,
                Efficiency = CalculateEfficiency(tasks)
            };
        }

        public async Task<List<ReportsDto.TrendDto>> GetTrendsAsync(int userId, string timeRange)
        {
            var dateRange = GetDateRange(timeRange);
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId && t.CreatedDate >= dateRange.Start && t.CreatedDate <= dateRange.End)
                .ToListAsync();

            var previousDateRange = GetPreviousDateRange(timeRange);
            var previousTasks = await _context.Tasks
                .Where(t => t.UserId == userId && t.CreatedDate >= previousDateRange.Start && t.CreatedDate <= previousDateRange.End)
                .ToListAsync();

            var trends = new List<ReportsDto.TrendDto>
            {
                new ReportsDto.TrendDto
                {
                    Id = 1,
                    Title = "Verimlilik Artışı",
                    Value = CalculateProductivityChange(tasks, previousTasks),
                    Change = GetChangeType(tasks, previousTasks),
                    Period = GetPeriodText(timeRange),
                    Icon = "faArrowUp"
                },
                new ReportsDto.TrendDto
                {
                    Id = 2,
                    Title = "Görev Tamamlama",
                    Value = tasks.Count(t => t.Status.ToLower() == "completed").ToString(),
                    Change = "neutral",
                    Period = GetPeriodText(timeRange),
                    Icon = "faTasks"
                },
                new ReportsDto.TrendDto
                {
                    Id = 3,
                    Title = "Ortalama Çalışma Süresi",
                    Value = $"{CalculateAverageTimeSpent(tasks):F1}s",
                    Change = GetTimeSpentChangeType(tasks, previousTasks),
                    Period = GetPeriodText(timeRange),
                    Icon = "faClock"
                }
            };

            return trends;
        }

        public async Task<List<ReportsDto.ActivityDto>> GetActivitiesAsync(int userId, string timeRange)
        {
            var dateRange = GetDateRange(timeRange);
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId && t.CreatedDate >= dateRange.Start && t.CreatedDate <= dateRange.End)
                .OrderByDescending(t => t.CreatedDate)
                .ToListAsync();

            return tasks.Select(t => new ReportsDto.ActivityDto
            {
                Id = t.TaskID,
                Title = t.TaskName,
                Duration = $"{CalculateTaskDuration(t)} saat",
                Efficiency = CalculateTaskEfficiency(t),
                Date = t.CreatedDate
            }).ToList();
        }

        public async Task<ReportsDto.ChartDataDto> GetChartDataAsync(int userId, string metric, string timeRange)
        {
            var dateRange = GetDateRange(timeRange);
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId && t.CreatedDate >= dateRange.Start && t.CreatedDate <= dateRange.End)
                .ToListAsync();

            var (labels, data) = metric.ToLower() switch
            {
                "productivity" => GetProductivityChartData(tasks, timeRange),
                "tasks" => GetTasksChartData(tasks, timeRange),
                "timespent" => GetTimeSpentChartData(tasks, timeRange),
                _ => throw new ArgumentException("Geçersiz metrik")
            };

            return new ReportsDto.ChartDataDto { Labels = labels, Data = data };
        }

        public async Task<byte[]> GenerateReportAsync(int userId, string timeRange)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                using (iTextSharp.text.Document document = new iTextSharp.text.Document(PageSize.A4, 25, 25, 30, 30))
                {
                    PdfWriter writer = PdfWriter.GetInstance(document, ms);
                    document.Open();

                    // Başlık
                    var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
                    var title = new Paragraph($"Performans Raporu - {GetTimeRangeText(timeRange)}", titleFont);
                    title.Alignment = Element.ALIGN_CENTER;
                    title.SpacingAfter = 20f;
                    document.Add(title);

                    // Tarih
                    var dateFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);
                    var date = new Paragraph($"Oluşturulma Tarihi: {DateTime.Now:dd.MM.yyyy HH:mm}", dateFont);
                    date.Alignment = Element.ALIGN_RIGHT;
                    date.SpacingAfter = 20f;
                    document.Add(date);

                    // İstatistikler
                    var stats = await GetStatsAsync(userId, timeRange);
                    var statsTable = new PdfPTable(2);
                    statsTable.WidthPercentage = 100;
                    statsTable.SpacingBefore = 20f;
                    statsTable.SpacingAfter = 20f;

                    AddTableRow(statsTable, "Verimlilik", $"%{stats.Productivity}");
                    AddTableRow(statsTable, "Tamamlanan Görevler", stats.TasksCompleted.ToString());
                    AddTableRow(statsTable, "Çalışma Süresi", $"{stats.TimeSpent} saat");
                    AddTableRow(statsTable, "Verimlilik", $"%{stats.Efficiency}");

                    document.Add(statsTable);

                    // Trendler
                    var trends = await GetTrendsAsync(userId, timeRange);
                    var trendsTable = new PdfPTable(3);
                    trendsTable.WidthPercentage = 100;
                    trendsTable.SpacingBefore = 20f;
                    trendsTable.SpacingAfter = 20f;

                    AddTableHeader(trendsTable, "Metrik", "Değer", "Periyot");
                    foreach (var trend in trends)
                    {
                        AddTableRow(trendsTable, trend.Title, trend.Value, trend.Period);
                    }

                    document.Add(trendsTable);

                    // Aktiviteler
                    var activities = await GetActivitiesAsync(userId, timeRange);
                    var activitiesTable = new PdfPTable(4);
                    activitiesTable.WidthPercentage = 100;
                    activitiesTable.SpacingBefore = 20f;

                    AddTableHeader(activitiesTable, "Aktivite", "Süre", "Verimlilik", "Tarih");
                    foreach (var activity in activities)
                    {
                        AddTableRow(activitiesTable,
                            activity.Title,
                            activity.Duration,
                            $"%{activity.Efficiency}",
                            activity.Date.ToString("dd.MM.yyyy"));
                    }

                    document.Add(activitiesTable);

                    document.Close();
                }
                return ms.ToArray();
            }
        }


        private void AddTableHeader(PdfPTable table, params string[] headers)
        {
            var headerFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12);
            foreach (var header in headers)
            {
                table.AddCell(new PdfPCell(new Phrase(header, headerFont))
                {
                    HorizontalAlignment = Element.ALIGN_CENTER,
                    BackgroundColor = BaseColor.LightGray,
                    Padding = 5f
                });
            }
        }

        private void AddTableRow(PdfPTable table, params string[] cells)
        {
            var cellFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);
            foreach (var cell in cells)
            {
                table.AddCell(new PdfPCell(new Phrase(cell, cellFont))
                {
                    HorizontalAlignment = Element.ALIGN_CENTER,
                    Padding = 5f
                });
            }
        }

        private string GetTimeRangeText(string timeRange)
        {
            return timeRange.ToLower() switch
            {
                "day" => "Günlük",
                "week" => "Haftalık",
                "month" => "Aylık",
                _ => "Belirsiz"
            };
        }

        private (DateTime Start, DateTime End) GetDateRange(string timeRange)
        {
            var end = DateTime.Now;
            var start = timeRange.ToLower() switch
            {
                "day" => end.Date,
                "week" => end.AddDays(-7),
                "month" => end.AddMonths(-1),
                _ => throw new ArgumentException("Geçersiz zaman aralığı")
            };
            return (start, end);
        }

        private (DateTime Start, DateTime End) GetPreviousDateRange(string timeRange)
        {
            var currentRange = GetDateRange(timeRange);
            var duration = currentRange.End - currentRange.Start;
            return (currentRange.Start.Add(-duration), currentRange.Start);
        }

        private int CalculateTaskDuration(Tasks task)
        {
            // Bu metod gerçek uygulamada task'ın süresini hesaplamalı
            // Şimdilik örnek olarak 1 saat döndürüyoruz
            return 1;
        }

        private int CalculateEfficiency(List<Tasks> tasks)
        {
            if (!tasks.Any()) return 0;
            var completedTasks = tasks.Count(t => t.Status.ToLower() == "completed");
            return (completedTasks * 100) / tasks.Count;
        }

        private string CalculateProductivityChange(List<Tasks> currentTasks, List<Tasks> previousTasks)
        {
            var currentEfficiency = CalculateEfficiency(currentTasks);
            var previousEfficiency = CalculateEfficiency(previousTasks);
            var change = currentEfficiency - previousEfficiency;
            return $"{(change >= 0 ? "+" : "")}{change}%";
        }

        private string GetChangeType(List<Tasks> currentTasks, List<Tasks> previousTasks)
        {
            var currentEfficiency = CalculateEfficiency(currentTasks);
            var previousEfficiency = CalculateEfficiency(previousTasks);
            return currentEfficiency > previousEfficiency ? "positive" :
                   currentEfficiency < previousEfficiency ? "negative" : "neutral";
        }

        private string GetTimeSpentChangeType(List<Tasks> currentTasks, List<Tasks> previousTasks)
        {
            var currentTime = currentTasks.Sum(CalculateTaskDuration);
            var previousTime = previousTasks.Sum(CalculateTaskDuration);
            return currentTime > previousTime ? "positive" :
                   currentTime < previousTime ? "negative" : "neutral";
        }

        private string GetPeriodText(string timeRange)
        {
            return timeRange.ToLower() switch
            {
                "day" => "Bugün",
                "week" => "Bu Hafta",
                "month" => "Bu Ay",
                _ => "Belirsiz"
            };
        }

        private double CalculateAverageTimeSpent(List<Tasks> tasks)
        {
            if (!tasks.Any()) return 0;
            return tasks.Average(CalculateTaskDuration);
        }

        private int CalculateTaskEfficiency(Tasks task)
        {
            // Bu metod gerçek uygulamada task'ın verimliliğini hesaplamalı
            // Şimdilik örnek olarak 85 döndürüyoruz
            return 85;
        }

        private (List<string> Labels, List<int> Data) GetProductivityChartData(List<Tasks> tasks, string timeRange)
        {
            // Bu metod gerçek uygulamada verimlilik verilerini hesaplamalı
            // Şimdilik örnek veri döndürüyoruz
            return (
                new List<string> { "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz" },
                new List<int> { 75, 82, 88, 85, 90, 65, 70 }
            );
        }

        private (List<string> Labels, List<int> Data) GetTasksChartData(List<Tasks> tasks, string timeRange)
        {
            // Bu metod gerçek uygulamada görev verilerini hesaplamalı
            // Şimdilik örnek veri döndürüyoruz
            return (
                new List<string> { "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz" },
                new List<int> { 5, 7, 4, 6, 8, 3, 2 }
            );
        }

        private (List<string> Labels, List<int> Data) GetTimeSpentChartData(List<Tasks> tasks, string timeRange)
        {
            // Bu metod gerçek uygulamada zaman verilerini hesaplamalı
            // Şimdilik örnek veri döndürüyoruz
            return (
                new List<string> { "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz" },
                new List<int> { 6, 7, 5, 8, 6, 4, 3 }
            );
        }
    }
}
