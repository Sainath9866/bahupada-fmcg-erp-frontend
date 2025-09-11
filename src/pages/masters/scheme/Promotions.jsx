import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Gift, Calendar, Percent, Tag, Users } from 'lucide-react';
import api from '../../../lib/api';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    promotion_type: '',
    discount_type: '',
    discount_value: '',
    minimum_quantity: '',
    minimum_amount: '',
    start_date: '',
    end_date: '',
    applicable_items: '',
    applicable_customers: '',
    max_usage: '',
    status: 'Active'
  });

  const promotionTypes = ['Percentage Discount', 'Fixed Amount Discount', 'Buy X Get Y', 'Free Gift', 'Cashback', 'Loyalty Points'];
  const discountTypes = ['Percentage', 'Fixed Amount', 'Free Items', 'Cashback'];
  const statuses = ['Active', 'Inactive', 'Expired', 'Scheduled'];

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/promotions');
      setPromotions(response.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPromotion) {
        await api.put(`/promotions/${editingPromotion.id}`, formData);
      } else {
        await api.post('/promotions', formData);
      }
      setShowModal(false);
      setEditingPromotion(null);
      resetForm();
      fetchPromotions();
    } catch (error) {
      console.error('Error saving promotion:', error);
    }
  };

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
    setFormData(promotion);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      try {
        await api.delete(`/promotions/${id}`);
        fetchPromotions();
      } catch (error) {
        console.error('Error deleting promotion:', error);
      }
    }
  };

  const handleViewInfo = (promotion) => {
    setSelectedPromotion(promotion);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      promotion_type: '',
      discount_type: '',
      discount_value: '',
      minimum_quantity: '',
      minimum_amount: '',
      start_date: '',
      end_date: '',
      applicable_items: '',
      applicable_customers: '',
      max_usage: '',
      status: 'Active'
    });
  };

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.promotion_type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || promotion.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Promotion
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
                placeholder="Search promotions..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredPromotions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No promotions found</td>
                </tr>
              ) : (
                filteredPromotions.map((promotion) => (
                  <tr key={promotion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{promotion.name}</div>
                        <div className="text-sm text-gray-500">{promotion.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-900">{promotion.promotion_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">
                          {promotion.discount_type === 'Percentage' ? `${promotion.discount_value}%` : `₹${promotion.discount_value}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <div className="text-sm text-gray-900">
                          <div>{promotion.start_date}</div>
                          <div className="text-gray-500">to {promotion.end_date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-900">{promotion.max_usage || 'Unlimited'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(promotion.status)}`}>
                        {promotion.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewInfo(promotion)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(promotion)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(promotion.id)}
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
              {editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Type *</label>
                  <select
                    required
                    value={formData.promotion_type}
                    onChange={(e) => setFormData({...formData, promotion_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {promotionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type *</label>
                  <select
                    required
                    value={formData.discount_type}
                    onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Discount Type</option>
                    {discountTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.discount_value}
                    onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Quantity</label>
                  <input
                    type="number"
                    value={formData.minimum_quantity}
                    onChange={(e) => setFormData({...formData, minimum_quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Usage</label>
                  <input
                    type="number"
                    value={formData.max_usage}
                    onChange={(e) => setFormData({...formData, max_usage: e.target.value})}
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
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Items</label>
                  <input
                    type="text"
                    value={formData.applicable_items}
                    onChange={(e) => setFormData({...formData, applicable_items: e.target.value})}
                    placeholder="Item codes or categories (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Customers</label>
                  <input
                    type="text"
                    value={formData.applicable_customers}
                    onChange={(e) => setFormData({...formData, applicable_customers: e.target.value})}
                    placeholder="Customer groups or IDs (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPromotion(null);
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
                  {editingPromotion ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Promotion Details</h2>
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
                      <Gift className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">{selectedPromotion.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Type: {selectedPromotion.promotion_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        Discount: {selectedPromotion.discount_type === 'Percentage' ? `${selectedPromotion.discount_value}%` : `₹${selectedPromotion.discount_value}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">Max Usage: {selectedPromotion.max_usage || 'Unlimited'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Validity & Conditions</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Start: {selectedPromotion.start_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">End: {selectedPromotion.end_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Min Qty: {selectedPromotion.minimum_quantity || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Min Amount: ₹{selectedPromotion.minimum_amount || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Applicability</h3>
                <div className="mt-2 space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>Items:</strong> {selectedPromotion.applicable_items || 'All Items'}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Customers:</strong> {selectedPromotion.applicable_customers || 'All Customers'}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Description</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedPromotion.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;
