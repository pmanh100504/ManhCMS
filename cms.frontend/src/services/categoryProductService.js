import axiosClient from '../api/axiosClient';

const categoryProductService = {
    /**
     * Hàm lấy toàn bộ danh mục SẢN PHẨM từ Backend
     * Endpoint này kết nối tới CategoriesProductsController trong ASP.NET Core
     */
    getAllCategoryProducts: () => {
        const url = '/CategoriesProducts';
        return axiosClient.get(url);
    }
};

export default categoryProductService;
