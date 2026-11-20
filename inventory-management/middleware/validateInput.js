const mongoose = require('mongoose');


const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    return next(new Error(`Invalid product ID format: ${req.params.id}`));
  }
  next();
};


const validateProductInput = (req, res, next) => {
  const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body;
  const isCreate = req.method === 'POST';

  if (isCreate) {
    if (!name || !sku || !category || price === undefined || quantity === undefined || !supplier) {
      res.status(400);
      return next(new Error('Missing required fields: name, sku, category, price, quantity, and supplier are required'));
    }
  }

  if (price !== undefined && (typeof price !== 'number' || Number.isNaN(price) || price < 0)) {
    res.status(400);
    return next(new Error('Price must be a non-negative number'));
  }

  if (quantity !== undefined && (typeof quantity !== 'number' || Number.isNaN(quantity) || quantity < 0)) {
    res.status(400);
    return next(new Error('Quantity must be a non-negative number'));
  }

  if (reorderLevel !== undefined && (typeof reorderLevel !== 'number' || Number.isNaN(reorderLevel) || reorderLevel < 0)) {
    res.status(400);
    return next(new Error('Reorder level must be a non-negative number'));
  }

  next();
};


const validateStockInput = (req, res, next) => {
  const { change } = req.body;

  if (change === undefined || typeof change !== 'number' || Number.isNaN(change) || change === 0) {
    res.status(400);
    return next(new Error('Provide a valid non-zero numeric "change" value (e.g., 10 or -5)'));
  }

  next();
};

module.exports = {
  validateObjectId,
  validateProductInput,
  validateStockInput
};