import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Download, Receipt, User, CircleDollarSign, Calendar } from 'lucide-react';

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    setLoading(true);
    try {
      // Mock data
      const mockReceipts = [
        {
          id: 1,
          customer_name: 'ABC Traders',
          amount: 15000,
          payment_mode: 'Bank Transfer',
          receipt_date: '2024-01-15',
          reference_number: 'RCP001',
          description: 'Payment for invoice INV-2024-001',
          created_at: '2024-01-15'
        },
        {
          id: 2,
          customer_name: 'XYZ Stores',
          amount: 12000,
          payment_mode: 'Cheque',
          receipt_date: '2024-01-20',
          reference_number: 'RCP002',
          description: 'Payment for invoice INV-2024-002',
          created_at: '2024-01-20'
        }
      ];
      setReceipts(mockReceipts);
    } catch (error) {
      console.error('Error loading receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReceipts = receipts.filter(receipt =>
    receipt.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
        <p className="text-gray-600 mt-1">Record and manage customer receipts</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search receipts..."
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
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">
              <Plus size={16} />
              Record Receipt
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading receipts...</td>
                </tr>
              ) : filteredReceipts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No receipts found</td>
                </tr>
              ) : (
                filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{receipt.customer_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CircleDollarSign size={14} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">₹{receipt.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {receipt.payment_mode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{new Date(receipt.receipt_date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {receipt.reference_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Delete">
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
    </div>
  );
}

