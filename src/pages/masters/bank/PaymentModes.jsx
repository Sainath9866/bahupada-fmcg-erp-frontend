import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, CreditCard, Smartphone, DollarSign, Settings } from 'lucide-react';
import api from '../../../lib/api';

const PaymentModes = () => {
  const [paymentModes, setPaymentModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMode, setEditingMode] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    processing_fee: '',
    processing_fee_type: 'Percentage',
    minimum_amount: '',
    maximum_amount: '',
    settlement_days: '',
    is_online: false,
    requires_verification: false,
    status: 'Active'
  });

  const paymentTypes = ['Cash', 'Card', 'UPI', 'Net Banking', 'Wallet', 'Cheque', 'DD', 'NEFT', 'RTGS', 'IMPS'];
  const feeTypes = ['Percentage', 'Fixed Amount'];

  useEffect(() => {
    fetchPaymentModes();
  }, []);

  const fetchPaymentModes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/payment-modes');
      setPaymentModes(response.data);
    } catch (error) {
      console.error('Error fetching payment modes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMode) {
        await api.put(`/payment-modes/${editingMode.id}`, formData);
      } else {
        await api.post('/payment-modes', formData);
      }
      setShowModal(false);
      setEditingMode(null);
      resetForm();
      fetchPaymentModes();
    } catch (error) {
      console.error('Error saving payment mode:', error);
    }
  };

  const handleEdit = (mode) => {
    setEditingMode(mode);
    setFormData(mode);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment mode?')) {
      try {
        await api.delete(`/payment-modes/${id}`);
        fetchPaymentModes();
      } catch (error) {
        console.error('Error deleting payment mode:', error);
      }
    }
  };

  const handleViewInfo = (mode) => {
    setSelectedMode(mode);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      description: '',
      processing_fee: '',
      processing_fee_type: 'Percentage',
      minimum_amount: '',
      maximum_amount: '',
      settlement_days: '',
      is_online: false,
      requires_verification: false,
      status: 'Active'
    });
  };

  const filteredModes = paymentModes.filter(mode => {
    const matchesSearch = mode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mode.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mode.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterType || mode.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'Cash':
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case 'Card':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'UPI':
      case 'Net Banking':
      case 'Wallet':
        return <Smartphone className="w-4 h-4 text-purple-500" />;
      default:
        return <Settings className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Modes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Payment Mode
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
                placeholder="Search payment modes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {paymentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Settlement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredModes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No payment modes found</td>
                </tr>
              ) : (
                filteredModes.map((mode) => (
                  <tr key={mode.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{mode.name}</div>
                        <div className="text-sm text-gray-500">{mode.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getPaymentIcon(mode.type)}
                        <span className="text-sm text-gray-900">{mode.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{mode.processing_fee} {mode.processing_fee_type === 'Percentage' ? '%' : '₹'}</div>
                        <div className="text-sm text-gray-500">
                          Min: ₹{mode.minimum_amount} | Max: ₹{mode.maximum_amount}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{mode.settlement_days} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {mode.is_online && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Online
                          </span>
                        )}
                        {mode.requires_verification && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Verification
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        mode.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {mode.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewInfo(mode)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(mode)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(mode.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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
              {editingMode ? 'Edit Payment Mode' : 'Add New Payment Mode'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {paymentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Processing Fee</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.processing_fee}
                    onChange={(e) => setFormData({...formData, processing_fee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                  <select
                    value={formData.processing_fee_type}
                    onChange={(e) => setFormData({...formData, processing_fee_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {feeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minimum_amount}
                    onChange={(e) => setFormData({...formData, minimum_amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.maximum_amount}
                    onChange={(e) => setFormData({...formData, maximum_amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Settlement Days</label>
                  <input
                    type="number"
                    value={formData.settlement_days}
                    onChange={(e) => setFormData({...formData, settlement_days: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_online"
                    checked={formData.is_online}
                    onChange={(e) => setFormData({...formData, is_online: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_online" className="ml-2 block text-sm text-gray-900">
                    Online Payment
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requires_verification"
                    checked={formData.requires_verification}
                    onChange={(e) => setFormData({...formData, requires_verification: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requires_verification" className="ml-2 block text-sm text-gray-900">
                    Requires Verification
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingMode(null);
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
                  {editingMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Payment Mode Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Basic Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(selectedMode.type)}
                      <span className="text-sm text-gray-600">{selectedMode.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Type: {selectedMode.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Fee: {selectedMode.processing_fee} {selectedMode.processing_fee_type === 'Percentage' ? '%' : '₹'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Settlement: {selectedMode.settlement_days} days</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Amount Limits</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Minimum: ₹{selectedMode.minimum_amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Maximum: ₹{selectedMode.maximum_amount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Features</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedMode.is_online && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Online Payment
                    </span>
                  )}
                  {selectedMode.requires_verification && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Requires Verification
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Description</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedMode.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModes;
