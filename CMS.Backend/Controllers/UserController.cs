//Sinh viên: Phạm Văn Mạnh
//MSSV: 2122110255
//Lớp: CCQ2211G
//Ngày tạo: 22/05/2026

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities; // Phải có dòng này để dùng lớp User
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách thành viên quản trị
        public IActionResult Index()
        {
            // Lấy danh sách người dùng từ database
            var users = _context.Users.ToList();

            // Trả về View kèm theo danh sách người dùng
            return View(users);
        }
    }
}
