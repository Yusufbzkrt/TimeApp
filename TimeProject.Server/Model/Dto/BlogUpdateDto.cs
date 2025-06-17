namespace TimeProject.Server.Model.Dto
{
    public class BlogUpdateDto
    {
        public int BlogId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public IFormFile? ImageUrl { get; set; } 
    }

}
