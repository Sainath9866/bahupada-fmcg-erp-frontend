import React, { useState } from 'react';
import { Tag, Search, Eye, Edit, Trash2 } from 'lucide-react';

const Scheme = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  // Sample data - replace with API call in future
  const sampleSchemes = [
    {
      id: 1,
      schemeCode: 'SCH001',
      companySchemeCode: 'CSCH001',
      schemeName: 'Volume Discount Scheme',
      schemeBase: 'Volume',
      payoutType: 'Percentage',
      schemeStartDate: '01/04/2024',
      schemeEndDate: '31/03/2025',
      status: 'Active'
    },
    {
      id: 2,
      schemeCode: 'SCH002',
      companySchemeCode: 'CSCH002',
      schemeName: 'Target Achievement Bonus',
      schemeBase: 'Target',
      payoutType: 'Fixed Amount',
      schemeStartDate: '01/04/2024',
      schemeEndDate: '31/03/2025',
      status: 'Active'
    },
    {
      id: 3,
      schemeCode: 'SCH003',
      companySchemeCode: 'CSCH003',
      schemeName: 'New Product Launch Incentive',
      schemeBase: 'Product',
      payoutType: 'Percentage',
      schemeStartDate: '01/06/2024',
      schemeEndDate: '31/12/2024',
      status: 'Inactive'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleSchemes.filter(scheme =>
        scheme.schemeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.companySchemeCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSchemes(filtered);
    } else {
      setFilteredSchemes([]);
    }
  };

  const handleViewAll = () => {
    setFilteredSchemes(sampleSchemes);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag size={20} />
          <span className="text-sm sm:text-lg font-semibold">Schemes & Claims</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Scheme</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Schemes & Claims › Scheme
            </div>

            {/* Quick Search Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter atleast 3 characters"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleViewAll}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Search Results Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full border-collapse" style={{ minWidth: '1200px' }}>
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Scheme Code
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                        Company Scheme Code
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '200px' }}>
                        Scheme Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Scheme Base
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Payout Type
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '140px' }}>
                        Scheme Start Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '140px' }}>
                        Scheme End Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchemes.length > 0 ? (
                      filteredSchemes.map((scheme) => (
                        <tr key={scheme.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {scheme.schemeCode}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {scheme.companySchemeCode}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {scheme.schemeName}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              scheme.schemeBase === 'Volume' 
                                ? 'bg-blue-100 text-blue-800' 
                                : scheme.schemeBase === 'Target'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {scheme.schemeBase}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              scheme.payoutType === 'Percentage' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {scheme.payoutType}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {scheme.schemeStartDate}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {scheme.schemeEndDate}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              scheme.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {scheme.status}
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
                          No Matching record(s) found
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

export default Scheme;



