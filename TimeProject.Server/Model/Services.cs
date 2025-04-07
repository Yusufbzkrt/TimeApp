namespace TimeProject.Server.Model
{
    public class Services
    {
        public int ServicesId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public int CreditsRequired { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }
}
