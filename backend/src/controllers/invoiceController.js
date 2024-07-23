const Invoice = require('../models/Invoice');
const pdfkit = require('pdfkit');

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createInvoice = async (req, res) => {
  const { invoiceNumber, customerName, amount, dueDate, status } = req.body;

  try {
    const invoice = new Invoice({
      invoiceNumber,
      customerName,
      amount,
      dueDate,
      status,
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateInvoice = async (req, res) => {
  const { invoiceNumber, customerName, amount, dueDate, status } = req.body;

  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    invoice.invoiceNumber = invoiceNumber;
    invoice.customerName = customerName;
    invoice.amount = amount;
    invoice.dueDate = dueDate;
    invoice.status = status;

    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    await invoice.remove();
    res.json({ msg: 'Invoice removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    const doc = new pdfkit({ size: 'A4', margin: 50 });

    // Add Company Header
    doc.fontSize(18).text('Vikas Industries', { align: 'center' });
    doc.fontSize(12).text('G-48, Noida Sector 62, 228151', { align: 'center' });
    doc.fontSize(12).text('Phone: 9565153545', { align: 'center' });
    doc.fontSize(12).text('Email: vikas.contact@gmail.com', { align: 'center' });
    doc.moveDown(3); // Add extra space

    // Invoice Title
    doc.fontSize(16).text('Invoice', { align: 'center' });
    doc.moveDown(1);

    // Invoice Details
    const invoiceDate = new Date(invoice.createdAt).toLocaleDateString(); // Invoice creation date
    const currentDate = new Date().toLocaleDateString(); // Current date

    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Date: ${currentDate}`);
    doc.moveDown(2); // Add space between sections

    // Customer Information
    doc.fontSize(14).text('Bill To:', { underline: true });
    doc.fontSize(12).text(`Customer Name: ${invoice.customerName}`);
    doc.text(`Address: ${invoice.customerAddress || 'N/A'}`);
    doc.text(`Phone: ${invoice.customerPhone || 'N/A'}`);
    doc.text(`Email: ${invoice.customerEmail || 'N/A'}`);
    doc.moveDown(2); // Add space before itemized list

    // Itemized List
    doc.fontSize(14).text('Items:', { underline: true });
    doc.moveDown(1);

    // Define Table Header
    const itemWidth = 320;
    const amountWidth = 100;

    doc.fontSize(12).text('Description', { continued: true, width: itemWidth })
      .text('Amount', { align: 'right', width: amountWidth });
    doc.moveDown(1); // Add space after table header

    // Table Rows
    const items = Array.isArray(invoice.items) ? invoice.items : [];
    if (items.length > 0) {
      items.forEach(item => {
        doc.text(item.description || 'No Description', { continued: true, width: itemWidth })
          .text(`$${item.amount ? item.amount.toFixed(2) : '0.00'}`, { align: 'right', width: amountWidth });
        doc.moveDown(0.5); // Add space between rows
      });
    } else {
      doc.text('No items available', { align: 'center' });
    }
    doc.moveDown(2); // Add space before total amount

    // Total Amount
    const totalAmount = items.reduce((total, item) => total + (item.amount || 0), 0);
    doc.fontSize(14).text(`Total Amount: $${totalAmount.toFixed(2)}`, { align: 'right' });
    doc.moveDown(2); // Add space before footer

    // Footer
    doc.fontSize(12).text('Thank you for your business!', { align: 'center' });
    doc.text('Please make payment within 30 days.', { align: 'center' });

    // Set the headers
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice._id}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF document directly to the response
    doc.pipe(res);
    doc.end(); // Close the PDF document
  } catch (err) {
    console.error('Error generating PDF:', err); // Log detailed error message
    res.status(500).json({ msg: 'Server error while generating PDF' });
  }
};
