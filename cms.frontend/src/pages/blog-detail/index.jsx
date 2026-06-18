import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import blogService from '../../services/blogService';

const IMAGE_BASE_URL = "http://localhost:5288";

function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [latestPosts, setLatestPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetailAndLatest = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch current post detail
                const postData = await blogService.getPostById(id);
                setPost(postData);

                // Fetch latest posts for sidebar
                const allPosts = await blogService.getAllPosts();
                // Filter out current post and limit to 4 posts
                const filteredLatest = allPosts
                    .filter(item => item.id !== parseInt(id))
                    .slice(0, 4);
                setLatestPosts(filteredLatest);

            } catch (err) {
                console.error("Lỗi khi tải chi tiết bài viết:", err);
                setError("Không thể tải nội dung bài viết. Bài viết này có thể không tồn tại hoặc đã bị gỡ bỏ.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPostDetailAndLatest();
        }
    }, [id]);

    // Helper to get full image URL
    const getFullImageUrl = (url) => {
        if (!url) return 'https://placehold.co/800x450?text=ManhCMS+Fashion';
        if (url.startsWith('http')) return url;
        return IMAGE_BASE_URL + url;
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header />

            <main className="flex-grow-1 container my-5">
                {/* Breadcrumb Navigation */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb bg-transparent p-0 mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-secondary text-decoration-none">Trang chủ</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/blog" className="text-secondary text-decoration-none">Tin tức / Blog</Link>
                        </li>
                        <li className="breadcrumb-item active text-dark font-weight-bold text-truncate" style={{ maxWidth: '300px' }} aria-current="page">
                            {post ? post.title : 'Chi tiết bài viết'}
                        </li>
                    </ol>
                </nav>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-info animate-spin" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                        <p className="mt-3 text-muted">Đang tải chi tiết bài viết từ database...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-warning text-center py-5 border shadow-sm" style={{ borderRadius: '12px', backgroundColor: '#fff' }}>
                        <i className="fa-solid fa-triangle-exclamation text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                        <h4 className="font-weight-bold text-dark mb-2">Không tìm thấy nội dung!</h4>
                        <p className="text-muted mb-4">{error}</p>
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/blog" className="btn btn-secondary px-4 py-2 mr-2" style={{ borderRadius: '20px' }}>
                                Quay lại danh sách tin
                            </Link>
                            <Link to="/" className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#005088', borderColor: '#005088', borderRadius: '20px' }}>
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                ) : post ? (
                    <div className="row">
                        {/* Left Column: Post Content */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm bg-white p-4 p-md-5" style={{ borderRadius: '16px' }}>
                                {/* Category Badge */}
                                {post.categoryName && (
                                    <span 
                                        className="badge text-uppercase font-weight-bold px-3 py-2 mb-3 align-self-start"
                                        style={{ backgroundColor: 'rgba(17, 202, 160, 0.15)', color: '#11CAA0', fontSize: '11px', borderRadius: '4px' }}
                                    >
                                        {post.categoryName}
                                    </span>
                                )}

                                {/* Article Title */}
                                <h1 className="font-weight-bold text-dark mb-3" style={{ fontSize: '32px', lineHeight: '1.25' }}>
                                    {post.title}
                                </h1>

                                {/* Metadata Info */}
                                <div className="d-flex flex-wrap text-muted small align-items-center mb-4 pb-3 border-bottom">
                                    <span className="mr-3 mb-2">
                                        <i className="fa-regular fa-calendar-days mr-1 text-secondary"></i>
                                        {new Date(post.createdDate).toLocaleDateString('vi-VN')}
                                    </span>
                                    <span className="mr-3 mb-2">
                                        <i className="fa-solid fa-user mr-1 text-secondary"></i>
                                        ManhCMS Fashion
                                    </span>
                                    <span className="mb-2">
                                        <i className="fa-regular fa-clock mr-1 text-secondary"></i>
                                        5 phút đọc
                                    </span>
                                </div>

                                {/* Main Banner Image */}
                                <div className="mb-4 overflow-hidden" style={{ borderRadius: '12px', maxHeight: '450px' }}>
                                    <img 
                                        src={getFullImageUrl(post.imageUrl)}
                                        alt={post.title}
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ objectFit: 'cover', maxHeight: '420px', borderRadius: '12px' }}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/800x450?text=ManhCMS+Fashion+Trend';
                                        }}
                                    />
                                </div>

                                {/* Blog Body Content */}
                                {post.content ? (
                                    <div 
                                        className="blog-content-body my-4"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                ) : (
                                    <div className="my-5 text-center text-muted py-5 bg-light rounded" style={{ border: '1px dashed #e2e8f0' }}>
                                        <i className="fa-regular fa-file-lines text-muted mb-3" style={{ fontSize: '2rem' }}></i>
                                        <p className="font-italic m-0">Nội dung bài viết chi tiết đang được cập nhật...</p>
                                    </div>
                                )}

                                {/* Social Share area */}
                                <div className="border-top pt-4 mt-5 d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="d-flex align-items-center mb-2 mb-md-0">
                                        <span className="font-weight-bold text-dark mr-3" style={{ fontSize: '14px' }}>Chia sẻ bài viết:</span>
                                        <button className="btn btn-sm btn-outline-secondary rounded-circle mr-2" style={{ width: '36px', height: '36px', padding: 0 }}><i className="fab fa-facebook-f"></i></button>
                                        <button className="btn btn-sm btn-outline-secondary rounded-circle mr-2" style={{ width: '36px', height: '36px', padding: 0 }}><i className="fab fa-pinterest"></i></button>
                                        <button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: '36px', height: '36px', padding: 0 }}><i className="fab fa-twitter"></i></button>
                                    </div>
                                    <Link to="/blog" className="btn btn-outline-info font-weight-bold px-3 py-2" style={{ borderRadius: '20px', fontSize: '13px' }}>
                                        <i className="fa-solid fa-arrow-left mr-2"></i> Quay lại Blog
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="col-lg-4 mt-4 mt-lg-0">
                            {/* Brand Card Widget */}
                            <div className="card shadow-sm border-0 rounded-lg bg-white p-4 text-center">
                                <img 
                                    src="https://placehold.co/100?text=MC" 
                                    alt="ManhCMS.Fashion Logo" 
                                    className="rounded-circle mx-auto mb-3 shadow-sm"
                                    style={{ width: '80px', height: '80px', border: '3px solid #11CAA0' }}
                                />
                                <h5 className="font-weight-bold text-dark mb-1">ManhCMS Fashion</h5>
                                <p className="text-secondary small mb-3">Thương Hiệu Thời Trang Thiết Kế Cao Cấp</p>
                                <p className="text-muted small mb-0 px-2">
                                    Chuyên cung cấp quần áo công sở thanh lịch, đầm dạ hội sang trọng và thời trang dạo phố thiết kế riêng.
                                </p>
                            </div>

                            {/* Sidebar: Latest Articles Widget */}
                            <div className="card shadow-sm border-0 rounded-lg bg-white mt-4">
                                <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4">
                                    <h5 className="card-title text-uppercase font-weight-bold text-dark d-flex align-items-center mb-0" style={{ letterSpacing: '0.5px', fontSize: '1.05rem' }}>
                                        <i className="fa-solid fa-list-ul text-info mr-2" style={{ fontSize: '1.2rem' }}></i> Bài viết mới nhất
                                    </h5>
                                </div>
                                <div className="card-body px-4 pb-4 pt-1">
                                    {latestPosts.length === 0 ? (
                                        <p className="text-muted small m-0">Không có bài viết khác gần đây.</p>
                                    ) : (
                                        <div className="latest-posts-list">
                                            {latestPosts.map((item) => (
                                                <div className="d-flex align-items-start py-3 border-bottom border-light" key={item.id}>
                                                    <div style={{ width: '65px', height: '50px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                                                        <img 
                                                            src={getFullImageUrl(item.imageUrl)} 
                                                            alt={item.title} 
                                                            className="w-100 h-100 object-fit-cover"
                                                            style={{ objectFit: 'cover' }}
                                                            onError={(e) => {
                                                                e.target.src = 'https://placehold.co/100x80?text=Fashion';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="pl-3 overflow-hidden">
                                                        <h6 className="font-weight-bold text-dark text-truncate-2 mb-1" style={{ fontSize: '13px', lineHeight: '1.3' }}>
                                                            <Link to={`/blog/${item.id}`} className="text-dark text-decoration-none text-hover-primary">
                                                                {item.title}
                                                            </Link>
                                                        </h6>
                                                        <span className="text-muted small" style={{ fontSize: '11px' }}>
                                                            {new Date(item.createdDate).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </main>

            <Footer />
        </div>
    );
}

export default BlogDetail;
