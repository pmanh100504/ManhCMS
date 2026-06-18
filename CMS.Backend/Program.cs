//Sinh viên: Phạm Văn Mạnh
//MSSV: 2122110255
//Lớp: CCQ2211G
//Ngày tạo: 29/05/2026
using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký DbContext vào hệ thống
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 1. Khai báo dịch vụ xác thực Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login"; // Đường dẫn nếu chưa đăng nhập
        options.AccessDeniedPath = "/Account/AccessDenied"; // Đường dẫn nếu vào trang không được phép
    });
// 1. Khai báo chính sách CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
// 2. Kích hoạt chính sách CORS đã khai báo ở trên
app.UseCors("AllowReactApp");


app.UseAuthentication(); // BƯỚC A: Xác nhận "Anh là ai?" (Kiểm tra thẻ bài)
app.UseAuthorization();  // BƯỚC B: Xác nhận "Anh được làm gì?" (Kiểm tra quyền)
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Tự động cập nhật danh mục demo cũ thành danh mục thời trang thiết kế khi ứng dụng khởi động
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        // Cập nhật danh mục tin tức (Categories)
        var cat1 = context.Categories.Find(1);
        if (cat1 != null) { cat1.Name = "Xu Hướng Thời Trang"; cat1.Description = "Cập nhật phong cách thời trang, xu hướng phối đồ theo mùa."; }
        
        var cat2 = context.Categories.Find(2);
        if (cat2 != null) { cat2.Name = "Cẩm Nang Chọn Size & Mix Đồ"; cat2.Description = "Hướng dẫn chọn số đo quần áo phù hợp cho từng dáng người."; }
        
        var cat3 = context.Categories.Find(3);
        if (cat3 != null) { cat3.Name = "Câu Chuyện Thiết Kế"; cat3.Description = "Hành trình sáng tạo, chất liệu cao cấp và cảm hứng thiết kế."; }
        
        var cat4 = context.Categories.Find(4);
        if (cat4 != null) { cat4.Name = "Sự Kiện & Ưu Đãi"; cat4.Description = "Thông báo chương trình khuyến mãi và hoạt động Lookbook."; }
        
        var cat5 = context.Categories.Find(5);
        if (cat5 != null) { cat5.Name = "Chăm Sóc Sản Phẩm"; cat5.Description = "Bí quyết giặt là và bảo quản đồ thiết kế lâu bền."; }

        // Cập nhật danh mục sản phẩm (CategoriesProducts)
        var prodCat1 = context.CategoriesProducts.Find(1);
        if (prodCat1 != null) { prodCat1.Name = "Đầm Dạ Hội & Dự Tiệc"; prodCat1.Description = "Các thiết kế sang trọng, phom dáng cao cấp cho các buổi tiệc."; }
        
        var prodCat2 = context.CategoriesProducts.Find(2);
        if (prodCat2 != null) { prodCat2.Name = "Thời Trang Công Sở"; prodCat2.Description = "Trang phục lịch sự, tôn dáng, chất liệu cao cấp cho dân văn phòng."; }
        
        var prodCat3 = context.CategoriesProducts.Find(3);
        if (prodCat3 != null) { prodCat3.Name = "Thời Trang Dạo Phố"; prodCat3.Description = "Các mẫu đầm kiểu, chân váy dạo phố trẻ trung, thoải mái."; }
        
        var prodCat4 = context.CategoriesProducts.Find(4);
        if (prodCat4 != null) { prodCat4.Name = "Phụ Kiện Thiết Kế"; prodCat4.Description = "Khăn lụa, thắt lưng và phụ kiện phối kèm cao cấp."; }

        context.SaveChanges();
    }
    catch (Exception ex)
    {
        Console.WriteLine("Lỗi khi cập nhật danh mục khởi động: " + ex.Message);
    }
}

app.Run();
