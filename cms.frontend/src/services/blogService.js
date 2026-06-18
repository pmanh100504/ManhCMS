import axiosClient from '../api/axiosClient';

const blogService = {
    /**
     * Hàm gọi API lấy toàn bộ danh sách bài viết tin tức
     */
    getAllPosts: () => {
        const url = '/Posts';
        return axiosClient.get(url);
    },

    /**
     * Hàm lấy chi tiết 1 bài viết theo ID
     */
    getPostById: (id) => {
        const url = `/Posts/${id}`;
        return axiosClient.get(url);
    },

    /**
     * Hàm lấy danh sách Chuyên mục tin tức (Category)
     */
    getBlogCategories: () => {
        const url = '/Categories';
        return axiosClient.get(url);
    }
};

export default blogService;
