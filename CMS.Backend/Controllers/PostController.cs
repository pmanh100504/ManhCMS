//Sinh viên: Phạm Văn Mạnh
//MSSV: 2122110255
//Lớp: CCQ2211G
//Ngày tạo: 22/05/2026
using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities; // Quan trọng: Phải có dòng này để dùng lớp Post
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách bài viết mẫu
        public IActionResult Index()
        {
            var posts = _context.Posts.ToList(); // Lấy tất cả bài viết
            return View(posts);
        }

        // Hàm Details: Hiển thị chi tiết một bài viết
        public IActionResult Details(int id)
        {
            // Tìm bài viết trong Database bằng Id
            var post = _context.Posts.Find(id);

            if (post == null) return NotFound();

            return View(post);
        }
    }
}
