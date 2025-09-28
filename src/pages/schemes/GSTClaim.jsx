import React, { useState } from 'react';
import { Tag, Search, Plus, Save, X, Eye, Edit, Trash2, Calendar, Download } from 'lucide-react';

const GSTClaim = () => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [docDate, setDocDate] = useState('');
  const [filteredClaims, setFilteredClaims] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    claimDescription: '',
    claimDate: '',
    challanNumber: '',
    challanDate: '',
    remarks: ''
  });

  // Sample data - replace with API call in future
  const sampleClaims = [
    {
      id: 1,
      claimCode: 'GST001',
      claimDescription: 'GST Refund Claim Q1',
      claimDate: '15/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      challanNumber: 'CH001234',
      challanDate: '10/01/2024',
      claimAmount: '₹1,25,000',
      remarks: 'Q1 GST Refund',
      status: 'Approved',
      sanctionNo: 'SN001',
      outputTaxInvoice: '₹2,50,000',
      outputTaxSalesReturn: '₹25,000',
      inputTaxInvoice: '₹1,80,000',
      inputTaxCreditNotes: '₹15,000',
      netOutputTax: '₹2,25,000',
      netInputTax: '₹1,65,000',
      previousMonthCarryForward: '₹60,000'
    },
    {
      id: 2,
      claimCode: 'GST002',
      claimDescription: 'GST Input Credit Claim',
      claimDate: '20/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      challanNumber: 'CH001235',
      challanDate: '18/01/2024',
      claimAmount: '₹95,000',
      remarks: 'Input Credit Adjustment',
      status: 'Pending',
      sanctionNo: 'SN002',
      outputTaxInvoice: '₹1,80,000',
      outputTaxSalesReturn: '₹10,000',
      inputTaxInvoice: '₹1,20,000',
      inputTaxCreditNotes: '₹5,000',
      netOutputTax: '₹1,70,000',
      netInputTax: '₹1,15,000',
      previousMonthCarryForward: '₹55,000'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      year: '',
      month: '',
      claimDescription: '',
      claimDate: '',
      challanNumber: '',
      challanDate: '',
      remarks: ''
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

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving GST claim:', formData);
    // For now, just go back to list
    setView('list');
  };

  const handleLoad = () => {
    // Here you would typically load data based on form inputs
    console.log('Loading GST data for:', formData);
    // For now, just show a message
    alert('GST data loaded successfully!');
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
          <span className="font-semibold">{window.innerWidth < 640 ? 'GST Claim' : 'GST Claim'}</span>
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
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-4">
              Home › Schemes & Claims › GST Claim
            </div>

            {view === 'list' ? (
              <>
                {/* Quick Search Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Search</h3>
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
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent records</h3>
                  <div className="border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Claim Code
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Claim Description
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Claim Date
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Claim Year
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Claim Month
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Challan Number
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Challan Date
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Claim amount
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Remarks
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Status
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClaims.length > 0 ? (
                          filteredClaims.map((claim) => (
                            <tr key={claim.id} className="hover:bg-gray-50">
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.claimCode}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.claimDescription}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.claimDate}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.claimYear}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.claimMonth}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.challanNumber}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.challanDate}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate font-medium">
                                {claim.claimAmount}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                {claim.remarks}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${
                                  claim.status === 'Approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : claim.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {claim.status}
                                </span>
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b truncate">
                                <div className="flex items-center gap-1">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Eye size={14} />
                                  </button>
                                  <button className="text-green-600 hover:text-green-800">
                                    <Edit size={14} />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="11" className="px-3 py-8 text-center text-gray-500">
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
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">GST Claim Form</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Year Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year <span className="text-red-500">*</span>
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

                    {/* Month Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Month <span className="text-red-500">*</span>
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

                    {/* Claim Description Field */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Description <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.claimDescription}
                        onChange={(e) => handleInputChange('claimDescription', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter claim description"
                      />
                    </div>

                    {/* Claim Date Field */}
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

                    {/* Challan Number Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Challan Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.challanNumber}
                        onChange={(e) => handleInputChange('challanNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter challan number"
                      />
                    </div>

                    {/* Challan Date Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Challan Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.challanDate}
                          onChange={(e) => handleInputChange('challanDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    {/* Remarks Field */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remarks <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter remarks"
                      />
                    </div>
                  </div>

                  {/* Load Button */}
                  <div className="mt-4">
                    <button
                      onClick={handleLoad}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Download size={16} />
                      Load
                    </button>
                  </div>

                  {/* GST Details Table */}
                  <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-3">GST Details</h4>
                    <div className="border border-gray-200 rounded-lg">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Sanction No
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Output Tax Through Invoice
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Output Tax Sales Return
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Input Tax Through Invoice
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Input Tax Credit Notes
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Net Output Tax
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Net Input Tax
                            </th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Previous Month Carry Forward Amt
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="8" className="px-3 py-8 text-center text-gray-500">
                              No matching record(s) found
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={handleBackToList}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <X size={16} />
                      Cancel
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
            <div className="mt-6 pt-3 border-t border-gray-200">
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

export default GSTClaim;
