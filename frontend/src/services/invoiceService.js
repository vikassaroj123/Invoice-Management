import axios from 'axios';

const API_URL = 'https://invoice-management-1.onrender.com/api/invoices';

// Set up Axios with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    console.error('API error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

const getInvoices = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    throw error;
  }
};

const createInvoice = async (invoice) => {
  try {
    const response = await api.post('/', invoice);
    return response.data;
  } catch (error) {
    console.error('Failed to create invoice:', error);
    throw error;
  }
};

const getInvoicePDF = async (id) => {
  try {
    const response = await api.get(`/${id}/pdf`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Failed to fetch invoice PDF:', error);
    throw error;
  }
};

const invoiceService = {
  getInvoices,
  createInvoice,
  getInvoicePDF,
};

export default invoiceService;
