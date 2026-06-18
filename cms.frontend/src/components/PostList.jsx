import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../services/blogService';

const PostList = ({ selectedCategoryId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error("Quá trình kết nối API bài viết thất bại:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const getImageUrl = (url) => {
        if (!url) return 'https://placehold.co/600x400?text=Fashion+News';
        if (url.startsWith('http')) return url;
        return `http://localhost:5288${url}`;
    };

    if (loading) {
        return (
            <div className="text-center my-4 py-5 bg-white rounded shadow-sm">
                <div className="spinner-border text-info" role="status"></div>
                <p className="mt-2 text-muted">Đang kết nối Database lấy tin tức thời trang...</p>
            </div>
        );
    }

    const filteredPosts = posts.filter(p => !selectedCategoryId || p.categoryId === selectedCategoryId);

    return (
        <div className="card shadow-sm p-4 bg-white rounded border-0">
            <h4 className="card-title text-uppercase font-weight-bold text-dark border-bottom pb-3 mb-4 d-flex align-items-center">
                <i className="fa-solid fa-newspaper mr-2 text-info" style={{ fontSize: '1.3rem' }}></i> Xu hướng & Bí quyết mặc đẹp
            </h4>
            
            {filteredPosts.length === 0 ? (
                <div className="alert alert-light text-center border p-5" style={{ borderRadius: '12px' }}>
                    <i className="fa-solid fa-folder-open text-muted mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <p className="text-muted m-0">Hiện tại chưa có bài viết xu hướng nào thuộc chuyên mục này.</p>
                </div>
            ) : (
                <div className="row">
                    {filteredPosts.map((item) => (
                        <div className="col-md-6 mb-4" key={item.id}>
                            <div className="card h-100 border-0 shadow-sm bg-light rounded-lg overflow-hidden transition-all hover-shadow">
                                <div style={{ height: '180px', overflow: 'hidden' }}>
                                    <img 
                                        src={getImageUrl(item.imageUrl)} 
                                        alt={item.title}
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/600x400?text=Fashion+News';
                                        }}
                                    />
                                </div>
                                <div className="card-body p-3 d-flex flex-column justify-content-between">
                                    <div>
                                        {item.categoryName && (
                                            <span className="badge badge-info mb-2 px-2 py-1" style={{ fontSize: '0.75rem' }}>
                                                {item.categoryName}
                                            </span>
                                        )}
                                        <h5 className="font-weight-bold text-dark text-truncate-2" style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                                            <Link to={`/blog/${item.id}`} className="text-dark text-decoration-none text-hover-primary">
                                                {item.title}
                                            </Link>
                                        </h5>
                                        <p className="text-secondary small mt-2 text-truncate-2">
                                            {item.shortDescription || 'Tìm hiểu xu hướng thời trang mới nhất và các bí quyết phối đồ cực chất cho nàng công sở.'}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-light text-muted small">
                                        <span>
                                            <i className="fa-regular fa-calendar-days mr-1 text-secondary"></i>
                                            {new Date(item.createdDate).toLocaleDateString('vi-VN')}
                                        </span>
                                        <Link to={`/blog/${item.id}`} className="text-primary font-weight-bold text-decoration-none hover-underline">
                                            Đọc tiếp <i className="fa-solid fa-angle-right ml-1" style={{ fontSize: '0.75rem' }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;
