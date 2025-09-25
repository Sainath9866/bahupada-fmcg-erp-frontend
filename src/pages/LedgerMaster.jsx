import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Download, Link as LinkIcon } from 'lucide-react';

export default function LedgerMaster() {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLedger, setEditingLedger] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    opening_balance: '',
    zoho_ledger_id: '',
    is_active: true
  });

  useEffect(() => {
    loadLedgers();
  }, []);

  const loadLedgers = async () => {
    setLoading(true);
    try {
      // Mock data
      const mockLedgers = [
        {
          id: 1,
          name: 'Cash Account',
          type: 'Asset',
          opening_balance: 50000,
          zoho_ledger_id: 'zoho_12345',
          is_active: true,
          created_at: '2024-01-15'
        },
        {
          id: 2,
          name: 'Bank Account - HDFC',
          type: 'Asset',
          opening_balance: 250000,
          zoho_ledger_id: 'zoho_67890',
          is_active: true,
          created_at: '2024-01-20'
        },
        {
          id: 3,
          name: 'Sales Account',
          type: 'Income',
          opening_balance: 0,
          zoho_ledger_id: 'zoho_11111',
          is_active: true,
          created_at: '2024-01-25'
        },
        {
          id: 4,
          name: 'Purchase Account',
          type: 'Expense',
          opening_balance: 0,
          zoho_ledger_id: 'zoho_22222',
          is_active: true,
          created_at: '2024-01-30'
        }
      ];
      setLedgers(mockLedgers);
    } catch (error) {
      console.error('Error loading ledgers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingLedger) {
        // Update ledger
        setLedgers(ledgers.map(l => l.id === editingLedger.id ? { ...l, ...formData } : l));
      } else {
        // Create new ledger
        const newLedger = {
          id: Date.now(),
          ...formData,
          created_at: new Date().toISOString().split('T')[0]
        };
        setLedgers([...ledgers, newLedger]);
      }
      setShowModal(false);
      setEditingLedger(null);
      setFormData({
        name: '',
        type: '',
        opening_balance: '',
        zoho_ledger_id: '',
        is_active: true
      });
    } catch (error) {
      console.error('Error saving ledger:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ledger) => {
    setEditingLedger(ledger);
    setFormData(ledger);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ledger?')) {
      setLedgers(ledgers.filter(l => l.id !== id));
    }
  };

  const filteredLedgers = ledgers.filter(ledger =>
    ledger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ledger.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'Asset': return 'bg-green-100 text-green-800';
      case 'Liability': return 'bg-red-100 text-red-800';
      case 'Income': return 'bg-blue-100 text-blue-800';
      case 'Expense': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Ledger Master</h1>
        <p className="text-gray-600 mt-1">Manage your chart of accounts and ledger information</p>
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
                placeholder="Search ledgers..."
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
              Add Ledger
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ledger Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zoho Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading ledgers...</td>
                </tr>
              ) : filteredLedgers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No ledgers found</td>
                </tr>
              ) : (
                filteredLedgers.map((ledger) => (
                  <tr key={ledger.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ledger.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(ledger.type)}`}>
                        {ledger.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{ledger.opening_balance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ledger.zoho_ledger_id ? (
                        <div className="flex items-center gap-2">
                          <LinkIcon size={14} className="text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Linked</span>
                          <span className="text-xs text-gray-500">({ledger.zoho_ledger_id})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not Linked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        ledger.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ledger.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(ledger)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(ledger.id)}
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingLedger ? 'Edit Ledger' : 'Add New Ledger'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ledger Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="Asset">Asset</option>
                  <option value="Liability">Liability</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opening Balance</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.opening_balance}
                  onChange={(e) => setFormData({...formData, opening_balance: e.target.value})}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zoho Ledger ID</label>
                <input
                  type="text"
                  value={formData.zoho_ledger_id}
                  onChange={(e) => setFormData({...formData, zoho_ledger_id: e.target.value})}
                  placeholder="Enter Zoho ledger ID for sync"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty if not synced with Zoho</p>
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
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingLedger(null);
                    setFormData({
                      name: '',
                      type: '',
                      opening_balance: '',
                      zoho_ledger_id: '',
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
                  {loading ? 'Saving...' : (editingLedger ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}







