import { useState, useEffect } from 'react';
import { Search, Download, Eye, Filter, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import api from '../../../lib/api.js';

export default function LedgerReports() {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    group: '',
    dateFrom: '',
    dateTo: '',
    balanceType: ''
  });
  const [reportType, setReportType] = useState('balance-sheet');

  const [ledgerGroups, setLedgerGroups] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchLedgers();
    fetchLedgerGroups();
  }, []);

  useEffect(() => {
    if (reportType) {
      generateReport();
    }
  }, [reportType, filters]);

  const fetchLedgers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/ledgers');
      setLedgers(response.data);
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

  const generateReport = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.group) params.append('group', filters.group);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);
      if (filters.balanceType) params.append('balanceType', filters.balanceType);

      const response = await api.get(`/ledgers/reports/${reportType}?${params}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleExport = async (format = 'pdf') => {
    try {
      const params = new URLSearchParams();
      params.append('format', format);
      if (filters.group) params.append('group', filters.group);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);

      const response = await api.get(`/ledgers/reports/${reportType}/export?${params}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const getBalanceDisplay = (ledger) => {
    const balance = ledger.current_balance || ledger.opening_balance || 0;
    const isDebit = ledger.balance_type === 'debit';
    const isPositive = balance >= 0;
    
    if (isDebit) {
      return isPositive ? `₹${balance.toLocaleString()}` : `₹${Math.abs(balance).toLocaleString()} (Cr)`;
    } else {
      return isPositive ? `₹${balance.toLocaleString()}` : `₹${Math.abs(balance).toLocaleString()} (Dr)`;
    }
  };

  const getBalanceClass = (ledger) => {
    const balance = ledger.current_balance || ledger.opening_balance || 0;
    if (balance > 0) return 'text-green-600';
    if (balance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const renderBalanceSheet = () => {
    const assets = reportData.filter(ledger => 
      ledger.group_type === 'asset' || ledger.group_name?.toLowerCase().includes('asset')
    );
    const liabilities = reportData.filter(ledger => 
      ledger.group_type === 'liability' || ledger.group_name?.toLowerCase().includes('liability')
    );
    const equity = reportData.filter(ledger => 
      ledger.group_type === 'equity' || ledger.group_name?.toLowerCase().includes('equity')
    );

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            Assets
          </h3>
          <div className="space-y-3">
            {assets.map((ledger) => (
              <div key={ledger.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">{ledger.name}</div>
                  <div className="text-sm text-gray-500">{ledger.group_name}</div>
                </div>
                <div className={`font-semibold ${getBalanceClass(ledger)}`}>
                  {getBalanceDisplay(ledger)}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center py-2 border-t-2 border-gray-300 font-bold text-lg">
              <div>Total Assets</div>
              <div className="text-green-600">
                ₹{assets.reduce((sum, ledger) => sum + (ledger.current_balance || 0), 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Liabilities & Equity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingDown className="text-red-600" size={20} />
            Liabilities & Equity
          </h3>
          <div className="space-y-3">
            {liabilities.map((ledger) => (
              <div key={ledger.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">{ledger.name}</div>
                  <div className="text-sm text-gray-500">{ledger.group_name}</div>
                </div>
                <div className={`font-semibold ${getBalanceClass(ledger)}`}>
                  {getBalanceDisplay(ledger)}
                </div>
              </div>
            ))}
            {equity.map((ledger) => (
              <div key={ledger.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">{ledger.name}</div>
                  <div className="text-sm text-gray-500">{ledger.group_name}</div>
                </div>
                <div className={`font-semibold ${getBalanceClass(ledger)}`}>
                  {getBalanceDisplay(ledger)}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center py-2 border-t-2 border-gray-300 font-bold text-lg">
              <div>Total Liabilities & Equity</div>
              <div className="text-red-600">
                ₹{[...liabilities, ...equity].reduce((sum, ledger) => sum + (ledger.current_balance || 0), 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTrialBalance = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ledger Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((ledger) => {
                const balance = ledger.current_balance || 0;
                const isDebit = ledger.balance_type === 'debit' && balance >= 0;
                const isCredit = ledger.balance_type === 'credit' && balance >= 0;
                
                return (
                  <tr key={ledger.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ledger.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ledger.group_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {isDebit ? `₹${balance.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {isCredit ? `₹${balance.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 font-bold">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" colSpan="2">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  ₹{reportData
                    .filter(ledger => ledger.balance_type === 'debit' && (ledger.current_balance || 0) >= 0)
                    .reduce((sum, ledger) => sum + (ledger.current_balance || 0), 0)
                    .toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  ₹{reportData
                    .filter(ledger => ledger.balance_type === 'credit' && (ledger.current_balance || 0) >= 0)
                    .reduce((sum, ledger) => sum + (ledger.current_balance || 0), 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Ledger Reports / View</h1>
          <p className="text-gray-600">View and export ledger reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport('pdf')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Download size={16} />
            Export PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Download size={16} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Report Type:</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="balance-sheet">Balance Sheet</option>
            <option value="trial-balance">Trial Balance</option>
            <option value="ledger-summary">Ledger Summary</option>
            <option value="group-wise">Group-wise Report</option>
          </select>
        </div>
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
                placeholder="Search ledgers..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Report Content */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-gray-500">Loading report...</div>
        </div>
      ) : (
        <div>
          {reportType === 'balance-sheet' && renderBalanceSheet()}
          {reportType === 'trial-balance' && renderTrialBalance()}
          {reportType === 'ledger-summary' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ledger Summary</h3>
              <div className="text-gray-500">Ledger summary report will be displayed here.</div>
            </div>
          )}
          {reportType === 'group-wise' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Group-wise Report</h3>
              <div className="text-gray-500">Group-wise report will be displayed here.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

