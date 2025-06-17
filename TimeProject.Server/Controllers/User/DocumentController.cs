using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.User
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Eğer JWT varsa
    public class DocumentController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;
        private readonly IWebHostEnvironment _env;

        public DocumentController(TimeProjectDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/User/GetDocuments
        [HttpGet("GetDocuments")]
        public async Task<IActionResult> GetDocuments()
        {
            var documents = await _context.Documents
                .Select(d => new DocumentDto
                {
                    Id = d.Id,
                    FileName = d.FileName,
                    UploadDate = d.UploadDate
                })
                .ToListAsync();

            return Ok(documents);
        }

        // POST: api/User/UploadDocument
        [HttpPost("UploadDocument")]
        public async Task<IActionResult> UploadDocument(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Dosya boş.");

            var uploadFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var fileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var document = new Document
            {
                FileName = fileName,
                FilePath = filePath,
                UploadDate = DateTime.Now
            };

            _context.Documents.Add(document);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/User/DownloadDocument/{id}
        [HttpGet("DownloadDocument/{id}")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null || !System.IO.File.Exists(document.FilePath))
                return NotFound("Dosya bulunamadı.");

            var memory = new MemoryStream();
            using (var stream = new FileStream(document.FilePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            return File(memory, "application/octet-stream", document.FileName);
        }

        // DELETE: api/User/DeleteDocument/{id}
        [HttpDelete("DeleteDocument/{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null)
                return NotFound("Döküman bulunamadı.");

            if (System.IO.File.Exists(document.FilePath))
            {
                System.IO.File.Delete(document.FilePath);
            }

            _context.Documents.Remove(document);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
