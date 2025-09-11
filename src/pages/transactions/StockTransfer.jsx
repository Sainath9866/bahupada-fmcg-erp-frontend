import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Package, ArrowRightLeft, Calendar, User, Building, Truck } from 'lucide-react';
import api from '../../lib/api';

const StockTransfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const [formData, setFormData] = useState({
    transfer_number: '',
    transfer_date: '',
    from_warehouse_id: '',
    to_warehouse_id: '',
    item_id: '',
    quantity: '',
    unit_price: '',
    total_amount: '',
    reference: '',
    status: 'Pending',
    remarks: ''
  });

  const transferStatuses = ['Pending', 'In Transit', 'Completed', 'Cancelled'];

  useEffect(() => {
    fetchTransfers();
    fetchItems();
    fetchWarehouses();
  }, []);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stock-transfers');
      setTransfers(response.data);
    } catch (error) {
      console.error('Error fetching transfers:', error);
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
      if (editingTransfer) {
        await api.put(`/stock-transfers/${editingTransfer.id}`, formData);
      } else {
        await api.post('/stock-transfers', formData);
      }
      setShowModal(false);
      setEditingTransfer(null);
      resetForm();
      fetchTransfers();
    } catch (error) {
      console.error('Error saving transfer:', error);
    }
  };

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer);
    setFormData(transfer);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transfer?')) {
      try {
        await api.delete(`/stock-transfers/${id}`);
        fetchTransfers();
      } catch (error) {
        console.error('Error deleting transfer:', error);
      }
    }
  };

  const handleViewInfo = (transfer) => {
    setSelectedTransfer(transfer);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      transfer_number: '',
      transfer_date: '',
      from_warehouse_id: '',
      to_warehouse_id: '',
      item_id: '',
      quantity: '',
      unit_price: '',
      total_amount: '',
      reference: '',
      status: 'Pending',
      remarks: ''
    });
  };

  const filteredTransfers = transfers.filter(transfer => {
    const item = items.find(i => i.id === transfer.item_id);
    const fromWarehouse = warehouses.find(w => w.id === transfer.from_warehouse_id);
    const toWarehouse = warehouses.find(w => w.id === transfer.to_warehouse_id);
    const matchesSearch = transfer.transfer_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fromWarehouse?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         toWarehouse?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || transfer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stock Transfers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Stock Transfer
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
                placeholder="Search transfers..."
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
              {transferStatuses.map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From → To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredTransfers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No transfers found</td>
                </tr>
              ) : (
                filteredTransfers.map((transfer) => {
                  const item = items.find(i => i.id === transfer.item_id);
                  const fromWarehouse = warehouses.find(w => w.id === transfer.from_warehouse_id);
                  const toWarehouse = warehouses.find(w => w.id === transfer.to_warehouse_id);
                  return (
                    <tr key={transfer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transfer.transfer_number}</div>
                          <div className="text-sm text-gray-500">{transfer.reference}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{item?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{fromWarehouse?.name || 'N/A'}</span>
                          <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{toWarehouse?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{transfer.quantity} {item?.unit || 'pcs'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transfer.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          transfer.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          transfer.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewInfo(transfer)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(transfer)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(transfer.id)}
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
              {editingTransfer ? 'Edit Stock Transfer' : 'New Stock Transfer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.transfer_number}
                    onChange={(e) => setFormData({...formData, transfer_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.transfer_date}
                    onChange={(e) => setFormData({...formData, transfer_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Warehouse *</label>
                  <select
                    required
                    value={formData.from_warehouse_id}
                    onChange={(e) => setFormData({...formData, from_warehouse_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select From Warehouse</option>
                    {warehouses.map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Warehouse *</label>
                  <select
                    required
                    value={formData.to_warehouse_id}
                    onChange={(e) => setFormData({...formData, to_warehouse_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select To Warehouse</option>
                    {warehouses.map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                  </select>
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
                      <option key={item.id} value={item.id}>{item.name}</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unit_price}
                    onChange={(e) => setFormData({...formData, unit_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({...formData, total_amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => setFormData({...formData, reference: e.target.value})}
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
                    {transferStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
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
                    setEditingTransfer(null);
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
                  {editingTransfer ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Stock Transfer Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Transfer Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Transfer: {selectedTransfer.transfer_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date: {selectedTransfer.transfer_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Item: {items.find(i => i.id === selectedTransfer.item_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Reference: {selectedTransfer.reference}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Transfer Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">From: {warehouses.find(w => w.id === selectedTransfer.from_warehouse_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">To: {warehouses.find(w => w.id === selectedTransfer.to_warehouse_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Quantity: {selectedTransfer.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">Status: {selectedTransfer.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Remarks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedTransfer.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTransfer;
