import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calculator, DollarSign, Calendar, BookOpen } from 'lucide-react';
import api from '../../../lib/api';

const LedgerOpeningBalance = () => {
  const [openingBalances, setOpeningBalances] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBalance, setEditingBalance] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBalance, setSelectedBalance] = useState(null);

  const [formData, setFormData] = useState({
    ledger_id: '',
    financial_year: '',
    opening_debit: '',
    opening_credit: '',
    balance_type: '',
    as_on_date: '',
    remarks: ''
  });

  const balanceTypes = ['Debit', 'Credit', 'Zero'];
  const financialYears = ['2023-24', '2024-25', '2025-26', '2026-27'];

  useEffect(() => {
    fetchOpeningBalances();
    fetchLedgers();
  }, []);

  const fetchOpeningBalances = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ledger-opening-balances');
      setOpeningBalances(response.data);
    } catch (error) {
      console.error('Error fetching opening balances:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLedgers = async () => {
    try {
      const response = await api.get('/ledgers');
      setLedgers(response.data);
    } catch (error) {
      console.error('Error fetching ledgers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBalance) {
        await api.put(`/ledger-opening-balances/${editingBalance.id}`, formData);
      } else {
        await api.post('/ledger-opening-balances', formData);
      }
      setShowModal(false);
      setEditingBalance(null);
      resetForm();
      fetchOpeningBalances();
    } catch (error) {
      console.error('Error saving opening balance:', error);
    }
  };

  const handleEdit = (balance) => {
    setEditingBalance(balance);
    setFormData(balance);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this opening balance?')) {
      try {
        await api.delete(`/ledger-opening-balances/${id}`);
        fetchOpeningBalances();
      } catch (error) {
        console.error('Error deleting opening balance:', error);
      }
    }
  };

  const handleViewInfo = (balance) => {
    setSelectedBalance(balance);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      ledger_id: '',
      financial_year: '',
      opening_debit: '',
      opening_credit: '',
      balance_type: '',
      as_on_date: '',
      remarks: ''
    });
  };

  const filteredBalances = openingBalances.filter(balance => {
    const ledger = ledgers.find(l => l.id === balance.ledger_id);
    const matchesSearch = ledger?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         balance.financial_year?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterType || balance.balance_type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ledger Opening Balance</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Opening Balance
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
                placeholder="Search ledgers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {balanceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ledger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Debit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Credit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">As On Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredBalances.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No opening balances found</td>
                </tr>
              ) : (
                filteredBalances.map((balance) => {
                  const ledger = ledgers.find(l => l.id === balance.ledger_id);
                  return (
                    <tr key={balance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900">{ledger?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{balance.financial_year}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-900">₹{balance.opening_debit || '0.00'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">₹{balance.opening_credit || '0.00'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          balance.balance_type === 'Debit' 
                            ? 'bg-red-100 text-red-800' 
                            : balance.balance_type === 'Credit'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {balance.balance_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{balance.as_on_date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewInfo(balance)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(balance)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(balance.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingBalance ? 'Edit Opening Balance' : 'Add New Opening Balance'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ledger *</label>
                  <select
                    required
                    value={formData.ledger_id}
                    onChange={(e) => setFormData({...formData, ledger_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Ledger</option>
                    {ledgers.map(ledger => (
                      <option key={ledger.id} value={ledger.id}>{ledger.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year *</label>
                  <select
                    required
                    value={formData.financial_year}
                    onChange={(e) => setFormData({...formData, financial_year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    {financialYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Debit</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.opening_debit}
                    onChange={(e) => setFormData({...formData, opening_debit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Credit</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.opening_credit}
                    onChange={(e) => setFormData({...formData, opening_credit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Balance Type *</label>
                  <select
                    required
                    value={formData.balance_type}
                    onChange={(e) => setFormData({...formData, balance_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {balanceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">As On Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.as_on_date}
                    onChange={(e) => setFormData({...formData, as_on_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingBalance(null);
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
                  {editingBalance ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedBalance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Opening Balance Details</h2>
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
                  <h3 className="font-semibold text-gray-900">Ledger Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Ledger: {ledgers.find(l => l.id === selectedBalance.ledger_id)?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Financial Year: {selectedBalance.financial_year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">As On Date: {selectedBalance.as_on_date}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Balance Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">Opening Debit: ₹{selectedBalance.opening_debit || '0.00'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Opening Credit: ₹{selectedBalance.opening_credit || '0.00'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Balance Type: {selectedBalance.balance_type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Remarks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedBalance.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LedgerOpeningBalance;
