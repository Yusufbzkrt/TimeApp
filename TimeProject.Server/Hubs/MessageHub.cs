using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model;

namespace TimeProject.Server.Hubs
{
    public class MessageHub : Hub
    {
        private readonly IHubContext<MessageHub> _hubContext;
        private readonly TimeProjectDbContext _context;
        private readonly ILogger<MessageHub> _logger;
        private readonly IUserIdProvider _userIdProvider;

        public MessageHub(IHubContext<MessageHub> hubContext, TimeProjectDbContext context, ILogger<MessageHub> logger, IUserIdProvider userIdProvider = null)
        {
            _hubContext = hubContext;
            _context = context;
            _logger = logger;
            _userIdProvider = userIdProvider;
        }

        // Mesaj gönderme fonksiyonu
        public async Task SendMessage(int senderUserId, int receiverUserId, string messageContent)
        {
            var senderUserIdFromContext = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (senderUserIdFromContext != senderUserId.ToString())
            {
                // Gerekirse senderUserId doğrulaması yapılabilir
                throw new Exception("Mesaj gönderen kullanıcı kimliği geçersiz.");
            }
            var message = new Messages
            {
                SenderUserId = senderUserId,
                ReceiveUserId = receiverUserId,
                MessageContent = messageContent,
                SendAt = DateTime.Now,
                IsRead = false
            };

            try
            {
                _context.Messages.Add(message);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Mesaj başarıyla kaydedildi: {0} -> {1}", senderUserId, receiverUserId);
            }
            catch (Exception ex)
            {
                _logger.LogError("Mesaj kaydedilirken hata oluştu: {0}", ex.Message);

            }

            await _hubContext.Clients.User(receiverUserId.ToString()).SendAsync("ReceiveMessage", senderUserId, messageContent);
        }


        // Mesajları alıcıya yönlendirme
        public override async Task OnConnectedAsync()
        {
            

            await base.OnConnectedAsync();
        }

    }

}
