namespace TimeProject.Server.Model
{
    public class Notifications
    {
        public int NotificationsId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public string? Message { get; set; }//Bildirim içeriği
        public DateTime SendDate { get; set; }//Bildirim gönderilme tarihi
        public bool IsRead { get; set; }//Bildirimin okunup okunmadığı durumu
    }
}
