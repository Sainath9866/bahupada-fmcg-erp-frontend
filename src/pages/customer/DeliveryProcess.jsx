import React, { useState } from 'react';
import { ShoppingCart, Search, Calendar, Building, User, Truck, FileText, MoreHorizontal } from 'lucide-react';

const DeliveryProcess = () => {
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622',
    fromDate: '2025-09-08',
    toDate: '2025-09-08',
    displayBasedOn: 'Delivery Boy',
    deliveryBoy: '',
    vehicleAllocationNo: '',
    billNo: '',
    billStatus: 'Delivered',
    searchBy: '',
    inputText: '',
    branchCode: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePopulate = () => {
    console.log('Populating data with filters:', formData);
    // Handle populate logic here
  };

  const handleSearch = () => {
    console.log('Searching with criteria:', formData);
    // Handle search logic here
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <ShoppingCart size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Delivery Process</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Customer › Delivery Process
            </div>

            {/* Filter Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Section</h3>
              
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distributor Branch Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="distributorBranchCode"
                      value={formData.distributorBranchCode}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building size={16} className="text-gray-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    />
                    <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    />
                    <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Based On *
                  </label>
                  <div className="relative">
                    <select
                      name="displayBasedOn"
                      value={formData.displayBasedOn}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Delivery Boy">Delivery Boy</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Route">Route</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Boy
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="deliveryBoy"
                      value={formData.deliveryBoy}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Select delivery boy"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded flex items-center justify-center">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Allocation No
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="vehicleAllocationNo"
                      value={formData.vehicleAllocationNo}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Select vehicle allocation"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded flex items-center justify-center">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bill No
                  </label>
                  <input
                    type="text"
                    name="billNo"
                    value={formData.billNo}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter bill number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bill Status
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="billStatus"
                      value={formData.billStatus}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={handlePopulate}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Populate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Section</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search By *
                  </label>
                  <div className="relative">
                    <select
                      name="searchBy"
                      value={formData.searchBy}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select search criteria</option>
                      <option value="Bill Number">Bill Number</option>
                      <option value="Customer Name">Customer Name</option>
                      <option value="Delivery Boy">Delivery Boy</option>
                      <option value="Vehicle">Vehicle</option>
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
                    Input Text *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="inputText"
                      value={formData.inputText}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter search text"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch Code
                  </label>
                  <div className="relative">
                    <select
                      name="branchCode"
                      value={formData.branchCode}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Enter atleast 3 characters</option>
                      <option value="16622">16622</option>
                      <option value="16623">16623</option>
                      <option value="16624">16624</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProcess;
