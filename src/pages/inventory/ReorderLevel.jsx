import React, { useState, useEffect } from 'react';
import { Search, Filter, Package, AlertTriangle, TrendingUp, Building, ShoppingCart, Plus } from 'lucide-react';
import api from '../../lib/api';

const ReorderLevel = () => {
  const [reorderData, setReorderData] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWarehouse, setFilterWarehouse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    min_stock: '',
    reorder_level: '',
    max_stock: '',
    reorder_quantity: ''
  });

  useEffect(() => {
    fetchReorderData();
    fetchItems();
    fetchWarehouses();
  }, []);

  const fetchReorderData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/inventory/reorder-levels');
      setReorderData(response.data);
    } catch (error) {
      console.error('Error fetching reorder data:', error);
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

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const getReorderStatus = (item) => {
    if (item.current_stock <= 0) return 'Out of Stock';
    if (item.current_stock <= item.min_stock) return 'Critical';
    if (item.current_stock <= item.reorder_level) return 'Reorder';
    return 'Normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Out of Stock': return 'text-red-600 bg-red-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Reorder': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/inventory/reorder-levels/${editingItem.id}`, formData);
      } else {
        await api.post('/inventory/reorder-levels', formData);
      }
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      fetchReorderData();
    } catch (error) {
      console.error('Error saving reorder level:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      warehouse_id: '',
      min_stock: '',
      reorder_level: '',
      max_stock: '',
      reorder_quantity: ''
    });
  };

  const filteredReorderData = reorderData.filter(item => {
    const warehouse = warehouses.find(w => w.id === item.warehouse_id);
    const status = getReorderStatus(item);
    
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = !filterWarehouse || item.warehouse_id === filterWarehouse;
    const matchesStatus = !filterStatus || status === filterStatus;
    
    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  const statuses = ['Normal', 'Reorder', 'Critical', 'Out of Stock'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reorder Level Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Set Reorder Level
          </button>
          <button
            onClick={fetchReorderData}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{reorderData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Normal Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {reorderData.filter(item => getReorderStatus(item) === 'Normal').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Need Reorder</p>
              <p className="text-2xl font-bold text-gray-900">
                {reorderData.filter(item => getReorderStatus(item) === 'Reorder').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical/Out</p>
              <p className="text-2xl font-bold text-gray-900">
                {reorderData.filter(item => ['Critical', 'Out of Stock'].includes(getReorderStatus(item))).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterWarehouse}
              onChange={(e) => setFilterWarehouse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Warehouses</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </div>
          <div>
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

      {/* Reorder Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredReorderData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No reorder data found</td>
                </tr>
              ) : (
                filteredReorderData.map((item) => {
                  const warehouse = warehouses.find(w => w.id === item.warehouse_id);
                  const status = getReorderStatus(item);
                  
                  return (
                    <tr key={`${item.item_id}-${item.warehouse_id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{item.sku || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{warehouse?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{item.current_stock} {item.unit || 'pcs'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.min_stock} {item.unit || 'pcs'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.reorder_level} {item.unit || 'pcs'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.reorder_quantity} {item.unit || 'pcs'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Package className="w-4 h-4" />
                        </button>
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
              {editingItem ? 'Edit Reorder Level' : 'Set Reorder Level'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse *</label>
                  <select
                    required
                    value={formData.warehouse_id}
                    onChange={(e) => setFormData({...formData, warehouse_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.min_stock}
                    onChange={(e) => setFormData({...formData, min_stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.reorder_level}
                    onChange={(e) => setFormData({...formData, reorder_level: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.max_stock}
                    onChange={(e) => setFormData({...formData, max_stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Quantity *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.reorder_quantity}
                    onChange={(e) => setFormData({...formData, reorder_quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
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
                  {editingItem ? 'Update' : 'Set'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReorderLevel;
