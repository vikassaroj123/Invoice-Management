import React, { useEffect, useState } from 'react';
import invoiceService from '../../services/invoiceService';

const InvoicePDF = ({ match }) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const url = await invoiceService.getInvoicePDF(match.params.id);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPDF();
  }, [match.params.id]);

  return (
    <div className="p-6">
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="800px" title="Invoice PDF" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InvoicePDF;
