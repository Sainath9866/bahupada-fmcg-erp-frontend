import React, { useState } from 'react';
import { BarChart, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, User, MapPin, Building } from 'lucide-react';

const StockiestTMR = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [formData, setFormData] = useState({
    salesman: 'Select',
    subStockistRoute: 'Select',
    subStockist: 'Select',
    fromDate: '',
    toDate: '',
    salesReturnInvoiceNos: ''
  });

  // Sample data - replace with API call in future
  const sampleRecords = [
    {
      id: 1,
      referenceNo: 'TMR001',
      salesman: 'John Doe',
      subStockistRoute: 'Route A',
      subStockist: 'ABC Distributors',
      fromDate: '2023-10-01',
      toDate: '2023-10-31'
    },
    {
      id: 2,
      referenceNo: 'TMR002',
      salesman: 'Jane Smith',
      subStockistRoute: 'Route B',
      subStockist: 'XYZ Trading Co',
      fromDate: '2023-10-01',
      toDate: '2023-10-31'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleRecords.filter(record =>
        record.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.salesman.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.subStockist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.subStockistRoute.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords([]);
    }
  };

  const handleViewAll = () => {
    setFilteredRecords(sampleRecords);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredRecords([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving stockiest TMR:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      salesman: 'Select',
      subStockistRoute: 'Select',
      subStockist: 'Select',
      fromDate: '',
      toDate: '',
      salesReturnInvoiceNos: ''
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <BarChart size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Dist' : 'Distribution'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Stockiest TMR' : 'Stockiest TMR'}</span>
        </div>
        {view === 'list' && (
          <button
            onClick={() => setView('form')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Create New
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        {view === 'list' ? (
          <>
            {/* Quick Search Section */}
            <div className="p-3 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Term
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter atleast 3 characters"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Search size={16} />
                    Search
                  </button>
                  <button
                    onClick={handleViewAll}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Records Section */}
            <div className="p-3 sm:p-6 overflow-x-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent records</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Reference No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Sub Stockist Route
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Sub Stockist
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        From Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        To Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {record.referenceNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {record.salesman}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {record.subStockistRoute}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {record.subStockist}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {record.fromDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {record.toDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
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
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
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
          /* Form View */
          <div className="p-3 sm:p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Stockiest TMR</h3>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Salesman */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salesman *
                  </label>
                  <div className="relative">
                    <select
                      name="salesman"
                      value={formData.salesman}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Select">Select</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Mike Johnson">Mike Johnson</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Sub Stockist Route */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Stockist Route *
                  </label>
                  <div className="relative">
                    <select
                      name="subStockistRoute"
                      value={formData.subStockistRoute}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Select">Select</option>
                      <option value="Route A">Route A</option>
                      <option value="Route B">Route B</option>
                      <option value="Route C">Route C</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Sub Stockist */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Stockist *
                  </label>
                  <div className="relative">
                    <select
                      name="subStockist"
                      value={formData.subStockist}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Select">Select</option>
                      <option value="ABC Distributors">ABC Distributors</option>
                      <option value="XYZ Trading Co">XYZ Trading Co</option>
                      <option value="DEF Enterprises">DEF Enterprises</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Building size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Sales Return Invoice Numbers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sales Return Invoice No's *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="salesReturnInvoiceNos"
                      value={formData.salesReturnInvoiceNos}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter sales return invoice numbers"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockiestTMR;
