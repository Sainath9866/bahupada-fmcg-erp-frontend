import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Download, Truck, User, DollarSign } from 'lucide-react';

export default function VehicleMaster() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    registration_number: '',
    vehicle_type: '',
    driver_name: '',
    driver_phone: '',
    transporter: '',
    capacity: '',
    fuel_type: '',
    insurance_expiry: '',
    permit_expiry: '',
    maintenance_cost: '',
    is_active: true
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      // Mock data
      const mockVehicles = [
        {
          id: 1,
          registration_number: 'MH01AB1234',
          vehicle_type: 'Truck',
          driver_name: 'Ramesh Kumar',
          driver_phone: '+91 9876543210',
          transporter: 'ABC Transport',
          capacity: '5000 kg',
          fuel_type: 'Diesel',
          insurance_expiry: '2024-12-31',
          permit_expiry: '2024-11-30',
          maintenance_cost: 15000,
          is_active: true,
          created_at: '2024-01-15'
        },
        {
          id: 2,
          registration_number: 'DL02CD5678',
          vehicle_type: 'Van',
          driver_name: 'Suresh Singh',
          driver_phone: '+91 9876543211',
          transporter: 'XYZ Logistics',
          capacity: '2000 kg',
          fuel_type: 'Petrol',
          insurance_expiry: '2024-10-15',
          permit_expiry: '2024-09-30',
          maintenance_cost: 8000,
          is_active: true,
          created_at: '2024-01-20'
        },
        {
          id: 3,
          registration_number: 'KA03EF9012',
          vehicle_type: 'Mini Truck',
          driver_name: 'Vikram Reddy',
          driver_phone: '+91 9876543212',
          transporter: 'PQR Cargo',
          capacity: '3000 kg',
          fuel_type: 'Diesel',
          insurance_expiry: '2024-11-20',
          permit_expiry: '2024-10-15',
          maintenance_cost: 12000,
          is_active: true,
          created_at: '2024-02-01'
        }
      ];
      setVehicles(mockVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingVehicle) {
        // Update vehicle
        setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...v, ...formData } : v));
      } else {
        // Create new vehicle
        const newVehicle = {
          id: Date.now(),
          ...formData,
          created_at: new Date().toISOString().split('T')[0]
        };
        setVehicles([...vehicles, newVehicle]);
      }
      setShowModal(false);
      setEditingVehicle(null);
      setFormData({
        registration_number: '',
        vehicle_type: '',
        driver_name: '',
        driver_phone: '',
        transporter: '',
        capacity: '',
        fuel_type: '',
        insurance_expiry: '',
        permit_expiry: '',
        maintenance_cost: '',
        is_active: true
      });
    } catch (error) {
      console.error('Error saving vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.transporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVehicleTypeColor = (type) => {
    switch (type) {
      case 'Truck': return 'bg-blue-100 text-blue-800';
      case 'Van': return 'bg-green-100 text-green-800';
      case 'Mini Truck': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpiringSoon = (date) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isExpired = (date) => {
    const expiryDate = new Date(date);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicle Master</h1>
        <p className="text-gray-600 mt-1">Manage your fleet vehicles and driver information</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-gray-50 border border-gray-200 rounded px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium"
            >
              <Plus size={16} />
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity & Fuel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading vehicles...</td>
                </tr>
              ) : filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No vehicles found</td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vehicle.registration_number}</div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVehicleTypeColor(vehicle.vehicle_type)}`}>
                          {vehicle.vehicle_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-900">{vehicle.driver_name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{vehicle.driver_phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vehicle.transporter}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{vehicle.capacity}</div>
                        <div className="text-sm text-gray-500">{vehicle.fuel_type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Insurance:</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            isExpired(vehicle.insurance_expiry) ? 'bg-red-100 text-red-800' :
                            isExpiringSoon(vehicle.insurance_expiry) ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {new Date(vehicle.insurance_expiry).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Permit:</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            isExpired(vehicle.permit_expiry) ? 'bg-red-100 text-red-800' :
                            isExpiringSoon(vehicle.permit_expiry) ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {new Date(vehicle.permit_expiry).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          vehicle.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicle.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <DollarSign size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">₹{vehicle.maintenance_cost.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.registration_number}
                    onChange={(e) => setFormData({...formData, registration_number: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
                  <select
                    required
                    value={formData.vehicle_type}
                    onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Mini Truck">Mini Truck</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.driver_name}
                    onChange={(e) => setFormData({...formData, driver_name: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.driver_phone}
                    onChange={(e) => setFormData({...formData, driver_phone: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transporter *</label>
                  <input
                    type="text"
                    required
                    value={formData.transporter}
                    onChange={(e) => setFormData({...formData, transporter: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    placeholder="e.g., 5000 kg"
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    value={formData.fuel_type}
                    onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Expiry</label>
                  <input
                    type="date"
                    value={formData.insurance_expiry}
                    onChange={(e) => setFormData({...formData, insurance_expiry: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permit Expiry</label>
                  <input
                    type="date"
                    value={formData.permit_expiry}
                    onChange={(e) => setFormData({...formData, permit_expiry: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Cost (₹)</label>
                  <input
                    type="number"
                    value={formData.maintenance_cost}
                    onChange={(e) => setFormData({...formData, maintenance_cost: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.value === 'true'})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingVehicle(null);
                    setFormData({
                      registration_number: '',
                      vehicle_type: '',
                      driver_name: '',
                      driver_phone: '',
                      transporter: '',
                      capacity: '',
                      fuel_type: '',
                      insurance_expiry: '',
                      permit_expiry: '',
                      maintenance_cost: '',
                      is_active: true
                    });
                  }}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingVehicle ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}







