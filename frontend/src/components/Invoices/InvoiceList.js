import React, { useEffect, useState } from 'react';
import invoiceService from '../../services/invoiceService';
import Modal from 'react-modal';
import { HiDownload, HiPencil, HiTrash } from 'react-icons/hi';
import '../Invoices/modal.css'; // Ensure this file contains necessary styles

// Configure modal to be attached to the root element of your app
Modal.setAppElement('#root');

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInvoices = async () => {
    try {
      const data = await invoiceService.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDownload = async (invoiceId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Authentication token is missing. Please log in again.');
      return;
    }
    
    try {
      // Construct the full URL for the request
      const url = `https://invoice-management-7vxz.onrender.com/api/invoices/${invoiceId}/pdf`;
      // Perform the fetch request with correct headers
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle the response to create and click a download link
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert(`Failed to download PDF: ${error.message}`);
    }
  };  
  
  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDelete = async (invoiceId) => {
    const API_URL = `https://invoice-management-7vxz.onrender.com/api/invoices/${invoiceId}`;
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Authentication token is missing. Please log in again.');
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Remove the deleted invoice from the list
      setInvoices(invoices.filter(invoice => invoice._id !== invoiceId));
      alert('Invoice deleted successfully!');
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert(`Failed to delete invoice: ${error.message}`);
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

 // Example implementation in invoiceService.js
const handleUpdate = async (invoiceId, invoiceData) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token is missing.');
  }
  
  const response = await fetch(`https://invoice-management-7vxz.onrender.com/api/invoices/${invoiceId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(invoiceData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};


  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Invoice Number</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map(invoice => (
              <tr key={invoice._id} className="hover:bg-gray-50 transition-colors duration-300">
                <td className="p-4 text-sm text-gray-900">{invoice.invoiceNumber}</td>
                <td className="p-4 text-sm text-gray-900">{invoice.customerName}</td>
                <td className="p-4 text-sm text-gray-900">${invoice.amount.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td className="p-4 text-sm text-gray-900">{invoice.status}</td>
                <td className="p-4 text-sm flex space-x-4">
                  <button 
                    onClick={() => handleDownload(invoice._id)} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <HiDownload className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleEdit(invoice)}
                    className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                  >
                    <HiPencil className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <HiTrash className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          className="modal max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Invoice</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Invoice Number</label>
              <input
                type="text"
                value={selectedInvoice.invoiceNumber}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, invoiceNumber: e.target.value })}
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Customer Name</label>
              <input
                type="text"
                value={selectedInvoice.customerName}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, customerName: e.target.value })}
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Amount</label>
              <input
                type="number"
                value={selectedInvoice.amount}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, amount: parseFloat(e.target.value) })}
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Due Date</label>
              <input
                type="date"
                value={selectedInvoice.dueDate.split('T')[0]} // Adjust format
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, dueDate: e.target.value })}
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">Status</label>
              <input
                type="text"
                value={selectedInvoice.status}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, status: e.target.value })}
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;
