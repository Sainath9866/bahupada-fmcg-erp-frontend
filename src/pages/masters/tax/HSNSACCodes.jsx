import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Hash, FileText } from 'lucide-react';
import api from '../../../lib/api.js';

export default function HSNSACCodes() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    code_type: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    code: '',
    code_type: 'hsn',
    description: '',
    gst_rate: '',
    cess_rate: '',
    status: 'active'
  });

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/hsn-sac-codes');
      setCodes(response.data);
    } catch (error) {
      console.error('Error fetching HSN/SAC codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        gst_rate: parseFloat(formData.gst_rate) || 0,
        cess_rate: parseFloat(formData.cess_rate) || 0
      };
      
      if (editingCode) {
        await api.put(`/hsn-sac-codes/${editingCode.id}`, data);
      } else {
        await api.post('/hsn-sac-codes', data);
      }
      setShowModal(false);
      setEditingCode(null);
      resetForm();
      fetchCodes();
    } catch (error) {
      console.error('Error saving HSN/SAC code:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      code_type: 'hsn',
      description: '',
      gst_rate: '',
      cess_rate: '',
      status: 'active'
    });
  };

  const handleEdit = (code) => {
    setEditingCode(code);
    setFormData({
      code: code.code || '',
      code_type: code.code_type || 'hsn',
      description: code.description || '',
      gst_rate: code.gst_rate || '',
      cess_rate: code.cess_rate || '',
      status: code.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this HSN/SAC code?')) {
      try {
        await api.delete(`/hsn-sac-codes/${id}`);
        fetchCodes();
      } catch (error) {
        console.error('Error deleting HSN/SAC code:', error);
      }
    }
  };

  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filters.code_type || code.code_type === filters.code_type;
    const matchesStatus = !filters.status || code.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getCodeTypeDisplay = (code) => {
    return code.code_type === 'hsn' ? 'HSN' : 'SAC';
  };

  const getCodeTypeColor = (code) => {
    return code.code_type === 'hsn' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">HSN / SAC Codes</h1>
          <p className="text-gray-600">Manage HSN and SAC codes for tax classification</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Code
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
                placeholder="Search by code or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code Type</label>
            <select
              value={filters.code_type}
              onChange={(e) => setFilters({...filters, code_type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="hsn">HSN</option>
              <option value="sac">SAC</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({code_type: '', status: ''})}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cess Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredCodes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No codes found</td>
                </tr>
              ) : (
                filteredCodes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Hash size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 font-mono">{code.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCodeTypeColor(code)}`}>
                        {getCodeTypeDisplay(code)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs truncate">{code.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {code.gst_rate ? `${code.gst_rate}%` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {code.cess_rate ? `${code.cess_rate}%` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        code.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {code.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(code)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(code.id)}
                          className="text-red-600 hover:text-red-900 p-1"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingCode ? 'Edit HSN/SAC Code' : 'Add HSN/SAC Code'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCode(null);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                    placeholder="e.g., 1234, 9987"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Type *</label>
                  <select
                    required
                    value={formData.code_type}
                    onChange={(e) => setFormData({...formData, code_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="hsn">HSN (Harmonized System of Nomenclature)</option>
                    <option value="sac">SAC (Service Accounting Code)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter detailed description of the code..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.gst_rate}
                    onChange={(e) => setFormData({...formData, gst_rate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="18.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cess Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.cess_rate}
                    onChange={(e) => setFormData({...formData, cess_rate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
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
                  <strong>Note:</strong> HSN codes are used for goods classification, while SAC codes are used for services classification under GST.
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCode(null);
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
                  {editingCode ? 'Update' : 'Create'} Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

