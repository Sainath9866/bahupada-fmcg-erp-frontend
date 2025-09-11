import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, CreditCard, DollarSign, Calendar, User, Building, ArrowUpRight } from 'lucide-react';
import api from '../../lib/api';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formData, setFormData] = useState({
    payment_number: '',
    vendor_id: '',
    payment_date: '',
    amount: '',
    payment_mode: '',
    bank_id: '',
    reference_number: '',
    description: '',
    remarks: ''
  });

  const paymentModes = ['Cash', 'Cheque', 'NEFT', 'RTGS', 'UPI', 'Credit Card', 'Debit Card'];

  useEffect(() => {
    fetchPayments();
    fetchVendors();
    fetchBanks();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await api.get('/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await api.get('/banks');
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPayment) {
        await api.put(`/payments/${editingPayment.id}`, formData);
      } else {
        await api.post('/payments', formData);
      }
      setShowModal(false);
      setEditingPayment(null);
      resetForm();
      fetchPayments();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData(payment);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await api.delete(`/payments/${id}`);
        fetchPayments();
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const handleViewInfo = (payment) => {
    setSelectedPayment(payment);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      payment_number: '',
      vendor_id: '',
      payment_date: '',
      amount: '',
      payment_mode: '',
      bank_id: '',
      reference_number: '',
      description: '',
      remarks: ''
    });
  };

  const filteredPayments = payments.filter(payment => {
    const vendor = vendors.find(v => v.id === payment.vendor_id);
    const matchesSearch = payment.payment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterMode || payment.payment_mode === filterMode;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Modes</option>
              {paymentModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No payments found</td>
                </tr>
              ) : (
                filteredPayments.map((payment) => {
                  const vendor = vendors.find(v => v.id === payment.vendor_id);
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{payment.payment_number}</div>
                          <div className="text-sm text-gray-500">{payment.reference_number}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{vendor?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{payment.payment_date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-900">₹{payment.amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{payment.payment_mode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewInfo(payment)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(payment)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingPayment ? 'Edit Payment' : 'Record New Payment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.payment_number}
                    onChange={(e) => setFormData({...formData, payment_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor *</label>
                  <select
                    required
                    value={formData.vendor_id}
                    onChange={(e) => setFormData({...formData, vendor_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.payment_date}
                    onChange={(e) => setFormData({...formData, payment_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode *</label>
                  <select
                    required
                    value={formData.payment_mode}
                    onChange={(e) => setFormData({...formData, payment_mode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Mode</option>
                    {paymentModes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                  <select
                    value={formData.bank_id}
                    onChange={(e) => setFormData({...formData, bank_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Bank</option>
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                  <input
                    type="text"
                    value={formData.reference_number}
                    onChange={(e) => setFormData({...formData, reference_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPayment(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingPayment ? 'Update' : 'Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Payment Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Payment: {selectedPayment.payment_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Vendor: {vendors.find(v => v.id === selectedPayment.vendor_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date: {selectedPayment.payment_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Reference: {selectedPayment.reference_number}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Amount & Mode</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">Amount: ₹{selectedPayment.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Mode: {selectedPayment.payment_mode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Bank: {banks.find(b => b.id === selectedPayment.bank_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Description: {selectedPayment.description}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Remarks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedPayment.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
