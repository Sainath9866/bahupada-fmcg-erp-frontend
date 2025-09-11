import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, CreditCard, DollarSign, Calendar, User, Building, ArrowDownLeft } from 'lucide-react';
import api from '../../lib/api';

const Receipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const [formData, setFormData] = useState({
    receipt_number: '',
    customer_id: '',
    receipt_date: '',
    amount: '',
    payment_mode: '',
    bank_id: '',
    reference_number: '',
    description: '',
    remarks: ''
  });

  const paymentModes = ['Cash', 'Cheque', 'NEFT', 'RTGS', 'UPI', 'Credit Card', 'Debit Card'];

  useEffect(() => {
    fetchReceipts();
    fetchCustomers();
    fetchBanks();
  }, []);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/receipts');
      setReceipts(response.data);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
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
      if (editingReceipt) {
        await api.put(`/receipts/${editingReceipt.id}`, formData);
      } else {
        await api.post('/receipts', formData);
      }
      setShowModal(false);
      setEditingReceipt(null);
      resetForm();
      fetchReceipts();
    } catch (error) {
      console.error('Error saving receipt:', error);
    }
  };

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setFormData(receipt);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this receipt?')) {
      try {
        await api.delete(`/receipts/${id}`);
        fetchReceipts();
      } catch (error) {
        console.error('Error deleting receipt:', error);
      }
    }
  };

  const handleViewInfo = (receipt) => {
    setSelectedReceipt(receipt);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      receipt_number: '',
      customer_id: '',
      receipt_date: '',
      amount: '',
      payment_mode: '',
      bank_id: '',
      reference_number: '',
      description: '',
      remarks: ''
    });
  };

  const filteredReceipts = receipts.filter(receipt => {
    const customer = customers.find(c => c.id === receipt.customer_id);
    const matchesSearch = receipt.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.reference_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterMode || receipt.payment_mode === filterMode;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Record Receipt
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
                placeholder="Search receipts..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
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
              ) : filteredReceipts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No receipts found</td>
                </tr>
              ) : (
                filteredReceipts.map((receipt) => {
                  const customer = customers.find(c => c.id === receipt.customer_id);
                  return (
                    <tr key={receipt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{receipt.receipt_number}</div>
                          <div className="text-sm text-gray-500">{receipt.reference_number}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{customer?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{receipt.receipt_date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">₹{receipt.amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{receipt.payment_mode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewInfo(receipt)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(receipt)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(receipt.id)}
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
              {editingReceipt ? 'Edit Receipt' : 'Record New Receipt'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.receipt_number}
                    onChange={(e) => setFormData({...formData, receipt_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
                  <select
                    required
                    value={formData.customer_id}
                    onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.receipt_date}
                    onChange={(e) => setFormData({...formData, receipt_date: e.target.value})}
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
                    setEditingReceipt(null);
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
                  {editingReceipt ? 'Update' : 'Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Receipt Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Receipt Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Receipt: {selectedReceipt.receipt_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Customer: {customers.find(c => c.id === selectedReceipt.customer_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date: {selectedReceipt.receipt_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDownLeft className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Reference: {selectedReceipt.reference_number}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Amount & Mode</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Amount: ₹{selectedReceipt.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Mode: {selectedReceipt.payment_mode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Bank: {banks.find(b => b.id === selectedReceipt.bank_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Description: {selectedReceipt.description}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Remarks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedReceipt.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipt;
