import React, { useEffect, useState } from 'react';
import invoiceService from '../../services/invoiceService';
import Charts from './Charts';
import { FaDollarSign, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await invoiceService.getInvoices();
      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;
  const unpaidInvoices = invoices.filter(invoice => invoice.status === 'unpaid').length;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center">Dashboard</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">Total Invoices</h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalInvoices}</p>
          </div>
          <FaDollarSign className="text-gray-600 text-4xl sm:text-5xl md:text-6xl animate-pulse" />
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 sm:p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">Paid Invoices</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-800">{paidInvoices}</p>
          </div>
          <FaCheckCircle className="text-green-600 text-4xl sm:text-5xl md:text-6xl animate-pulse" />
        </div>
        <div className="bg-gradient-to-r from-red-100 to-red-200 p-4 sm:p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">Unpaid Invoices</h3>
            <p className="text-2xl sm:text-3xl font-bold text-red-800">{unpaidInvoices}</p>
          </div>
          <FaExclamationCircle className="text-red-600 text-4xl sm:text-5xl md:text-6xl animate-pulse" />
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl mt-6 sm:mt-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Invoice Statistics</h3>
        <Charts invoices={invoices} />
      </div>
    </div>
  );
};

export default Dashboard;
