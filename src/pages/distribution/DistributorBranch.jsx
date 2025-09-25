import React, { useState } from 'react';
import { Building, Search, Eye, Edit, Trash2 } from 'lucide-react';

const DistributorBranch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBranches, setFilteredBranches] = useState([]);

  // Sample data - replace with API call in future
  const sampleBranches = [
    {
      id: 1,
      distributorType: 'Primary',
      distributorCode: 'DIST001',
      distributorName: 'ABC Distributors Ltd',
      branchCode: 'BR001',
      location: 'Mumbai, Maharashtra',
      phoneNumber: '+91-9876543210',
      contactPerson: 'John Doe'
    },
    {
      id: 2,
      distributorType: 'Secondary',
      distributorCode: 'DIST002',
      distributorName: 'XYZ Trading Co',
      branchCode: 'BR002',
      location: 'Delhi, NCR',
      phoneNumber: '+91-9876543211',
      contactPerson: 'Jane Smith'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleBranches.filter(branch =>
        branch.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.distributorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBranches(filtered);
    } else {
      setFilteredBranches([]);
    }
  };

  const handleViewAll = () => {
    setFilteredBranches(sampleBranches);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredBranches([]);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Building size={20} />
          <span className="text-sm sm:text-lg font-semibold">Distribution</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Distributor Branch</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
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
                    Distributor Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Distributor Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Distributor Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Branch Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Phone Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Contact Person
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.length > 0 ? (
                  filteredBranches.map((branch) => (
                    <tr key={branch.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          branch.distributorType === 'Primary' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {branch.distributorType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {branch.distributorCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {branch.distributorName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {branch.branchCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {branch.location}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {branch.phoneNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {branch.contactPerson}
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
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No matching record(s) found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorBranch;
