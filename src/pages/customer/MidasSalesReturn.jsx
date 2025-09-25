import React, { useState } from 'react';
import { RotateCcw, Search, Eye, Edit, Trash2, Calendar, Building, User, FileText, Check, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';

const MidasSalesReturn = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [fromDate, setFromDate] = useState('08/09/2025');
  const [toDate, setToDate] = useState('08/09/2025');
  const [retailer, setRetailer] = useState('');
  const [status, setStatus] = useState('Pending to be pulled for SR');
  const [filteredReturns, setFilteredReturns] = useState([]);
  const [formData, setFormData] = useState({
    srnDate: '08/09/2025',
    distributorBranch: '16622 - 16622 - SRI VEI',
    referenceType: 'With Reference',
    returnType: 'Full',
    retailer: '',
    reason: '',
    inputText: ''
  });

  // Sample data - replace with API call in future
  const sampleReturns = [
    {
      id: 1,
      distributor: '16622-SRI VENKATESWARA',
      invoiceDate: '08/09/2025',
      retailerCode: 'RT001',
      retailerName: 'ABC Store',
      invoiceNo: 'INV001',
      returnStatus: 'Pending',
      status: 'Active'
    },
    {
      id: 2,
      distributor: '16622-SRI VENKATESWARA',
      invoiceDate: '08/09/2025',
      retailerCode: 'RT002',
      retailerName: 'XYZ Mart',
      invoiceNo: 'INV002',
      returnStatus: 'Approved',
      status: 'Active'
    }
  ];

  const handleLoad = () => {
    setFilteredReturns(sampleReturns);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving midas sales return:', formData);
    // Handle save logic here
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      srnDate: '08/09/2025',
      distributorBranch: '16622 - 16622 - SRI VEI',
      referenceType: 'With Reference',
      returnType: 'Full',
      retailer: '',
      reason: '',
      inputText: ''
    });
    setView('list');
  };

  const handleCreateNew = () => {
    setView('form');
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <RotateCcw size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Midas Sales Return</span>
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
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Customer › Midas Sales Return
            </div>

            {view === 'list' ? (
              <>
                {/* List View */}
                {/* Filter Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Date *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Date *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Retailer *
                      </label>
                      <select
                        value={retailer}
                        onChange={(e) => setRetailer(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="RT001">ABC Store</option>
                        <option value="RT002">XYZ Mart</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status *
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Pending to be pulled for SR">Pending to be pulled for SR</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      <button
                        onClick={handleLoad}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Load
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Return Records</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            Distributor
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                            Invoice Date
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                            Retailer Code
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[150px]">
                            Retailer Name
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            Invoice No
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            Return Status
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                            Status
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReturns.length > 0 ? (
                          filteredReturns.map((ret) => (
                            <tr key={ret.id} className="hover:bg-gray-50">
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {ret.distributor}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {ret.invoiceDate}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {ret.retailerCode}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {ret.retailerName}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {ret.invoiceNo}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  ret.returnStatus === 'Pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {ret.returnStatus}
                                </span>
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  ret.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {ret.status}
                                </span>
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
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
                            <td colSpan="8" className="px-2 py-8 text-center text-gray-500">
                              No Matching record(s) found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      (1 of 1)
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronRight size={16} />
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronRight size={16} />
                      </button>
                      <select className="ml-4 px-2 py-1 border border-gray-300 rounded text-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Form View */}
                <div className="space-y-6">
                  {/* SRN Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <option value="16622 - 16622 - SRI VEI">16622 - 16622 - SRI VEI</option>
                        <option value="16623 - ANOTHER BRANCH">16623 - ANOTHER BRANCH</option>
                      </select>
                    </div>
                  </div>

                  {/* Sales Return Mode */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Return Mode</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>
                  </div>

                  {/* Search Section */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Retailer
                        </label>
                        <select
                          name="retailer"
                          value={formData.retailer}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="RT001">ABC Store</option>
                          <option value="RT002">XYZ Mart</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reason
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
                          placeholder="Enter atleast 3 ch"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Return Product Details Table */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Return Product Details</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              Distr Prod Code
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[150px]">
                              Product Name
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Batch
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              Saleable Qty
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              Unsaleable Qty
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Offer Qty
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              MRP
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Sell Rate
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Gross Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              Line Disc. Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Tax Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Net Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="12" className="px-2 py-8 text-center text-gray-500">
                              No Products selected
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SRN Total Summary */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
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
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end gap-4">
                  <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                    View Scheme
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <FileText size={16} />
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidasSalesReturn;