namespace TimeProject.Server.Model
{
    public class Blog
    {
        public int BlogId { get; set; } 
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime Date { get; set; }
    }
}
