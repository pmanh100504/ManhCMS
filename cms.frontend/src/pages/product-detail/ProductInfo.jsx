import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = "http://localhost:5288"; // Cổng backend thực tế của bạn

function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [showSizeModal, setShowSizeModal] = useState(false);
    const sizes = ['S', 'M', 'L', 'XL'];

    // Hàm bổ trợ: Định dạng số thô thành chuỗi tiền tệ VNĐ (450.000 ₫)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    // Hàm lấy URL ảnh đầy đủ
    const getFullImageUrl = (url) => {
        if (!url) return 'https://placehold.co/500x600?text=No+Image';
        if (url.startsWith('http')) return url;
        return IMAGE_BASE_URL + url;
    };

    const handleQuantityChange = (val) => {
        const newQty = quantity + val;
        if (newQty >= 1 && newQty <= (product.stockQuantity || 99)) {
            setQuantity(newQty);
        }
    };

    return (
        <>
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="card-body p-4 p-md-5">
                <div className="row">
                    
                    {/* Cột trái: Hình ảnh sản phẩm */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <div 
                            className="product-image-container overflow-hidden bg-light d-flex align-items-center justify-content-center"
                            style={{ 
                                borderRadius: '12px', 
                                border: '1px solid #e2e8f0',
                                minHeight: '400px',
                                maxHeight: '500px'
                            }}
                        >
                            <img 
                                src={getFullImageUrl(product.imageUrl)}
                                alt={product.name}
                                className="img-fluid w-100 h-100 object-fit-cover"
                                style={{ 
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    maxHeight: '480px'
                                }}
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/500x600?text=Fashion+Item';
                                }}
                            />
                        </div>
                    </div>

                    {/* Cột phải: Chi tiết thông tin */}
                    <div className="col-md-6 pl-md-4 d-flex flex-column justify-content-between">
                        <div>
                            {/* Danh mục sản phẩm */}
                            {product.category && (
                                <span 
                                    className="badge badge-pill text-uppercase font-weight-bold px-3 py-2 mb-3"
                                    style={{ backgroundColor: 'rgba(17, 202, 160, 0.15)', color: '#11CAA0', fontSize: '11px' }}
                                >
                                    {product.category.categoryName}
                                </span>
                            )}
                            
                            {/* Tên sản phẩm */}
                            <h2 className="font-weight-bold text-dark mb-3" style={{ fontSize: '28px', lineHeight: '1.2' }}>
                                {product.name}
                            </h2>

                            {/* Giá bán */}
                            <h3 className="text-danger font-weight-bold mb-4" style={{ fontSize: '24px' }}>
                                {formatCurrency(product.price)}
                            </h3>

                            <hr />

                            {/* Mô tả sản phẩm */}
                            <div className="product-description my-4">
                                <h6 className="font-weight-bold text-secondary text-uppercase mb-2" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                                    Mô tả sản phẩm
                                </h6>
                                <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                                    {product.description || "Sản phẩm thời trang cao cấp được thiết kế với chất liệu mềm mại, thoáng mát, phom dáng tôn dáng người mặc. Hoàn hảo cho các dịp đi làm công sở hoặc đi tiệc nhẹ nhàng."}
                                </p>
                            </div>

                            {/* Trạng thái tồn kho */}
                            <div className="stock-status mb-3 d-flex align-items-center">
                                <span className="mr-3 text-secondary font-weight-bold" style={{ fontSize: '14px' }}>Tình trạng:</span>
                                {product.stockQuantity > 0 ? (
                                    <span className="badge badge-success px-3 py-2" style={{ fontSize: '12px' }}>
                                        Còn hàng ({product.stockQuantity} sản phẩm)
                                    </span>
                                ) : (
                                    <span className="badge badge-danger px-3 py-2" style={{ fontSize: '12px' }}>
                                        Tạm thời hết hàng
                                    </span>
                                )}
                            </div>

                            {/* BỘ CHỌN SIZE & HƯỚNG DẪN CHỌN SIZE */}
                            <div className="size-selector-area mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-secondary font-weight-bold" style={{ fontSize: '14px' }}>
                                        Kích thước: <strong className="text-dark ml-1">{selectedSize}</strong>
                                    </span>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowSizeModal(true)}
                                        className="btn btn-link p-0 text-info font-weight-bold text-decoration-none small animate-pulse"
                                        style={{ fontSize: '13px', outline: 'none' }}
                                    >
                                        <i className="fa-solid fa-ruler-horizontal mr-1"></i> Hướng dẫn chọn size
                                    </button>
                                </div>
                                <div className="d-flex gap-2">
                                    {sizes.map((size) => {
                                        const isSelected = selectedSize === size;
                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className="btn mr-2"
                                                style={{
                                                    width: '42px',
                                                    height: '42px',
                                                    borderRadius: '8px',
                                                    border: isSelected ? '2px solid #11CAA0' : '1px solid #cbd5e1',
                                                    backgroundColor: isSelected ? 'rgba(17, 202, 160, 0.08)' : '#fff',
                                                    color: isSelected ? '#11CAA0' : '#475569',
                                                    fontWeight: isSelected ? '700' : '500',
                                                    fontSize: '14px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.2s',
                                                    boxShadow: isSelected ? '0 2px 8px rgba(17, 202, 160, 0.15)' : 'none',
                                                    outline: 'none'
                                                }}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Thao tác chọn số lượng và nút mua */}
                        <div className="action-area border-top pt-4 mt-3">
                            <div className="d-flex flex-wrap align-items-center mb-3">
                                <span className="mr-3 text-secondary font-weight-bold mb-2 mb-sm-0" style={{ fontSize: '14px' }}>Số lượng:</span>
                                
                                <div className="input-group mb-2 mb-sm-0" style={{ width: '130px' }}>
                                    <div className="input-group-prepend">
                                        <button 
                                            className="btn btn-outline-secondary px-3" 
                                            type="button" 
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={product.stockQuantity <= 0}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="form-control text-center bg-white" 
                                        value={quantity} 
                                        readOnly 
                                        style={{ borderLeft: 'none', borderRight: 'none' }}
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary px-3" 
                                            type="button" 
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={product.stockQuantity <= 0}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                <button 
                                    className="btn btn-lg text-white font-weight-bold px-4 py-3 mr-2 mb-2 flex-grow-1"
                                    style={{ 
                                        backgroundColor: '#11CAA0', 
                                        borderColor: '#11CAA0',
                                        borderRadius: '8px',
                                        fontSize: '15px'
                                    }}
                                    onClick={() => alert(`Đã thêm ${quantity} sản phẩm [${product.name}] (Size: ${selectedSize}) vào giỏ hàng!`)}
                                    disabled={product.stockQuantity <= 0}
                                >
                                    <i className="fas fa-cart-plus mr-2"></i> THÊM VÀO GIỎ
                                </button>
                                
                                <Link 
                                    to="/cart" 
                                    className={`btn btn-lg btn-dark font-weight-bold px-4 py-3 mb-2 flex-grow-1 ${product.stockQuantity <= 0 ? 'disabled' : ''}`}
                                    style={{ 
                                        borderRadius: '8px',
                                        fontSize: '15px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => {
                                        if (product.stockQuantity > 0) {
                                            alert(`Chuyển đến giỏ hàng để hoàn tất mua sản phẩm [${product.name}] (Size: ${selectedSize})!`);
                                        }
                                    }}
                                >
                                    MUA NGAY
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

            {/* BẢNG HƯỚNG DẪN CHỌN SIZE MODAL */}
            {showSizeModal && (
                <div 
                    className="modal fade show d-block animate-fade-in" 
                    tabIndex="-1" 
                    role="dialog" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1050 }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content border-0 shadow" style={{ borderRadius: '16px' }}>
                            <div className="modal-header border-bottom-0 pt-4 px-4 pb-2">
                                <h5 className="modal-title font-weight-bold text-dark text-uppercase d-flex align-items-center">
                                    <i className="fa-solid fa-ruler-horizontal text-info mr-2" style={{ fontSize: '1.2rem' }}></i> Bảng Hướng Dẫn Chọn Size Thiết Kế
                                </h5>
                                <button 
                                    type="button" 
                                    className="close" 
                                    onClick={() => setShowSizeModal(false)}
                                    style={{ fontSize: '1.5rem', outline: 'none', border: 'none', background: 'transparent' }}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-4">
                                <p className="text-muted small mb-4">
                                    * Số đo dưới đây là số đo chuẩn của cơ thể người mặc. Tùy thuộc vào phom dáng của từng mẫu thiết kế (dáng ôm, dáng suông, dáng rộng), sản phẩm thực tế sẽ có sự chênh lệch phù hợp.
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-bordered text-center mb-0" style={{ fontSize: '14px' }}>
                                        <thead style={{ backgroundColor: '#f8fafc' }}>
                                            <tr className="font-weight-bold text-dark">
                                                <th>Size</th>
                                                <th>Chiều cao (cm)</th>
                                                <th>Cân nặng (kg)</th>
                                                <th>Vòng ngực (cm)</th>
                                                <th>Vòng eo (cm)</th>
                                                <th>Vòng mông (cm)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="font-weight-bold text-info">S</td>
                                                <td>150 - 156</td>
                                                <td>40 - 47</td>
                                                <td>82 - 86</td>
                                                <td>64 - 68</td>
                                                <td>88 - 92</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold text-info">M</td>
                                                <td>156 - 160</td>
                                                <td>48 - 54</td>
                                                <td>86 - 90</td>
                                                <td>68 - 72</td>
                                                <td>92 - 96</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold text-info">L</td>
                                                <td>160 - 164</td>
                                                <td>55 - 60</td>
                                                <td>90 - 94</td>
                                                <td>72 - 76</td>
                                                <td>96 - 100</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold text-info">XL</td>
                                                <td>165 - 170</td>
                                                <td>60 - 65</td>
                                                <td>94 - 98</td>
                                                <td>76 - 80</td>
                                                <td>100 - 104</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 p-3 bg-light rounded text-muted small">
                                    <strong>Mẹo nhỏ:</strong> Nếu số đo của bạn nằm giữa 2 size, hãy ưu tiên chọn size lớn hơn đối với đầm dạ hội/đầm ôm body, hoặc liên hệ trực tiếp với hotline chăm sóc khách hàng của ManhCMS để được hỗ trợ tốt nhất!
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 pt-0 px-4 pb-4">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary px-4 font-weight-bold" 
                                    onClick={() => setShowSizeModal(false)}
                                    style={{ borderRadius: '8px' }}
                                >
                                    ĐÓNG
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductInfo;
