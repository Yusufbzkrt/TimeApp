namespace TimeProject.Server.Model.Dto
{
    public class UserUpdateRequest
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public IFormFile? ImageUrl { get; set; }
    }
}
