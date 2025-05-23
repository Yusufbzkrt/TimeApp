namespace TimeProject.Server.Model.Dto
{
    public class SendMessageDto
    {
        public int MesagesId { get; set; }
        public int SenderUserId { get; set; }
        public int ReceiveUserId { get; set; }
        public string? MessageContent { get; set; }
    }

}
 