import React, { useState } from 'react';
import { Users, Search, Eye, Edit, Trash2, Tag, Building } from 'lucide-react';

const RetailerClass = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  // Sample data - replace with API call in future
  const sampleClasses = [
    {
      id: 1,
      groupName: 'General Trade',
      classCode: 'GC001',
      className: 'General Class',
      turnover: 150000
    },
    {
      id: 2,
      groupName: 'Modern Trade',
      classCode: 'MC001',
      className: 'Modern Class',
      turnover: 250000
    },
    {
      id: 3,
      groupName: 'E-commerce',
      classCode: 'EC001',
      className: 'E-commerce Class',
      turnover: 100000
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleClasses.filter(cls =>
        cls.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.classCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.className.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses([]);
    }
  };

  const handleViewAll = () => {
    setFilteredClasses(sampleClasses);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredClasses([]);
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
          <span className="text-sm sm:text-lg font-semibold">Retailer Class</span>
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
                    Retailer Group Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Retailer Class Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Retailer Class Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Turnover (Amount)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <tr key={cls.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {cls.groupName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {cls.classCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {cls.className}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        ₹{cls.turnover.toLocaleString()}
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
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No matching record(s) found!
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

export default RetailerClass;
