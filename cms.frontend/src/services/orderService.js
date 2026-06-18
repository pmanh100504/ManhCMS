import axiosClient from '../api/axiosClient';

const orderService = {
    /**
     * Hàm POST dữ liệu tạo Đơn hàng và các dòng Chi tiết đơn hàng xuống Backend C#
     * Kết nối tới OrdersController
     */
    createOrder: (orderData) => {
        const url = '/Orders';
        return axiosClient.post(url, orderData);
    }
};

export default orderService;
