import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Package, Calendar, AlertTriangle } from 'lucide-react';
import api from '../../../lib/api.js';

export default function BatchNumbers() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    item: '',
    status: '',
    expiry_status: ''
  });

  const [formData, setFormData] = useState({
    batch_number: '',
    item: '',
    manufacturing_date: '',
    expiry_date: '',
    quantity: '',
    cost_price: '',
    status: 'active'
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchBatches();
    fetchItems();
  }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await api.get('/item-batches');
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        quantity: parseFloat(formData.quantity) || 0,
        cost_price: parseFloat(formData.cost_price) || 0
      };
      
      if (editingBatch) {
        await api.put(`/item-batches/${editingBatch.id}`, data);
      } else {
        await api.post('/item-batches', data);
      }
      setShowModal(false);
      setEditingBatch(null);
      resetForm();
      fetchBatches();
    } catch (error) {
      console.error('Error saving batch:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      batch_number: '',
      item: '',
      manufacturing_date: '',
      expiry_date: '',
      quantity: '',
      cost_price: '',
      status: 'active'
    });
  };

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setFormData({
      batch_number: batch.batch_number || '',
      item: batch.item || '',
      manufacturing_date: batch.manufacturing_date || '',
      expiry_date: batch.expiry_date || '',
      quantity: batch.quantity || '',
      cost_price: batch.cost_price || '',
      status: batch.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      try {
        await api.delete(`/item-batches/${id}`);
        fetchBatches();
      } catch (error) {
        console.error('Error deleting batch:', error);
      }
    }
  };

  const filteredBatches = batches.filter(batch => {
    const item = items.find(i => i.id === batch.item);
    
    const matchesSearch = batch.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item?.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesItem = !filters.item || batch.item === filters.item;
    const matchesStatus = !filters.status || batch.status === filters.status;
    
    const matchesExpiryStatus = !filters.expiry_status || (() => {
      if (!batch.expiry_date) return filters.expiry_status === 'no_expiry';
      
      const expiryDate = new Date(batch.expiry_date);
      const now = new Date();
      const daysToExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      
      if (daysToExpiry < 0) return filters.expiry_status === 'expired';
      if (daysToExpiry <= 30) return filters.expiry_status === 'expiring_soon';
      return filters.expiry_status === 'valid';
    })();

    return matchesSearch && matchesItem && matchesStatus && matchesExpiryStatus;
  });

  const getExpiryStatus = (batch) => {
    if (!batch.expiry_date) return { status: 'No Expiry', color: 'bg-gray-100 text-gray-800' };
    
    const expiryDate = new Date(batch.expiry_date);
    const now = new Date();
    const daysToExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysToExpiry < 0) return { status: 'Expired', color: 'bg-red-100 text-red-800' };
    if (daysToExpiry <= 30) return { status: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Valid', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Batch Numbers</h1>
          <p className="text-gray-600">Manage batch numbers and tracking information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Batch
        </button>
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
                placeholder="Search by batch number or item..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Status</label>
            <select
              value={filters.expiry_status}
              onChange={(e) => setFilters({...filters, expiry_status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="valid">Valid</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
              <option value="no_expiry">No Expiry</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({item: '', status: '', expiry_status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturing Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredBatches.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No batches found</td>
                </tr>
              ) : (
                filteredBatches.map((batch) => {
                  const item = items.find(i => i.id === batch.item);
                  const expiryStatus = getExpiryStatus(batch);
                  
                  return (
                    <tr key={batch.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 font-mono">{batch.batch_number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item?.name || '-'}</div>
                        <div className="text-sm text-gray-500">{item?.sku || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {batch.manufacturing_date ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(batch.manufacturing_date).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {batch.expiry_date ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(batch.expiry_date).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {batch.quantity?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ₹{batch.cost_price?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${expiryStatus.color}`}>
                          {expiryStatus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(batch)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(batch.id)}
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
                {editingBatch ? 'Edit Batch' : 'Add Batch'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingBatch(null);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.batch_number}
                    onChange={(e) => setFormData({...formData, batch_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                    placeholder="e.g., BATCH001, LOT2024001"
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date</label>
                  <input
                    type="date"
                    value={formData.manufacturing_date}
                    onChange={(e) => setFormData({...formData, manufacturing_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiry_date}
                    onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.cost_price}
                    onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
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
                    setEditingBatch(null);
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
                  {editingBatch ? 'Update' : 'Create'} Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}







