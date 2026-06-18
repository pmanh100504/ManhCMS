//Sinh viên: Phạm Văn Mạnh
//MSSV: 2122110255
//Lớp: CCQ2211G
//Ngày tạo: 22/05/2026
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Product
        public async Task<IActionResult> Index()
        {
            var products = await _context.Products
                .Include(p => p.CategoryProduct)
                .ToListAsync();

            return View(products);
        }

        // GET: /Product/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null) return BadRequest();

            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefaultAsync(p => p.Id == id.Value);

            if (product == null) return NotFound();

            return View(product);
        }

        // GET: /Product/Create
        public IActionResult Create()
        {
            ViewData["CategoryProductId"] = new SelectList(_context.CategoriesProducts, "Id", "Name");
            return View();
        }

        // POST: /Product/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description,Price,StockQuantity,ImageUrl,CategoryProductId,Published")] Product product, IFormFile? uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                product.ImageUrl = "/uploads/" + fileName;
            }

            // Set default CategoryId to pass database validation constraint (CategoryId is NOT NULL in SQL)
            var defaultBlogCat = _context.Categories.FirstOrDefault();
            if (defaultBlogCat != null)
            {
                product.CategoryId = defaultBlogCat.Id;
            }

            // Clear model validation for CategoryId since we populate it manually
            ModelState.Remove("CategoryId");

            if (!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(x => x.Value.Errors.Select(e => e.ErrorMessage + " (" + x.Key + ")"));
                Console.WriteLine("MODELSTATE INVALID: " + string.Join(" | ", errors));
            }

            if (ModelState.IsValid)
            {
                _context.Add(product);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            ViewData["CategoryProductId"] = new SelectList(_context.CategoriesProducts, "Id", "Name", product.CategoryProductId);
            return View(product);
        }

        // GET: /Product/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return BadRequest();

            var product = await _context.Products.FindAsync(id.Value);
            if (product == null) return NotFound();

            ViewData["CategoryProductId"] = new SelectList(_context.CategoriesProducts, "Id", "Name", product.CategoryProductId);
            return View(product);
        }

        // POST: /Product/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,Price,StockQuantity,ImageUrl,CategoryProductId,Published")] Product product, IFormFile? uploadImage)
        {
            if (id != product.Id) return BadRequest();

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                product.ImageUrl = "/uploads/" + fileName;
            }
            else
            {
                var oldProduct = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == product.Id);
                if (oldProduct != null && string.IsNullOrEmpty(product.ImageUrl))
                {
                    product.ImageUrl = oldProduct.ImageUrl;
                }
            }

            // Set default CategoryId to pass database validation constraint
            var defaultBlogCat = _context.Categories.FirstOrDefault();
            if (defaultBlogCat != null)
            {
                product.CategoryId = defaultBlogCat.Id;
            }

            // Clear validation for CategoryId
            ModelState.Remove("CategoryId");

            if (!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(x => x.Value.Errors.Select(e => e.ErrorMessage + " (" + x.Key + ")"));
                Console.WriteLine("MODELSTATE INVALID: " + string.Join(" | ", errors));
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(product);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Products.Any(e => e.Id == product.Id))
                        return NotFound();
                    throw;
                }

                return RedirectToAction(nameof(Index));
            }

            ViewData["CategoryProductId"] = new SelectList(_context.CategoriesProducts, "Id", "Name", product.CategoryProductId);
            return View(product);
        }

        // GET: /Product/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return BadRequest();

            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefaultAsync(p => p.Id == id.Value);

            if (product == null) return NotFound();

            return View(product);
        }

        // POST: /Product/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
