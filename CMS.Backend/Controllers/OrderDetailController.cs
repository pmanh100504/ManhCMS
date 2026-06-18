//Sinh viên: Phạm Văn Mạnh
//MSSV: 2122110255
//Lớp: CCQ2211G
//Ngày tạo: 22/05/2026
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: OrderDetail
        public async Task<IActionResult> Index()
        {
            var items = await _context.OrderDetails
                .Include(od => od.Order)
                    .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .ToListAsync();
            return View(items);
        }

        // GET: OrderDetail/Create
        [HttpGet]
        public IActionResult Create()
        {
            ViewData["OrderId"] = new SelectList(_context.Orders.Select(o => new { Id = o.Id, Display = "Đơn hàng #" + o.Id }), "Id", "Display");
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Name");
            return View();
        }

        // POST: OrderDetail/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,OrderId,ProductId,Quantity,UnitPrice")] OrderDetail orderDetail)
        {
            if (ModelState.IsValid)
            {
                _context.Add(orderDetail);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["OrderId"] = new SelectList(_context.Orders.Select(o => new { Id = o.Id, Display = "Đơn hàng #" + o.Id }), "Id", "Display", orderDetail.OrderId);
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Name", orderDetail.ProductId);
            return View(orderDetail);
        }

        // GET: OrderDetail/Edit/5
        [HttpGet]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return BadRequest();

            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail == null) return NotFound();

            ViewData["OrderId"] = new SelectList(_context.Orders.Select(o => new { Id = o.Id, Display = "Đơn hàng #" + o.Id }), "Id", "Display", orderDetail.OrderId);
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Name", orderDetail.ProductId);
            return View(orderDetail);
        }

        // POST: OrderDetail/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,OrderId,ProductId,Quantity,UnitPrice")] OrderDetail orderDetail)
        {
            if (id != orderDetail.Id) return BadRequest();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(orderDetail);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderDetailExists(orderDetail.Id)) return NotFound();
                    else throw;
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["OrderId"] = new SelectList(_context.Orders.Select(o => new { Id = o.Id, Display = "Đơn hàng #" + o.Id }), "Id", "Display", orderDetail.OrderId);
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Name", orderDetail.ProductId);
            return View(orderDetail);
        }

        // GET: OrderDetail/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return BadRequest();

            var orderDetail = await _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (orderDetail == null) return NotFound();

            return View(orderDetail);
        }

        // POST: OrderDetail/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail != null)
            {
                _context.OrderDetails.Remove(orderDetail);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool OrderDetailExists(int id)
        {
            return _context.OrderDetails.Any(e => e.Id == id);
        }
    }
}
