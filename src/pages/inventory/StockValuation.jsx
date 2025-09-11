import React, { useState, useEffect } from 'react';
import { Search, Filter, Package, DollarSign, TrendingUp, Building, Calculator, BarChart3 } from 'lucide-react';
import api from '../../lib/api';

const StockValuation = () => {
  const [valuationData, setValuationData] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWarehouse, setFilterWarehouse] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [valuationMethod, setValuationMethod] = useState('FIFO');

  useEffect(() => {
    fetchValuationData();
    fetchItems();
    fetchWarehouses();
  }, [valuationMethod]);

  const fetchValuationData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/inventory/stock-valuation?method=${valuationMethod}`);
      setValuationData(response.data);
    } catch (error) {
      console.error('Error fetching valuation data:', error);
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

  const getTotalValue = () => {
    return valuationData.reduce((total, item) => total + (item.total_value || 0), 0);
  };

  const getTotalQuantity = () => {
    return valuationData.reduce((total, item) => total + (item.current_stock || 0), 0);
  };

  const getAverageCost = () => {
    const totalValue = getTotalValue();
    const totalQuantity = getTotalQuantity();
    return totalQuantity > 0 ? totalValue / totalQuantity : 0;
  };

  const filteredValuationData = valuationData.filter(item => {
    const warehouse = warehouses.find(w => w.id === item.warehouse_id);
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = !filterWarehouse || item.warehouse_id === filterWarehouse;
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesWarehouse && matchesCategory;
  });

  const categories = [...new Set(valuationData.map(item => item.category).filter(Boolean))];
  const valuationMethods = ['FIFO', 'LIFO', 'Weighted Average', 'Standard Cost'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stock Valuation</h1>
        <div className="flex gap-2">
          <select
            value={valuationMethod}
            onChange={(e) => setValuationMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {valuationMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <button
            onClick={fetchValuationData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Recalculate
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
              <p className="text-2xl font-bold text-gray-900">{valuationData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Quantity</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalQuantity().toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{getTotalValue().toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Cost</p>
              <p className="text-2xl font-bold text-gray-900">₹{getAverageCost().toFixed(2)}</p>
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Valuation Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valuation Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredValuationData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No valuation data found</td>
                </tr>
              ) : (
                filteredValuationData.map((item) => {
                  const warehouse = warehouses.find(w => w.id === item.warehouse_id);
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
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-900">₹{item.unit_cost?.toFixed(2) || '0.00'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">₹{item.total_value?.toFixed(2) || '0.00'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {valuationMethod}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Valuation Summary */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{valuationData.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{getTotalValue().toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Inventory Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">₹{getAverageCost().toFixed(2)}</div>
            <div className="text-sm text-gray-600">Average Cost per Unit</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Valuation Method: <span className="font-semibold">{valuationMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockValuation;
