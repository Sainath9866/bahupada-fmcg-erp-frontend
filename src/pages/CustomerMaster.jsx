import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Info } from 'lucide-react';
import api from '../lib/api.js';

export default function CustomerMaster() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    credit_limit: '',
    payment_terms: '',
    category: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await api.put(`/customers/${editingCustomer.id}`, formData);
      } else {
        await api.post('/customers', formData);
      }
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleInfo = (customer) => {
    setSelectedCustomer(customer);
    setShowInfo(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone || '',
      email: customer.email || '',
      gstin: customer.gstin || '',
      address: customer.address || '',
      credit_limit: customer.credit_limit || '',
      payment_terms: customer.payment_terms || '',
      category: customer.category || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      gstin: '',
      address: '',
      credit_limit: '',
      payment_terms: '',
      category: ''
    });
    setEditingCustomer(null);
    setShowForm(false);
  };

  const closeInfo = () => {
    setShowInfo(false);
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Customer Master</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading customers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Customer Master</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus size={16} />
          Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Customer Table - Desktop View */}
      <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">GSTIN</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Credit Limit</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-400">
                  No customers found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="px-4 py-3 text-white">{customer.name}</td>
                  <td className="px-4 py-3 text-gray-300">{customer.phone || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{customer.email || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{customer.gstin || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{customer.category || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {customer.credit_limit ? `₹${customer.credit_limit}` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInfo(customer)}
                        className="p-1 text-green-400 hover:text-green-300"
                        title="Info"
                      >
                        <Info size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="p-1 text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="p-1 text-red-400 hover:text-red-300"
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

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredCustomers.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
            No customers found
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-medium text-lg">{customer.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInfo(customer)}
                    className="p-2 text-green-400 hover:text-green-300"
                    title="Info"
                  >
                    <Info size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(customer)}
                    className="p-2 text-blue-400 hover:text-blue-300"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-gray-300 ml-2">{customer.phone || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="text-gray-300 ml-2 truncate">{customer.email || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">GSTIN:</span>
                  <span className="text-gray-300 ml-2">{customer.gstin || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-gray-300 ml-2">{customer.category || '-'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400">Credit Limit:</span>
                  <span className="text-gray-300 ml-2">
                    {customer.credit_limit ? `₹${customer.credit_limit}` : '-'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Customer Info Modal */}
      {showInfo && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300">Name</label>
                <p className="text-white">{selectedCustomer.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Phone</label>
                <p className="text-white">{selectedCustomer.phone || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <p className="text-white">{selectedCustomer.email || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">GSTIN</label>
                <p className="text-white">{selectedCustomer.gstin || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Address</label>
                <p className="text-white">{selectedCustomer.address || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Credit Limit</label>
                <p className="text-white">{selectedCustomer.credit_limit ? `₹${selectedCustomer.credit_limit}` : '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Payment Terms</label>
                <p className="text-white">{selectedCustomer.payment_terms || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Category</label>
                <p className="text-white">{selectedCustomer.category || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Created</label>
                <p className="text-white">{new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={closeInfo}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">GSTIN</label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Credit Limit</label>
                <input
                  type="number"
                  value={formData.credit_limit}
                  onChange={(e) => setFormData({...formData, credit_limit: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Payment Terms</label>
                <input
                  type="text"
                  value={formData.payment_terms}
                  onChange={(e) => setFormData({...formData, payment_terms: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="retailer">Retailer</option>
                  <option value="distributor">Distributor</option>
                  <option value="wholesaler">Wholesaler</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  {editingCustomer ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
