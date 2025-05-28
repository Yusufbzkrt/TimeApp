using Nest;

namespace TimeProject.Server.Model
{
    [ElasticsearchType(RelationName = "messages")]
    public class Messages
    {
        public int MessagesId { get; set; }

        public int SenderUserId { get; set; }
        public int ReceiveUserId { get; set; }

        [Text(Name = "messageContent")]
        public string? MessageContent { get; set; }

        public DateTime SendAt { get; set; }
        public bool IsRead { get; set; }
    }
}
 