using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeProject.Server.Data;
using TimeProject.Models;
using System.Security.Claims;
using Nest;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Controllers.User
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public TaskController(TimeProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/Task/GetTasks
        [HttpGet("GetTasks")]
        public async Task<ActionResult<IEnumerable<Tasks>>> GetTasks()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Geçersiz kullanıcı" });
                }
                var userId = int.Parse(userIdClaim.Value);
                var events = await _context.Tasks
                 .Where(e => e.UserId == userId)
                 .ToListAsync();
                if (events == null || events.Count == 0)
                {
                    return NotFound("Etkinlik bulunamadı.");
                }

                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görevler getirilirken bir hata oluştu: " + ex.Message });
            }
        }

        // POST: api/Task/add
        [HttpPost("add")]
        public async Task<ActionResult<Task>> AddTask(TaskCreateDto taskDto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                int userId = int.Parse(userIdClaim.Value);

                var newTask = new Tasks
                {
                    TaskName = taskDto.TaskName,
                    Description = taskDto.Description,
                    DueDate = taskDto.DueDate,
                    Priority = taskDto.Priority,
                    Status = taskDto.Status ?? "pending",
                    UserId = userId,
                    CreatedDate = DateTime.Now
                };

                _context.Tasks.Add(newTask);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTasks), new { id = newTask.TaskID }, newTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görev eklenirken bir hata oluştu: " + ex.Message });
            }
        }


        // PUT: api/Task/{id}
        [HttpPut("{taskID}")]
        public async Task<IActionResult> UpdateTask(int taskID, Tasks task)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                int userId = int.Parse(userIdClaim.Value);
                var existingTask = await _context.Tasks
                    .FirstOrDefaultAsync(t => t.TaskID == taskID && t.UserId == userId);

                if (existingTask == null)
                {
                    return NotFound(new { message = "Görev bulunamadı veya erişim izniniz yok" });
                }

                existingTask.UserId = userId;
                existingTask.TaskID = task.TaskID; // Ensure TaskID is not changed
                existingTask.TaskName = task.TaskName;
                existingTask.Description = task.Description;
                existingTask.DueDate = task.DueDate;
                existingTask.Priority = task.Priority;
                existingTask.Status = task.Status;
                existingTask.UpdatedDate = DateTime.Now;

                _context.Entry(existingTask).State = EntityState.Modified;
                var result = await _context.SaveChangesAsync();

                return Ok(new { message = "Görev başarıyla güncellendi" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görev güncellenirken bir hata oluştu: " + ex.Message });
            }
        }

        [HttpPut("{taskID}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int taskID, [FromBody] TaskStatusDto dto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                int userId = int.Parse(userIdClaim.Value);

                var task = await _context.Tasks
                    .FirstOrDefaultAsync(t => t.TaskID == taskID && t.UserId == userId);

                if (task == null)
                    return NotFound(new { message = "Görev bulunamadı veya erişim izniniz yok." });

                task.Status = dto.Status?.ToLower();
                task.UpdatedDate = DateTime.Now;

                _context.Tasks.Update(task);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Görev durumu başarıyla güncellendi." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Durum güncellenirken bir hata oluştu: " + ex.Message });
            }
        }


        // DELETE: api/Task/{id}
        [HttpDelete("{taskID}")]
        public async Task<IActionResult> DeleteTask(int taskID)
        {
            try 
            {
                var task = await _context.Tasks.FindAsync(taskID);
                if (task == null) return NotFound();
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Etkinlik başarıyla silindi." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görev silinirken bir hata oluştu: " + ex.Message });
            }
        }
    }
}