namespace TimeProject.Server.Model.Dto
{
    public class ReportsDto
    {
        public class StatsDto
        {
            public int Productivity { get; set; }
            public int TasksCompleted { get; set; }
            public int TimeSpent { get; set; }
            public int Efficiency { get; set; }
        }

        public class TrendDto
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Value { get; set; }
            public string Change { get; set; } // "positive", "negative", "neutral"
            public string Period { get; set; }
            public string Icon { get; set; }
        }

        public class ActivityDto
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Duration { get; set; }
            public int Efficiency { get; set; }
            public DateTime Date { get; set; }
        }

        public class ChartDataDto
        {
            public List<string> Labels { get; set; }
            public List<int> Data { get; set; }
        }
    }
}
