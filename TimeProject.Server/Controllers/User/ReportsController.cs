using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TimeProject.Server.Service;

namespace TimeProject.Server.Controllers.User
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly ReportsService _reportsService;
        private readonly ILogger<ReportsController> _logger;

        public ReportsController(ReportsService reportsService, ILogger<ReportsController> logger)
        {
            _reportsService = reportsService;
            _logger = logger;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats([FromQuery] string timeRange)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var stats = await _reportsService.GetStatsAsync(userId, timeRange);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "İstatistikler alınırken hata oluştu");
                return StatusCode(500, "İstatistikler alınırken bir hata oluştu");
            }
        }

        [HttpGet("trends")]
        public async Task<IActionResult> GetTrends([FromQuery] string timeRange)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var trends = await _reportsService.GetTrendsAsync(userId, timeRange);
                return Ok(trends);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Trend verileri alınırken hata oluştu");
                return StatusCode(500, "Trend verileri alınırken bir hata oluştu");
            }
        }

        [HttpGet("activities")]
        public async Task<IActionResult> GetActivities([FromQuery] string timeRange)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var activities = await _reportsService.GetActivitiesAsync(userId, timeRange);
                return Ok(activities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Aktivite verileri alınırken hata oluştu");
                return StatusCode(500, "Aktivite verileri alınırken bir hata oluştu");
            }
        }

        [HttpGet("chart")]
        public async Task<IActionResult> GetChartData([FromQuery] string metric, [FromQuery] string timeRange)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var chartData = await _reportsService.GetChartDataAsync(userId, metric, timeRange);
                return Ok(chartData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Grafik verileri alınırken hata oluştu");
                return StatusCode(500, "Grafik verileri alınırken bir hata oluştu");
            }
        }

        [HttpGet("download")]
        public async Task<IActionResult> DownloadReport([FromQuery] string timeRange)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var reportBytes = await _reportsService.GenerateReportAsync(userId, timeRange);

                if (reportBytes == null || reportBytes.Length == 0)
                {
                    return BadRequest("Rapor oluşturulamadı");
                }

                return File(
                    reportBytes,
                    "application/pdf",
                    $"rapor-{timeRange}-{DateTime.Now:yyyy-MM-dd}.pdf"
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Rapor indirilirken hata oluştu");
                return StatusCode(500, "Rapor indirilirken bir hata oluştu");
            }
        }
    }
}
