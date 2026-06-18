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
    public class CategoriesProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CategoriesProducts
        [HttpGet]
        public async Task<IActionResult> GetCategoriesProducts()
        {
            var list = await _context.CategoriesProducts
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToListAsync();

            return Ok(list);
        }
    }
}
