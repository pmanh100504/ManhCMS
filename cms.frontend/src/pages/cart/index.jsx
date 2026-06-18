import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Cart() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-5 flex-grow-1">
                <div className="text-center py-5">
                    <i className="fas fa-shopping-cart text-muted mb-4" style={{ fontSize: '4rem' }}></i>
                    <h2 className="fw-bold text-secondary">Giỏ Hàng Cá Nhân</h2>
                    <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
