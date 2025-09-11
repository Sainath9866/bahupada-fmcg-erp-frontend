import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, RotateCcw, DollarSign, Calendar, User, Package, XCircle } from 'lucide-react';
import api from '../../../lib/api';

const UnsalableReturns = () => {
  const [returns, setReturns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingReturn, setEditingReturn] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const [formData, setFormData] = useState({
    return_number: '',
    customer_id: '',
    return_date: '',
    item_id: '',
    quantity: '',
    rate: '',
    amount: '',
    reason: '',
    condition: '',
    status: '',
    disposal_method: '',
    remarks: ''
  });

  const conditions = ['Damaged', 'Expired', 'Quality Issue', 'Contaminated', 'Broken'];
  const statuses = ['Pending', 'Approved', 'Rejected', 'Disposed'];
  const disposalMethods = ['Destroy', 'Donate', 'Recycle', 'Return to Supplier', 'Write Off'];

  useEffect(() => {
    fetchReturns();
    fetchCustomers();
    fetchItems();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const response = await api.get('/unsalable-returns');
      setReturns(response.data);
    } catch (error) {
      console.error('Error fetching returns:', error);
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

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReturn) {
        await api.put(`/unsalable-returns/${editingReturn.id}`, formData);
      } else {
        await api.post('/unsalable-returns', formData);
      }
      setShowModal(false);
      setEditingReturn(null);
      resetForm();
      fetchReturns();
    } catch (error) {
      console.error('Error saving return:', error);
    }
  };

  const handleEdit = (returnItem) => {
    setEditingReturn(returnItem);
    setFormData(returnItem);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this return?')) {
      try {
        await api.delete(`/unsalable-returns/${id}`);
        fetchReturns();
      } catch (error) {
        console.error('Error deleting return:', error);
      }
    }
  };

  const handleViewInfo = (returnItem) => {
    setSelectedReturn(returnItem);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      return_number: '',
      customer_id: '',
      return_date: '',
      item_id: '',
      quantity: '',
      rate: '',
      amount: '',
      reason: '',
      condition: '',
      status: '',
      disposal_method: '',
      remarks: ''
    });
  };

  const filteredReturns = returns.filter(returnItem => {
    const customer = customers.find(c => c.id === returnItem.customer_id);
    const item = items.find(i => i.id === returnItem.item_id);
    const matchesSearch = returnItem.return_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || returnItem.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Unsalable Returns</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Return
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
                placeholder="Search returns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No returns found</td>
                </tr>
              ) : (
                filteredReturns.map((returnItem) => {
                  const customer = customers.find(c => c.id === returnItem.customer_id);
                  const item = items.find(i => i.id === returnItem.item_id);
                  return (
                    <tr key={returnItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{returnItem.return_number}</div>
                          <div className="text-sm text-gray-500">{returnItem.return_date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{customer?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{item?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{returnItem.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">₹{returnItem.amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          returnItem.condition === 'Damaged' 
                            ? 'bg-red-100 text-red-800' 
                            : returnItem.condition === 'Expired'
                            ? 'bg-gray-100 text-gray-800'
                            : returnItem.condition === 'Quality Issue'
                            ? 'bg-orange-100 text-orange-800'
                            : returnItem.condition === 'Contaminated'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {returnItem.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          returnItem.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : returnItem.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : returnItem.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {returnItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewInfo(returnItem)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(returnItem)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(returnItem.id)}
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
              {editingReturn ? 'Edit Return' : 'Add New Return'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.return_number}
                    onChange={(e) => setFormData({...formData, return_number: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.return_date}
                    onChange={(e) => setFormData({...formData, return_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item *</label>
                  <select
                    required
                    value={formData.item_id}
                    onChange={(e) => setFormData({...formData, item_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Item</option>
                    {items.map(item => (
                      <option key={item.id} value={item.id}>{item.name} ({item.sku})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.rate}
                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                  <select
                    required
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disposal Method</label>
                  <select
                    value={formData.disposal_method}
                    onChange={(e) => setFormData({...formData, disposal_method: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Method</option>
                    {disposalMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
                  <input
                    type="text"
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
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
                    setEditingReturn(null);
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
                  {editingReturn ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Return Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Return Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">Return: {selectedReturn.return_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Customer: {customers.find(c => c.id === selectedReturn.customer_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Item: {items.find(i => i.id === selectedReturn.item_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date: {selectedReturn.return_date}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Quantity: {selectedReturn.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Rate: ₹{selectedReturn.rate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Amount: ₹{selectedReturn.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">Condition: {selectedReturn.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Status: {selectedReturn.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Disposal: {selectedReturn.disposal_method}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Reason & Remarks</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Reason: {selectedReturn.reason}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Remarks: {selectedReturn.remarks || 'No remarks'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsalableReturns;
