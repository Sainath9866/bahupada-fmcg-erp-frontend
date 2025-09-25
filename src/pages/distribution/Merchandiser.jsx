import React, { useState } from 'react';
import { ShoppingCart, Search, Eye, Edit, Trash2, Plus, Save, X, User, Phone, Building, Mail, Calendar, DollarSign, Upload, Image } from 'lucide-react';

const Merchandiser = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMerchandisers, setFilteredMerchandisers] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranch: '16622-SRI VENKATESWAI',
    code: '',
    name: '',
    attachCompany: 'Marico India Limited',
    phoneNo: '',
    emailId: '',
    photo: null,
    dailyAllowance: '',
    monthlySalary: '',
    salesmanType: 'Order Booking',
    dateOfBirth: '',
    dateOfJoin: '08/09/2025',
    status: 'Active',
    sellerType: 'PRESELL'
  });

  // Sample data - replace with API call in future
  const sampleMerchandisers = [
    {
      id: 1,
      branchCode: '16622',
      salesmanCode: 'SC001',
      salesmanName: 'John Doe',
      phoneNo: '9876543210',
      isActive: true
    },
    {
      id: 2,
      branchCode: '16622',
      salesmanCode: 'SC002',
      salesmanName: 'Jane Smith',
      phoneNo: '9876543211',
      isActive: true
    },
    {
      id: 3,
      branchCode: '16623',
      salesmanCode: 'SC003',
      salesmanName: 'Mike Johnson',
      phoneNo: '9876543212',
      isActive: false
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleMerchandisers.filter(merchandiser =>
        merchandiser.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchandiser.salesmanCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchandiser.phoneNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchandiser.branchCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMerchandisers(filtered);
    } else {
      setFilteredMerchandisers([]);
    }
  };

  const handleViewAll = () => {
    setFilteredMerchandisers(sampleMerchandisers);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredMerchandisers([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : (type === 'checkbox' ? checked : value)
    }));
  };

  const handleSave = () => {
    console.log('Saving merchandiser:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranch: '16622-SRI VENKATESWAI',
      code: '',
      name: '',
      attachCompany: 'Marico India Limited',
      phoneNo: '',
      emailId: '',
      photo: null,
      dailyAllowance: '',
      monthlySalary: '',
      salesmanType: 'Order Booking',
      dateOfBirth: '',
      dateOfJoin: '08/09/2025',
      status: 'Active',
      sellerType: 'PRESELL'
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <ShoppingCart size={20} />
          <span className="text-sm sm:text-lg font-semibold">Distribution</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Merchandiser</span>
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
                        Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Phone No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Is Active
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMerchandisers.length > 0 ? (
                      filteredMerchandisers.map((merchandiser) => (
                        <tr key={merchandiser.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {merchandiser.branchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {merchandiser.salesmanCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {merchandiser.salesmanName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {merchandiser.phoneNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              merchandiser.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {merchandiser.isActive ? 'Yes' : 'No'}
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
                Distribution › Merchandiser
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  <button className="py-2 px-1 border-b-2 border-purple-500 text-purple-600 font-medium text-sm">
                    General
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Row 1: Distributor Branch & Code */}
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
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="16622-SRI VENKATESWAI">16622-SRI VENKATESWAI</option>
                        <option value="16623-ANOTHER BRANCH">16623-ANOTHER BRANCH</option>
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
                      Code *
                    </label>
                    <div className="relative">
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
                </div>

                {/* Row 2: Name & Attach Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attach Company *
                    </label>
                    <div className="relative">
                      <select
                        name="attachCompany"
                        value={formData.attachCompany}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="Marico India Limited">Marico India Limited</option>
                        <option value="Other Company">Other Company</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Phone No. & E-mail Id */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone No. *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail Id
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo Upload
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Please choose only png,gif,jpeg image types and size less than 200kb.
                    </p>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFormChange}
                      accept="image/png,image/gif,image/jpeg"
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus size={16} />
                      Select Photo
                    </label>
                  </div>
                </div>

                {/* Row 4: Daily Allowance & Monthly Salary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Allowance
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="dailyAllowance"
                        value={formData.dailyAllowance}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter daily allowance"
                        step="0.01"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500 text-sm">(₹)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Salary
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="monthlySalary"
                        value={formData.monthlySalary}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter monthly salary"
                        step="0.01"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500 text-sm">(₹)</span>
                    </div>
                  </div>
                </div>

                {/* Row 5: Salesman Type & Seller Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salesman Type
                    </label>
                    <div className="relative">
                      <select
                        name="salesmanType"
                        value={formData.salesmanType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="Order Booking">Order Booking</option>
                        <option value="Collection">Collection</option>
                        <option value="Both">Both</option>
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
                      Seller Type
                    </label>
                    <div className="relative">
                      <select
                        name="sellerType"
                        value={formData.sellerType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="PRESELL">PRESELL</option>
                        <option value="POSTSELL">POSTSELL</option>
                        <option value="BOTH">BOTH</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 6: Date Of Birth & Date Of Join */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Of Join *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dateOfJoin"
                        value={formData.dateOfJoin}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 7: Status - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={handleFormChange}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      Active
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="In Active"
                        checked={formData.status === 'In Active'}
                        onChange={handleFormChange}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      In Active
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
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

export default Merchandiser;
