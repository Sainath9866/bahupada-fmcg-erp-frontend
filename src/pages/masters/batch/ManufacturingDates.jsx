import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Calendar, Factory, AlertTriangle } from 'lucide-react';
import api from '../../../lib/api.js';

export default function ManufacturingDates() {
  const [manufacturing, setManufacturing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingManufacturing, setEditingManufacturing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    item: '',
    manufacturer: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    batch_number: '',
    item: '',
    manufacturer: '',
    manufacturing_date: '',
    expiry_date: '',
    shelf_life_days: '',
    quality_control_date: '',
    quality_status: 'passed',
    status: 'active'
  });

  const [items, setItems] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetchManufacturing();
    fetchItems();
    fetchManufacturers();
  }, []);

  const fetchManufacturing = async () => {
    setLoading(true);
    try {
      const response = await api.get('/manufacturing-dates');
      setManufacturing(response.data);
    } catch (error) {
      console.error('Error fetching manufacturing data:', error);
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

  const fetchManufacturers = async () => {
    try {
      const response = await api.get('/manufacturers');
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        shelf_life_days: parseFloat(formData.shelf_life_days) || 0
      };
      
      if (editingManufacturing) {
        await api.put(`/manufacturing-dates/${editingManufacturing.id}`, data);
      } else {
        await api.post('/manufacturing-dates', data);
      }
      setShowModal(false);
      setEditingManufacturing(null);
      resetForm();
      fetchManufacturing();
    } catch (error) {
      console.error('Error saving manufacturing data:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      batch_number: '',
      item: '',
      manufacturer: '',
      manufacturing_date: '',
      expiry_date: '',
      shelf_life_days: '',
      quality_control_date: '',
      quality_status: 'passed',
      status: 'active'
    });
  };

  const handleEdit = (manufacturing) => {
    setEditingManufacturing(manufacturing);
    setFormData({
      batch_number: manufacturing.batch_number || '',
      item: manufacturing.item || '',
      manufacturer: manufacturing.manufacturer || '',
      manufacturing_date: manufacturing.manufacturing_date || '',
      expiry_date: manufacturing.expiry_date || '',
      shelf_life_days: manufacturing.shelf_life_days || '',
      quality_control_date: manufacturing.quality_control_date || '',
      quality_status: manufacturing.quality_status || 'passed',
      status: manufacturing.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this manufacturing record?')) {
      try {
        await api.delete(`/manufacturing-dates/${id}`);
        fetchManufacturing();
      } catch (error) {
        console.error('Error deleting manufacturing record:', error);
      }
    }
  };

  const filteredManufacturing = manufacturing.filter(record => {
    const item = items.find(i => i.id === record.item);
    const manufacturer = manufacturers.find(m => m.id === record.manufacturer);
    
    const matchesSearch = record.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item?.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (manufacturer?.name && manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesItem = !filters.item || record.item === filters.item;
    const matchesManufacturer = !filters.manufacturer || record.manufacturer === filters.manufacturer;
    const matchesStatus = !filters.status || record.status === filters.status;

    return matchesSearch && matchesItem && matchesManufacturer && matchesStatus;
  });

  const getQualityStatus = (record) => {
    switch (record.quality_status) {
      case 'passed': return { status: 'Passed', color: 'bg-green-100 text-green-800' };
      case 'failed': return { status: 'Failed', color: 'bg-red-100 text-red-800' };
      case 'pending': return { status: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
      default: return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getShelfLifeStatus = (record) => {
    if (!record.shelf_life_days || !record.manufacturing_date) return null;
    
    const manufacturingDate = new Date(record.manufacturing_date);
    const expiryDate = new Date(manufacturingDate.getTime() + (record.shelf_life_days * 24 * 60 * 60 * 1000));
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
          <h1 className="text-2xl font-semibold text-gray-800">Manufacturing / Expiry Dates</h1>
          <p className="text-gray-600">Manage manufacturing dates and quality control information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Manufacturing Record
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
                placeholder="Search by batch, item, or manufacturer..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
            <select
              value={filters.manufacturer}
              onChange={(e) => setFilters({...filters, manufacturer: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Manufacturers</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({item: '', manufacturer: '', status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturing Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shelf Life</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredManufacturing.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No manufacturing records found</td>
                </tr>
              ) : (
                filteredManufacturing.map((record) => {
                  const item = items.find(i => i.id === record.item);
                  const manufacturer = manufacturers.find(m => m.id === record.manufacturer);
                  const qualityStatus = getQualityStatus(record);
                  const shelfLifeStatus = getShelfLifeStatus(record);
                  
                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Factory size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 font-mono">{record.batch_number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item?.name || '-'}</div>
                        <div className="text-sm text-gray-500">{item?.sku || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {manufacturer?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.manufacturing_date ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(record.manufacturing_date).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.expiry_date ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(record.expiry_date).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${qualityStatus.color}`}>
                          {qualityStatus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shelfLifeStatus ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${shelfLifeStatus.color}`}>
                            {shelfLifeStatus.status}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(record)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
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
                {editingManufacturing ? 'Edit Manufacturing Record' : 'Add Manufacturing Record'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingManufacturing(null);
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <select
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Manufacturer</option>
                  {manufacturers.map(manufacturer => (
                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date *</label>
                  <input
                    type="date"
                    required
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life (Days)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.shelf_life_days}
                    onChange={(e) => setFormData({...formData, shelf_life_days: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="365"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quality Control Date</label>
                  <input
                    type="date"
                    value={formData.quality_control_date}
                    onChange={(e) => setFormData({...formData, quality_control_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quality Status</label>
                  <select
                    value={formData.quality_status}
                    onChange={(e) => setFormData({...formData, quality_status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
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
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingManufacturing(null);
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
                  {editingManufacturing ? 'Update' : 'Create'} Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}







