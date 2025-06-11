using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeProject.Server.Data;
using TimeProject.Models;

namespace TimeProject.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public TaskController(TimeProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/Task/GetTasks
        [HttpGet("GetTasks")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
        {
            try
            {
                var userId = int.Parse(User.FindFirst("UserID")?.Value);
                var tasks = await _context.TaskModel
                    .Where(t => t.UserId == userId)
                    .OrderBy(t => t.DueDate)
                    .Select(t => new TaskModel
                    {
                        TaskID = t.TaskID,
                        TaskName = t.TaskName,
                        Description = t.Description,
                        DueDate = t.DueDate,
                        Priority = t.Priority,
                        Status = t.Status,
                        UserId = t.UserId,
                        CreatedDate = t.CreatedDate,
                        UpdatedDate = t.UpdatedDate,
                        CreatedByUserName = _context.User
                            .Where(u => u.UserId == t.UserId)
                            .Select(u => u.Name)
                            .FirstOrDefault()
                    })
                    .ToListAsync();

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görevler getirilirken bir hata oluştu: " + ex.Message });
            }
        }

        // POST: api/Task/add
        [HttpPost("add")]
        public async Task<ActionResult<TaskModel>> AddTask(TaskModel task)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("UserID")?.Value);

                var newTask = new TaskModel
                {
                    TaskName = task.TaskName,
                    Description = task.Description,
                    DueDate = task.DueDate,
                    Priority = task.Priority,
                    Status = task.Status ?? "pending",
                    UserId = userId,
                    CreatedDate = DateTime.Now
                };

                _context.TaskModel.Add(newTask);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTasks), new { id = newTask.TaskID }, newTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görev eklenirken bir hata oluştu: " + ex.Message });
            }
        }

        // PUT: api/Task/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskModel task)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("UserID")?.Value);
                var existingTask = await _context.TaskModel
                    .FirstOrDefaultAsync(t => t.TaskID == id && t.UserId == userId);

                if (existingTask == null)
                {
                    return NotFound(new { message = "Görev bulunamadı veya erişim izniniz yok" });
                }

                existingTask.TaskName = task.TaskName;
                existingTask.Description = task.Description;
                existingTask.DueDate = task.DueDate;
                existingTask.Priority = task.Priority;
                existingTask.Status = task.Status;
                existingTask.UpdatedDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Görev başarıyla güncellendi" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görev güncellenirken bir hata oluştu: " + ex.Message });
            }
        }

        // DELETE: api/Task/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("UserID")?.Value);
                var task = await _context.TaskModel
                    .FirstOrDefaultAsync(t => t.TaskID == id && t.UserId == userId);

                if (task == null)
                {
                    return NotFound(new { message = "Görev bulunamadı veya erişim izniniz yok" });
                }

                _context.TaskModel.Remove(task);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Görev başarıyla silindi" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Görev silinirken bir hata oluştu: " + ex.Message });
            }
        }
    }
}