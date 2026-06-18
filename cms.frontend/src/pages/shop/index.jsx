import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Shop() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-5 flex-grow-1">
                <div className="text-center py-5">
                    <i className="fas fa-store text-muted mb-4" style={{ fontSize: '4rem' }}></i>
                    <h2 className="fw-bold text-secondary">Trang Cửa Hàng</h2>
                    <p className="text-muted">Đang phát triển các chức năng lọc và tìm kiếm nâng cao...</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Shop;
