import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Package, AlertTriangle, TrendingUp, Building, BarChart3, PieChart } from 'lucide-react';
import api from '../../lib/api';

const InventoryReports = () => {
  const [reports, setReports] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedReport, setSelectedReport] = useState('');

  const inventoryReports = [
    { id: 'stock-summary', name: 'Stock Summary', description: 'Current stock levels by warehouse' },
    { id: 'stock-valuation', name: 'Stock Valuation', description: 'Inventory valuation report' },
    { id: 'movement-analysis', name: 'Movement Analysis', description: 'Stock movement trends' },
    { id: 'slow-moving', name: 'Slow Moving Items', description: 'Items with low movement' },
    { id: 'fast-moving', name: 'Fast Moving Items', description: 'High demand items' },
    { id: 'expiry-alerts', name: 'Expiry Alerts', description: 'Items nearing expiry' },
    { id: 'reorder-alerts', name: 'Reorder Alerts', description: 'Items below reorder level' },
    { id: 'abc-analysis', name: 'ABC Analysis', description: 'Inventory classification' }
  ];

  useEffect(() => {
    fetchReports();
    fetchWarehouses();
  }, [selectedWarehouse, selectedReport]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedWarehouse) params.append('warehouse', selectedWarehouse);
      if (selectedReport) params.append('report', selectedReport);
      
      const response = await api.get(`/reports/inventory?${params}`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching inventory reports:', error);
    } finally {
      setLoading(false);
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

  const handleDownload = async (reportId) => {
    try {
      const params = new URLSearchParams();
      if (selectedWarehouse) params.append('warehouse', selectedWarehouse);
      
      const response = await api.get(`/reports/inventory/${reportId}/download?${params}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportId}-report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Reports</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchReports}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Generate Reports
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Warehouses</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Reports</option>
              {inventoryReports.map(report => (
                <option key={report.id} value={report.id}>{report.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchReports}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Filter
            </button>
          </div>
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
              <p className="text-2xl font-bold text-gray-900">1,245</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Stock</p>
              <p className="text-2xl font-bold text-gray-900">1,180</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Warehouses</p>
              <p className="text-2xl font-bold text-gray-900">{warehouses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{report.description}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="w-4 h-4" />
                <span>Warehouse: {selectedWarehouse ? warehouses.find(w => w.id === selectedWarehouse)?.name : 'All'}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(report.id)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setSelectedReport(report.id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Details */}
      {selectedReport && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {inventoryReports.find(r => r.id === selectedReport)?.name} Report
          </h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Generating report...</div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">Report data will be displayed here</div>
              <div className="text-sm text-gray-400 mt-2">
                Select warehouse and click "Generate Reports" to view data
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryReports;
