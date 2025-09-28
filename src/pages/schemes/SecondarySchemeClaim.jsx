import React, { useState } from 'react';
import { Tag, Search, Eye, Edit, Trash2, Calendar } from 'lucide-react';

const SecondarySchemeClaim = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [claimMonth, setClaimMonth] = useState('');
  const [filteredClaims, setFilteredClaims] = useState([]);

  // Sample data - replace with API call in future
  const sampleClaims = [
    {
      id: 1,
      claimCode: 'SSC001',
      claimDescription: 'Secondary Volume Bonus',
      claimDate: '10/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹45,000',
      remarks: 'Secondary Scheme Achievement',
      status: 'Approved'
    },
    {
      id: 2,
      claimCode: 'SSC002',
      claimDescription: 'Channel Partner Incentive',
      claimDate: '15/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹30,000',
      remarks: 'Channel Performance Bonus',
      status: 'Pending'
    },
    {
      id: 3,
      claimCode: 'SSC003',
      claimDescription: 'Regional Scheme Claim',
      claimDate: '20/01/2024',
      claimYear: '2024',
      claimMonth: 'January',
      claimAmount: '₹55,000',
      remarks: 'Regional Market Expansion',
      status: 'Approved'
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
          <span className="font-semibold">{window.innerWidth < 640 ? 'Secondary Scheme Claim' : 'Secondary Scheme Claim'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Schemes & Claims › Secondary Scheme Claim
            </div>

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
                  <select
                    value={claimMonth}
                    onChange={(e) => setClaimMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Claim Month</option>
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

export default SecondarySchemeClaim;
