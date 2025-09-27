import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Package, DollarSign, TrendingUp } from 'lucide-react';
import api from '../../../lib/api.js';

export default function ItemWisePricing() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPricing, setEditingPricing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    item: '',
    category: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    item: '',
    base_price: '',
    wholesale_price: '',
    retail_price: '',
    minimum_price: '',
    maximum_price: '',
    status: 'active'
  });

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPricing();
    fetchItems();
    fetchCategories();
  }, []);

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const response = await api.get('/item-pricing');
      setPricing(response.data);
    } catch (error) {
      console.error('Error fetching item pricing:', error);
    } finally {
      setLoading(false);
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

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        base_price: parseFloat(formData.base_price) || 0,
        wholesale_price: parseFloat(formData.wholesale_price) || 0,
        retail_price: parseFloat(formData.retail_price) || 0,
        minimum_price: parseFloat(formData.minimum_price) || 0,
        maximum_price: parseFloat(formData.maximum_price) || 0
      };
      
      if (editingPricing) {
        await api.put(`/item-pricing/${editingPricing.id}`, data);
      } else {
        await api.post('/item-pricing', data);
      }
      setShowModal(false);
      setEditingPricing(null);
      resetForm();
      fetchPricing();
    } catch (error) {
      console.error('Error saving item pricing:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      item: '',
      base_price: '',
      wholesale_price: '',
      retail_price: '',
      minimum_price: '',
      maximum_price: '',
      status: 'active'
    });
  };

  const handleEdit = (pricing) => {
    setEditingPricing(pricing);
    setFormData({
      item: pricing.item || '',
      base_price: pricing.base_price || '',
      wholesale_price: pricing.wholesale_price || '',
      retail_price: pricing.retail_price || '',
      minimum_price: pricing.minimum_price || '',
      maximum_price: pricing.maximum_price || '',
      status: pricing.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pricing rule?')) {
      try {
        await api.delete(`/item-pricing/${id}`);
        fetchPricing();
      } catch (error) {
        console.error('Error deleting item pricing:', error);
      }
    }
  };

  const filteredPricing = pricing.filter(price => {
    const item = items.find(i => i.id === price.item);
    
    const matchesSearch = item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item?.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesItem = !filters.item || price.item === filters.item;
    const matchesCategory = !filters.category || item?.category === filters.category;
    const matchesStatus = !filters.status || price.status === filters.status;

    return matchesSearch && matchesItem && matchesCategory && matchesStatus;
  });

  const getMarginDisplay = (basePrice, sellingPrice) => {
    if (!basePrice || !sellingPrice || basePrice <= 0) return '-';
    const margin = ((sellingPrice - basePrice) / basePrice) * 100;
    return `${margin.toFixed(1)}%`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Item-wise Pricing</h1>
          <p className="text-gray-600">Manage pricing tiers for different items</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Pricing Rule
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900">{pricing.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Base Price</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{pricing.length > 0 
                  ? (pricing.reduce((sum, p) => sum + (p.base_price || 0), 0) / pricing.length).toFixed(0)
                  : '0'
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Margin</p>
              <p className="text-2xl font-semibold text-gray-900">
                {pricing.length > 0 
                  ? (pricing.reduce((sum, p) => {
                      const margin = p.base_price && p.retail_price ? 
                        ((p.retail_price - p.base_price) / p.base_price) * 100 : 0;
                      return sum + margin;
                    }, 0) / pricing.length).toFixed(1)
                  : '0'
                }%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Rules</p>
              <p className="text-2xl font-semibold text-gray-900">
                {pricing.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by item name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
            <select
              value={filters.item}
              onChange={(e) => setFilters({...filters, item: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Items</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({item: '', category: '', status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesale</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Retail</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Min Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredPricing.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No pricing rules found</td>
                </tr>
              ) : (
                filteredPricing.map((price) => {
                  const item = items.find(i => i.id === price.item);
                  
                  return (
                    <tr key={price.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package size={16} className="text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item?.name || '-'}</div>
                            <div className="text-sm text-gray-500">{item?.sku || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          ₹{price.base_price?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div>
                          <div className="flex items-center justify-end gap-1">
                            <DollarSign size={14} className="text-gray-400" />
                            ₹{price.wholesale_price?.toLocaleString() || '0'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getMarginDisplay(price.base_price, price.wholesale_price)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div>
                          <div className="flex items-center justify-end gap-1">
                            <DollarSign size={14} className="text-gray-400" />
                            ₹{price.retail_price?.toLocaleString() || '0'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getMarginDisplay(price.base_price, price.retail_price)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          ₹{price.minimum_price?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          ₹{price.maximum_price?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          price.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {price.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(price)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(price.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete"
                          >
                            <Trash2 size={16} />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingPricing ? 'Edit Item Pricing' : 'Add Item Pricing'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingPricing(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item *</label>
                <select
                  required
                  value={formData.item}
                  onChange={(e) => setFormData({...formData, item: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Item</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>{item.name} ({item.sku})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.base_price}
                    onChange={(e) => setFormData({...formData, base_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wholesale Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.wholesale_price}
                    onChange={(e) => setFormData({...formData, wholesale_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.retail_price}
                    onChange={(e) => setFormData({...formData, retail_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minimum_price}
                    onChange={(e) => setFormData({...formData, minimum_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.maximum_price}
                  onChange={(e) => setFormData({...formData, maximum_price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                />
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
                    setEditingPricing(null);
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
                  {editingPricing ? 'Update' : 'Create'} Pricing Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}








