namespace TimeProject.Server.Model
{
    public class Transactions
    {
        public int TransactionsId { get; set; }
        public int SenderUserId { get; set; }
        public int ReceiveUserId { get; set; }
        public User? User { get; set; }
        public int ServiceId { get; set; }
        public Services? Services { get; set; }
        public int CreditsExchanged { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
