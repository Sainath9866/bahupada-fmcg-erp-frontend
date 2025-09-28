import React, { useState } from 'react';
import { Tag, Search, Eye, Edit, Trash2, Calendar, Plus, Save, ArrowLeft, Loader2 } from 'lucide-react';

const LeakClaim = () => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [docDate, setDocDate] = useState('');
  const [filteredClaims, setFilteredClaims] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    claimCode: '',
    claimDescription: '',
    claimDate: '',
    asOnDate: '',
    company: 'MIL',
    remarks: ''
  });

  const [metrics, setMetrics] = useState({
    ytdBpm: '0.00',
    ytdLdBpm: '0.00',
    mtdBpm: '0.00',
    mtdLdBpm: '0.00',
    ytdPercent: '0.00',
    mtdPercent: '0.00'
  });

  const [skuDetails, setSkuDetails] = useState([]);

  // Sample data - replace with API call in future
  const sampleClaims = [
    {
      id: 1,
      claimCode: 'LDR001',
      claimDescription: 'Leak Damage Return - Q1',
      claimDate: '15/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹45,000',
      remarks: 'Q1 Leak Damage Claims',
      status: 'Approved'
    },
    {
      id: 2,
      claimCode: 'LDR002',
      claimDescription: 'Leak Damage Return - Q2',
      claimDate: '20/04/2024',
      claimYear: '2024',
      claimMonth: 'April',
      claimAmount: '₹32,000',
      remarks: 'Q2 Leak Damage Claims',
      status: 'Pending'
    },
    {
      id: 3,
      claimCode: 'LDR003',
      claimDescription: 'Leak Damage Return - Q3',
      claimDate: '25/07/2024',
      claimYear: '2024',
      claimMonth: 'July',
      claimAmount: '₹28,000',
      remarks: 'Q3 Leak Damage Claims',
      status: 'Rejected'
    }
  ];

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

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      claimCode: '',
      claimDescription: '',
      claimDate: '',
      asOnDate: '',
      company: 'MIL',
      remarks: ''
    });
    setMetrics({
      ytdBpm: '0.00',
      ytdLdBpm: '0.00',
      mtdBpm: '0.00',
      mtdLdBpm: '0.00',
      ytdPercent: '0.00',
      mtdPercent: '0.00'
    });
    setSkuDetails([]);
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

  const handleMetricsChange = (field, value) => {
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoad = () => {
    // Simulate loading data
    console.log('Loading data for:', formData);
    // In real app, this would make an API call
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving leak damage return claim:', { formData, metrics, skuDetails });
    // For now, just go back to list
    setView('list');
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Tag size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Schemes' : 'Schemes & Claims'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Leak Damage Return Claim' : 'Leak Damage Return Claim'}</span>
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
              Home › Schemes & Claims › Leak Damage Return Claim
            </div>

            {view === 'list' ? (
              <>
                {/* Search Section */}
                <div className="mb-6">
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
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
                                {claim.claimCode}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
                                {claim.claimDescription}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
                                {claim.claimDate}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
                                {claim.claimYear}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
                                {claim.claimMonth}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b font-medium">
                                {claim.claimAmount}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
                                {claim.remarks}
                              </td>
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
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
                              <td className="px-2 py-2 text-sm text-gray-900 border-b">
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
                            <td colSpan="9" className="px-2 py-8 text-center text-gray-500">
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
              <div className="max-w-6xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Leak Damage Return Claim Form</h3>
                  
                  {/* Claim Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Code
                      </label>
                      <input
                        type="text"
                        value={formData.claimCode}
                        onChange={(e) => handleInputChange('claimCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter claim code"
                      />
                    </div>

                    <div>
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Date <span className="text-red-500">*</span>
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
                        As On Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.asOnDate}
                          onChange={(e) => handleInputChange('asOnDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="MIL">MIL</option>
                        <option value="MILO">MILO</option>
                        <option value="MILC">MILC</option>
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
                  </div>

                  {/* Metrics Section */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">YTD BPM</label>
                      <input
                        type="text"
                        value={metrics.ytdBpm}
                        onChange={(e) => handleMetricsChange('ytdBpm', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">YTD L&D BPM</label>
                      <input
                        type="text"
                        value={metrics.ytdLdBpm}
                        onChange={(e) => handleMetricsChange('ytdLdBpm', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">MTD BPM</label>
                      <input
                        type="text"
                        value={metrics.mtdBpm}
                        onChange={(e) => handleMetricsChange('mtdBpm', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">MTD L&D BPM</label>
                      <input
                        type="text"
                        value={metrics.mtdLdBpm}
                        onChange={(e) => handleMetricsChange('mtdLdBpm', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">YTD%</label>
                      <input
                        type="text"
                        value={metrics.ytdPercent}
                        onChange={(e) => handleMetricsChange('ytdPercent', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">MTD%</label>
                      <input
                        type="text"
                        value={metrics.mtdPercent}
                        onChange={(e) => handleMetricsChange('mtdPercent', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Load Button */}
                  <div className="mb-6">
                    <button
                      onClick={handleLoad}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Loader2 size={16} />
                      Load
                    </button>
                  </div>

                  {/* SKU Details Table */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">SKU Details</h4>
                    <div className="border border-gray-200 rounded-lg overflow-x-auto">
                      <table className="w-full border-collapse" style={{ minWidth: '1400px' }}>
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              SKU Code
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              SKU Name
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              MRP
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Batch Code
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Category
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Total Qty
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Expiry
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Pin Hole/Print Smear
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Bottle Damage
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              MRP Missing
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Others
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Consumer Complaint
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Market Recall
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Total Rejected Qty
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Approved Qty
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Message
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {skuDetails.length > 0 ? (
                            skuDetails.map((sku, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.skuCode}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.skuName}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.mrp}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.batchCode}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.category}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.totalQty}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.expiry}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.pinHole}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.bottleDamage}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.mrpMissing}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.others}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.consumerComplaint}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.marketRecall}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.totalRejectedQty}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.approvedQty}</td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">{sku.message}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="16" className="px-3 py-8 text-center text-gray-500">
                                No matching record(s) found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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

export default LeakClaim;




