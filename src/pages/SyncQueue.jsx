import { useState, useEffect } from 'react';
import { Search, Filter, Download, Database, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function SyncQueue() {
  const [syncQueue, setSyncQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSyncQueue();
  }, []);

  const loadSyncQueue = async () => {
    setLoading(true);
    try {
      const mockSyncQueue = [
        { id: 1, record_type: 'Item', record_id: 'ITEM001', status: 'Pending', error_message: '', created_at: '2024-01-15' },
        { id: 2, record_type: 'Customer', record_id: 'CUST001', status: 'Failed', error_message: 'Invalid GST number', created_at: '2024-01-20' },
        { id: 3, record_type: 'Invoice', record_id: 'INV001', status: 'Completed', error_message: '', created_at: '2024-01-25' }
      ];
      setSyncQueue(mockSyncQueue);
    } catch (error) {
      console.error('Error loading sync queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSyncQueue = syncQueue.filter(record =>
    record.record_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.record_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={14} className="text-green-600" />;
      case 'Pending': return <RefreshCw size={14} className="text-yellow-600" />;
      case 'Failed': return <XCircle size={14} className="text-red-600" />;
      default: return <AlertTriangle size={14} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sync Queue</h1>
        <p className="text-gray-600 mt-1">Show pending/failed records with retry option</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sync records..."
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
              <RefreshCw size={16} />
              Retry Failed
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading sync queue...</td>
                </tr>
              ) : filteredSyncQueue.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No sync records found</td>
                </tr>
              ) : (
                filteredSyncQueue.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Database size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{record.record_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.record_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.error_message || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {record.status === 'Failed' && (
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Retry">
                            <RefreshCw size={16} />
                          </button>
                        )}
                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Delete">
                          <XCircle size={16} />
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







