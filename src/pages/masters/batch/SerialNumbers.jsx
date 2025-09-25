import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Hash, Package, QrCode } from 'lucide-react';
import api from '../../../lib/api.js';

export default function SerialNumbers() {
  const [serials, setSerials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSerial, setEditingSerial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    item: '',
    status: '',
    location: ''
  });

  const [formData, setFormData] = useState({
    serial_number: '',
    item: '',
    batch_number: '',
    location: '',
    purchase_date: '',
    warranty_expiry: '',
    status: 'active'
  });

  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchSerials();
    fetchItems();
    fetchLocations();
  }, []);

  const fetchSerials = async () => {
    setLoading(true);
    try {
      const response = await api.get('/serial-numbers');
      setSerials(response.data);
    } catch (error) {
      console.error('Error fetching serial numbers:', error);
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

  const fetchLocations = async () => {
    try {
      const response = await api.get('/warehouses');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        purchase_date: formData.purchase_date || null,
        warranty_expiry: formData.warranty_expiry || null
      };
      
      if (editingSerial) {
        await api.put(`/serial-numbers/${editingSerial.id}`, data);
      } else {
        await api.post('/serial-numbers', data);
      }
      setShowModal(false);
      setEditingSerial(null);
      resetForm();
      fetchSerials();
    } catch (error) {
      console.error('Error saving serial number:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      serial_number: '',
      item: '',
      batch_number: '',
      location: '',
      purchase_date: '',
      warranty_expiry: '',
      status: 'active'
    });
  };

  const handleEdit = (serial) => {
    setEditingSerial(serial);
    setFormData({
      serial_number: serial.serial_number || '',
      item: serial.item || '',
      batch_number: serial.batch_number || '',
      location: serial.location || '',
      purchase_date: serial.purchase_date || '',
      warranty_expiry: serial.warranty_expiry || '',
      status: serial.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this serial number?')) {
      try {
        await api.delete(`/serial-numbers/${id}`);
        fetchSerials();
      } catch (error) {
        console.error('Error deleting serial number:', error);
      }
    }
  };

  const filteredSerials = serials.filter(serial => {
    const item = items.find(i => i.id === serial.item);
    const location = locations.find(l => l.id === serial.location);
    
    const matchesSearch = serial.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item?.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (serial.batch_number && serial.batch_number.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesItem = !filters.item || serial.item === filters.item;
    const matchesStatus = !filters.status || serial.status === filters.status;
    const matchesLocation = !filters.location || serial.location === filters.location;

    return matchesSearch && matchesItem && matchesStatus && matchesLocation;
  });

  const getWarrantyStatus = (serial) => {
    if (!serial.warranty_expiry) return { status: 'No Warranty', color: 'bg-gray-100 text-gray-800' };
    
    const warrantyDate = new Date(serial.warranty_expiry);
    const now = new Date();
    const daysToExpiry = Math.ceil((warrantyDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysToExpiry < 0) return { status: 'Expired', color: 'bg-red-100 text-red-800' };
    if (daysToExpiry <= 30) return { status: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Valid', color: 'bg-green-100 text-green-800' };
  };

  const generateQRCode = (serialNumber) => {
    // This would typically generate a QR code for the serial number
    // For now, we'll just show a placeholder
    return `QR: ${serialNumber}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Serial Numbers</h1>
          <p className="text-gray-600">Manage serial numbers and tracking information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Serial Number
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
                placeholder="Search by serial number, item, or batch..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({item: '', status: '', location: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredSerials.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No serial numbers found</td>
                </tr>
              ) : (
                filteredSerials.map((serial) => {
                  const item = items.find(i => i.id === serial.item);
                  const location = locations.find(l => l.id === serial.location);
                  const warrantyStatus = getWarrantyStatus(serial);
                  
                  return (
                    <tr key={serial.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Hash size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 font-mono">{serial.serial_number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item?.name || '-'}</div>
                        <div className="text-sm text-gray-500">{item?.sku || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {serial.batch_number ? (
                          <span className="font-mono">{serial.batch_number}</span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {location?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {serial.purchase_date ? (
                          new Date(serial.purchase_date).toLocaleDateString()
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${warrantyStatus.color}`}>
                          {warrantyStatus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => generateQRCode(serial.serial_number)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Generate QR Code"
                          >
                            <QrCode size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(serial)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(serial.id)}
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
                {editingSerial ? 'Edit Serial Number' : 'Add Serial Number'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingSerial(null);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.serial_number}
                    onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                    placeholder="e.g., SN123456789, ABC123XYZ"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batch_number}
                    onChange={(e) => setFormData({...formData, batch_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                    placeholder="e.g., BATCH001, LOT2024001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchase_date}
                    onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry</label>
                  <input
                    type="date"
                    value={formData.warranty_expiry}
                    onChange={(e) => setFormData({...formData, warranty_expiry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Note:</strong> Serial numbers are unique identifiers for individual items. They help track specific units for warranty, service, and inventory purposes.
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingSerial(null);
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
                  {editingSerial ? 'Update' : 'Create'} Serial Number
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}







