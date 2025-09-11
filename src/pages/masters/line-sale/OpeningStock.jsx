import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Package, DollarSign, Calendar, Warehouse, TrendingUp } from 'lucide-react';
import api from '../../../lib/api';

const OpeningStock = () => {
  const [openingStocks, setOpeningStocks] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWarehouse, setFilterWarehouse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    opening_quantity: '',
    opening_rate: '',
    opening_value: '',
    batch_number: '',
    expiry_date: '',
    as_on_date: '',
    remarks: ''
  });

  useEffect(() => {
    fetchOpeningStocks();
    fetchItems();
    fetchWarehouses();
  }, []);

  const fetchOpeningStocks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/line-sale-opening-stocks');
      setOpeningStocks(response.data);
    } catch (error) {
      console.error('Error fetching opening stocks:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStock) {
        await api.put(`/line-sale-opening-stocks/${editingStock.id}`, formData);
      } else {
        await api.post('/line-sale-opening-stocks', formData);
      }
      setShowModal(false);
      setEditingStock(null);
      resetForm();
      fetchOpeningStocks();
    } catch (error) {
      console.error('Error saving opening stock:', error);
    }
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
    setFormData(stock);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this opening stock?')) {
      try {
        await api.delete(`/line-sale-opening-stocks/${id}`);
        fetchOpeningStocks();
      } catch (error) {
        console.error('Error deleting opening stock:', error);
      }
    }
  };

  const handleViewInfo = (stock) => {
    setSelectedStock(stock);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      warehouse_id: '',
      opening_quantity: '',
      opening_rate: '',
      opening_value: '',
      batch_number: '',
      expiry_date: '',
      as_on_date: '',
      remarks: ''
    });
  };

  const filteredStocks = openingStocks.filter(stock => {
    const item = items.find(i => i.id === stock.item_id);
    const matchesSearch = item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item?.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.batch_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterWarehouse || stock.warehouse_id === filterWarehouse;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Line Sale Opening Stock</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Opening Stock
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
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
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
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No opening stocks found</td>
                </tr>
              ) : (
                filteredStocks.map((stock) => {
                  const item = items.find(i => i.id === stock.item_id);
                  const warehouse = warehouses.find(w => w.id === stock.warehouse_id);
                  return (
                    <tr key={stock.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">SKU: {item?.sku || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Warehouse className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{warehouse?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{stock.opening_quantity}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-900">₹{stock.opening_rate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">₹{stock.opening_value}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{stock.batch_number || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{stock.expiry_date || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewInfo(stock)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(stock)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(stock.id)}
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
              {editingStock ? 'Edit Opening Stock' : 'Add New Opening Stock'}
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
                      <option key={item.id} value={item.id}>{item.name} ({item.sku})</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Quantity *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.opening_quantity}
                    onChange={(e) => setFormData({...formData, opening_quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Rate *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.opening_rate}
                    onChange={(e) => setFormData({...formData, opening_rate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.opening_value}
                    onChange={(e) => setFormData({...formData, opening_value: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batch_number}
                    onChange={(e) => setFormData({...formData, batch_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiry_date}
                    onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">As On Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.as_on_date}
                    onChange={(e) => setFormData({...formData, as_on_date: e.target.value})}
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
                    setEditingStock(null);
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
                  {editingStock ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Opening Stock Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Item Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Item: {items.find(i => i.id === selectedStock.item_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">SKU: {items.find(i => i.id === selectedStock.item_id)?.sku || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Warehouse: {warehouses.find(w => w.id === selectedStock.warehouse_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">As On Date: {selectedStock.as_on_date}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Stock Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Quantity: {selectedStock.opening_quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Rate: ₹{selectedStock.opening_rate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Value: ₹{selectedStock.opening_value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Batch: {selectedStock.batch_number || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Expiry: {selectedStock.expiry_date || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Remarks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedStock.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpeningStock;
