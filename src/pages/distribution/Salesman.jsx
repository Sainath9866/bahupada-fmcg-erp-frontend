import React, { useState } from 'react';
import { UserCheck, Search, Eye, Edit, Trash2, Plus, Save, X, ArrowRight } from 'lucide-react';

const Salesman = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [activeTab, setActiveTab] = useState('general'); // 'general' or 'other-attributes'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSalesmen, setFilteredSalesmen] = useState([]);
  const [formData, setFormData] = useState({
    salesmanType: 'New', // 'New' or 'Replacement'
    branchCode: '',
    salesmanId: '',
    salesmanCode: '',
    salesmanPositionCode: '',
    salesmanName: '',
    salesmanType: '',
    phoneNo: '',
    isActive: 'Yes'
  });

  // Sample data - replace with API call in future
  const sampleSalesmen = [
    {
      id: 1,
      branchCode: '16622',
      salesmanId: 'S001',
      salesmanCode: 'SC001',
      salesmanPositionCode: 'SP001',
      salesmanName: 'John Doe',
      salesmanType: 'Primary',
      phoneNo: '9876543210',
      isActive: true
    },
    {
      id: 2,
      branchCode: '16622',
      salesmanId: 'S002',
      salesmanCode: 'SC002',
      salesmanPositionCode: 'SP002',
      salesmanName: 'Jane Smith',
      salesmanType: 'Secondary',
      phoneNo: '9876543211',
      isActive: true
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleSalesmen.filter(salesman =>
        salesman.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salesman.salesmanCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salesman.salesmanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salesman.phoneNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSalesmen(filtered);
    } else {
      setFilteredSalesmen([]);
    }
  };

  const handleViewAll = () => {
    setFilteredSalesmen(sampleSalesmen);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredSalesmen([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGo = () => {
    console.log('Proceeding with:', formData.salesmanType);
    // Logic to proceed based on New/Replacement selection
    if (formData.salesmanType === 'New') {
      // Show new salesman form fields
      console.log('Showing new salesman form');
    } else {
      // Show replacement salesman form fields
      console.log('Showing replacement salesman form');
    }
  };

  const handleSave = () => {
    console.log('Saving salesman:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      salesmanType: 'New',
      branchCode: '',
      salesmanId: '',
      salesmanCode: '',
      salesmanPositionCode: '',
      salesmanName: '',
      salesmanType: '',
      phoneNo: '',
      isActive: 'Yes'
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
          <span className="font-semibold">{window.innerWidth < 640 ? 'Salesman' : 'Salesman'}</span>
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
                        Salesman Id
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Position Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Type
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
                    {filteredSalesmen.length > 0 ? (
                      filteredSalesmen.map((salesman) => (
                        <tr key={salesman.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.branchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.salesmanId}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.salesmanCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.salesmanPositionCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.salesmanName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.salesmanType}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {salesman.phoneNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              salesman.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {salesman.isActive ? 'Yes' : 'No'}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Salesman</h3>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'general'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab('other-attributes')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'other-attributes'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Other Attributes
                  </button>
                </nav>
              </div>

              {activeTab === 'general' ? (
                <div className="space-y-6">
                  {/* New/Replacement Radio Buttons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Type
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="salesmanType"
                          value="New"
                          checked={formData.salesmanType === 'New'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        New
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="salesmanType"
                          value="Replacement"
                          checked={formData.salesmanType === 'Replacement'}
                          onChange={handleFormChange}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Replacement
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-start gap-4">
                    <button
                      onClick={handleGo}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Go
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Other Attributes Tab - Empty as requested */
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="text-gray-500">
                      <UserCheck size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">Other Attributes</p>
                      <p className="text-sm">No additional attributes configured</p>
                    </div>
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

export default Salesman;
