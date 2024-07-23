import React from 'react';
import InvoicePDF from '../components/Invoices/InvoicePDF';

const InvoicePDFPage = ({ match }) => {
  return (
    <div>
      <InvoicePDF match={match} />
    </div>
  );
};

export default InvoicePDFPage;
