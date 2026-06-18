import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner() {
    return (
        <section className="hero-banner-section my-4">
            <div className="container">
                <div 
                    className="hero-banner-card overflow-hidden shadow-lg position-relative d-flex align-items-center"
                    style={{
                        minHeight: '400px',
                        background: 'linear-gradient(135deg, #09385c 0%, #005088 50%, #002c4d 100%)',
                        borderRadius: '20px',
                        color: '#fff'
                    }}
                >
                    {/* Họa tiết trang trí phát sáng phía sau */}
                    <div 
                        className="position-absolute" 
                        style={{
                            width: '300px',
                            height: '300px',
                            background: 'rgba(17, 202, 160, 0.15)',
                            borderRadius: '50%',
                            filter: 'blur(80px)',
                            top: '-50px',
                            right: '-50px'
                        }}
                    ></div>
                    <div 
                        className="position-absolute" 
                        style={{
                            width: '200px',
                            height: '200px',
                            background: 'rgba(0, 80, 136, 0.3)',
                            borderRadius: '50%',
                            filter: 'blur(50px)',
                            bottom: '-50px',
                            left: '-50px'
                        }}
                    ></div>

                    <div className="row w-100 align-items-center px-4 py-5 z-index-1">
                        {/* Cột 1: Thông tin chữ */}
                        <div className="col-lg-6 col-md-7 text-left pl-md-5">
                            <span 
                                className="badge text-uppercase font-weight-bold px-3 py-2 mb-3 shadow-sm"
                                style={{
                                    backgroundColor: '#11CAA0',
                                    color: '#002c4d',
                                    borderRadius: '30px',
                                    fontSize: '12px',
                                    letterSpacing: '1.5px'
                                }}
                            >
                                Muốn Còn Nhạy
                            </span>
                            <h1 className="display-4 font-weight-bold mb-2 text-white" style={{ letterSpacing: '1px', lineHeight: '1.1' }}>
                                FASHION PRODUCT
                            </h1>
                            <p className="lead font-weight-normal mb-4" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem' }}>
                                Thỏa mãn phong cách <strong style={{ color: '#11CAA0' }}>CỰC CHẤT</strong> 2026
                            </p>
                            <Link 
                                to="/shop" 
                                className="btn btn-lg text-white font-weight-bold px-5 py-3 shadow-lg btn-cta-hover"
                                style={{
                                    backgroundColor: '#11CAA0',
                                    borderColor: '#11CAA0',
                                    borderRadius: '30px',
                                    fontSize: '16px',
                                    letterSpacing: '1px',
                                    transition: 'all 0.3s'
                                }}
                            >
                                MUA NGAY NOW
                            </Link>
                        </div>

                        {/* Cột 2: Hình ảnh sản phẩm trực quan */}
                        <div className="col-lg-6 col-md-5 d-none d-md-block text-center position-relative">
                            <img 
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
                                alt="Fashion Show"
                                className="img-fluid rounded-lg shadow-2xl"
                                style={{
                                    maxHeight: '340px',
                                    objectFit: 'cover',
                                    borderRadius: '15px',
                                    transform: 'rotate(2deg) scale(1.02)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                    border: '4px solid rgba(255,255,255,0.1)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;
