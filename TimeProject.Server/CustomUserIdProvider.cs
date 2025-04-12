using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace TimeProject.Server
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }

}
