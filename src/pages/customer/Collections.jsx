import React, { useState } from 'react';
import { DollarSign, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, User, Building, CreditCard, Calculator, Minus } from 'lucide-react';

const Collections = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [collectionType, setCollectionType] = useState('fast'); // 'fast' or 'collection'
  const [activeAdjustmentTab, setActiveAdjustmentTab] = useState('pending'); // 'cr-dr' or 'pending'
  const [formData, setFormData] = useState({
    distributorBranch: '16622',
    salesman: 'SM01 - YAKASIRI VINOD KL',
    route: '',
    searchBy: 'Retailer Name',
    customerSearch: '',
    collectionMode: 'Cash',
    collectedAmount: '',
    collectionDiscountAmt: '',
    pendingBillAmount: '0.00',
    onAccountAmountAvailable: '0.00',
    crNoteAmountAvailable: '0.00',
    drNoteAmountAvailable: '0.00'
  });

  // Sample data - replace with API call in future
  const sampleCollections = [
    {
      id: 1,
      distributorBranch: '16622',
      retailerName: 'ABC Retail Store',
      referenceNo: 'REF001',
      collectionDate: '2023-10-26',
      collectionMode: 'Cash',
      collectedAmount: 15000.00
    },
    {
      id: 2,
      distributorBranch: '16622',
      retailerName: 'XYZ Supermarket',
      referenceNo: 'REF002',
      collectionDate: '2023-10-25',
      collectionMode: 'Cheque',
      collectedAmount: 8500.00
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3 || selectedDate) {
      const filtered = sampleCollections.filter(collection =>
        (searchTerm.length === 0 || 
         collection.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         collection.referenceNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate === '' || collection.collectionDate === selectedDate)
      );
      setFilteredCollections(filtered);
    } else {
      setFilteredCollections([]);
    }
  };

  const handleViewAll = () => {
    setFilteredCollections(sampleCollections);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredCollections([]);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value) {
      handleSearch();
    } else {
      setFilteredCollections([]);
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
    console.log('Saving collection:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranch: '16622',
      salesman: 'SM01 - YAKASIRI VINOD KL',
      route: '',
      searchBy: 'Retailer Name',
      customerSearch: '',
      collectionMode: 'Cash',
      collectedAmount: '',
      collectionDiscountAmt: '',
      pendingBillAmount: '0.00',
      onAccountAmountAvailable: '0.00',
      crNoteAmountAvailable: '0.00',
      drNoteAmountAvailable: '0.00'
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <DollarSign size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Collections</span>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Collection Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    />
                    <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
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
                        Retailer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Reference No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Collection Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Collection Mode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Collected Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCollections.length > 0 ? (
                      filteredCollections.map((collection) => (
                        <tr key={collection.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {collection.distributorBranch}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {collection.retailerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {collection.referenceNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {collection.collectionDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {collection.collectionMode}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            ₹{collection.collectedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumbs */}
              <div className="text-sm text-gray-600 mb-4">
                Home › Customer › Collections
              </div>

              {/* Collection Type Selection */}
              <div className="mb-6">
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="collectionType"
                      value="fast"
                      checked={collectionType === 'fast'}
                      onChange={(e) => setCollectionType(e.target.value)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    Fast Collection
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="collectionType"
                      value="collection"
                      checked={collectionType === 'collection'}
                      onChange={(e) => setCollectionType(e.target.value)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    Collection
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Distributor/Salesman/Route Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distributor Branch
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
                      Salesman
                    </label>
                    <div className="relative">
                      <select
                        name="salesman"
                        value={formData.salesman}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="SM01 - YAKASIRI VINOD KL">SM01 - YAKASIRI VINOD KL</option>
                        <option value="SM02 - JANE SMITH">SM02 - JANE SMITH</option>
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
                      Route *
                    </label>
                    <div className="relative">
                      <select
                        name="route"
                        value={formData.route}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select Route</option>
                        <option value="Route 1">Route 1</option>
                        <option value="Route 2">Route 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collection Details Input */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                        <option value="Customer Code">Customer Code</option>
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
                      Input Text - Customer *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="customerSearch"
                        value={formData.customerSearch}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter atleast 3 characters"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Collection Mode
                    </label>
                    <div className="relative">
                      <select
                        name="collectionMode"
                        value={formData.collectionMode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Online">Online</option>
                        <option value="Card">Card</option>
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
                      Collected Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="collectedAmount"
                        value={formData.collectedAmount}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter amount"
                        step="0.01"
                      />
                      <button className="absolute right-2 top-2 w-6 h-6 bg-purple-500 text-white rounded flex items-center justify-center hover:bg-purple-600">
                        <Calculator size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Adjustments Section */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex space-x-6 mb-4">
                    <button
                      onClick={() => setActiveAdjustmentTab('cr-dr')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        activeAdjustmentTab === 'cr-dr'
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      Cr/Dr Note Adjustments
                    </button>
                    <button
                      onClick={() => setActiveAdjustmentTab('pending')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        activeAdjustmentTab === 'pending'
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      Pending Bills Adjustments
                    </button>
                  </div>

                  {activeAdjustmentTab === 'pending' && (
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Collection Discount Amt
                        </label>
                        <input
                          type="number"
                          name="collectionDiscountAmt"
                          value={formData.collectionDiscountAmt}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter discount amount"
                          step="0.01"
                        />
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Summary Information */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pending Bill Amount
                    </label>
                    <input
                      type="text"
                      value={formData.pendingBillAmount}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      On Account Amount Available
                    </label>
                    <input
                      type="text"
                      value={formData.onAccountAmountAvailable}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cr Note Amount Available
                    </label>
                    <input
                      type="text"
                      value={formData.crNoteAmountAvailable}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dr Note Amount Available
                    </label>
                    <input
                      type="text"
                      value={formData.drNoteAmountAvailable}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                </div>

                {/* Data Table */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Collection Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Customer Code
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Retailer Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Collection Mode
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Total TDS Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Collected Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Adjusted on Account Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Adjusted Cr/Dr Note Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Adjusted Bill Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Collection Discount Amt
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="10" className="px-4 py-8 text-center text-gray-500 border-b border-gray-300">
                            No matching record(s) found
                          </td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">
                            Total:
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300"></td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300"></td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">0.00</td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">0.00</td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">0.00</td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">0.00</td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">0.00</td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300">0.00</td>
                          <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-300"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
