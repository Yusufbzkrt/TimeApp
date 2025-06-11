using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using Microsoft.Extensions.Logging;

namespace TimeProject.Server.Hubs
{
    public class MessageHub : Hub
    {
        private readonly IHubContext<MessageHub> _hubContext;
        private readonly TimeProjectDbContext _context;
        private readonly ILogger<MessageHub> _logger;
        // Eğer özel bir IUserIdProvider kullanmıyorsanız bu satırı kaldırabilirsiniz.
        // private readonly IUserIdProvider _userIdProvider; 

        public MessageHub(IHubContext<MessageHub> hubContext, TimeProjectDbContext context, ILogger<MessageHub> logger)
        {
            _hubContext = hubContext;
            _context = context;
            _logger = logger;
            // Eğer yukarıda kaldırıyorsanız, buradan da kaldırın
            // _userIdProvider = userIdProvider; 
        }

        // Mesaj gönderme fonksiyonu
        public async Task SendMessage(int senderUserId, int receiverUserId, string messageContent)
        {
            var senderUserIdFromContext = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (senderUserIdFromContext != senderUserId.ToString())
            {
                _logger.LogWarning("Mesaj gönderme yetkilendirme hatası: Token'daki kullanıcı ID ({0}) ile gönderilen kullanıcı ID ({1}) eşleşmiyor.", senderUserIdFromContext, senderUserId);
                throw new HubException("Mesaj gönderme yetkiniz yok veya kullanıcı kimliği geçersiz.");
            }

            var message = new Messages
            {
                SenderUserId = senderUserId,
                ReceiveUserId = receiverUserId,
                MessageContent = messageContent,
                SendAt = DateTime.UtcNow, // UTC kullanmak daha iyi bir pratiktir
                IsRead = false
            };

            try
            {
                _context.Messages.Add(message);
                await _context.SaveChangesAsync(); // <-- Mesaj kaydedildi, 'message.MessagesId' artık gerçek ID'ye sahip.
                _logger.LogInformation("Mesaj başarıyla kaydedildi: Gönderen={0}, Alıcı={1}, Mesaj ID={2}", senderUserId, receiverUserId, message.MessagesId);

                // Sadece ALICIYA mesajı, GERÇEK ID'si ve diğer gerekli bilgilerle birlikte gönderiyoruz.
                // Gönderici kendi UI'ını zaten güncellediği için burada tekrar göndermiyoruz.
                var messageArgs = new object[]
                {
                    message.MessagesId,     // Gerçek Mesaj ID
                    message.SenderUserId,   // Gönderen ID
                    message.ReceiveUserId,  // Alıcı ID
                    message.MessageContent, // Mesaj içeriği
                    message.SendAt,         // Gönderilme zamanı
                    message.IsRead          // Okunmuş durumu
                };

                await _hubContext.Clients.User(receiverUserId.ToString()).SendAsync("ReceiveMessage", messageArgs);
                _logger.LogInformation("Mesaj alıcıya iletildi: Gönderen={0}, Alıcı={1}, Mesaj ID={2}", senderUserId, receiverUserId, message.MessagesId);
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "Veritabanına mesaj kaydedilirken hata oluştu: {0}", dbEx.Message);
                throw new HubException("Mesaj veritabanına kaydedilemedi. Lütfen tekrar deneyin.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Mesaj kaydedilirken genel hata oluştu: {0}", ex.Message);
                throw new HubException("Mesaj gönderilirken beklenmeyen bir hata oluştu.", ex);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
                _logger.LogInformation("SignalR bağlantısı kuruldu: ConnectionId={0}, UserId={1}", Context.ConnectionId, userId);
            }
            else
            {
                _logger.LogWarning("SignalR bağlantısı kuruldu ancak kullanıcı kimliği bulunamadı: ConnectionId={0}", Context.ConnectionId);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
                _logger.LogInformation("SignalR bağlantısı kesildi: ConnectionId={0}, UserId={1}, Hata={2}", Context.ConnectionId, userId, exception?.Message);
            }
            else
            {
                _logger.LogWarning("SignalR bağlantısı kesildi ancak kullanıcı kimliği bulunamadı: ConnectionId={0}, Hata={1}", Context.ConnectionId, exception?.Message);
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}