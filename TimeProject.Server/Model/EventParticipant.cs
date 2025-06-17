using System.Text.Json.Serialization;

namespace TimeProject.Server.Model
{
    public class EventParticipant
    {
        public int Id { get; set; }

        public int EventId { get; set; }
        public Events? Event { get; set; }
        public int UserId { get; set; }

        public string? Name { get; set; }
        public string? Email { get; set; }

        [JsonIgnore]
        public DateTime JoinedAt { get; set; } = DateTime.Now;
    }

}
