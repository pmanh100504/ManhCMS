import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogService';
import PostCard from '../../components/PostCard';

function LatestBlog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                // Chỉ lấy tối đa 3 bài viết mới nhất cho trang chủ
                setPosts(data.slice(0, 3));
            } catch (error) {
                console.error("Lỗi khi tải danh sách bài viết trang chủ:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPosts();
    }, []);

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border spinner-border-sm text-info animate-spin" role="status"></div>
                <p className="mt-2 text-muted">Đang tải tin tức xu hướng phối đồ...</p>
            </div>
        );
    }

    return (
        <section id="latest-blog-section" className="latest-blog-wrapper my-5 bg-white py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h3 className="font-weight-bold text-dark text-uppercase mb-2" style={{ letterSpacing: '1px' }}>
                        XU HƯỚNG THỜI TRANG
                    </h3>
                    <p className="text-muted" style={{ fontSize: '15px' }}>
                        Cập nhật xu hướng thời trang và mẹo phối đồ cực đỉnh cùng ManhCMS Fashion
                    </p>
                    <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#11CAA0', borderRadius: '2px' }}></div>
                </div>

                {posts.length === 0 ? (
                    <div className="alert alert-light text-center py-4 border" style={{ borderRadius: '12px' }}>
                        <p className="text-muted m-0">Chưa có bài viết xu hướng nào gần đây.</p>
                    </div>
                ) : (
                    <div className="row">
                        {posts.map((post) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
                                <PostCard item={post} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default LatestBlog;
