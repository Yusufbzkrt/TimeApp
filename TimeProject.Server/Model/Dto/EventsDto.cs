namespace TimeProject.Server.Model.Dto
{
    public class EventsDto
    {
        public int EventsId { get; set; }
        public string? EventName { get; set; }
        public string? Description { get; set; }
        public DateTime DateTime { get; set; }
        public string? Location { get; set; }
        public int Credit { get; set; }
        public int CurrentParticipants { get; set; }
        public int Capacity { get; set; }
        public int CreatedByUserID { get; set; }
        public bool IsActive { get; set; }
        public IFormFile? Image { get; set; }
    }
}
