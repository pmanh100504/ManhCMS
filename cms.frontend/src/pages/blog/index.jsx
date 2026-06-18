import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostList from '../../components/PostList';
import BlogCategoryList from '../../components/BlogCategoryList';

function Blog() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Header */}
            <Header />

            {/* Banner Header */}
            <div 
                className="py-5 text-white text-center position-relative mb-4"
                style={{ 
                    background: 'linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)',
                    overflow: 'hidden'
                }}
            >
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <h1 className="fw-bold display-4 mb-2 text-uppercase font-weight-bold" style={{ letterSpacing: '2px' }}>
                        Tin Tức & Xu Hướng
                    </h1>
                    <p className="lead opacity-75 mb-0">
                        Cẩm nang phối đồ, cẩm nang chọn size và tin tức thời trang mới nhất cùng ManhCMS
                    </p>
                </div>
                {/* Decorative background shape */}
                <div 
                    className="position-absolute" 
                    style={{ 
                        right: '-5%', 
                        top: '-20%', 
                        width: '300px', 
                        height: '300px', 
                        borderRadius: '50%', 
                        background: 'radial-gradient(circle, rgba(17,202,160,0.15) 0%, transparent 70%)',
                        zIndex: 1
                    }}
                ></div>
            </div>

            {/* Breadcrumb & Content */}
            <div className="container flex-grow-1 pb-5">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb bg-transparent p-0 mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-secondary text-decoration-none">
                                <i className="fas fa-home mr-1"></i> Trang chủ
                            </Link>
                        </li>
                        <li className="breadcrumb-item active text-dark font-weight-bold" aria-current="page">
                            Tin tức / Blog
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    {/* Cột chính: Danh sách bài viết */}
                    <div className="col-lg-8">
                        <PostList selectedCategoryId={selectedCategoryId} />
                    </div>

                    {/* Cột phụ: Chuyên mục tin tức & Thông tin tác giả */}
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <BlogCategoryList 
                            selectedCategoryId={selectedCategoryId} 
                            onSelectCategory={setSelectedCategoryId} 
                        />
                        
                        {/* Custom Blog Widget */}
                        <div className="card shadow-sm border-0 rounded-lg mt-4 bg-white p-4">
                            <h5 className="font-weight-bold text-dark mb-3 border-bottom pb-2 text-uppercase" style={{ fontSize: '1rem', letterSpacing: '0.5px' }}>
                                <i className="fas fa-magic text-info mr-2"></i> Tư Vấn Size & Dịch Vụ
                            </h5>
                            <p className="text-muted small mb-3">
                                Bạn phân vân chưa biết chọn size quần áo hay đầm dạ hội thiết kế phù hợp? Hãy tham khảo ngay cẩm nang hoặc chat trực tiếp với đội ngũ thiết kế của chúng tôi.
                            </p>
                            <Link to="/shop" className="btn btn-info btn-block btn-sm text-white font-weight-bold py-2" style={{ borderRadius: '6px' }}>
                                <i className="fas fa-shopping-bag mr-2"></i> ĐẾN CỬA HÀNG
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Blog;
