import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

function CategoryMenu({ activeCategoryId, onCategoryClick }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryProductService.getAllCategoryProducts();
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi kéo danh mục sản phẩm từ Backend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuCategories();
    }, []);

    // Hàm trả về icon FontAwesome phù hợp với danh mục
    const getCategoryIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('dạ hội') || lowerName.includes('đầm')) return 'fa-solid fa-gem';
        if (lowerName.includes('công sở') || lowerName.includes('áo sơ mi')) return 'fa-solid fa-briefcase';
        if (lowerName.includes('vest') || lowerName.includes('comple')) return 'fa-solid fa-user-tie';
        if (lowerName.includes('biển') || lowerName.includes('tắm')) return 'fa-solid fa-umbrella-beach';
        if (lowerName.includes('thể thao') || lowerName.includes('gym')) return 'fa-solid fa-circle-play';
        if (lowerName.includes('sức khỏe')) return 'fa-solid fa-heart-pulse';
        return 'fa-solid fa-tags';
    };

    if (loading) {
        return (
            <div className="container my-3 text-center">
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp menu phân loại...</span>
            </div>
        );
    }

    return (
        <section id="category-menu-section" className="category-menu-wrapper my-4">
            <div className="container">
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-4 bg-white">
                        
                        {/* Thanh menu ngang dạng các ô tròn */}
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            
                            {/* Nút Xem Tất Cả */}
                            <div className="text-center mx-3 my-2" style={{ width: '90px' }}>
                                <button
                                    onClick={() => onCategoryClick(null, 'BỘ SƯU TẬP MỚI NHẤT')}
                                    className="btn d-flex align-items-center justify-content-center mx-auto mb-2"
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        backgroundColor: activeCategoryId === null ? '#005088' : '#f8f9fa',
                                        color: activeCategoryId === null ? '#fff' : '#495057',
                                        border: 'none',
                                        transition: 'all 0.3s',
                                        boxShadow: activeCategoryId === null ? '0 4px 10px rgba(0, 80, 136, 0.3)' : 'none'
                                    }}
                                >
                                    <i className="fa-solid fa-grid-2x2" style={{ fontSize: '20px' }}><i className="fa-solid fa-border-all"></i></i>
                                </button>
                                <span className="small font-weight-bold text-secondary text-uppercase d-block" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                                    Tất cả
                                </span>
                            </div>

                            {/* Vòng lặp các danh mục kéo từ API */}
                            {categories.map((cat) => {
                                const isSelected = activeCategoryId === cat.id;
                                return (
                                    <div className="text-center mx-2 my-2" style={{ width: '110px' }} key={cat.id}>
                                        <button
                                            onClick={() => onCategoryClick(cat.id, cat.name)}
                                            className="btn d-flex align-items-center justify-content-center mx-auto mb-2"
                                            style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '50%',
                                                backgroundColor: isSelected ? '#11CAA0' : '#f8f9fa',
                                                color: isSelected ? '#fff' : '#495057',
                                                border: 'none',
                                                transition: 'all 0.3s',
                                                boxShadow: isSelected ? '0 4px 10px rgba(17, 202, 160, 0.3)' : 'none'
                                            }}
                                        >
                                            <i className={getCategoryIcon(cat.name)} style={{ fontSize: '20px' }}></i>
                                        </button>
                                        <span 
                                            className="small font-weight-bold text-secondary text-uppercase d-block" 
                                            style={{ 
                                                fontSize: '11px', 
                                                letterSpacing: '0.5px',
                                                lineHeight: '1.3',
                                                minHeight: '30px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }} 
                                            title={cat.name}
                                        >
                                            {cat.name}
                                        </span>
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryMenu;
