import React, { useState } from 'react';
import { CreditCard, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, DollarSign, Building, User, FileText } from 'lucide-react';

const CreditDebitNote = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [formData, setFormData] = useState({
    branchCode: '',
    referenceNo: '',
    date: '',
    customerCode: '',
    retailerName: '',
    amount: '',
    status: 'Pending',
    balanceAmount: ''
  });

  // Sample data - replace with API call in future
  const sampleNotes = [
    {
      id: 1,
      branchCode: '16622',
      referenceNo: 'CN001',
      date: '2023-10-26',
      customerCode: 'CUST001',
      retailerName: 'ABC Retail Store',
      amount: 15000.00,
      status: 'Approved',
      balanceAmount: 0.00
    },
    {
      id: 2,
      branchCode: '16622',
      referenceNo: 'DN001',
      date: '2023-10-25',
      customerCode: 'CUST002',
      retailerName: 'XYZ Supermarket',
      amount: 8500.00,
      status: 'Pending',
      balanceAmount: 8500.00
    },
    {
      id: 3,
      branchCode: '16623',
      referenceNo: 'CN002',
      date: '2023-10-24',
      customerCode: 'CUST003',
      retailerName: 'DEF Department Store',
      amount: 12000.00,
      status: 'Rejected',
      balanceAmount: 12000.00
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3 || selectedDate) {
      const filtered = sampleNotes.filter(note =>
        (searchTerm.length === 0 || 
         note.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
         note.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
         note.retailerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDate === '' || note.date === selectedDate)
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes([]);
    }
  };

  const handleViewAll = () => {
    setFilteredNotes(sampleNotes);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredNotes([]);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value) {
      handleSearch();
    } else {
      setFilteredNotes([]);
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
    console.log('Saving credit/debit note:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      branchCode: '',
      referenceNo: '',
      date: '',
      customerCode: '',
      retailerName: '',
      amount: '',
      status: 'Pending',
      balanceAmount: ''
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <CreditCard size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Credit Note - Debit Note (Customer)</span>
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
                    Select Date
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
                        Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Reference No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Customer Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Retailer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Balance Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotes.length > 0 ? (
                      filteredNotes.map((note) => (
                        <tr key={note.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {note.branchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {note.referenceNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {note.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {note.customerCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {note.retailerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            ₹{note.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              note.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : note.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {note.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            ₹{note.balanceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create Credit Note - Debit Note</h3>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Branch Code and Reference No */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="branchCode"
                        value={formData.branchCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter branch code"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reference No. *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="referenceNo"
                        value={formData.referenceNo}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter reference number"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FileText size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date and Customer Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      />
                      <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="customerCode"
                        value={formData.customerCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter customer code"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User size={16} className="text-gray-400" />
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
                      <Building size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Amount and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter amount"
                        step="0.01"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balance Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="balanceAmount"
                      value={formData.balanceAmount}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter balance amount"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
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

export default CreditDebitNote;
