import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import api from '../../../lib/api.js';

export default function MRPCostMargin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    margin_range: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    mrp: '',
    cost_price: '',
    margin_percentage: '',
    margin_amount: '',
    status: 'active'
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMargin = (mrp, costPrice) => {
    if (!mrp || !costPrice || costPrice <= 0) return { percentage: 0, amount: 0 };
    
    const amount = parseFloat(mrp) - parseFloat(costPrice);
    const percentage = (amount / parseFloat(costPrice)) * 100;
    
    return {
      percentage: Math.round(percentage * 100) / 100,
      amount: Math.round(amount * 100) / 100
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mrp = parseFloat(formData.mrp) || 0;
      const costPrice = parseFloat(formData.cost_price) || 0;
      const margin = calculateMargin(mrp, costPrice);
      
      const data = {
        ...formData,
        mrp: mrp,
        cost_price: costPrice,
        margin_percentage: margin.percentage,
        margin_amount: margin.amount
      };
      
      if (editingItem) {
        await api.put(`/items/${editingItem.id}`, data);
      } else {
        await api.post('/items', data);
      }
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      sku: '',
      name: '',
      mrp: '',
      cost_price: '',
      margin_percentage: '',
      margin_amount: '',
      status: 'active'
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      sku: item.sku || '',
      name: item.name || '',
      mrp: item.mrp || '',
      cost_price: item.cost_price || '',
      margin_percentage: item.margin_percentage || '',
      margin_amount: item.margin_amount || '',
      status: item.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/items/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handlePriceChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    
    if (field === 'mrp' || field === 'cost_price') {
      const mrp = field === 'mrp' ? parseFloat(value) || 0 : parseFloat(newFormData.mrp) || 0;
      const costPrice = field === 'cost_price' ? parseFloat(value) || 0 : parseFloat(newFormData.cost_price) || 0;
      const margin = calculateMargin(mrp, costPrice);
      
      newFormData.margin_percentage = margin.percentage;
      newFormData.margin_amount = margin.amount;
    }
    
    setFormData(newFormData);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMargin = !filters.margin_range || (() => {
      const margin = item.margin_percentage || 0;
      switch (filters.margin_range) {
        case 'low': return margin < 10;
        case 'medium': return margin >= 10 && margin < 25;
        case 'high': return margin >= 25;
        default: return true;
      }
    })();
    
    const matchesStatus = !filters.status || item.status === filters.status;

    return matchesSearch && matchesMargin && matchesStatus;
  });

  const getMarginColor = (margin) => {
    if (margin < 10) return 'text-red-600';
    if (margin < 25) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMarginBadge = (margin) => {
    if (margin < 10) return 'bg-red-100 text-red-800';
    if (margin < 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">MRP / Cost / Margin</h1>
          <p className="text-gray-600">Manage pricing and margin calculations for items</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900">{items.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Margin</p>
              <p className="text-2xl font-semibold text-gray-900">
                {items.length > 0 
                  ? `${(items.reduce((sum, item) => sum + (item.margin_percentage || 0), 0) / items.length).toFixed(1)}%`
                  : '0%'
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total MRP</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{items.reduce((sum, item) => sum + (item.mrp || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{items.reduce((sum, item) => sum + (item.cost_price || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Margin Range</label>
            <select
              value={filters.margin_range}
              onChange={(e) => setFilters({...filters, margin_range: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Margins</option>
              <option value="low">Low (&lt;10%)</option>
              <option value="medium">Medium (10-25%)</option>
              <option value="high">High (&gt;25%)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({margin_range: '', status: ''})}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <Filter size={16} />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">MRP</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Margin %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No items found</td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{item.sku || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ₹{item.mrp?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ₹{item.cost_price?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ₹{item.margin_amount?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMarginBadge(item.margin_percentage || 0)}`}>
                        {(item.margin_percentage || 0).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 size={16} />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingItem ? 'Edit MRP/Cost/Margin' : 'Add Item'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Product SKU"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Product name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.mrp}
                    onChange={(e) => handlePriceChange('mrp', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.cost_price}
                    onChange={(e) => handlePriceChange('cost_price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Margin Amount (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.margin_amount}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Margin Percentage (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.margin_percentage}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {editingItem ? 'Update' : 'Create'} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

