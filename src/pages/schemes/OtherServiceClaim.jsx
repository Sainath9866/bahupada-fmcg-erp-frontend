import React, { useState } from 'react';
import { Tag, Search, Eye, Edit, Trash2, Calendar } from 'lucide-react';

const OtherServiceClaim = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [docDate, setDocDate] = useState('');
  const [filteredClaims, setFilteredClaims] = useState([]);

  // Sample data - replace with API call in future
  const sampleClaims = [
    {
      id: 1,
      claimCode: 'OSC001',
      claimDescription: 'Other Service Bonus',
      claimDate: '15/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹35,000',
      remarks: 'Service Q1 Achievement',
      status: 'Approved'
    },
    {
      id: 2,
      claimCode: 'OSC002',
      claimDescription: 'Service Target Incentive',
      claimDate: '20/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹25,000',
      remarks: 'Monthly Service Target',
      status: 'Pending'
    },
    {
      id: 3,
      claimCode: 'OSC003',
      claimDescription: 'Service Special Claim',
      claimDate: '25/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹40,000',
      remarks: 'Service Festival Promotion',
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

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Tag size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Schemes' : 'Schemes & Claims'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Other Service Claim' : 'Other Service Claim'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Schemes & Claims › Other Service Claim
            </div>

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

export default OtherServiceClaim;




