//Sinh viên: Phạm Văn Mạnh
//MSSV: 2122110255
//Lớp: CCQ2211G
//Ngày tạo: 05/06/2026

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CategoryProduct
        public IActionResult Index()
        {
            var data = _context.CategoriesProducts.ToList();
            return View(data);
        }

        // GET: CategoryProduct/Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: CategoryProduct/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(CategoryProduct model)
        {
            if (ModelState.IsValid)
            {
                _context.CategoriesProducts.Add(model);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        // GET: CategoryProduct/Edit/5
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            return View(category);
        }

        // POST: CategoryProduct/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(CategoryProduct model)
        {
            if (ModelState.IsValid)
            {
                _context.CategoriesProducts.Update(model);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        // GET: CategoryProduct/Delete/5
        public IActionResult Delete(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category != null)
            {
                // Check if any product references this category
                var hasProducts = _context.Products.Any(p => p.CategoryProductId == id);
                if (hasProducts)
                {
                    TempData["ErrorMessage"] = "Không thể xóa danh mục này vì đang có sản phẩm thuộc danh mục!";
                    return RedirectToAction(nameof(Index));
                }

                _context.CategoriesProducts.Remove(category);
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
