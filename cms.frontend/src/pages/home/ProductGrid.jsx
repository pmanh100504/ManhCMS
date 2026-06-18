import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import ProductCard from '../../components/ProductCard';

function ProductGrid({ activeCategoryId, activeCategoryName }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm thời trang:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Lọc sản phẩm theo CategoryProductId được chọn
    const filteredProducts = activeCategoryId
        ? products.filter(p => p.category?.categoryId === activeCategoryId)
        : products;

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary animate-spin" role="status"></div>
                <p className="mt-2 text-muted">Đang tải bộ sưu tập thời trang...</p>
            </div>
        );
    }

    return (
        <section id="product-grid-section" className="product-grid-wrapper my-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="font-weight-bold text-dark m-0 text-uppercase" style={{ letterSpacing: '0.5px' }}>
                        {activeCategoryName}
                    </h3>
                    <span className="badge badge-light border text-muted px-3 py-2">
                        Hiển thị: {filteredProducts.length} mẫu
                    </span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="alert alert-light text-center py-5 border" style={{ borderRadius: '12px' }}>
                        <i className="fa-solid fa-shirt-long-sleeve text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                        <p className="text-muted m-0 font-weight-bold">Không có sản phẩm nào thuộc danh mục này.</p>
                    </div>
                ) : (
                    <div className="row">
                        {filteredProducts.map((product) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                                <ProductCard item={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductGrid;
