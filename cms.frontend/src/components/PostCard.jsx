import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = "http://localhost:5288"; // Cổng backend thực tế của bạn

function PostCard({ item }) {
    // Hàm lấy URL ảnh đầy đủ
    const getFullImageUrl = (url) => {
        if (!url) return 'https://placehold.co/600x400?text=Fashion+News';
        if (url.startsWith('http')) return url;
        return IMAGE_BASE_URL + url;
    };

    return (
        <div className="card h-100 border-0 shadow-sm bg-light rounded-lg overflow-hidden transition-all hover-shadow">
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                    src={getFullImageUrl(item.imageUrl)} 
                    alt={item.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=Fashion+News';
                    }}
                />
                {item.categoryName && (
                    <span className="badge badge-info position-absolute px-2 py-1" style={{ top: '15px', right: '15px', borderRadius: '4px', fontSize: '11px', zIndex: 1 }}>
                        {item.categoryName}
                    </span>
                )}
            </div>
            
            <div className="card-body p-3 d-flex flex-column justify-content-between">
                <div>
                    <h5 className="font-weight-bold text-dark text-truncate-2" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>
                        <Link to={`/blog/${item.id}`} className="text-dark text-decoration-none text-hover-primary">
                            {item.title}
                        </Link>
                    </h5>
                    <p className="text-secondary small mt-2 text-truncate-2" style={{ minHeight: '38px' }}>
                        {item.content ? item.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'Tìm hiểu xu hướng thời trang mới nhất và các bí quyết phối đồ cực chất cho nàng công sở.'}
                    </p>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-light text-muted small">
                    <span>
                        <i className="fa-regular fa-calendar-days mr-1 text-secondary"></i>
                        {item.createdDate ? new Date(item.createdDate).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN')}
                    </span>
                    <Link to={`/blog/${item.id}`} className="text-primary font-weight-bold text-decoration-none hover-underline">
                        Đọc tiếp <i className="fa-solid fa-angle-right ml-1" style={{ fontSize: '0.75rem' }}></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
