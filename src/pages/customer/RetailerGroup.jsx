import React, { useState } from 'react';
import { Users, Search, Eye, Edit, Trash2, Tag, Building } from 'lucide-react';

const RetailerGroup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);

  // Sample data - replace with API call in future
  const sampleGroups = [
    {
      id: 1,
      channelName: 'General Trade',
      groupCode: 'GG001',
      groupName: 'General Group',
    },
    {
      id: 2,
      channelName: 'Modern Trade',
      groupCode: 'MG001',
      groupName: 'Modern Group',
    },
    {
      id: 3,
      channelName: 'E-commerce',
      groupCode: 'EG001',
      groupName: 'E-commerce Group',
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleGroups.filter(group =>
        group.channelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.groupCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups([]);
    }
  };

  const handleViewAll = () => {
    setFilteredGroups(sampleGroups);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredGroups([]);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Users size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Retailer Group</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        {/* Quick Search Section */}
        <div className="p-3 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            <div className="flex-1">
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
                    Retailer Channel Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Retailer Group Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Retailer Group Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {group.channelName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {group.groupCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {group.groupName}
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
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
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

export default RetailerGroup;



