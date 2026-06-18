import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductInfo from './ProductInfo';
import productService from '../../services/productService';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Lỗi khi tải chi tiết sản phẩm:", err);
                setError("Không thể tải thông tin sản phẩm. Sản phẩm có thể không tồn tại hoặc đã bị xóa.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* TẦNG 1: Header */}
            <Header />

            {/* Thân trang chi tiết */}
            <main className="flex-grow-1 container my-5">
                
                {/* Thanh Breadcrumb điều hướng nhỏ */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb bg-transparent p-0 mb-0">
                        <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/shop" className="text-secondary text-decoration-none">Sản phẩm</Link></li>
                        <li className="breadcrumb-item active text-dark font-weight-bold" aria-current="page">Chi tiết</li>
                    </ol>
                </nav>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-info animate-spin" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                        <p className="mt-3 text-muted">Đang kết nối API lấy chi tiết sản phẩm...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-warning text-center py-5 border shadow-sm" style={{ borderRadius: '12px' }}>
                        <i className="fa-solid fa-triangle-exclamation text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                        <h4 className="font-weight-bold text-dark mb-2">Đã xảy ra lỗi!</h4>
                        <p className="text-muted mb-4">{error}</p>
                        <Link to="/" className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#005088', borderColor: '#005088', borderRadius: '20px' }}>
                            Quay lại trang chủ
                        </Link>
                    </div>
                ) : product ? (
                    <ProductInfo product={product} />
                ) : null}

            </main>

            {/* TẦNG 6: Footer */}
            <Footer />
        </div>
    );
}

export default ProductDetail;
