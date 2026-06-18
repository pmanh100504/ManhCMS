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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class CartItemDto
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }

        public class OrderRequestDto
        {
            public int CustomerId { get; set; }
            public string? Notes { get; set; }
            public List<CartItemDto> CartItems { get; set; }
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderRequestDto dto)
        {
            if (dto == null || dto.CartItems == null || !dto.CartItems.Any())
            {
                return BadRequest(new { message = "Dữ liệu giỏ hàng trống" });
            }

            // Kiểm tra xem khách hàng có tồn tại không
            var customerExists = await _context.Customers.AnyAsync(c => c.Id == dto.CustomerId);
            if (!customerExists)
            {
                return BadRequest(new { message = "Khách hàng không tồn tại" });
            }

            // 1. Tạo bản ghi mới trong bảng Order
            var order = new Order
            {
                CustomerId = dto.CustomerId,
                OrderDate = DateTime.Now,
                Status = 0, // Chờ duyệt
                Notes = dto.Notes
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync(); // Lưu để sinh Order.Id

            // 2. Chạy vòng lặp qua giỏ hàng và thêm OrderDetail
            foreach (var item in dto.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                {
                    return BadRequest(new { message = $"Sản phẩm ID {item.ProductId} không tồn tại" });
                }

                // Kiểm tra số lượng tồn kho
                if (product.StockQuantity < item.Quantity)
                {
                    return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ tồn kho (Hiện có: {product.StockQuantity})" });
                }

                var orderDetail = new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price // Lấy đúng giá Price gán vào UnitPrice
                };

                _context.OrderDetails.Add(orderDetail);

                // 3. Khấu trừ số lượng tồn kho
                product.StockQuantity -= item.Quantity;
                _context.Products.Update(product);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đặt hàng thành công",
                orderId = order.Id
            });
        }

        // GET: api/Orders/customer/{customerId}
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetCustomerOrders(int customerId)
        {
            var orders = await _context.Orders
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    OrderDetails = o.OrderDetails.Select(od => new
                    {
                        od.Id,
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : "Sản phẩm đã xóa",
                        ProductImageUrl = od.Product != null ? od.Product.ImageUrl : null,
                        od.Quantity,
                        od.UnitPrice,
                        Subtotal = od.Quantity * od.UnitPrice
                    }),
                    TotalAmount = o.OrderDetails.Sum(od => od.Quantity * od.UnitPrice)
                })
                .ToListAsync();

            return Ok(orders);
        }
    }
}
