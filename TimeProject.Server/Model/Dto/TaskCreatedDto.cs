namespace TimeProject.Server.Model.Dto
{
    public class TaskCreateDto
    {
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public string? Priority { get; set; }
        public string? Status { get; set; }
    }

}
