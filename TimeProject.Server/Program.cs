using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TimeProject.Server.Data;
using TimeProject.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer
    (options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Token:Issuer"],
            ValidAudience = builder.Configuration["Token:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"])),
            ClockSkew = TimeSpan.Zero
        };
    });

// Servislerin eklenmesi
builder.Services.AddDbContext<TimeProjectDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

// CORS yapýlandýrmasý
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Middleware sýrasý
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS Middleware
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();

// Endpoint'lerin tanýmlanmasý
app.MapControllers();
app.MapHub<MessageHub>("/messageHub"); // doðru þekilde tanýmlandý

app.MapFallbackToFile("/index.html");

app.Run();
