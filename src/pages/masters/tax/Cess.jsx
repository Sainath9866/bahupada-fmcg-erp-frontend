import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Percent, AlertTriangle } from 'lucide-react';
import api from '../../../lib/api.js';

export default function Cess() {
  const [cesses, setCesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCess, setEditingCess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cess_type: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    cess_type: 'additional_cess',
    rate: '',
    threshold_amount: '',
    description: '',
    effective_from: '',
    effective_to: '',
    status: 'active'
  });

  useEffect(() => {
    fetchCesses();
  }, []);

  const fetchCesses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/cess');
      setCesses(response.data);
    } catch (error) {
      console.error('Error fetching cess:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        rate: parseFloat(formData.rate) || 0,
        threshold_amount: parseFloat(formData.threshold_amount) || 0,
        effective_from: formData.effective_from || null,
        effective_to: formData.effective_to || null
      };
      
      if (editingCess) {
        await api.put(`/cess/${editingCess.id}`, data);
      } else {
        await api.post('/cess', data);
      }
      setShowModal(false);
      setEditingCess(null);
      resetForm();
      fetchCesses();
    } catch (error) {
      console.error('Error saving cess:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      cess_type: 'additional_cess',
      rate: '',
      threshold_amount: '',
      description: '',
      effective_from: '',
      effective_to: '',
      status: 'active'
    });
  };

  const handleEdit = (cess) => {
    setEditingCess(cess);
    setFormData({
      name: cess.name || '',
      cess_type: cess.cess_type || 'additional_cess',
      rate: cess.rate || '',
      threshold_amount: cess.threshold_amount || '',
      description: cess.description || '',
      effective_from: cess.effective_from || '',
      effective_to: cess.effective_to || '',
      status: cess.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cess?')) {
      try {
        await api.delete(`/cess/${id}`);
        fetchCesses();
      } catch (error) {
        console.error('Error deleting cess:', error);
      }
    }
  };

  const filteredCesses = cesses.filter(cess => {
    const matchesSearch = cess.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cess.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filters.cess_type || cess.cess_type === filters.cess_type;
    const matchesStatus = !filters.status || cess.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getCessTypeDisplay = (cess) => {
    switch (cess.cess_type) {
      case 'additional_cess': return 'Additional Cess';
      case 'health_cess': return 'Health Cess';
      case 'education_cess': return 'Education Cess';
      case 'krishi_cess': return 'Krishi Cess';
      default: return cess.cess_type;
    }
  };

  const getCessTypeColor = (cess) => {
    switch (cess.cess_type) {
      case 'additional_cess': return 'bg-red-100 text-red-800';
      case 'health_cess': return 'bg-green-100 text-green-800';
      case 'education_cess': return 'bg-blue-100 text-blue-800';
      case 'krishi_cess': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffectiveStatus = (cess) => {
    const now = new Date();
    const from = cess.effective_from ? new Date(cess.effective_from) : null;
    const to = cess.effective_to ? new Date(cess.effective_to) : null;

    if (from && now < from) return { status: 'future', color: 'bg-blue-100 text-blue-800' };
    if (to && now > to) return { status: 'expired', color: 'bg-red-100 text-red-800' };
    return { status: 'active', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Cess</h1>
          <p className="text-gray-600">Manage cess rates and configurations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Cess
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cess Type</label>
            <select
              value={filters.cess_type}
              onChange={(e) => setFilters({...filters, cess_type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="additional_cess">Additional Cess</option>
              <option value="health_cess">Health Cess</option>
              <option value="education_cess">Education Cess</option>
              <option value="krishi_cess">Krishi Cess</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({cess_type: '', status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredCesses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No cess found</td>
                </tr>
              ) : (
                filteredCesses.map((cess) => {
                  const effectiveStatus = getEffectiveStatus(cess);
                  
                  return (
                    <tr key={cess.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{cess.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCessTypeColor(cess)}`}>
                          {getCessTypeDisplay(cess)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <Percent size={14} className="text-gray-400" />
                          {cess.rate}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cess.threshold_amount ? `₹${cess.threshold_amount.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          {cess.effective_from && (
                            <div>From: {new Date(cess.effective_from).toLocaleDateString()}</div>
                          )}
                          {cess.effective_to && (
                            <div>To: {new Date(cess.effective_to).toLocaleDateString()}</div>
                          )}
                          {!cess.effective_from && !cess.effective_to && (
                            <div>Always Active</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${effectiveStatus.color}`}>
                          {effectiveStatus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(cess)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cess.id)}
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
                {editingCess ? 'Edit Cess' : 'Add Cess'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCess(null);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cess Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Additional Cess on Luxury Items"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cess Type *</label>
                  <select
                    required
                    value={formData.cess_type}
                    onChange={(e) => setFormData({...formData, cess_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="additional_cess">Additional Cess</option>
                    <option value="health_cess">Health Cess</option>
                    <option value="education_cess">Education Cess</option>
                    <option value="krishi_cess">Krishi Cess</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate (%) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    required
                    value={formData.rate}
                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Threshold Amount (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.threshold_amount}
                    onChange={(e) => setFormData({...formData, threshold_amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter cess description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective From</label>
                  <input
                    type="date"
                    value={formData.effective_from}
                    onChange={(e) => setFormData({...formData, effective_from: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective To</label>
                  <input
                    type="date"
                    value={formData.effective_to}
                    onChange={(e) => setFormData({...formData, effective_to: e.target.value})}
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

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <strong>Note:</strong> Cess is an additional tax levied on specific goods or services. Threshold amount is the minimum value above which cess applies.
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCess(null);
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
                  {editingCess ? 'Update' : 'Create'} Cess
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

