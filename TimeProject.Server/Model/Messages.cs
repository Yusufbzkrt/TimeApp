namespace TimeProject.Server.Model
{
    public class Messages
    {
        public int MessagesId { get; set; }
            
        public int SenderUserId { get; set; }
        public int ReceiveUserId { get; set; }
        public User? User { get; set; }
        public string? MessageContent { get; set; }
        public DateTime SendAt { get; set; }
        public bool IsRead { get; set; }
    }
}
 