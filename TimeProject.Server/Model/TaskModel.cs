using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TimeProject.Server.Model;

namespace TimeProject.Models
{
    public class TaskModel
    {
        [Key]
        public int TaskID { get; set; }

        [StringLength(200)]
        public string TaskName { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public DateTime DueDate { get; set; }

        [StringLength(20)]
        public string Priority { get; set; } // high, normal, low

        [StringLength(20)]
        public string Status { get; set; } // pending, completed

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        // Not mapped property for API responses
        [NotMapped]
        public string CreatedByUserName { get; set; }
    }
}