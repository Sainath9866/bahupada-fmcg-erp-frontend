import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Calendar, AlertTriangle, Package } from 'lucide-react';
import api from '../../../lib/api.js';

export default function BatchExpiry() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    batch_tracking: '',
    expiry_tracking: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    batch_tracking: false,
    expiry_tracking: false,
    serial_tracking: false,
    shelf_life_days: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        shelf_life_days: formData.shelf_life_days ? parseInt(formData.shelf_life_days) : null
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
      batch_tracking: false,
      expiry_tracking: false,
      serial_tracking: false,
      shelf_life_days: '',
      status: 'active'
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      sku: item.sku || '',
      name: item.name || '',
      batch_tracking: item.batch_tracking || false,
      expiry_tracking: item.expiry_tracking || false,
      serial_tracking: item.serial_tracking || false,
      shelf_life_days: item.shelf_life_days || '',
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

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBatch = !filters.batch_tracking || item.batch_tracking === (filters.batch_tracking === 'true');
    const matchesExpiry = !filters.expiry_tracking || item.expiry_tracking === (filters.expiry_tracking === 'true');
    const matchesStatus = !filters.status || item.status === filters.status;

    return matchesSearch && matchesBatch && matchesExpiry && matchesStatus;
  });

  const getTrackingStatus = (item) => {
    const trackings = [];
    if (item.batch_tracking) trackings.push('Batch');
    if (item.expiry_tracking) trackings.push('Expiry');
    if (item.serial_tracking) trackings.push('Serial');
    return trackings.length > 0 ? trackings.join(', ') : 'None';
  };

  const getExpiryAlert = (item) => {
    if (!item.expiry_tracking || !item.shelf_life_days) return null;
    
    const days = item.shelf_life_days;
    if (days <= 30) return { type: 'danger', text: 'Critical' };
    if (days <= 90) return { type: 'warning', text: 'Warning' };
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Batch / Expiry</h1>
          <p className="text-gray-600">Manage batch and expiry tracking for items</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
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
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Tracking</label>
            <select
              value={filters.batch_tracking}
              onChange={(e) => setFilters({...filters, batch_tracking: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Items</option>
              <option value="true">Batch Tracked</option>
              <option value="false">Not Batch Tracked</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Tracking</label>
            <select
              value={filters.expiry_tracking}
              onChange={(e) => setFilters({...filters, expiry_tracking: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Items</option>
              <option value="true">Expiry Tracked</option>
              <option value="false">Not Expiry Tracked</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({batch_tracking: '', expiry_tracking: '', status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shelf Life</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No items found</td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const alert = getExpiryAlert(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{item.sku || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1">
                          {item.batch_tracking && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              Batch
                            </span>
                          )}
                          {item.expiry_tracking && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              Expiry
                            </span>
                          )}
                          {item.serial_tracking && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              Serial
                            </span>
                          )}
                          {!item.batch_tracking && !item.expiry_tracking && !item.serial_tracking && (
                            <span className="text-gray-500">None</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.shelf_life_days ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            {item.shelf_life_days} days
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {alert ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            alert.type === 'danger' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <AlertTriangle size={12} className="mr-1" />
                            {alert.text}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
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
                {editingItem ? 'Edit Batch/Expiry' : 'Add Item'}
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

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Tracking Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="batch_tracking"
                      checked={formData.batch_tracking}
                      onChange={(e) => setFormData({...formData, batch_tracking: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="batch_tracking" className="ml-2 block text-sm text-gray-900">
                      Batch Tracking
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="expiry_tracking"
                      checked={formData.expiry_tracking}
                      onChange={(e) => setFormData({...formData, expiry_tracking: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="expiry_tracking" className="ml-2 block text-sm text-gray-900">
                      Expiry Tracking
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="serial_tracking"
                      checked={formData.serial_tracking}
                      onChange={(e) => setFormData({...formData, serial_tracking: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="serial_tracking" className="ml-2 block text-sm text-gray-900">
                      Serial Tracking
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life (Days)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.shelf_life_days}
                  onChange={(e) => setFormData({...formData, shelf_life_days: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter shelf life in days"
                />
                <p className="mt-1 text-sm text-gray-500">Required if expiry tracking is enabled</p>
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

