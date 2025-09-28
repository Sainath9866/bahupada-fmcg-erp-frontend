import React, { useState } from 'react';
import { Truck, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, User } from 'lucide-react';

const VehicleAllocation = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622-16622-SRI VENI',
    fromDate: '',
    toDate: '',
    autoVehicleAllocation: false,
    salesman: '',
    deliveryRoute: '',
    salesRoute: ''
  });

  // Sample data - replace with API call in future
  const sampleAllocations = [
    {
      id: 1,
      referenceNumber: 'VA001',
      allocationDate: '2024-01-15',
      deliveryBoyName: 'John Doe',
      vehicleNumber: 'MH01AB1234'
    },
    {
      id: 2,
      referenceNumber: 'VA002',
      allocationDate: '2024-01-16',
      deliveryBoyName: 'Jane Smith',
      vehicleNumber: 'MH01CD5678'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3 || createdDate) {
      const filtered = sampleAllocations.filter(allocation =>
        allocation.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allocation.deliveryBoyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allocation.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (createdDate && allocation.allocationDate.includes(createdDate))
      );
      setFilteredAllocations(filtered);
    } else {
      setFilteredAllocations([]);
    }
  };

  const handleViewAll = () => {
    setFilteredAllocations(sampleAllocations);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredAllocations([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePopulate = () => {
    console.log('Populating vehicle allocation...');
    // Handle populate logic here
  };

  const handleSave = () => {
    console.log('Saving vehicle allocation:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchCode: '16622-16622-SRI VENI',
      fromDate: '',
      toDate: '',
      autoVehicleAllocation: false,
      salesman: '',
      deliveryRoute: '',
      salesRoute: ''
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Truck size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Dist' : 'Distribution'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Vehicle Allocation' : 'Vehicle Allocation'}</span>
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
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Created Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={createdDate}
                      onChange={(e) => setCreatedDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
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

            {/* Search Results Section */}
            <div className="p-3 sm:p-6 overflow-x-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Reference Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Vehicle Allocation Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Delivery Boy Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Vehicle Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllocations.length > 0 ? (
                      filteredAllocations.map((allocation) => (
                        <tr key={allocation.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {allocation.referenceNumber}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {allocation.allocationDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {allocation.deliveryBoyName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {allocation.vehicleNumber}
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
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create Vehicle Allocation</h3>
              
              <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distributor Branch Code
                    </label>
                    <div className="relative">
                      <select
                        name="distributorBranchCode"
                        value={formData.distributorBranchCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="16622-16622-SRI VENI">16622-16622-SRI VENI</option>
                        <option value="16623-16623-DELHI BRANCH">16623-16623-DELHI BRANCH</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Row - Date Fields */}
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
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Auto Vehicle Allocation Checkbox */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="autoVehicleAllocation"
                      checked={formData.autoVehicleAllocation}
                      onChange={handleFormChange}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    Auto Vehicle Allocation
                  </label>
                </div>

                {/* Third Row - Salesman and Routes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salesman *
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="salesman"
                        value={formData.salesman}
                        onChange={handleFormChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter salesman name"
                      />
                      <button className="px-3 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors">
                        <User size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Route
                    </label>
                    <div className="relative">
                      <select
                        name="deliveryRoute"
                        value={formData.deliveryRoute}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="route1">Route 1</option>
                        <option value="route2">Route 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sales Route
                    </label>
                    <div className="relative">
                      <select
                        name="salesRoute"
                        value={formData.salesRoute}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="sales1">Sales Route 1</option>
                        <option value="sales2">Sales Route 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Populate Button */}
                <div className="flex justify-start">
                  <button
                    onClick={handlePopulate}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Populate
                  </button>
                </div>

                {/* Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    No Pack List available for vehicle allocation
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
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

export default VehicleAllocation;
