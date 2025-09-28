import React, { useState } from 'react';
import { UserCheck, Search, Eye, Edit, Trash2, Plus, Save, X } from 'lucide-react';

const DeliveryBoy = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDeliveryBoys, setFilteredDeliveryBoys] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranch: '16622',
    code: '',
    name: '',
    phoneNo: '',
    emailId: '',
    dailyAllowance: '0.00',
    monthlySalary: '0.00',
    status: 'active',
    isDefaultDeliveryBoy: false
  });

  // Sample data - replace with API call in future
  const sampleDeliveryBoys = [
    {
      id: 1,
      branchCode: '16622',
      deliveryBoyCode: 'DB001',
      deliveryBoyName: 'John Doe',
      phoneNo: '+91-9876543210'
    },
    {
      id: 2,
      branchCode: '16622',
      deliveryBoyCode: 'DB002',
      deliveryBoyName: 'Jane Smith',
      phoneNo: '+91-9876543211'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleDeliveryBoys.filter(deliveryBoy =>
        deliveryBoy.deliveryBoyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliveryBoy.deliveryBoyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliveryBoy.phoneNo.includes(searchTerm)
      );
      setFilteredDeliveryBoys(filtered);
    } else {
      setFilteredDeliveryBoys([]);
    }
  };

  const handleViewAll = () => {
    setFilteredDeliveryBoys(sampleDeliveryBoys);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredDeliveryBoys([]);
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
    console.log('Saving delivery boy:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranch: '16622',
      code: '',
      name: '',
      phoneNo: '',
      emailId: '',
      dailyAllowance: '0.00',
      monthlySalary: '0.00',
      status: 'active',
      isDefaultDeliveryBoy: false
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <UserCheck size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Dist' : 'Distribution'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Delivery Boy' : 'Delivery Boy'}</span>
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
                        Delivery Boy Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Delivery Boy Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Phone No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeliveryBoys.length > 0 ? (
                      filteredDeliveryBoys.map((deliveryBoy) => (
                        <tr key={deliveryBoy.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {deliveryBoy.branchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {deliveryBoy.deliveryBoyCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {deliveryBoy.deliveryBoyName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {deliveryBoy.phoneNo}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Delivery Boy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
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
                        <option value="16622">16622</option>
                        <option value="16623">16623</option>
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
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter delivery boy code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter delivery boy name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone No. *
                    </label>
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

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail Id
                    </label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

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
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-2.5 text-sm text-gray-500">(in INR)</span>
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
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-2.5 text-sm text-gray-500">(in INR)</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={formData.status === 'active'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Active
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          checked={formData.status === 'inactive'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        In Active
                      </label>
                    </div>
                  </div>

                  {/* Is Default Delivery Boy */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isDefaultDeliveryBoy"
                        checked={formData.isDefaultDeliveryBoy}
                        onChange={handleFormChange}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      Is Default Delivery Boy
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

export default DeliveryBoy;
