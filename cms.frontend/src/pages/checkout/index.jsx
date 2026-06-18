import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Checkout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-5 flex-grow-1">
                <div className="text-center py-5">
                    <i className="fas fa-credit-card text-muted mb-4" style={{ fontSize: '4rem' }}></i>
                    <h2 className="fw-bold text-secondary">Thông Tin Thanh Toán</h2>
                    <p className="text-muted">Tính năng thanh toán đang được tích hợp.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;
