import React, { useState } from 'react';
import invoiceService from '../../services/invoiceService';
import { HiOutlineDocumentText } from 'react-icons/hi';

const InvoiceForm = ({ fetchInvoices }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('unpaid');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoice = {
      invoiceNumber,
      customerName,
      amount,
      dueDate,
      status,
    };

    try {
      await invoiceService.createInvoice(invoice);
      fetchInvoices();
      setInvoiceNumber('');
      setCustomerName('');
      setAmount('');
      setDueDate('');
      setStatus('unpaid');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Create Invoic</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative">
            <label htmlFor="invoiceNumber" className="absolute top-2 left-4 text-sm font-medium text-gray-500 transition-transform transform -translate-y-4 scale-75 origin-top-left">Invoice Number</label>
            <input
              type="text"
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="mt-6 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
              placeholder=" "
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="customerName" className="absolute top-2 left-4 text-sm font-medium text-gray-500 transition-transform transform -translate-y-4 scale-75 origin-top-left">Customer Name</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-6 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
              placeholder=" "
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="amount" className="absolute top-2 left-4 text-sm font-medium text-gray-500 transition-transform transform -translate-y-4 scale-75 origin-top-left">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-6 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
              placeholder=" "
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="dueDate" className="absolute top-2 left-4 text-sm font-medium text-gray-500 transition-transform transform -translate-y-4 scale-75 origin-top-left">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-6 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
              placeholder=" "
              required
            />
          </div>
          <div className="relative md:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center"
        >
          <HiOutlineDocumentText className="mr-2 text-lg" />
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
