const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  getLowStockReport,
  getCategorySummary
} = require('../controllers/productController');
const {
  validateObjectId,
  validateProductInput,
  validateStockInput
} = require('../middleware/validateInput');


router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

router.route('/')
  .get(getProducts)
  .post(validateProductInput, createProduct);

router.route('/:id')
  .get(validateObjectId, getProductById)
  .put(validateObjectId, validateProductInput, updateProduct)
  .delete(validateObjectId, deleteProduct);


router.patch('/:id/stock', validateObjectId, validateStockInput, adjustStock);

module.exports = router;