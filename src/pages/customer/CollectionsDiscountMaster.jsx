import React, { useState } from 'react';
import { Percent, Search, Eye, Edit, Trash2, Plus, Save, X, Building, User, Tag, Calendar, DollarSign, Check } from 'lucide-react';

const CollectionsDiscountMaster = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchName: '16622-SRI VENKATESWARA',
    code: '',
    description: '',
    customerType: 'Retailer',
    salesman: '',
    route: '',
    retailerChannel: '',
    retailerGroup: '',
    retailer: ''
  });

  // Sample data - replace with API call in future
  const sampleDiscounts = [
    {
      id: 1,
      referenceNo: 'CD001',
      customerType: 'Retailer',
      retailer: 'ABC Store',
      validFrom: '01/01/2025',
      validTo: '31/12/2025',
      fromDays: 0,
      toDays: 30,
      discPercent: 5.0,
      flatAmountStatus: 'No',
      status: 'Active'
    },
    {
      id: 2,
      referenceNo: 'CD002',
      customerType: 'Wholesaler',
      retailer: 'XYZ Mart',
      validFrom: '01/01/2025',
      validTo: '31/12/2025',
      fromDays: 31,
      toDays: 60,
      discPercent: 3.0,
      flatAmountStatus: 'Yes',
      status: 'Active'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleDiscounts.filter(discount =>
        discount.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.retailer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.customerType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDiscounts(filtered);
    } else {
      setFilteredDiscounts([]);
    }
  };

  const handleViewAll = () => {
    setFilteredDiscounts(sampleDiscounts);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredDiscounts([]);
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
    console.log('Saving collections discount:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchName: '16622-SRI VENKATESWARA',
      code: '',
      description: '',
      customerType: 'Retailer',
      salesman: '',
      route: '',
      retailerChannel: '',
      retailerGroup: '',
      retailer: ''
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Percent size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Collections Discount Master</span>
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
                        Reference No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Customer Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Valid From
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Valid To
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        From No. Of Days
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        To No. Of Days
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Disc %
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Flat Amount Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiscounts.length > 0 ? (
                      filteredDiscounts.map((discount) => (
                        <tr key={discount.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.referenceNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.customerType}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.retailer}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.validFrom}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.validTo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.fromDays}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.toDays}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {discount.discPercent}%
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              discount.flatAmountStatus === 'Yes' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {discount.flatAmountStatus}
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
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
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
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumbs */}
              <div className="text-sm text-gray-600 mb-6">
                Home › Customer › Collections Discount Master
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distributor Branch Name
                    </label>
                    <select
                      name="distributorBranchName"
                      value={formData.distributorBranchName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="16622-SRI VENKATESWARA">16622-SRI VENKATESWARA</option>
                      <option value="16623-ANOTHER BRANCH">16623-ANOTHER BRANCH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter code"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Type
                    </label>
                    <select
                      name="customerType"
                      value={formData.customerType}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Retailer">Retailer</option>
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Distributor">Distributor</option>
                    </select>
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salesman
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="salesman"
                        value={formData.salesman}
                        onChange={handleFormChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Select salesman"
                      />
                      <button className="px-3 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r hover:bg-purple-700">
                        ...
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Route
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="route"
                        value={formData.route}
                        onChange={handleFormChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Select route"
                      />
                      <button className="px-3 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r hover:bg-purple-700">
                        ...
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fourth Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retailer Channel/Sub Channel
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="retailerChannel"
                        value={formData.retailerChannel}
                        onChange={handleFormChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Select channel"
                      />
                      <button className="px-3 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r hover:bg-purple-700">
                        ...
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retailer Group
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="retailerGroup"
                        value={formData.retailerGroup}
                        onChange={handleFormChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Select group"
                      />
                      <button className="px-3 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r hover:bg-purple-700">
                        ...
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fifth Row - Retailer Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retailer
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="retailer"
                      value={formData.retailer}
                      onChange={handleFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter atleast 3 characters"
                    />
                    <button className="px-4 py-2 bg-purple-600 text-white border border-l-0 border-purple-600 rounded-r hover:bg-purple-700">
                      Go
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Discount Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Retailer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Valid From
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Valid To
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Collection Mode
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Apply Disc Against
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          From No. Of Days
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          To No. Of Days
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Disc %
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Flat Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Apply Disc On
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
                          No matching record(s) found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center gap-4">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsDiscountMaster;


