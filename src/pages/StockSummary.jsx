import { useState, useEffect } from 'react';
import { Search, Filter, Download, Package, TrendingUp, TrendingDown } from 'lucide-react';

export default function StockSummary() {
  const [stockSummary, setStockSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStockSummary();
  }, []);

  const loadStockSummary = async () => {
    setLoading(true);
    try {
      const mockStockSummary = [
        { id: 1, item_name: 'Rice 1kg', current_stock: 150, unit_cost: 45, total_value: 6750, movement: 'up' },
        { id: 2, item_name: 'Oil 1L', current_stock: 25, unit_cost: 120, total_value: 3000, movement: 'down' },
        { id: 3, item_name: 'Sugar 1kg', current_stock: 80, unit_cost: 35, total_value: 2800, movement: 'up' },
        { id: 4, item_name: 'Flour 1kg', current_stock: 15, unit_cost: 28, total_value: 420, movement: 'down' },
        { id: 5, item_name: 'Salt 500g', current_stock: 200, unit_cost: 15, total_value: 3000, movement: 'up' }
      ];
      setStockSummary(mockStockSummary);
    } catch (error) {
      console.error('Error loading stock summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStockSummary = stockSummary.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = stockSummary.reduce((sum, item) => sum + item.total_value, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Stock Summary Report</h1>
        <p className="text-gray-600 mt-1">Local and Zoho data stock summary</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movement</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading stock summary...</td>
                </tr>
              ) : filteredStockSummary.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No items found</td>
                </tr>
              ) : (
                filteredStockSummary.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{item.item_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.current_stock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.unit_cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.total_value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.movement === 'up' ? (
                          <TrendingUp size={14} className="text-green-500" />
                        ) : (
                          <TrendingDown size={14} className="text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          item.movement === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.movement === 'up' ? 'Increasing' : 'Decreasing'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan="3" className="px-6 py-3 text-sm font-medium text-gray-900">Total Stock Value</td>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">₹{totalValue.toLocaleString()}</td>
                <td className="px-6 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

