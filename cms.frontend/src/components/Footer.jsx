import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-5 border-top border-secondary">
            <div className="container">
                <div className="row">
                    
                    {/* Cột 1: Thông tin thương hiệu */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase font-weight-bold mb-4" style={{ color: '#11CAA0' }}>
                            ManhCMS.Fashion
                        </h5>
                        <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            Trang mua sắm thời trang công sở & dạ hội thiết kế độc quyền. Mang đến phong cách tinh tế, hiện đại cho mọi khách hàng.
                        </p>
                        <div className="d-flex mt-3">
                            <a href="#" className="btn btn-outline-light btn-sm mr-2 rounded-circle" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm mr-2 rounded-circle" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm mr-2 rounded-circle" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fab fa-tiktok"></i>
                            </a>
                        </div>
                    </div>

                    {/* Cột 2: Điều hướng nhanh */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase font-weight-bold mb-4" style={{ fontSize: '16px' }}>
                            Liên Kết Nhanh
                        </h5>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '14px' }}>
                            <li className="mb-2">
                                <Link to="/" className="text-muted text-decoration-none text-hover-light transition-all">Trang Chủ</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/shop" className="text-muted text-decoration-none text-hover-light transition-all">Cửa Hàng</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/blog" className="text-muted text-decoration-none text-hover-light transition-all">Tin Tức / Blog</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-muted text-decoration-none text-hover-light transition-all">Về Chúng Tôi</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách */}
                    <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase font-weight-bold mb-4" style={{ fontSize: '16px' }}>
                            Chính Sách
                        </h5>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '14px' }}>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none text-hover-light">Chính sách bảo mật</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none text-hover-light">Chính sách đổi trả</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none text-hover-light">Hướng dẫn chọn size</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none text-hover-light">Điều khoản dịch vụ</a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 4: Thông tin liên hệ */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase font-weight-bold mb-4" style={{ fontSize: '16px' }}>
                            Liên Hệ
                        </h5>
                        <ul className="list-unstyled mb-0 text-muted" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                            <li className="mb-2 d-flex align-items-start">
                                <i className="fas fa-map-marker-alt mt-1 mr-2" style={{ color: '#11CAA0' }}></i>
                                <span>123 Đường Ba Tháng Hai, Quận 10, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="fas fa-phone-alt mr-2" style={{ color: '#11CAA0' }}></i>
                                <span>090x.xxx.xxx</span>
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="fas fa-envelope mr-2" style={{ color: '#11CAA0' }}></i>
                                <span>support@thaicms.retail</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <hr className="my-4 border-secondary" />

                {/* Dòng bản quyền */}
                <div className="row align-items-center" style={{ fontSize: '13px' }}>
                    <div className="col-md-6 text-center text-md-left text-muted">
                        <p className="mb-0">© 2026 ManhCMS.Fashion. Tất cả quyền được bảo lưu.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-right text-muted mt-2 mt-md-0">
                        <p className="mb-0">Sinh viên: Phạm Văn Mạnh | MSSV: 2122110255 | Lớp: CCQ2211G</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
