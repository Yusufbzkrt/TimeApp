using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TimeProject.Server; // CustomUserIdProvider için namespace
using TimeProject.Server.Data;
using TimeProject.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Token:Issuer"],
            ValidAudience = builder.Configuration["Token:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"])),
            ClockSkew = TimeSpan.Zero
        };

        // ****** BURAYA EKLEME YAPILIYOR ******
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"]; // Query string'den token'ı al

                // Hub yolunuzu doğru kontrol edin
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    (path.StartsWithSegments("/messageHub"))) // '/messageHub' yolu için token'ı yakala
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
        // ************************************
    });

builder.Services.AddAuthorization(); // Authorization'ı ekleyin

// Servislerin eklenmesi
builder.Services.AddDbContext<TimeProjectDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();


// CORS yapılandırması
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://localhost:5173") // React frontend URL'niz
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();  // Credentials (cookies veya token) desteği
    });
});

var app = builder.Build();

// Middleware sırası
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
// CORS Middleware
app.UseCors("AllowSpecificOrigin");

app.UseAuthentication(); // Kimlik doğrulamayı etkinleştir
app.UseAuthorization();  // Yetkilendirmeyi etkinleştir

// ****** BURADA DÜZELTME YAPILIYOR ******
// ASP.NET Core 6+ için doğru kullanım:
app.MapControllers();
app.MapHub<MessageHub>("/messageHub"); // Hub'ı eşleştir
// ************************************

app.MapFallbackToFile("/index.html");

app.Run();