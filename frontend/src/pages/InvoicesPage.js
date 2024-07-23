import React from 'react';
import InvoiceForm from '../components/Invoices/InvoiceForm';
import InvoiceList from '../components/Invoices/InvoiceList';

const InvoicesPage = () => {
  return (
    <div className="max-w-8xl mx-auto p-6 bg-gradient-to-r min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Invoices</h1>
      
      <div className="space-y-6">
        {/* Invoice Form */}
        <div className="">
          <InvoiceForm fetchInvoices={() => {}} />
        </div>
        
        {/* Invoice List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <InvoiceList />
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
