const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'unpaid' },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
