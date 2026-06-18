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
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class RegisterDto
        {
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string? Phone { get; set; }
            public string? Address { get; set; }
        }

        // POST: api/Auth/CustomerRegister
        [HttpPost("CustomerRegister")]
        public async Task<IActionResult> CustomerRegister([FromBody] RegisterDto dto)
        {
            if (dto == null) return BadRequest();

            // Kiểm tra xem email đã tồn tại chưa
            var exist = await _context.Customers.AnyAsync(c => c.Email == dto.Email);
            if (exist)
            {
                return BadRequest(new { message = "Email này đã được đăng ký bởi tài khoản khác" });
            }

            var customer = new Customer
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = dto.Password, // Lưu thô theo yêu cầu
                Phone = dto.Phone,
                Address = dto.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }

        public class LoginDto
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        // POST: api/Auth/CustomerLogin
        [HttpPost("CustomerLogin")]
        public async Task<IActionResult> CustomerLogin([FromBody] LoginDto dto)
        {
            if (dto == null) return BadRequest();

            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email == dto.Email && c.Password == dto.Password);

            if (customer == null)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác" });
            }

            return Ok(new
            {
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }
    }
}
