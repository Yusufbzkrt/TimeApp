namespace TimeProject.Server.Model
{
    public class Events
    {
        public int EventsId { get; set; }
        public string? EventName { get; set; }
        public string? Description { get; set; }
        public DateTime DateTime { get; set; }//Etkinlik tarihi ve saati
        public string? Location { get; set; }
        public int Credit { get; set; }
        public int CurrentParticipants { get; set; }
        public int Capacity { get; set; }
        public int CreatedByUserID { get; set; }//Etkinliği oluşturan kullanıcı
        public User? User { get; set; }
        public bool IsActive { get; set; }
        public string? Image { get; set; }
    }
}
   