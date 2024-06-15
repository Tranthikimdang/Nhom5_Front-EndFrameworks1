const { Products } = require('../models');

exports.getProductsByCategory = async (req, res) => {
    try {
        const { cateId } = req.params;
        
        // Kiểm tra xem cateId có hợp lệ không, ví dụ kiểm tra xem nó có phải là một số không
        if (isNaN(cateId)) {
            return res.status(400).json({ status: 'error', message: 'cateId must be a valid number' });
        }

        // Lấy dữ liệu từ cơ sở dữ liệu
        const products = await Products.findAll({ where: { cateID: cateId } });
        // Kiểm tra xem có sản phẩm nào được trả về không
        if (!products || products.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No products found for this category' });
        }

        // Trả về dữ liệu thành công nếu mọi thứ ổn
        return res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (err) {
        // Xử lý bất kỳ lỗi nào xảy ra trong quá trình xử lý yêu cầu
        console.error('Error fetching products by category:', err);
        return res.status(500).json({ status: 'error', message: 'Some error occurred while retrieving products by category.' });
    }
};