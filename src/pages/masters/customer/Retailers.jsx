import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Users, MapPin, Phone, CreditCard, AlertTriangle } from 'lucide-react';
import api from '../../../lib/api.js';

export default function Retailers() {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRetailer, setEditingRetailer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    route: '',
    salesman: '',
    credit_risk: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    route: '',
    salesman: '',
    credit_limit: '',
    payment_terms: '',
    price_list: '',
    credit_risk: 'low',
    status: 'active'
  });

  const [routes, setRoutes] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [priceLists, setPriceLists] = useState([]);

  useEffect(() => {
    fetchRetailers();
    fetchRoutes();
    fetchSalesmen();
    fetchPriceLists();
  }, []);

  const fetchRetailers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/customers?type=retailer');
      setRetailers(response.data);
    } catch (error) {
      console.error('Error fetching retailers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await api.get('/routes');
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const fetchSalesmen = async () => {
    try {
      const response = await api.get('/employees?role=salesman');
      setSalesmen(response.data);
    } catch (error) {
      console.error('Error fetching salesmen:', error);
    }
  };

  const fetchPriceLists = async () => {
    try {
      const response = await api.get('/price-lists');
      setPriceLists(response.data);
    } catch (error) {
      console.error('Error fetching price lists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        type: 'retailer',
        credit_limit: parseFloat(formData.credit_limit) || 0,
        payment_terms: parseFloat(formData.payment_terms) || 0
      };
      
      if (editingRetailer) {
        await api.put(`/customers/${editingRetailer.id}`, data);
      } else {
        await api.post('/customers', data);
      }
      setShowModal(false);
      setEditingRetailer(null);
      resetForm();
      fetchRetailers();
    } catch (error) {
      console.error('Error saving retailer:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      phone: '',
      email: '',
      gstin: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      route: '',
      salesman: '',
      credit_limit: '',
      payment_terms: '',
      price_list: '',
      credit_risk: 'low',
      status: 'active'
    });
  };

  const handleEdit = (retailer) => {
    setEditingRetailer(retailer);
    setFormData({
      name: retailer.name || '',
      code: retailer.code || '',
      phone: retailer.phone || '',
      email: retailer.email || '',
      gstin: retailer.gstin || '',
      address: retailer.address || '',
      city: retailer.city || '',
      state: retailer.state || '',
      pincode: retailer.pincode || '',
      route: retailer.route || '',
      salesman: retailer.salesman || '',
      credit_limit: retailer.credit_limit || '',
      payment_terms: retailer.payment_terms || '',
      price_list: retailer.price_list || '',
      credit_risk: retailer.credit_risk || 'low',
      status: retailer.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this retailer?')) {
      try {
        await api.delete(`/customers/${id}`);
        fetchRetailers();
      } catch (error) {
        console.error('Error deleting retailer:', error);
      }
    }
  };

  const filteredRetailers = retailers.filter(retailer => {
    const route = routes.find(r => r.id === retailer.route);
    const salesman = salesmen.find(s => s.id === retailer.salesman);
    
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.phone.includes(searchTerm) ||
                         (route?.name && route.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRoute = !filters.route || retailer.route === filters.route;
    const matchesSalesman = !filters.salesman || retailer.salesman === filters.salesman;
    const matchesCreditRisk = !filters.credit_risk || retailer.credit_risk === filters.credit_risk;
    const matchesStatus = !filters.status || retailer.status === filters.status;

    return matchesSearch && matchesRoute && matchesSalesman && matchesCreditRisk && matchesStatus;
  });

  const getCreditRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutstandingStatus = (retailer) => {
    const outstanding = retailer.outstanding || 0;
    const creditLimit = retailer.credit_limit || 0;
    
    if (outstanding === 0) return { status: 'No Outstanding', color: 'bg-green-100 text-green-800' };
    if (outstanding > creditLimit) return { status: 'Over Limit', color: 'bg-red-100 text-red-800' };
    if (outstanding > creditLimit * 0.8) return { status: 'Near Limit', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Within Limit', color: 'bg-blue-100 text-blue-800' };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Retailers</h1>
          <p className="text-gray-600">Manage retailer customers and their information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Retailer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, code, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
            <select
              value={filters.route}
              onChange={(e) => setFilters({...filters, route: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Routes</option>
              {routes.map(route => (
                <option key={route.id} value={route.id}>{route.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salesman</label>
            <select
              value={filters.salesman}
              onChange={(e) => setFilters({...filters, salesman: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Salesmen</option>
              {salesmen.map(salesman => (
                <option key={salesman.id} value={salesman.id}>{salesman.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Risk</label>
            <select
              value={filters.credit_risk}
              onChange={(e) => setFilters({...filters, credit_risk: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Risks</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({route: '', salesman: '', credit_risk: '', status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route/Salesman</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredRetailers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No retailers found</td>
                </tr>
              ) : (
                filteredRetailers.map((retailer) => {
                  const route = routes.find(r => r.id === retailer.route);
                  const salesman = salesmen.find(s => s.id === retailer.salesman);
                  const outstandingStatus = getOutstandingStatus(retailer);
                  
                  return (
                    <tr key={retailer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{retailer.name}</div>
                            <div className="text-sm text-gray-500">{retailer.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-1">
                            <Phone size={14} className="text-gray-400" />
                            {retailer.phone}
                          </div>
                          {retailer.email && (
                            <div className="text-sm text-gray-500">{retailer.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            {retailer.city}, {retailer.state}
                          </div>
                          <div className="text-sm text-gray-500">{retailer.pincode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{route?.name || '-'}</div>
                        <div className="text-sm text-gray-500">{salesman?.name || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <CreditCard size={14} className="text-gray-400" />
                          ₹{retailer.credit_limit?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${outstandingStatus.color}`}>
                            ₹{retailer.outstanding?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCreditRiskColor(retailer.credit_risk)}`}>
                          {retailer.credit_risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(retailer)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(retailer.id)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingRetailer ? 'Edit Retailer' : 'Add Retailer'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingRetailer(null);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter retailer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Auto-generated or manual"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter GSTIN number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <select
                    value={formData.route}
                    onChange={(e) => setFormData({...formData, route: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Route</option>
                    {routes.map(route => (
                      <option key={route.id} value={route.id}>{route.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salesman</label>
                  <select
                    value={formData.salesman}
                    onChange={(e) => setFormData({...formData, salesman: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Salesman</option>
                    {salesmen.map(salesman => (
                      <option key={salesman.id} value={salesman.id}>{salesman.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.credit_limit}
                    onChange={(e) => setFormData({...formData, credit_limit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms (Days)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.payment_terms}
                    onChange={(e) => setFormData({...formData, payment_terms: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price List</label>
                  <select
                    value={formData.price_list}
                    onChange={(e) => setFormData({...formData, price_list: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Price List</option>
                    {priceLists.map(priceList => (
                      <option key={priceList.id} value={priceList.id}>{priceList.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Risk</label>
                  <select
                    value={formData.credit_risk}
                    onChange={(e) => setFormData({...formData, credit_risk: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
                    setEditingRetailer(null);
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
                  {editingRetailer ? 'Update' : 'Create'} Retailer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

