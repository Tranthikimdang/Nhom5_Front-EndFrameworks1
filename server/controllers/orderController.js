const { Order } = require('../models');

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        console.log(orders);
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Some error occurred while retrieving orders.'
        });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const {client, quantity, date, valueOrder, payment} = req.body;
        console.log(req.body);
        const newOrder = await Order.create({client, quantity, date, valueOrder, payment});
        res.status(201).json({
            status: 'success',
            data: {
                order: newOrder
            }
        });
    } catch (err) {
        console.error("Error creating order", err);
        res.status(500).json({
            status: 'error',
            message: err.message || 'Some error occurred while creating the order.'
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params; 
        const {client, quantity, date, valueOrder, payment} = req.body;
        console.log(id);
  
        const order = await Order.findByPk(id);
  
        if (!order) {
            return res.status(404).json({ 
                status: "error", 
                message: "Không tìm thấy order" 
            });
        }
  
        order.client = client;
        order.quantity = quantity;
        order.date = date;
        order.valueOrder = valueOrder;
        order.payment = payment;
  
        await order.save();
  
        res.status(200).json({ 
            status: "success", 
            data: { 
                orders
            }
        });
    } catch (err) {
        console.error("Lỗi khi cập nhật comment:", err);
        res.status(500).json({ 
            status: "error", 
            message: "Lỗi máy chủ nội bộ" 
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
      
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ 
                status: "error", 
                message: "Không tìm thấy order" 
            });
        }
        await order.destroy();
        res.status(200).json({ status: "success", message: "Xóa thành công" });
    } catch (err) {
      console.error("Lỗi khi xóa order:", err);
      res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
    }
  };