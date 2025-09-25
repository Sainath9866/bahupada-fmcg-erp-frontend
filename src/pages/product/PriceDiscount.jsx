import React, { useState } from 'react';
import { Percent, Search } from 'lucide-react';

const PriceDiscount = () => {
  const [searchData, setSearchData] = useState({
    searchBasedOn: 'Specific SKU',
    retailerChannel: '',
    retailerGroup: '',
    retailerClass: '',
    product: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log('Searching with data:', searchData);
    // Handle search logic here
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Percent size={20} />
          <span className="text-sm sm:text-lg font-semibold">Product & Price</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Price Discount</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Product & Price › Price Discount
            </div>

            {/* Quick Search Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search Based On
                    </label>
                    <select
                      name="searchBasedOn"
                      value={searchData.searchBasedOn}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Specific SKU">Specific SKU</option>
                      <option value="Product Category">Product Category</option>
                      <option value="Brand">Brand</option>
                      <option value="All Products">All Products</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retailer Channel/ Sub Channel *
                    </label>
                    <select
                      name="retailerChannel"
                      value={searchData.retailerChannel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="General Trade">General Trade</option>
                      <option value="Modern Trade">Modern Trade</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Institutional">Institutional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retailer Group *
                    </label>
                    <select
                      name="retailerGroup"
                      value={searchData.retailerGroup}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Group A">Group A</option>
                      <option value="Group B">Group B</option>
                      <option value="Group C">Group C</option>
                      <option value="Premium Group">Premium Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retailer Class *
                    </label>
                    <select
                      name="retailerClass"
                      value={searchData.retailerClass}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Premium Class">Premium Class</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product *
                    </label>
                    <select
                      name="product"
                      value={searchData.product}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="PCNO RED 900ML PJ">PCNO RED 900ML PJ</option>
                      <option value="SAFF GOLD 2730G NO RTN">SAFF GOLD 2730G NO RTN</option>
                      <option value="SAFF GOLD 500G NO RTN">SAFF GOLD 500G NO RTN</option>
                      <option value="SAFF GOLD 1KG NO RTN">SAFF GOLD 1KG NO RTN</option>
                      <option value="SAFF GOLD 2KG NO RTN">SAFF GOLD 2KG NO RTN</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleSearch}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Search size={16} />
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Results Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">No data available. Please select search criteria and click "Go" to view results.</p>
              </div>
            </div>

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

export default PriceDiscount;


