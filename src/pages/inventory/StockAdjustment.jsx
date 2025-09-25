import React, { useState } from 'react';
import { RotateCcw, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, Building, FileText } from 'lucide-react';

const StockAdjustment = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [showEntryModeModal, setShowEntryModeModal] = useState(false);
  const [entryMode, setEntryMode] = useState('Manual Entry');
  const [searchTerm, setSearchTerm] = useState('');
  const [docDate, setDocDate] = useState('');
  const [filteredAdjustments, setFilteredAdjustments] = useState([]);
  const [formData, setFormData] = useState({
    referenceNo: '',
    docDate: '',
    godown: '',
    stockStatus: '',
    transactionType: '',
    remarks: ''
  });

  // Sample data - replace with API call in future
  const sampleAdjustments = [
    {
      id: 1,
      referenceNo: 'SA001',
      docDate: '08/09/2025',
      godown: 'Main Godown',
      stockStatus: 'Available',
      transactionType: 'Adjustment',
      approvalStatus: 'Pending',
      rejectedReason: '',
      status: 'Active'
    },
    {
      id: 2,
      referenceNo: 'SA002',
      docDate: '08/09/2025',
      godown: 'Secondary Godown',
      stockStatus: 'Damaged',
      transactionType: 'Write-off',
      approvalStatus: 'Approved',
      rejectedReason: '',
      status: 'Active'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleAdjustments.filter(adjustment =>
        adjustment.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adjustment.godown.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdjustments(filtered);
    } else {
      setFilteredAdjustments([]);
    }
  };

  const handleViewAll = () => {
    setFilteredAdjustments(sampleAdjustments);
  };

  const handleCreateNew = () => {
    setShowEntryModeModal(true);
  };

  const handleEntryModeSelect = () => {
    setShowEntryModeModal(false);
    setView('form');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving stock adjustment:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      referenceNo: '',
      docDate: '',
      godown: '',
      stockStatus: '',
      transactionType: '',
      remarks: ''
    });
    setView('list');
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <RotateCcw size={20} />
          <span className="text-sm sm:text-lg font-semibold">Inventory</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Stock Adjustment</span>
        </div>
        {view === 'list' && (
          <button
            onClick={handleCreateNew}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Create New
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Inventory › Stock Adjustment
            </div>

            {view === 'list' ? (
              <>
                {/* List View */}
                {/* Quick Search Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter atleast 3 characters"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Doc. Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={docDate}
                          onChange={(e) => setDocDate(e.target.value)}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <button
                      onClick={handleViewAll}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      View All
                    </button>
                  </div>
                </div>

                {/* Search Results Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse" style={{ minWidth: '800px' }}>
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                            Reference No.
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                            Doc. Date
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                            Godown
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                            Stock Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                            Transaction Type
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                            Approval Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                            Rejected Reason
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAdjustments.length > 0 ? (
                          filteredAdjustments.map((adjustment) => (
                            <tr key={adjustment.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {adjustment.referenceNo}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {adjustment.docDate}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {adjustment.godown}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  adjustment.stockStatus === 'Available' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {adjustment.stockStatus}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {adjustment.transactionType}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  adjustment.approvalStatus === 'Approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : adjustment.approvalStatus === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {adjustment.approvalStatus}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {adjustment.rejectedReason || '-'}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <div className="flex items-center gap-2">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Eye size={16} />
                                  </button>
                                  <button className="text-green-600 hover:text-green-800">
                                    <Edit size={16} />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="px-3 py-8 text-center text-gray-500">
                              No matching record(s) found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Form View */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reference No.
                      </label>
                      <input
                        type="text"
                        name="referenceNo"
                        value={formData.referenceNo}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doc. Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="docDate"
                          value={formData.docDate}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Godown
                      </label>
                      <select
                        name="godown"
                        value={formData.godown}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Godown</option>
                        <option value="Main Godown">Main Godown</option>
                        <option value="Secondary Godown">Secondary Godown</option>
                        <option value="Warehouse A">Warehouse A</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Status
                      </label>
                      <select
                        name="stockStatus"
                        value={formData.stockStatus}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Expired">Expired</option>
                        <option value="Missing">Missing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction Type
                      </label>
                      <select
                        name="transactionType"
                        value={formData.transactionType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        <option value="Adjustment">Adjustment</option>
                        <option value="Write-off">Write-off</option>
                        <option value="Transfer">Transfer</option>
                        <option value="Correction">Correction</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks
                      </label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter remarks..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Entry Mode Modal */}
            {showEntryModeModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Choose Entry Mode</h3>
                    <button
                      onClick={() => setShowEntryModeModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="entryMode"
                          value="Manual Entry"
                          checked={entryMode === 'Manual Entry'}
                          onChange={(e) => setEntryMode(e.target.value)}
                          className="mr-3 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Manual Entry</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="entryMode"
                          value="Excel Entry"
                          checked={entryMode === 'Excel Entry'}
                          onChange={(e) => setEntryMode(e.target.value)}
                          className="mr-3 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Excel Entry</span>
                      </label>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleEntryModeSelect}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="text-right text-sm text-gray-500">
                <p>Botree Software International Pvt Ltd</p>
                <p>© All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustment;
