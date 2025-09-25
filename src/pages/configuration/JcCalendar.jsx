import React, { useState } from 'react';
import { Settings, Search, Eye, Edit, Trash2, ChevronDown, Calendar } from 'lucide-react';

const JcCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [filteredCalendars, setFilteredCalendars] = useState([]);

  // Sample data - replace with API call in future
  const sampleCalendars = [
    {
      id: 1,
      company: 'Marico India Limited',
      year: '2025',
      startDate: '01/01/2025',
      endDate: '31/12/2025',
      months: '12',
      weeks: '52',
      status: 'Active'
    },
    {
      id: 2,
      company: 'Marico India Limited',
      year: '2024',
      startDate: '01/01/2024',
      endDate: '31/12/2024',
      months: '12',
      weeks: '52',
      status: 'Active'
    },
    {
      id: 3,
      company: 'Marico India Limited',
      year: '2023',
      startDate: '01/01/2023',
      endDate: '31/12/2023',
      months: '12',
      weeks: '52',
      status: 'Inactive'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3 || searchYear) {
      const filtered = sampleCalendars.filter(calendar =>
        (searchTerm.length >= 3 && (
          calendar.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          calendar.year.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (searchYear && calendar.year === searchYear)
      );
      setFilteredCalendars(filtered);
    } else {
      setFilteredCalendars([]);
    }
  };

  const handleViewAll = () => {
    setFilteredCalendars(sampleCalendars);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Settings size={20} />
          <span className="text-sm sm:text-lg font-semibold">Configuration</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">JC Calendar</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Configuration › JC Calendar
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
                  <div className="relative">
                    <select
                      value={searchYear}
                      onChange={(e) => setSearchYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                    >
                      <option value="">Select Year</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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
              <div className="border border-gray-200 rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Company
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Year
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Start Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        End Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Months
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Weeks
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCalendars.length > 0 ? (
                      filteredCalendars.map((calendar) => (
                        <tr key={calendar.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {calendar.company}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                            {calendar.year}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {calendar.startDate}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {calendar.endDate}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {calendar.months}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {calendar.weeks}
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
                        <td colSpan="7" className="px-3 py-8 text-center text-gray-500">
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

export default JcCalendar;

