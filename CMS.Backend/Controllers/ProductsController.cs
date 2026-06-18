using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var list = await _context.Products
                .Where(p => p.Published)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.Description,
                    Category = p.CategoryProduct != null ? new
                    {
                        CategoryId = p.CategoryProduct.Id,
                        CategoryName = p.CategoryProduct.Name
                    } : null
                })
                .ToListAsync();

            return Ok(list);
        }

        // GET: api/Products/category/{categoryProductId}
        [HttpGet("category/{categoryProductId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryProductId)
        {
            var list = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId && p.Published)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.Description,
                    Category = p.CategoryProduct != null ? new
                    {
                        CategoryId = p.CategoryProduct.Id,
                        CategoryName = p.CategoryProduct.Name
                    } : null
                })
                .ToListAsync();

            return Ok(list);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại" });
            }

            var result = new
            {
                product.Id,
                product.Name,
                product.Price,
                product.ImageUrl,
                product.Description,
                product.StockQuantity,
                Category = product.CategoryProduct != null ? new
                {
                    CategoryId = product.CategoryProduct.Id,
                    CategoryName = product.CategoryProduct.Name
                } : null
            };

            return Ok(result);
        }
    }
}
