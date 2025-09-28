import React, { useState } from 'react';
import { RotateCcw, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, Building, User, FileText, Check, Printer } from 'lucide-react';

const SalesReturn = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [srnDate, setSrnDate] = useState('');
  const [filteredReturns, setFilteredReturns] = useState([]);
  const [formData, setFormData] = useState({
    srnRefNo: '',
    srnDate: '08/09/2025',
    distributorBranch: '16622 - 16622 - SRI VE',
    referenceType: 'With Reference',
    returnType: 'Full',
    status: ['Pending', 'Settled'],
    salesman: '',
    route: '',
    retailer: '',
    reason: '',
    inputText: '',
    shippingAddress: ''
  });

  // Sample data - replace with API call in future
  const sampleReturns = [
    {
      id: 1,
      slNo: 1,
      branchCode: '16622',
      referenceNo: 'SRN001',
      date: '08/09/2025',
      retailerCode: 'RT001',
      retailerName: 'ABC Store',
      srnNetAmount: 15000,
      returnType: 'Full',
      status: 'Pending'
    },
    {
      id: 2,
      slNo: 2,
      branchCode: '16622',
      referenceNo: 'SRN002',
      date: '08/09/2025',
      retailerCode: 'RT002',
      retailerName: 'XYZ Mart',
      srnNetAmount: 25000,
      returnType: 'Partial',
      status: 'Settled'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleReturns.filter(ret => 
        ret.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ret.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ret.retailerCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReturns(filtered);
    } else {
      setFilteredReturns([]);
    }
  };

  const handleViewAll = () => {
    setFilteredReturns(sampleReturns);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredReturns([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        status: checked 
          ? [...prev.status, value]
          : prev.status.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    console.log('Saving sales return:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      srnRefNo: '',
      srnDate: '08/09/2025',
      distributorBranch: '16622 - 16622 - SRI VE',
      referenceType: 'With Reference',
      returnType: 'Full',
      status: ['Pending', 'Settled'],
      salesman: '',
      route: '',
      retailer: '',
      reason: '',
      inputText: '',
      shippingAddress: ''
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <RotateCcw size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Sales Return</span>
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
                <div className="flex-1">
                  <input
                    type="date"
                    value={srnDate}
                    onChange={(e) => setSrnDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Select SRN Date"
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
                        Sl. No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Reference No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        SRN Net Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Return Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReturns.length > 0 ? (
                      filteredReturns.map((ret) => (
                        <tr key={ret.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.slNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.branchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.referenceNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.retailerCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.retailerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            ₹{ret.srnNetAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {ret.returnType}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ret.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {ret.status}
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
              <div className="text-sm text-gray-600 mb-4">
                Home › Customer › Sales Return
              </div>

              {/* SRN Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SRN Ref. No
                  </label>
                  <input
                    type="text"
                    name="srnRefNo"
                    value={formData.srnRefNo}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter SRN reference number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SRN Date
                  </label>
                  <input
                    type="text"
                    value={formData.srnDate}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distributor Branch
                  </label>
                  <select
                    name="distributorBranch"
                    value={formData.distributorBranch}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="16622 - 16622 - SRI VE">16622 - 16622 - SRI VE</option>
                  </select>
                </div>
              </div>

              {/* Sales Return Mode Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Return Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reference Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="referenceType"
                          value="With Reference"
                          checked={formData.referenceType === 'With Reference'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        With Reference
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="referenceType"
                          value="Without Reference"
                          checked={formData.referenceType === 'Without Reference'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Without Reference
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="returnType"
                          value="Full"
                          checked={formData.returnType === 'Full'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Full
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="returnType"
                          value="Partial"
                          checked={formData.returnType === 'Partial'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Partial
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="status"
                          value="Pending"
                          checked={formData.status.includes('Pending')}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Pending
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="status"
                          value="Settled"
                          checked={formData.status.includes('Settled')}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Settled
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
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
                      <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r hover:bg-gray-300">
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
                      <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r hover:bg-gray-300">
                        ...
                      </button>
                    </div>
                  </div>
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
                        placeholder="Select retailer"
                      />
                      <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r hover:bg-gray-300">
                        ...
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason *
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Expired">Expired</option>
                      <option value="Wrong Product">Wrong Product</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Input Text - Bill No and Select *
                    </label>
                    <input
                      type="text"
                      name="inputText"
                      value={formData.inputText}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter atleast:"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address
                    </label>
                    <select
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Address 1">Address 1</option>
                      <option value="Address 2">Address 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product List Table */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product List</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Bill No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Bill Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Bill Net Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Reason
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No Products selected
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SRN Total Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">SRN Total</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Scheme Disc Amt(Inv lvl):</span>
                      <span className="text-sm font-medium">0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gross Amount :</span>
                      <span className="text-sm font-medium text-blue-600">0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Deduction(-) :</span>
                      <span className="text-sm font-medium text-blue-600">0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Cr/Db Adjustment :</span>
                      <span className="text-sm font-medium">0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Net Amount :</span>
                      <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                        0.00
                        <Check size={16} className="text-purple-600" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
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
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                  <Printer size={16} />
                  Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReturn;




