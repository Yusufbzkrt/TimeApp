namespace TimeProject.Server.Model.Dto
{
    public class UserListDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string avatar { get; set; } = string.Empty;
        public string? LastMessageContent { get; set; }
        public string? LastMessageTimestamp { get; set; }
    }
}
