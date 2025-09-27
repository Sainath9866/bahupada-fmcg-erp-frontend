import React, { useState } from 'react';
import { Receipt, Search, Calendar, Eye, Edit, Trash2 } from 'lucide-react';

const GSTTaxStructure = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [filteredTaxStructures, setFilteredTaxStructures] = useState([]);

  // Sample data - replace with API call in future
  const sampleTaxStructures = [
    {
      id: 1,
      state: 'Maharashtra',
      taxType: 'CGST',
      taxCode: 'CGST_5',
      effectiveDate: '01/04/2024',
      status: 'Active'
    },
    {
      id: 2,
      state: 'Maharashtra',
      taxType: 'SGST',
      taxCode: 'SGST_5',
      effectiveDate: '01/04/2024',
      status: 'Active'
    },
    {
      id: 3,
      state: 'Karnataka',
      taxType: 'CGST',
      taxCode: 'CGST_12',
      effectiveDate: '01/04/2024',
      status: 'Active'
    },
    {
      id: 4,
      state: 'Karnataka',
      taxType: 'SGST',
      taxCode: 'SGST_12',
      effectiveDate: '01/04/2024',
      status: 'Active'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleTaxStructures.filter(tax =>
        tax.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.taxType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.taxCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTaxStructures(filtered);
    } else {
      setFilteredTaxStructures([]);
    }
  };

  const handleViewAll = () => {
    setFilteredTaxStructures(sampleTaxStructures);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Receipt size={20} />
          <span className="text-sm sm:text-lg font-semibold">Product & Price</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">GST Tax Structure</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Product & Price › GST Tax Structure
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
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Effective Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

            {/* Search Results Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full border-collapse" style={{ minWidth: '800px' }}>
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                        State
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Tax Type
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Tax Code
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Effective Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTaxStructures.length > 0 ? (
                      filteredTaxStructures.map((tax) => (
                        <tr key={tax.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {tax.state}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              tax.taxType === 'CGST' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {tax.taxType}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {tax.taxCode}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {tax.effectiveDate}
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
                        <td colSpan="5" className="px-3 py-8 text-center text-gray-500">
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

export default GSTTaxStructure;



