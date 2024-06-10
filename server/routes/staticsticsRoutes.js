const express = require('express');
const router = express.Router();

// router.get('/products/category/:cateID', productController.getProductsByCategory);
// router.get('/', async (req, res) => {
//     const { cateID } = req.query;
  
//     if (!cateID) {
//       return res.status(400).json({ error: 'cateID is required' });
//     }
  
//     try {
//       const products = await Product.findAll({ where: { cateID } });
//       if (products.length === 0) {
//         return res.status(404).json({ error: 'No products found for this category' });
//       }
//       res.json({ status: 'success', data: products });
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       res.status(500).json({ error: 'An error occurred while fetching products' });
//     }
//   });

module.exports = router;