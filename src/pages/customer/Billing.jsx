import React, { useState } from 'react';
import { FileText, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, DollarSign, User, Package, ShoppingCart, Info, Minus, Check } from 'lucide-react';

const Billing = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);
  const [activeTab, setActiveTab] = useState('invoice'); // 'invoice' or 'additional'
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [formData, setFormData] = useState({
    orderNo: '',
    salesman: '',
    route: '',
    customerSearch: '',
    retailerName: '',
    productSearch: '',
    companyProductCode: '',
    productText: '',
    csPcsUpc: '0',
    totMrpStock: '0',
    stockOnHand: '0',
    uom1: '',
    orderQty: '',
    cashDiscountAmount: '0.00',
    cashDiscountPercent: '0.00',
    remarks: ''
  });

  // Sample data - replace with API call in future
  const sampleBills = [
    {
      id: 1,
      invoiceNo: 'INV001',
      retailerName: 'ABC Retail Store',
      salesman: 'John Doe',
      invoiceDate: '2023-10-26',
      grossAmt: 15000.00,
      discountAmt: 500.00,
      schemeAmt: 200.00,
      taxAmt: 2700.00,
      netAmt: 12600.00,
      billingStatus: 'Completed',
      collectionStatus: 'Pending'
    },
    {
      id: 2,
      invoiceNo: 'INV002',
      retailerName: 'XYZ Supermarket',
      salesman: 'Jane Smith',
      invoiceDate: '2023-10-25',
      grossAmt: 8500.00,
      discountAmt: 200.00,
      schemeAmt: 100.00,
      taxAmt: 1470.00,
      netAmt: 6730.00,
      billingStatus: 'Pending',
      collectionStatus: 'Completed'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3 || selectedDate) {
      const filtered = sampleBills.filter(bill =>
        (searchTerm.length === 0 || 
         bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
         bill.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         bill.salesman.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate === '' || bill.invoiceDate === selectedDate)
      );
      setFilteredBills(filtered);
    } else {
      setFilteredBills([]);
    }
  };

  const handleViewAll = () => {
    setFilteredBills(sampleBills);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredBills([]);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value) {
      handleSearch();
    } else {
      setFilteredBills([]);
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
    console.log('Saving billing:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      orderNo: '',
      salesman: '',
      route: '',
      customerSearch: '',
      retailerName: '',
      productSearch: '',
      companyProductCode: '',
      productText: '',
      csPcsUpc: '0',
      totMrpStock: '0',
      stockOnHand: '0',
      uom1: '',
      orderQty: '',
      cashDiscountAmount: '0.00',
      cashDiscountPercent: '0.00',
      remarks: ''
    });
  };

  return (
    <div className="p-2 sm:p-6 bg-gray-50 min-h-screen max-w-full">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-3 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <FileText size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Billing</span>
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Search</h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Search Term
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter atleast 3 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    />
                    <Calendar size={14} className="absolute right-2 sm:right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSearch}
                    className="flex items-center gap-1 sm:gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors"
                  >
                    <Search size={14} className="sm:w-4 sm:h-4" />
                    Search
                  </button>
                  <button
                    onClick={handleViewAll}
                    className="flex items-center gap-1 sm:gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

            {/* Search Results Section */}
            <div className="p-3 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Search Results</h3>
              <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                <table className="min-w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Invoice No
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Retailer Name
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Salesman
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Invoice Date
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Gross Amt
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Discount Amt
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Scheme Amt
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Tax Amt
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Net Amt
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Billing Status
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Collection Status
                      </th>
                      <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.length > 0 ? (
                      filteredBills.map((bill) => (
                        <tr key={bill.id} className="hover:bg-gray-50">
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            {bill.invoiceNo}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            {bill.retailerName}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            {bill.salesman}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            {bill.invoiceDate}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            ₹{bill.grossAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            ₹{bill.discountAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            ₹{bill.schemeAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            ₹{bill.taxAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            ₹{bill.netAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                              bill.billingStatus === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {bill.billingStatus}
                            </span>
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                              bill.collectionStatus === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {bill.collectionStatus}
                            </span>
                          </td>
                          <td className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 border-b whitespace-nowrap">
                            <div className="flex items-center gap-0.5 sm:gap-1">
                              <button className="text-blue-600 hover:text-blue-800 p-0.5 sm:p-1">
                                <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                              </button>
                              <button className="text-green-600 hover:text-green-800 p-0.5 sm:p-1">
                                <Edit size={12} className="sm:w-3.5 sm:h-3.5" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 p-0.5 sm:p-1">
                                <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="px-3 py-6 sm:px-4 sm:py-8 text-center text-xs sm:text-sm text-gray-500">
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
                Home › Customer › Billing
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  <button 
                    onClick={() => setActiveTab('invoice')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'invoice' 
                        ? 'border-purple-500 text-purple-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Invoice
                  </button>
                  <button 
                    onClick={() => setActiveTab('additional')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'additional' 
                        ? 'border-purple-500 text-purple-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Additional Information
                  </button>
                </div>
              </div>

              {activeTab === 'invoice' ? (
                <div className="space-y-6">
                  {/* Order Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order No
                      </label>
                      <div className="relative">
                        <select
                          name="orderNo"
                          value={formData.orderNo}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="ORD001">ORD001</option>
                          <option value="ORD002">ORD002</option>
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
                          <option value="">Select</option>
                          <option value="John Doe">John Doe</option>
                          <option value="Jane Smith">Jane Smith</option>
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
                        Route
                      </label>
                      <div className="relative">
                        <select
                          name="route"
                          value={formData.route}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
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

                  {/* Customer Search Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          placeholder="Enter customer search"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Retailer Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="retailerName"
                          value={formData.retailerName}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter atleast 3 characters"
                        />
                        <div className="absolute right-3 top-2.5">
                          <Info size={16} className="text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Search Section */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Product code
                      </label>
                      <div className="relative">
                        <select
                          name="companyProductCode"
                          value={formData.companyProductCode}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="PROD001">PROD001</option>
                          <option value="PROD002">PROD002</option>
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
                        Input Text - Product *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="productText"
                          value={formData.productText}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter atleast 3 characters"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CS/PCS/UPC
                      </label>
                      <input
                        type="text"
                        name="csPcsUpc"
                        value={formData.csPcsUpc}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tot MRP Stock
                      </label>
                      <input
                        type="text"
                        name="totMrpStock"
                        value={formData.totMrpStock}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock On Hand
                      </label>
                      <input
                        type="text"
                        name="stockOnHand"
                        value={formData.stockOnHand}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UOM1*
                      </label>
                      <div className="relative">
                        <select
                          name="uom1"
                          value={formData.uom1}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="PCS">PCS</option>
                          <option value="KG">KG</option>
                          <option value="LTR">LTR</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Qty */}
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Qty*
                    </label>
                    <input
                      type="number"
                      name="orderQty"
                      value={formData.orderQty}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter order quantity"
                    />
                  </div>

                  {/* Product List Table */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Product List</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[100px]">
                              Product Code
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[120px]">
                              Product Name
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[80px]">
                              Batch
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[80px]">
                              Order Qty
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[100px]">
                              Order Qty (BaseUOI)
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              Free Qty
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              MRP
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[80px]">
                              Sell Rate
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[80px]">
                              Gross Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[90px]">
                              Line Disc. Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[80px]">
                              PreTax Disc
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              Cash Disc
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              Tax Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              Net Rate
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              Net Amt
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 min-w-[70px]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="15" className="px-2 py-8 text-center text-gray-500 border-b border-gray-300">
                              No products selected
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setSummaryExpanded(!summaryExpanded)}
                    >
                      <h4 className="text-lg font-semibold text-gray-800">Summary</h4>
                      <div className={`w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white`}>
                        {summaryExpanded ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                    
                    {summaryExpanded && (
                      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Side - Discount Section */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Invoice Special Cash Discount
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="cashDiscountCheck"
                                className="text-purple-600 focus:ring-purple-500"
                              />
                              <span className="text-sm text-gray-700">Cash Discount Amount</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <input
                                type="number"
                                name="cashDiscountAmount"
                                value={formData.cashDiscountAmount}
                                onChange={handleFormChange}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                step="0.01"
                              />
                              <input
                                type="number"
                                name="cashDiscountPercent"
                                value={formData.cashDiscountPercent}
                                onChange={handleFormChange}
                                className="w-20 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                step="0.01"
                                placeholder="%"
                              />
                            </div>
                            <input
                              type="text"
                              name="remarks"
                              value={formData.remarks}
                              onChange={handleFormChange}
                              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Remarks"
                            />
                          </div>
                        </div>

                        {/* Right Side - Totals */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Scheme Disc Amount:</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Invoice Quantity:</span>
                            <span className="text-sm font-medium">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Credit Note Adjustment:</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Debit Note Adjustment:</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Gross Amount:</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Taxable GrossAmt:</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Addition:</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Deduction(-):</span>
                            <span className="text-sm font-medium">0.00</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-300 pt-2">
                            <span className="text-sm font-semibold text-gray-800">Net Amount:</span>
                            <span className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                              0.00
                              <Check size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Scheme
                    </button>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Credit/Debit Adjustment
                    </button>
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
              ) : (
                /* Additional Information Tab */
                <div className="space-y-6">
                  <div className="text-center text-gray-500 py-8">
                    Additional Information content will be implemented here
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
