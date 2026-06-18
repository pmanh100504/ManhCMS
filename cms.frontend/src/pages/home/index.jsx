import React, { useState } from 'react';
import Header from '../../components/Header';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';
import Footer from '../../components/Footer';

function Home() {
    // Quản lý trạng thái danh mục sản phẩm ở mức Trang chủ để đồng bộ tiêu đề và sản phẩm
    const [activeCategory, setActiveCategory] = useState({ id: null, name: 'TẤT CẢ SẢN PHẨM' });

    return (
        <div className="homepage-container bg-light min-vh-100 d-flex flex-column">
            
            {/* TẦNG 1: Thanh tiện ích, logo, ô tìm kiếm và giỏ hàng nhanh */}
            <Header />

            {/* TẦNG 2: Banner quảng cáo lớn, hình khối trang trí và nút kêu gọi mua hàng */}
            <HeroBanner />

            {/* TẦNG 3: Menu ngang hiển thị danh mục sản phẩm */}
            <CategoryMenu 
                activeCategoryId={activeCategory.id} 
                onCategoryClick={(id, name) => setActiveCategory({ id, name })} 
            />

            {/* TẦNG 4: Lưới hiển thị danh sách sản phẩm thời trang */}
            <ProductGrid 
                activeCategoryId={activeCategory.id} 
                activeCategoryName={activeCategory.name}
            />

            {/* TẦNG 5: Khối hiển thị các bài viết tin tức xu hướng mặc đẹp */}
            <LatestBlog />

            {/* TẦNG 6: Chân trang quản trị thông tin liên hệ, hotline và chính sách cửa hàng */}
            <Footer />
            
        </div>
    );
}

export default Home;
