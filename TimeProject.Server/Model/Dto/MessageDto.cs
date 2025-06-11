namespace TimeProject.Server.Model.Dto
{
    public class MessageDto
    {
        public int SenderUserId { get; set; }
        public int ReceiveUserId { get; set; }
        public string Text { get; set; }
    }

}
