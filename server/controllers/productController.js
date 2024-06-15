const { Products } = require('../models');

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message || 'Some error occurred while retrieving products.'
        });
    }

};

exports.createProduct = async (req, res) => {
    try {
        const { productType, productName, price, expiryDate, quantity } = req.body;
        console.log(req.body);
        const newProduct = await Products.create({
            productType, productName, price, expiryDate, quantity
        });
        console.log(newProduct);
        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: 'error',
            message: err.message || 'Some error occurred while creating the product.'
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productType, productName, price, expiryDate, quantity } = req.body;

        console.log(id);

        const product = await Products.findByPk(id);

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Không tìm thấy sản phẩm"
            });
        }
        product.productType = productType;
        product.productName = productName;
        product.price = price;
        product.expiryDate = expiryDate;
        product.quantity = quantity;

        await product.save();
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        console.error("lỗi khi cập nhâtj sản phẩm", err);
        res.status(500).send({
            status: 'error',
            message: err.message || 'Some error occurred while updating the product.'
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Không tìm thấy sản phẩm"
            });
        }
        await product.destroy();
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        console.error("lỗi khi xóa sản phẩm", err);
        res.status(500).send({
            status: 'error',
            message: err.message || 'Some error occurred while deleting the product.'
        });
    }
}
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