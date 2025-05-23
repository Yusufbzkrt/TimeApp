namespace TimeProject.Server.Model.Dto
{
    public class RegisterDto
    {
        public string? FirstName { get; set; } 
        public string? LastName { get; set; } 
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
    }
}
