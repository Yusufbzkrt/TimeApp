namespace TimeProject.Server.Model.Dto
{
    public class EventsDto
    {
        public int EventsId { get; set; }
        public string? EventName { get; set; }
        public string? Description { get; set; }
        public DateTime DateTime { get; set; }//Etkinlik tarihi ve saati
        public int CreatedByUserID { get; set; }
    }
}
