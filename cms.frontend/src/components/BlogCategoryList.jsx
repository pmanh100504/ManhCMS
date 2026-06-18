import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const BlogCategoryList = ({ selectedCategoryId, onSelectCategory }) => {
    const [blogCategories, setBlogCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogCategories = async () => {
            try {
                setLoading(true);
                const data = await blogService.getBlogCategories();
                setBlogCategories(data);
            } catch (error) {
                console.error("Lỗi khi tải chuyên mục tin tức:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogCategories();
    }, []);

    if (loading) {
        return (
            <div className="card shadow-sm border-0 rounded-lg mt-4">
                <div className="card-body p-4 text-center">
                    <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                    <span className="ml-2 text-muted">Đang tải chuyên mục...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 rounded-lg mt-4">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4">
                <h5 className="card-title text-uppercase font-weight-bold text-dark d-flex align-items-center mb-0" style={{ letterSpacing: '0.5px', fontSize: '1.1rem' }}>
                    <i className="fa-solid fa-tags text-info mr-2" style={{ fontSize: '1.3rem' }}></i> Chuyên mục Blog
                </h5>
            </div>

            <div className="card-body p-0">
                <div className="list-group list-group-flush">
                    {/* Nút hiển thị Tất Cả Bài Viết */}
                    <button
                        type="button"
                        onClick={() => onSelectCategory(null)}
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3 transition-all ${selectedCategoryId === null ? 'active-category font-weight-bold' : ''}`}
                        style={{ 
                            fontSize: '0.95rem', 
                            color: selectedCategoryId === null ? '#11CAA0' : '#495057',
                            backgroundColor: selectedCategoryId === null ? 'rgba(17, 202, 160, 0.08)' : 'transparent',
                            borderLeft: selectedCategoryId === null ? '4px solid #11CAA0' : '4px solid transparent'
                        }}
                    >
                        <span>Tất cả bài viết</span>
                        <i className={`fa-solid fa-chevron-right ${selectedCategoryId === null ? 'text-info' : 'text-muted'}`} style={{ fontSize: '0.8rem', opacity: selectedCategoryId === null ? 0.9 : 0.5 }}></i>
                    </button>

                    {blogCategories.length === 0 ? (
                        <div className="p-4 text-center text-muted">Không có chuyên mục nào.</div>
                    ) : (
                        blogCategories.map((item) => {
                            const isActive = selectedCategoryId === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => onSelectCategory(item.id)}
                                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3 transition-all ${isActive ? 'active-category font-weight-bold' : ''}`}
                                    style={{ 
                                        fontSize: '0.95rem', 
                                        color: isActive ? '#11CAA0' : '#495057',
                                        backgroundColor: isActive ? 'rgba(17, 202, 160, 0.08)' : 'transparent',
                                        borderLeft: isActive ? '4px solid #11CAA0' : '4px solid transparent'
                                    }}
                                >
                                    <span>{item.name}</span>
                                    <i className={`fa-solid fa-chevron-right ${isActive ? 'text-info' : 'text-muted'}`} style={{ fontSize: '0.8rem', opacity: isActive ? 0.9 : 0.5 }}></i>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCategoryList;
