const express = require('express');
const router = express.Router();
const {
  getInvoices,
  createInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  generateInvoicePDF,
} = require('../controllers/invoiceController');
const { auth } = require('../middleware/authMiddleware');

router.route('/')
  .get(auth, getInvoices)
  .post(auth, createInvoice);

router.route('/:id')
  .get(auth, getInvoice)
  .put(auth, updateInvoice)
  .delete(auth, deleteInvoice);

router.route('/:id/pdf')
  .get(auth, generateInvoicePDF);

module.exports = router;
