import React, { useState } from 'react';
import { Calendar, Search, Plus, Save, ArrowLeft, Eye, Edit, Trash2, ChevronDown } from 'lucide-react';

const AccountsCalendar = () => {
  const [view, setView] = useState('list');
  const [searchYear, setSearchYear] = useState('2025');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    accountCode: '',
    accountName: '',
    accountType: '',
    parentAccount: '',
    description: '',
    isActive: true,
    openingBalance: '0.00',
    currentBalance: '0.00'
  });

  // Sample data - replace with API call in future
  const sampleAccounts = [
    {
      id: 1,
      accountCode: 'ACC001',
      accountName: 'Cash Account',
      accountType: 'Asset',
      parentAccount: 'Current Assets',
      description: 'Main cash account for daily operations',
      openingBalance: '₹50,000',
      currentBalance: '₹75,000',
      status: 'Active'
    },
    {
      id: 2,
      accountCode: 'ACC002',
      accountName: 'Bank Account - HDFC',
      accountType: 'Asset',
      parentAccount: 'Current Assets',
      description: 'Primary business bank account',
      openingBalance: '₹2,50,000',
      currentBalance: '₹3,20,000',
      status: 'Active'
    },
    {
      id: 3,
      accountCode: 'ACC003',
      accountName: 'Accounts Receivable',
      accountType: 'Asset',
      parentAccount: 'Current Assets',
      description: 'Outstanding customer payments',
      openingBalance: '₹1,80,000',
      currentBalance: '₹2,15,000',
      status: 'Active'
    },
    {
      id: 4,
      accountCode: 'ACC004',
      accountName: 'Accounts Payable',
      accountType: 'Liability',
      parentAccount: 'Current Liabilities',
      description: 'Outstanding vendor payments',
      openingBalance: '₹95,000',
      currentBalance: '₹1,25,000',
      status: 'Active'
    },
    {
      id: 5,
      accountCode: 'ACC005',
      accountName: 'Sales Revenue',
      accountType: 'Revenue',
      parentAccount: 'Income',
      description: 'Primary sales revenue account',
      openingBalance: '₹0',
      currentBalance: '₹15,50,000',
      status: 'Active'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      accountCode: '',
      accountName: '',
      accountType: '',
      parentAccount: '',
      description: '',
      isActive: true,
      openingBalance: '0.00',
      currentBalance: '0.00'
    });
  };

  const handleBackToList = () => {
    setView('list');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    if (searchYear) {
      const filtered = sampleAccounts.filter(account =>
        account.accountCode.toLowerCase().includes(searchYear.toLowerCase()) ||
        account.accountName.toLowerCase().includes(searchYear.toLowerCase()) ||
        account.accountType.toLowerCase().includes(searchYear.toLowerCase())
      );
      setFilteredAccounts(filtered);
    } else {
      setFilteredAccounts([]);
    }
  };

  const handleViewAll = () => {
    setFilteredAccounts(sampleAccounts);
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving account:', formData);
    // For now, just go back to list
    setView('list');
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Calendar size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Finance' : 'Finance'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Accounts Calendar' : 'Accounts Calendar'}</span>
        </div>
        {view === 'list' && (
          <button
          onClick={handleCreateNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Create New
        </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Finance › Accounts Calendar
            </div>

            {view === 'list' ? (
              <>
                {/* Quick Search Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <div className="relative">
                        <select
                          value={searchYear}
                          onChange={(e) => setSearchYear(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                        >
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <button
                      onClick={handleSearch}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Search size={16} />
                      Go
                    </button>
                    <button
                      onClick={handleViewAll}
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      View All
                    </button>
                  </div>
                </div>

                {/* Accounts Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Accounts List</h3>
                  <div className="border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Account Code
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Account Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Account Type
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Parent Account
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Description
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Opening Balance
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Current Balance
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAccounts.length > 0 ? (
                          filteredAccounts.map((account) => (
                            <tr key={account.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {account.accountCode}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {account.accountName}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  account.accountType === 'Asset' 
                                    ? 'bg-green-100 text-green-800' 
                                    : account.accountType === 'Liability'
                                    ? 'bg-red-100 text-red-800'
                                    : account.accountType === 'Revenue'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {account.accountType}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {account.parentAccount}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {account.description}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {account.openingBalance}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {account.currentBalance}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  account.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {account.status}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
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
                            <td colSpan="9" className="px-3 py-8 text-center text-gray-500">
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
              /* Create New Form */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Create New Account</h3>
                  
                  {/* Account Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.accountCode}
                        onChange={(e) => handleInputChange('accountCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter account code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.accountName}
                        onChange={(e) => handleInputChange('accountName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter account name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.accountType}
                        onChange={(e) => handleInputChange('accountType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Account Type</option>
                        <option value="Asset">Asset</option>
                        <option value="Liability">Liability</option>
                        <option value="Equity">Equity</option>
                        <option value="Revenue">Revenue</option>
                        <option value="Expense">Expense</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent Account
                      </label>
                      <select
                        value={formData.parentAccount}
                        onChange={(e) => handleInputChange('parentAccount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Parent Account</option>
                        <option value="Current Assets">Current Assets</option>
                        <option value="Fixed Assets">Fixed Assets</option>
                        <option value="Current Liabilities">Current Liabilities</option>
                        <option value="Long-term Liabilities">Long-term Liabilities</option>
                        <option value="Income">Income</option>
                        <option value="Expenses">Expenses</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter account description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Balance
                      </label>
                      <input
                        type="number"
                        value={formData.openingBalance}
                        onChange={(e) => handleInputChange('openingBalance', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Balance
                      </label>
                      <input
                        type="number"
                        value={formData.currentBalance}
                        onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => handleInputChange('isActive', e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                          Is Active
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleBackToList}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="text-right text-sm text-gray-500">
                <p>Botree Software International Pvt Ltd</p>
                <p>© All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsCalendar;



