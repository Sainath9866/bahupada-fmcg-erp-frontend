import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Warehouse, MapPin, Phone, Users, Package, Building, Home } from 'lucide-react';
import api from '../../../lib/api';

const SubWarehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [branchWarehouses, setBranchWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranchWarehouse, setFilterBranchWarehouse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    branch_warehouse_id: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    manager_name: '',
    manager_phone: '',
    capacity: '',
    area_sqft: '',
    rack_count: '',
    zone_count: '',
    type: 'Sub',
    status: 'Active'
  });

  useEffect(() => {
    fetchWarehouses();
    fetchBranchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/warehouses?type=Sub');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching sub warehouses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranchWarehouses = async () => {
    try {
      const response = await api.get('/warehouses?type=Branch');
      setBranchWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching branch warehouses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingWarehouse) {
        await api.put(`/warehouses/${editingWarehouse.id}`, formData);
      } else {
        await api.post('/warehouses', formData);
      }
      setShowModal(false);
      setEditingWarehouse(null);
      resetForm();
      fetchWarehouses();
    } catch (error) {
      console.error('Error saving sub warehouse:', error);
    }
  };

  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData(warehouse);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub warehouse?')) {
      try {
        await api.delete(`/warehouses/${id}`);
        fetchWarehouses();
      } catch (error) {
        console.error('Error deleting sub warehouse:', error);
      }
    }
  };

  const handleViewInfo = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      branch_warehouse_id: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      manager_name: '',
      manager_phone: '',
      capacity: '',
      area_sqft: '',
      rack_count: '',
      zone_count: '',
      type: 'Sub',
      status: 'Active'
    });
  };

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.manager_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterBranchWarehouse || warehouse.branch_warehouse_id === filterBranchWarehouse;
    return matchesSearch && matchesFilter;
  });

  const getBranchWarehouseName = (branchWarehouseId) => {
    const branchWarehouse = branchWarehouses.find(w => w.id === branchWarehouseId);
    return branchWarehouse ? branchWarehouse.name : 'N/A';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sub Warehouses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Sub Warehouse
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
                placeholder="Search sub warehouses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filterBranchWarehouse}
              onChange={(e) => setFilterBranchWarehouse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Branch Warehouses</option>
              {branchWarehouses.map(warehouse => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredWarehouses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No sub warehouses found</td>
                </tr>
              ) : (
                filteredWarehouses.map((warehouse) => (
                  <tr key={warehouse.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{warehouse.name}</div>
                        <div className="text-sm text-gray-500">Code: {warehouse.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">{getBranchWarehouseName(warehouse.branch_warehouse_id)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{warehouse.city}, {warehouse.state}</div>
                        <div className="text-sm text-gray-500">{warehouse.pincode}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{warehouse.manager_name}</div>
                        <div className="text-sm text-gray-500">{warehouse.manager_phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{warehouse.capacity} units</div>
                        <div className="text-sm text-gray-500">{warehouse.area_sqft} sq ft</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewInfo(warehouse)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(warehouse)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(warehouse.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingWarehouse ? 'Edit Sub Warehouse' : 'Add New Sub Warehouse'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Warehouse Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Warehouse Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Warehouse *</label>
                  <select
                    required
                    value={formData.branch_warehouse_id}
                    onChange={(e) => setFormData({...formData, branch_warehouse_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Branch Warehouse</option>
                    {branchWarehouses.map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
                  <input
                    type="text"
                    value={formData.manager_name}
                    onChange={(e) => setFormData({...formData, manager_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager Phone</label>
                  <input
                    type="tel"
                    value={formData.manager_phone}
                    onChange={(e) => setFormData({...formData, manager_phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (units)</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
                  <input
                    type="number"
                    value={formData.area_sqft}
                    onChange={(e) => setFormData({...formData, area_sqft: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rack Count</label>
                  <input
                    type="number"
                    value={formData.rack_count}
                    onChange={(e) => setFormData({...formData, rack_count: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone Count</label>
                  <input
                    type="number"
                    value={formData.zone_count}
                    onChange={(e) => setFormData({...formData, zone_count: e.target.value})}
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingWarehouse(null);
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
                  {editingWarehouse ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sub Warehouse Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Basic Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedWarehouse.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Code: {selectedWarehouse.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Branch: {getBranchWarehouseName(selectedWarehouse.branch_warehouse_id)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedWarehouse.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Capacity Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Capacity: {selectedWarehouse.capacity} units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Area: {selectedWarehouse.area_sqft} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Racks: {selectedWarehouse.rack_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Zones: {selectedWarehouse.zone_count}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Manager Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Manager: {selectedWarehouse.manager_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Phone: {selectedWarehouse.manager_phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <div className="mt-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <div>{selectedWarehouse.address}</div>
                    <div>{selectedWarehouse.city}, {selectedWarehouse.state} - {selectedWarehouse.pincode}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubWarehouse;
