import axiosClient from '../api/axiosClient';

const productService = {
    /**
     * Hàm gọi API lấy toàn bộ danh sách quần áo, váy dạ hội
     * Endpoint này kết nối tới ProductsController trong ASP.NET Core
     */
    getAllProducts: () => {
        const url = '/Products';
        return axiosClient.get(url);
    },

    /**
     * Hàm lấy chi tiết 1 sản phẩm theo ID
     */
    getProductById: (id) => {
        const url = `/Products/${id}`;
        return axiosClient.get(url);
    }
};

export default productService;
