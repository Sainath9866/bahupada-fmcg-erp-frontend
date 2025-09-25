import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Save, X, Calendar, Building, User, MapPin, FileText, Percent } from 'lucide-react';

const OrderBooking = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622-16622-SRI VENKATE',
    mtOrderRef: '',
    salesman: '',
    shippingAddress: '',
    orderNo: '',
    status: 'New',
    poReferenceNo: '',
    orderType: 'Normal',
    route: '',
    customerSearch: 'Customer Code',
    orderDate: '2025-09-08',
    inputTextCustomer: ''
  });

  // Sample data - replace with API call in future
  const sampleOrders = [
    {
      id: 1,
      orderNo: 'ORD001',
      orderDate: '2025-09-08',
      route: 'Route 1',
      customerCode: 'CUST001',
      retailerName: 'ABC Retail Store',
      status: 'Pending',
      orderType: 'Normal',
      orderReason: 'Regular Order'
    },
    {
      id: 2,
      orderNo: 'ORD002',
      orderDate: '2025-09-07',
      route: 'Route 2',
      customerCode: 'CUST002',
      retailerName: 'XYZ Supermarket',
      status: 'Approved',
      orderType: 'Urgent',
      orderReason: 'Stock Replenishment'
    },
    {
      id: 3,
      orderNo: 'ORD003',
      orderDate: '2025-09-06',
      route: 'Route 1',
      customerCode: 'CUST003',
      retailerName: 'DEF Department Store',
      status: 'Delivered',
      orderType: 'Normal',
      orderReason: 'Regular Order'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3 || selectedDate) {
      const filtered = sampleOrders.filter(order =>
        (searchTerm.length === 0 || 
         order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.customerCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate === '' || order.orderDate === selectedDate)
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
  };

  const handleViewAll = () => {
    setFilteredOrders(sampleOrders);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredOrders([]);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value) {
      handleSearch();
    } else {
      setFilteredOrders([]);
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
    console.log('Saving order booking:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchCode: '16622-16622-SRI VENKATE',
      mtOrderRef: '',
      salesman: '',
      shippingAddress: '',
      orderNo: '',
      status: 'New',
      poReferenceNo: '',
      orderType: 'Normal',
      route: '',
      customerSearch: 'Customer Code',
      orderDate: '2025-09-08',
      inputTextCustomer: ''
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Plus size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Order Booking</span>
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
                    Select Ordered Date
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
                        Order No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Order Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Customer Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Order Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Order Reason
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {order.orderNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {order.orderDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {order.route}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {order.customerCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {order.retailerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Approved'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.orderType === 'Urgent'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {order.orderType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {order.orderReason}
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
                        <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
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
                Customer › Order Booking
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Left Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Distributor Branch Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distributor Branch Code *
                      </label>
                      <div className="relative">
                        <select
                          name="distributorBranchCode"
                          value={formData.distributorBranchCode}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="16622-16622-SRI VENKATE">16622-16622-SRI VENKATE</option>
                          <option value="16623-ANOTHER BRANCH">16623-ANOTHER BRANCH</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Building size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* MT Order Ref */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        MT Order Ref
                      </label>
                      <input
                        type="text"
                        name="mtOrderRef"
                        value={formData.mtOrderRef}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter MT order reference"
                      />
                    </div>

                    {/* Salesman */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salesman *
                      </label>
                      <div className="relative">
                        <select
                          name="salesman"
                          value={formData.salesman}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select Salesman</option>
                          <option value="SM01 - John Doe">SM01 - John Doe</option>
                          <option value="SM02 - Jane Smith">SM02 - Jane Smith</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address *
                      </label>
                      <div className="relative">
                        <select
                          name="shippingAddress"
                          value={formData.shippingAddress}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="Address 1">Address 1</option>
                          <option value="Address 2">Address 2</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Order No */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order No
                      </label>
                      <input
                        type="text"
                        name="orderNo"
                        value={formData.orderNo}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter order number"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <input
                        type="text"
                        value={formData.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                        readOnly
                      />
                    </div>

                    {/* PO Reference No */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PO Reference No
                      </label>
                      <input
                        type="text"
                        name="poReferenceNo"
                        value={formData.poReferenceNo}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter PO reference number"
                      />
                    </div>

                    {/* Order Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Type
                      </label>
                      <div className="relative">
                        <select
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="Normal">Normal</option>
                          <option value="Urgent">Urgent</option>
                          <option value="Priority">Priority</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Route *
                      </label>
                      <div className="relative">
                        <select
                          name="route"
                          value={formData.route}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select Route</option>
                          <option value="Route 1">Route 1</option>
                          <option value="Route 2">Route 2</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Customer Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Search *
                      </label>
                      <div className="relative">
                        <select
                          name="customerSearch"
                          value={formData.customerSearch}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="Customer Code">Customer Code</option>
                          <option value="Customer Name">Customer Name</option>
                          <option value="Phone Number">Phone Number</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Order Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Date
                      </label>
                      <input
                        type="text"
                        value={formData.orderDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                        readOnly
                      />
                    </div>

                    {/* Input Text - Customer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Input Text - Customer *
                      </label>
                      <input
                        type="text"
                        name="inputTextCustomer"
                        value={formData.inputTextCustomer}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter atleast 3 characters"
                      />
                    </div>
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
                  <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Percent size={16} />
                    Discount
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

export default OrderBooking;
