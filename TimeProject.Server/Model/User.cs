namespace TimeProject.Server.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? PhoneNumber { get; set; } 
        public string? avatar { get; set; }
        public int RoleId { get; set; }
        public Role? Role { get; set; }
        public bool TestResult { get; set; }
        public string? AccountStatusId { get; set; }
        public AccountStatus? AccountStatus { get; set; }
        public DateTime CreateDate { get; set; }
        public ICollection<Events>? Events { get; set; }
        public ICollection<Services>? UserServices { get; set; }
    }
}
