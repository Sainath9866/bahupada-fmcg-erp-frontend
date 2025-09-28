import React, { useState } from 'react';
import { Settings, Search, Plus, Save, ArrowLeft, Eye, Edit, Trash2, ChevronDown, Calendar, X } from 'lucide-react';

const HolidayCalendar = () => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    company: 'Marico India Limited',
    year: '2025',
    holidayDate: '',
    holiday: ''
  });

  const [holidays, setHolidays] = useState([]);

  // Sample data - replace with API call in future
  const sampleHolidays = [
    {
      id: 1,
      company: 'Marico India Limited',
      year: '2025',
      holidayDate: '01/01/2025',
      holiday: 'New Year',
      status: 'Active'
    },
    {
      id: 2,
      company: 'Marico India Limited',
      year: '2025',
      holidayDate: '26/01/2025',
      holiday: 'Republic Day',
      status: 'Active'
    },
    {
      id: 3,
      company: 'Marico India Limited',
      year: '2025',
      holidayDate: '15/08/2025',
      holiday: 'Independence Day',
      status: 'Active'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      company: 'Marico India Limited',
      year: '2025',
      holidayDate: '',
      holiday: ''
    });
    setHolidays([]);
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

  const handleAddHoliday = () => {
    if (formData.holidayDate && formData.holiday.trim()) {
      const newHoliday = {
        id: Date.now(),
        company: formData.company,
        year: formData.year,
        holidayDate: formData.holidayDate,
        holiday: formData.holiday,
        status: 'Active'
      };
      setHolidays(prev => [...prev, newHoliday]);
      setFormData(prev => ({
        ...prev,
        holidayDate: '',
        holiday: ''
      }));
    }
  };

  const handleRemoveHoliday = (id) => {
    setHolidays(prev => prev.filter(holiday => holiday.id !== id));
  };

  const handleSearch = () => {
    if (searchTerm.length >= 3 || searchDate || searchYear) {
      const filtered = sampleHolidays.filter(holiday =>
        (searchTerm.length >= 3 && (
          holiday.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (searchDate && holiday.holidayDate === searchDate) ||
        (searchYear && holiday.year === searchYear)
      );
      setFilteredHolidays(filtered);
    } else {
      setFilteredHolidays([]);
    }
  };

  const handleViewAll = () => {
    setFilteredHolidays(sampleHolidays);
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving holidays:', holidays);
    // For now, just go back to list
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Settings size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Config' : 'Configuration'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Holiday Calendar' : 'Holiday Calendar'}</span>
        </div>
        {view === 'list' && (
          <button
            onClick={handleCreateNew}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-1 py-1 sm:px-4 sm:py-2 rounded flex items-center gap-1 transition-colors"
            style={{ fontSize: window.innerWidth < 640 ? '10px' : '14px' }}
          >
            <Plus size={12} className="sm:w-4 sm:h-4" />
            <span>{window.innerWidth < 640 ? 'New' : 'Create New'}</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Configuration › Holiday Calendar
            </div>

            {view === 'list' ? (
              <>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Holiday Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={searchDate}
                          onChange={(e) => setSearchDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
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
                            Holiday Date
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Holiday
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHolidays.length > 0 ? (
                          filteredHolidays.map((holiday) => (
                            <tr key={holiday.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {holiday.company}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {holiday.year}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {holiday.holidayDate}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {holiday.holiday}
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
              </>
            ) : (
              /* Create New Form */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Holiday Calendar Configuration</h3>
                  
                  {/* Holiday Input Section */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">Add New Holiday</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                          >
                            <option value="Marico India Limited">Marico India Limited</option>
                            <option value="Marico Limited">Marico Limited</option>
                            <option value="Marico International">Marico International</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                          >
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Holiday Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={formData.holidayDate}
                            onChange={(e) => handleInputChange('holidayDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                          />
                          <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Holiday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.holiday}
                          onChange={(e) => handleInputChange('holiday', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter holiday name"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAddHoliday}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                      + Add
                    </button>
                  </div>

                  {/* Holiday List Table */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">Holiday List</h4>
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
                              Holiday Date
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Holiday
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {holidays.length > 0 ? (
                            holidays.map((holiday) => (
                              <tr key={holiday.id} className="hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                  {holiday.company}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                  {holiday.year}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                  {holiday.holidayDate}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                  {holiday.holiday}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                  <button
                                    onClick={() => handleRemoveHoliday(holiday.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 size={16} />
                                  </button>
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

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleCancel}
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

export default HolidayCalendar;



