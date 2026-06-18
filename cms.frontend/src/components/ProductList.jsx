import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getImageUrl = (url) => {
        if (!url) return 'https://placehold.co/300x400?text=No+Image';
        if (url.startsWith('http')) return url;
        return `http://localhost:5288${url}`;
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Đang tải danh sách sản phẩm thời trang...</p>
            </div>
        );
    }

    return (
        <div className="row">
            {products.length === 0 ? (
                <div className="col-12">
                    <div className="alert alert-light border text-center p-4">
                        <p className="text-muted m-0">Chưa có sản phẩm nào trong hệ thống.</p>
                    </div>
                </div>
            ) : (
                products.map((item) => {
                    const stock = item.stockQuantity !== undefined ? item.stockQuantity : (item.stock || 0);
                    return (
                        <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                            <div className="card h-100 shadow-sm border rounded-lg overflow-hidden transition-all hover-shadow">
                                <div style={{ height: '260px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                    <img 
                                        src={getImageUrl(item.imageUrl)} 
                                        alt={item.name} 
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/300x400?text=Fashion+Item';
                                        }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column justify-content-between p-3">
                                    <div>
                                        <h6 className="card-title font-weight-bold text-dark text-truncate mb-1">{item.name}</h6>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-danger font-weight-bold" style={{ fontSize: '1.05rem' }}>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                            </span>
                                            {item.category && (
                                                <span className="badge badge-light text-muted border px-2 py-1" style={{ fontSize: '0.75rem' }}>
                                                    {item.category.categoryName}
                                                </span>
                                            )}
                                        </div>
                                        <p className="card-text text-muted small text-truncate-2 mb-3">
                                            {item.description || 'Sản phẩm thời trang cao cấp mang phong cách hiện đại.'}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center border-top pt-2">
                                        <span className="small text-muted">Tồn kho: <strong className="text-dark">{stock}</strong> sản phẩm</span>
                                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                                            <i className="fa-solid fa-cart-plus mr-1"></i> Mua ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ProductList;
