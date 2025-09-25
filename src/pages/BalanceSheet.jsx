import { useState, useEffect } from 'react';
import { Search, Filter, Download, FileText, DollarSign } from 'lucide-react';

export default function BalanceSheet() {
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBalanceSheet();
  }, []);

  const loadBalanceSheet = async () => {
    setLoading(true);
    try {
      const mockBalanceSheet = [
        { id: 1, account_name: 'Cash Account', amount: 50000, type: 'Asset' },
        { id: 2, account_name: 'Bank Account', amount: 250000, type: 'Asset' },
        { id: 3, account_name: 'Inventory', amount: 150000, type: 'Asset' },
        { id: 4, account_name: 'Accounts Payable', amount: 45000, type: 'Liability' },
        { id: 5, account_name: 'Capital Account', amount: 405000, type: 'Equity' }
      ];
      setBalanceSheet(mockBalanceSheet);
    } catch (error) {
      console.error('Error loading balance sheet:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBalanceSheet = balanceSheet.filter(account =>
    account.account_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAssets = balanceSheet.filter(account => account.type === 'Asset').reduce((sum, account) => sum + account.amount, 0);
  const totalLiabilities = balanceSheet.filter(account => account.type === 'Liability').reduce((sum, account) => sum + account.amount, 0);
  const totalEquity = balanceSheet.filter(account => account.type === 'Equity').reduce((sum, account) => sum + account.amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Balance Sheet</h1>
        <p className="text-gray-600 mt-1">Financial balance sheet report</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-gray-50 border border-gray-200 rounded px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
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
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">Loading balance sheet...</td>
                </tr>
              ) : filteredBalanceSheet.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">No data found</td>
                </tr>
              ) : (
                filteredBalanceSheet.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{account.account_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.type === 'Asset' ? 'bg-green-100 text-green-800' :
                        account.type === 'Liability' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {account.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ₹{account.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan="2" className="px-6 py-3 text-sm font-medium text-gray-900">Total Assets</td>
                <td className="px-6 py-3 text-right text-sm font-bold text-green-600">₹{totalAssets.toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan="2" className="px-6 py-3 text-sm font-medium text-gray-900">Total Liabilities</td>
                <td className="px-6 py-3 text-right text-sm font-bold text-red-600">₹{totalLiabilities.toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan="2" className="px-6 py-3 text-sm font-medium text-gray-900">Total Equity</td>
                <td className="px-6 py-3 text-right text-sm font-bold text-blue-600">₹{totalEquity.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}







