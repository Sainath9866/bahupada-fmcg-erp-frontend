import { useState, useEffect } from 'react';
import { Search, Save, RefreshCw, Download, Upload } from 'lucide-react';
import api from '../../../lib/api.js';

export default function LedgerOpeningBalance() {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    group: '',
    status: ''
  });

  const [openingBalances, setOpeningBalances] = useState({});
  const [ledgerGroups, setLedgerGroups] = useState([]);

  useEffect(() => {
    fetchLedgers();
    fetchLedgerGroups();
  }, []);

  const fetchLedgers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/ledgers');
      setLedgers(response.data);
      
      // Initialize opening balances
      const balances = {};
      response.data.forEach(ledger => {
        balances[ledger.id] = {
          opening_balance: ledger.opening_balance || 0,
          balance_type: ledger.balance_type || 'debit'
        };
      });
      setOpeningBalances(balances);
    } catch (error) {
      console.error('Error fetching ledgers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLedgerGroups = async () => {
    try {
      const response = await api.get('/ledger-groups');
      setLedgerGroups(response.data);
    } catch (error) {
      console.error('Error fetching ledger groups:', error);
    }
  };

  const handleBalanceChange = (ledgerId, field, value) => {
    setOpeningBalances(prev => ({
      ...prev,
      [ledgerId]: {
        ...prev[ledgerId],
        [field]: value
      }
    }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(openingBalances).map(([ledgerId, balance]) => ({
        id: ledgerId,
        opening_balance: parseFloat(balance.opening_balance) || 0,
        balance_type: balance.balance_type
      }));

      await api.put('/ledgers/opening-balances', { updates });
      alert('Opening balances updated successfully!');
      fetchLedgers();
    } catch (error) {
      console.error('Error saving opening balances:', error);
      alert('Error saving opening balances. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSingle = async (ledgerId) => {
    try {
      const balance = openingBalances[ledgerId];
      await api.put(`/ledgers/${ledgerId}`, {
        opening_balance: parseFloat(balance.opening_balance) || 0,
        balance_type: balance.balance_type
      });
      
      // Update the ledger in the list
      setLedgers(prev => prev.map(ledger => 
        ledger.id === ledgerId 
          ? { ...ledger, opening_balance: balance.opening_balance, balance_type: balance.balance_type }
          : ledger
      ));
      
      alert('Opening balance updated successfully!');
    } catch (error) {
      console.error('Error saving opening balance:', error);
      alert('Error saving opening balance. Please try again.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      fetchLedgers();
    }
  };

  const filteredLedgers = ledgers.filter(ledger => {
    const matchesSearch = ledger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (ledger.code && ledger.code.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGroup = !filters.group || ledger.group === filters.group;
    const matchesStatus = !filters.status || ledger.status === filters.status;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  const getTotalDebit = () => {
    return filteredLedgers.reduce((total, ledger) => {
      const balance = openingBalances[ledger.id];
      if (balance && balance.balance_type === 'debit') {
        return total + (parseFloat(balance.opening_balance) || 0);
      }
      return total;
    }, 0);
  };

  const getTotalCredit = () => {
    return filteredLedgers.reduce((total, ledger) => {
      const balance = openingBalances[ledger.id];
      if (balance && balance.balance_type === 'credit') {
        return total + (parseFloat(balance.opening_balance) || 0);
      }
      return total;
    }, 0);
  };

  const isBalanced = () => {
    return Math.abs(getTotalDebit() - getTotalCredit()) < 0.01;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Ledger Opening Balance</h1>
          <p className="text-gray-600">Set opening balances for all ledgers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">₹{getTotalDebit().toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Debit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{getTotalCredit().toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Credit</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isBalanced() ? 'text-green-600' : 'text-red-600'}`}>
              ₹{Math.abs(getTotalDebit() - getTotalCredit()).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {isBalanced() ? 'Balanced' : 'Difference'}
            </div>
          </div>
        </div>
        {!isBalanced() && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 text-sm">
              ⚠️ Opening balances are not balanced. Total debit and credit must be equal.
            </div>
          </div>
        )}
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
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
            <select
              value={filters.group}
              onChange={(e) => setFilters({...filters, group: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Groups</option>
              {ledgerGroups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ledger Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredLedgers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No ledgers found</td>
                </tr>
              ) : (
                filteredLedgers.map((ledger) => {
                  const balance = openingBalances[ledger.id] || { opening_balance: 0, balance_type: 'debit' };
                  return (
                    <tr key={ledger.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ledger.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ledger.code || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ledgerGroups.find(g => g.id === ledger.group)?.name || ledger.group || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          step="0.01"
                          value={balance.opening_balance}
                          onChange={(e) => handleBalanceChange(ledger.id, 'opening_balance', e.target.value)}
                          className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={balance.balance_type}
                          onChange={(e) => handleBalanceChange(ledger.id, 'balance_type', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        >
                          <option value="debit">Debit</option>
                          <option value="credit">Credit</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleSaveSingle(ledger.id)}
                          className="text-purple-600 hover:text-purple-900 p-1"
                          title="Save this ledger"
                        >
                          <Save size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}







