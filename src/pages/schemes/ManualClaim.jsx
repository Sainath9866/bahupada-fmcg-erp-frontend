import React, { useState } from 'react';
import { Tag, Search, Plus, Save, ArrowLeft, Eye, Edit, Trash2, Calendar, Upload } from 'lucide-react';

const ManualClaim = () => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [docDate, setDocDate] = useState('');
  const [filteredClaims, setFilteredClaims] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    claimDescription: '',
    year: '',
    remarks: '',
    claimDate: '',
    month: ''
  });

  const [claimItems, setClaimItems] = useState([
    {
      id: 1,
      description: '',
      claimAmount: '0.00',
      taxAmount: '',
      remarks: '',
      file: null
    }
  ]);

  // Sample data - replace with API call in future
  const sampleClaims = [
    {
      id: 1,
      claimCode: 'MC001',
      claimDescription: 'Manual Volume Bonus',
      claimDate: '15/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹25,000',
      remarks: 'Manual Q1 Achievement',
      status: 'Approved'
    },
    {
      id: 2,
      claimCode: 'MC002',
      claimDescription: 'Manual Target Incentive',
      claimDate: '20/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹15,000',
      remarks: 'Monthly Manual Target',
      status: 'Pending'
    },
    {
      id: 3,
      claimCode: 'MC003',
      claimDescription: 'Manual Special Claim',
      claimDate: '25/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹35,000',
      remarks: 'Manual Festival Promotion',
      status: 'Rejected'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      claimDescription: '',
      year: '',
      remarks: '',
      claimDate: '',
      month: ''
    });
    setClaimItems([{
      id: 1,
      description: '',
      claimAmount: '0.00',
      taxAmount: '',
      remarks: '',
      file: null
    }]);
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

  const handleClaimItemChange = (id, field, value) => {
    setClaimItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleAddClaimItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      claimAmount: '0.00',
      taxAmount: '',
      remarks: '',
      file: null
    };
    setClaimItems(prev => [...prev, newItem]);
  };

  const handleRemoveClaimItem = (id) => {
    if (claimItems.length > 1) {
      setClaimItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleFileUpload = (id, file) => {
    if (file && file.type === 'application/pdf' && file.size <= 1024 * 1024) { // 1MB limit
      handleClaimItemChange(id, 'file', file);
    } else {
      alert('Please choose only PDF file size less than 1MB.');
    }
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving manual claim:', { formData, claimItems });
    // For now, just go back to list
    setView('list');
  };

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleClaims.filter(claim =>
        claim.claimCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.claimDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.remarks.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClaims(filtered);
    } else {
      setFilteredClaims([]);
    }
  };

  const handleViewAll = () => {
    setFilteredClaims(sampleClaims);
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Tag size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Schemes' : 'Schemes & Claims'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Manual Claim' : 'Manual Claim'}</span>
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
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Schemes & Claims › Manual Claim
            </div>

            {view === 'list' ? (
              <>
                {/* Quick Search Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter atleast 3 characters"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="date"
                          value={docDate}
                          onChange={(e) => setDocDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <button
                      onClick={handleViewAll}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      View All
                    </button>
                  </div>
                </div>

                {/* Recent Records Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent records</h3>
                  <div className="border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse table-fixed">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[11%]">
                            Claim Code
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[16%]">
                            Claim Description
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[11%]">
                            Claim Date
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[9%]">
                            Claim Year
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[11%]">
                            Claim Month
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[11%]">
                            Claim amount
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[14%]">
                            Remarks
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[8%]">
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[9%]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClaims.length > 0 ? (
                          filteredClaims.map((claim) => (
                            <tr key={claim.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claim.claimCode}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claim.claimDescription}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claim.claimDate}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claim.claimYear}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claim.claimMonth}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {claim.claimAmount}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claim.remarks}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  claim.status === 'Approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : claim.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {claim.status}
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Manual Claim Form</h3>
                  
                  {/* Claim Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Description
                      </label>
                      <input
                        type="text"
                        value={formData.claimDescription}
                        onChange={(e) => handleInputChange('claimDescription', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter claim description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remarks
                      </label>
                      <input
                        type="text"
                        value={formData.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter remarks"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.claimDate}
                          onChange={(e) => handleInputChange('claimDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Month
                      </label>
                      <select
                        value={formData.month}
                        onChange={(e) => handleInputChange('month', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload Note */}
                  <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please choose only pdf file size less than 1MB.
                    </p>
                  </div>

                  {/* Claim Items Section */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">Claim Items</h4>
                    {claimItems.map((item, index) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={item.description}
                              onChange={(e) => handleClaimItemChange(item.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">Select</option>
                              <option value="Volume Bonus">Volume Bonus</option>
                              <option value="Target Incentive">Target Incentive</option>
                              <option value="Special Promotion">Special Promotion</option>
                              <option value="Service Charge">Service Charge</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Claim Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={item.claimAmount}
                              onChange={(e) => handleClaimItemChange(item.id, 'claimAmount', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="0.00"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tax Amount
                            </label>
                            <input
                              type="number"
                              value={item.taxAmount}
                              onChange={(e) => handleClaimItemChange(item.id, 'taxAmount', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="0.00"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Remarks <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={item.remarks}
                              onChange={(e) => handleClaimItemChange(item.id, 'remarks', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter remarks"
                            />
                          </div>

                          <div className="flex gap-2">
                            <label className="flex-1">
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileUpload(item.id, e.target.files[0])}
                                className="hidden"
                                id={`file-${item.id}`}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById(`file-${item.id}`).click()}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                              >
                                <Upload size={16} />
                                Select File
                              </button>
                            </label>
                            {claimItems.length > 1 && (
                              <button
                                onClick={() => handleRemoveClaimItem(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                        {item.file && (
                          <div className="mt-2 text-sm text-green-600">
                            File selected: {item.file.name}
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={handleAddClaimItem}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Plus size={16} />
                      Add Claim Item
                    </button>
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
                      Save & Confirm
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

export default ManualClaim;




