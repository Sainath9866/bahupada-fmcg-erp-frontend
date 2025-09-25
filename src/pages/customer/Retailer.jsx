import React, { useState } from 'react';
import { User, Search, Eye, Edit, Trash2, Plus, Save, X, Building, Phone, Mail, MapPin } from 'lucide-react';

const Retailer = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRetailers, setFilteredRetailers] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranch: '',
    type: '',
    distrRetailerCode: '',
    companyRetailerCode: '',
    retailerName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    isActive: 'Yes'
  });

  // Sample data - replace with API call in future
  const sampleRetailers = [
    {
      id: 1,
      distributorBranch: '16622',
      type: 'Individual',
      distrRetailerCode: 'DRC001',
      companyRetailerCode: 'CRC001',
      retailerName: 'ABC Retail Store',
      phoneStatus: 'Verified'
    },
    {
      id: 2,
      distributorBranch: '16622',
      type: 'Company',
      distrRetailerCode: 'DRC002',
      companyRetailerCode: 'CRC002',
      retailerName: 'XYZ Supermarket',
      phoneStatus: 'Pending'
    },
    {
      id: 3,
      distributorBranch: '16623',
      type: 'Individual',
      distrRetailerCode: 'DRC003',
      companyRetailerCode: 'CRC003',
      retailerName: 'DEF Department Store',
      phoneStatus: 'Verified'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleRetailers.filter(retailer =>
        retailer.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        retailer.distrRetailerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        retailer.companyRetailerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        retailer.distributorBranch.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRetailers(filtered);
    } else {
      setFilteredRetailers([]);
    }
  };

  const handleViewAll = () => {
    setFilteredRetailers(sampleRetailers);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredRetailers([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Saving retailer:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranch: '',
      type: '',
      distrRetailerCode: '',
      companyRetailerCode: '',
      retailerName: '',
      phoneNumber: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      panNumber: '',
      isActive: 'Yes'
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <User size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Retailer</span>
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
                        Distributor Branch
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Distr Retailer Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Company Retailer Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Phone Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRetailers.length > 0 ? (
                      filteredRetailers.map((retailer) => (
                        <tr key={retailer.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {retailer.distributorBranch}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              retailer.type === 'Individual'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {retailer.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {retailer.distrRetailerCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {retailer.companyRetailerCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {retailer.retailerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              retailer.phoneStatus === 'Verified'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {retailer.phoneStatus}
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
              {/* Breadcrumbs */}
              <div className="text-sm text-gray-600 mb-4">
                Home › Customer › Retailer
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distributor Branch *
                    </label>
                    <div className="relative">
                      <select
                        name="distributorBranch"
                        value={formData.distributorBranch}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select Branch</option>
                        <option value="16622">16622</option>
                        <option value="16623">16623</option>
                        <option value="16624">16624</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select Type</option>
                        <option value="Individual">Individual</option>
                        <option value="Company">Company</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retailer Codes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distr Retailer Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="distrRetailerCode"
                        value={formData.distrRetailerCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter distributor retailer code"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Retailer Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="companyRetailerCode"
                        value={formData.companyRetailerCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter company retailer code"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retailer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retailer Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="retailerName"
                      value={formData.retailerName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter retailer name"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter complete address"
                    />
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter state"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                {/* Tax Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter GST number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter PAN number"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is Active
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isActive"
                        value="Yes"
                        checked={formData.isActive === 'Yes'}
                        onChange={handleFormChange}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isActive"
                        value="No"
                        checked={formData.isActive === 'No'}
                        onChange={handleFormChange}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      No
                    </label>
                  </div>
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

export default Retailer;
