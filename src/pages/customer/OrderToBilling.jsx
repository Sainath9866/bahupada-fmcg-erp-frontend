import React, { useState } from 'react';
import { Calendar, Building, User, MapPin, Route, Users, Loader2 } from 'lucide-react';

const OrderToBilling = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    distributorBranch: '16622',
    fromDate: '08/09/2025',
    salesman: '',
    location: 'Main Godown',
    toDate: '08/09/2025',
    route: '',
    customer: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePopulate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSelectSalesman = () => {
    console.log('Select Salesman clicked');
    // Handle salesman selection logic
  };

  const handleSelectRoute = () => {
    console.log('Select Route clicked');
    // Handle route selection logic
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Building size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Order to Billing (O2B)</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Customer › Order to Billing (O2B)
            </div>

            {/* Filter Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distributor Branch *
                  </label>
                  <select
                    name="distributorBranch"
                    value={formData.distributorBranch}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="16622">16622</option>
                    <option value="16623">16623</option>
                    <option value="16624">16624</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salesman *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="salesman"
                      value={formData.salesman}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Salesman</option>
                      <option value="SM001">John Doe</option>
                      <option value="SM002">Jane Smith</option>
                    </select>
                    <button
                      onClick={handleSelectSalesman}
                      className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      ...
                    </button>
                    <button
                      onClick={handleSelectSalesman}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Select Salesman
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Main Godown">Main Godown</option>
                    <option value="Secondary Godown">Secondary Godown</option>
                    <option value="Warehouse A">Warehouse A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Route *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="route"
                      value={formData.route}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Route</option>
                      <option value="R001">Route 1</option>
                      <option value="R002">Route 2</option>
                    </select>
                    <button
                      onClick={handleSelectRoute}
                      className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      ...
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer *
                  </label>
                  <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Customer</option>
                    <option value="C001">ABC Store</option>
                    <option value="C002">XYZ Mart</option>
                  </select>
                </div>
              </div>

              {/* Populate Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handlePopulate}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
                >
                  Populate
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 size={48} className="text-purple-600 animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Loading data...</p>
              </div>
            )}

            {/* Results Section - This would show after loading */}
            {!isLoading && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order to Billing Results</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No data available. Click "Populate" to load data.</p>
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

export default OrderToBilling;




