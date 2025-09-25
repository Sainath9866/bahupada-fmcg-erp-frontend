import React, { useState } from 'react';
import { MapPin, Search, Eye, Edit, Trash2, Plus, Save, X } from 'lucide-react';

const CustomerShippingAddress = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622',
    searchBy: 'Retailer Name',
    searchInput: '',
    gstStateName: '',
    retailerName: '',
    address1: '',
    address2: '',
    address3: '',
    country: 'All-India',
    state: 'Andhra Pradesh',
    city: '',
    postalCode: '',
    isDefaultShippingAddress: false
  });

  // Sample data - replace with API call in future
  const sampleAddresses = [
    {
      id: 1,
      distributorBranchCode: '16622',
      retailerCode: 'R001',
      retailerName: 'ABC Store',
      shippingAddress: '123 Main Street, Mumbai, Maharashtra',
      isDefault: true
    },
    {
      id: 2,
      distributorBranchCode: '16622',
      retailerCode: 'R002',
      retailerName: 'XYZ Mart',
      shippingAddress: '456 Park Avenue, Delhi, NCR',
      isDefault: false
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleAddresses.filter(address =>
        address.retailerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses([]);
    }
  };

  const handleViewAll = () => {
    setFilteredAddresses(sampleAddresses);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredAddresses([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGo = () => {
    console.log('Searching with:', formData.searchInput);
    // Handle search logic here
  };

  const handleSave = () => {
    console.log('Saving customer shipping address:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchCode: '16622',
      searchBy: 'Retailer Name',
      searchInput: '',
      gstStateName: '',
      retailerName: '',
      address1: '',
      address2: '',
      address3: '',
      country: 'All-India',
      state: 'Andhra Pradesh',
      city: '',
      postalCode: '',
      isDefaultShippingAddress: false
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin size={20} />
          <span className="text-sm sm:text-lg font-semibold">Distribution</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Customer Shipping Address</span>
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

            {/* Search Results Section */}
            <div className="p-3 sm:p-6 overflow-x-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Distributor Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Shipping Address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Is Default
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAddresses.length > 0 ? (
                      filteredAddresses.map((address) => (
                        <tr key={address.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {address.distributorBranchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {address.retailerCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {address.retailerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {address.shippingAddress}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              address.isDefault 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {address.isDefault ? 'Yes' : 'No'}
                            </span>
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
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No matching record(s) found!
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Customer Shipping Address</h3>
              
              <div className="space-y-6">
                {/* Search Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distributor Branch Code
                      </label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700">
                        16622
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search By
                      </label>
                      <div className="relative">
                        <select
                          name="searchBy"
                          value={formData.searchBy}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="Retailer Name">Retailer Name</option>
                          <option value="Retailer Code">Retailer Code</option>
                          <option value="Phone Number">Phone Number</option>
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
                        Search Input
                      </label>
                      <input
                        type="text"
                        name="searchInput"
                        value={formData.searchInput}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter atleast 3 letters"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleGo}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>

                {/* GST State Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST State Name *
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="gstStateName"
                      value={formData.gstStateName}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter GST state name"
                    />
                    <button className="px-3 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors">
                      <Search size={16} />
                    </button>
                  </div>
                </div>

                {/* Retailer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retailer Name
                  </label>
                  <input
                    type="text"
                    name="retailerName"
                    value={formData.retailerName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter retailer name"
                  />
                </div>

                {/* Address Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="- Type Building No, Name and Street -"
                    />
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="- Type Additional street -"
                    />
                    <input
                      type="text"
                      name="address3"
                      value={formData.address3}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="- Type area or locality -"
                    />
                  </div>
                </div>

                {/* Location Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="All-India">All-India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
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
                      State *
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
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
                      City *
                    </label>
                    <div className="relative">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select City</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Vijayawada">Vijayawada</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter postal code"
                  />
                </div>

                {/* Is Default Shipping Address */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefaultShippingAddress"
                      checked={formData.isDefaultShippingAddress}
                      onChange={handleFormChange}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    Is Default Shipping Address?
                  </label>
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

export default CustomerShippingAddress;
