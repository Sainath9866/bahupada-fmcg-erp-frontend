import { useState, useEffect } from 'react';
import { Search, Filter, Download, User, Target, TrendingUp, TrendingDown } from 'lucide-react';

export default function SalesmanPerformance() {
  const [salesmanPerformance, setSalesmanPerformance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSalesmanPerformance();
  }, []);

  const loadSalesmanPerformance = async () => {
    setLoading(true);
    try {
      const mockSalesmanPerformance = [
        { id: 1, salesman_name: 'Rajesh Kumar', target_amount: 500000, achieved_amount: 450000, performance_percentage: 90, status: 'Good' },
        { id: 2, salesman_name: 'Priya Sharma', target_amount: 1000000, achieved_amount: 950000, performance_percentage: 95, status: 'Excellent' },
        { id: 3, salesman_name: 'Amit Singh', target_amount: 400000, achieved_amount: 320000, performance_percentage: 80, status: 'Average' }
      ];
      setSalesmanPerformance(mockSalesmanPerformance);
    } catch (error) {
      console.error('Error loading salesman performance:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSalesmanPerformance = salesmanPerformance.filter(salesman =>
    salesman.salesman_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Average': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Salesman Performance</h1>
        <p className="text-gray-600 mt-1">Salesman vs targets vs achieved performance</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search salesmen..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salesman</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achieved Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading performance data...</td>
                </tr>
              ) : filteredSalesmanPerformance.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No data found</td>
                </tr>
              ) : (
                filteredSalesmanPerformance.map((salesman) => (
                  <tr key={salesman.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{salesman.salesman_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Target size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">₹{salesman.target_amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{salesman.achieved_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {salesman.performance_percentage >= 90 ? (
                          <TrendingUp size={14} className="text-green-500" />
                        ) : (
                          <TrendingDown size={14} className="text-red-500" />
                        )}
                        <span className="text-sm font-medium text-gray-900">{salesman.performance_percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(salesman.status)}`}>
                        {salesman.status}
                      </span>
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







