import React, { useState, useEffect } from 'react';
import { Search, Filter, Package, AlertTriangle, Calendar, Building, Clock, TrendingDown } from 'lucide-react';
import api from '../../lib/api';

const BatchExpiry = () => {
  const [batchData, setBatchData] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWarehouse, setFilterWarehouse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchBatchData();
    fetchItems();
    fetchWarehouses();
  }, []);

  const fetchBatchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/inventory/batch-expiry');
      setBatchData(response.data);
    } catch (error) {
      console.error('Error fetching batch data:', error);
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

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return 'No Expiry';
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 7) return 'Expiring Soon';
    if (diffDays <= 30) return 'Expiring This Month';
    return 'Normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Expired': return 'text-red-600 bg-red-100';
      case 'Expiring Soon': return 'text-orange-600 bg-orange-100';
      case 'Expiring This Month': return 'text-yellow-600 bg-yellow-100';
      case 'No Expiry': return 'text-gray-600 bg-gray-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return 'N/A';
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `${diffDays} days`;
  };

  const filteredBatchData = batchData.filter(batch => {
    const item = items.find(i => i.id === batch.item_id);
    const warehouse = warehouses.find(w => w.id === batch.warehouse_id);
    const status = getExpiryStatus(batch.expiry_date);
    
    const matchesSearch = item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.batch_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = !filterWarehouse || batch.warehouse_id === filterWarehouse;
    const matchesStatus = !filterStatus || status === filterStatus;
    
    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  const statuses = ['Normal', 'Expiring This Month', 'Expiring Soon', 'Expired', 'No Expiry'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Batch & Expiry Management</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchBatchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
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
              <p className="text-sm font-medium text-gray-600">Total Batches</p>
              <p className="text-2xl font-bold text-gray-900">{batchData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900">
                {batchData.filter(batch => getExpiryStatus(batch.expiry_date) === 'Expired').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">
                {batchData.filter(batch => getExpiryStatus(batch.expiry_date) === 'Expiring Soon').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {batchData.filter(batch => getExpiryStatus(batch.expiry_date) === 'Expiring This Month').length}
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
                placeholder="Search items or batches..."
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

      {/* Batch Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturing Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredBatchData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No batch data found</td>
                </tr>
              ) : (
                filteredBatchData.map((batch) => {
                  const item = items.find(i => i.id === batch.item_id);
                  const warehouse = warehouses.find(w => w.id === batch.warehouse_id);
                  const status = getExpiryStatus(batch.expiry_date);
                  
                  return (
                    <tr key={batch.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{item?.sku || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{batch.batch_number || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">{warehouse?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{batch.quantity} {item?.unit || 'pcs'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{batch.manufacturing_date || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{batch.expiry_date || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                            {status}
                          </span>
                          {batch.expiry_date && (
                            <div className="text-xs text-gray-500 mt-1">
                              {getDaysUntilExpiry(batch.expiry_date)}
                            </div>
                          )}
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
    </div>
  );
};

export default BatchExpiry;
