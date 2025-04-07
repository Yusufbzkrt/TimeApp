namespace TimeProject.Server.Model
{
    public class Credits
    {
        public int CreditsId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int CreditsAdded { get; set; }//Kazanılan kredi miktarı
        public int CreditsSpent { get; set; }//Harcanan kredi miktarı
        public int TransactionID { get; set; }
        public Transactions? Transactions { get; set; }
        public DateTime DateUpdated { get; set; }// kredinin son güncelleme tarihi
    }
}
