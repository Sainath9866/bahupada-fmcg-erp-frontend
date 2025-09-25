import React, { useState } from 'react';
import { MapPin, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, User } from 'lucide-react';

const RouteCoveragePlan = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('September');
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchName: '16622-SRI VENKATESWARA AGENCIES',
    salesmanName: 'YAKASIRI VINOD KUMAR',
    visitDate: '',
    route: 'No Coverage-No Covers',
    coveragePattern: [] // Array to store route coverage patterns
  });
  const [newPattern, setNewPattern] = useState({
    visitDate: '',
    dayOfVisit: '',
    routeName: ''
  });

  // Sample data - replace with API call in future
  const samplePlans = [
    {
      id: 1,
      distributorBranchName: '16622-SRI VENKATESWARA AGENCIES',
      salesmanName: 'YAKASIRI VINOD KUMAR',
      dateOfVisit: '2023-10-26',
      dayOfVisit: 'Thursday',
      routeName: 'Mumbai Central Route'
    },
    {
      id: 2,
      distributorBranchName: '16622-SRI VENKATESWARA AGENCIES',
      salesmanName: 'YAKASIRI VINOD KUMAR',
      dateOfVisit: '2023-10-27',
      dayOfVisit: 'Friday',
      routeName: 'Mumbai West Route'
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = samplePlans.filter(plan =>
        plan.distributorBranchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.routeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans([]);
    }
  };

  const handleViewAll = () => {
    setFilteredPlans(samplePlans);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredPlans([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewPatternChange = (e) => {
    const { name, value } = e.target;
    setNewPattern(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPattern = () => {
    if (newPattern.visitDate && newPattern.routeName) {
      const dayOfVisit = new Date(newPattern.visitDate).toLocaleDateString('en-US', { weekday: 'long' });
      const pattern = {
        ...newPattern,
        dayOfVisit,
        id: Date.now()
      };
      setFormData(prev => ({
        ...prev,
        coveragePattern: [...prev.coveragePattern, pattern]
      }));
      setNewPattern({
        visitDate: '',
        dayOfVisit: '',
        routeName: ''
      });
    }
  };

  const handleRemovePattern = (id) => {
    setFormData(prev => ({
      ...prev,
      coveragePattern: prev.coveragePattern.filter(pattern => pattern.id !== id)
    }));
  };

  const handleGeneratePattern = () => {
    console.log('Generating pattern for:', formData);
    // Logic to generate route coverage pattern
  };

  const handleSave = () => {
    console.log('Saving route coverage plan:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchName: '16622-SRI VENKATESWARA AGENCIES',
      salesmanName: 'YAKASIRI VINOD KUMAR',
      visitDate: '',
      route: 'No Coverage-No Covers',
      coveragePattern: []
    });
    setNewPattern({
      visitDate: '',
      dayOfVisit: '',
      routeName: ''
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin size={20} />
          <span className="text-sm sm:text-lg font-semibold">Distribution</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Route Coverage Plan</span>
        </div>
        {view === 'list' && (
          <button
            onClick={() => setView('form')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Create New
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        {view === 'list' ? (
          <>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Month
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
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
                        Distributor Branch Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Date of Visit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Day of Visit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlans.length > 0 ? (
                      filteredPlans.map((plan) => (
                        <tr key={plan.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {plan.distributorBranchName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {plan.salesmanName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {plan.dateOfVisit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {plan.dayOfVisit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {plan.routeName}
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
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
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
          /* Form View */
          <div className="p-3 sm:p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Route Coverage Plan</h3>

              {/* Distributor and Salesman Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distributor Branch *
                  </label>
                  <div className="relative">
                    <select
                      name="distributorBranchName"
                      value={formData.distributorBranchName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="16622-SRI VENKATESWARA AGENCIES">16622-SRI VENKATESWARA AGENCIES</option>
                      <option value="16623-DELHI BRANCH">16623-DELHI BRANCH</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salesman Name *
                  </label>
                  <div className="relative">
                    <select
                      name="salesmanName"
                      value={formData.salesmanName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="YAKASIRI VINOD KUMAR">YAKASIRI VINOD KUMAR</option>
                      <option value="JOHN DOE">JOHN DOE</option>
                      <option value="JANE SMITH">JANE SMITH</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Coverage Setting Pattern */}
              <div className="border border-gray-300 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Route Coverage Setting Pattern</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visit Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      />
                      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Route *
                    </label>
                    <div className="relative">
                      <select
                        name="route"
                        value={formData.route}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="No Coverage-No Covers">No Coverage-No Covers</option>
                        <option value="Mumbai Central Route">Mumbai Central Route</option>
                        <option value="Mumbai West Route">Mumbai West Route</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleAddPattern}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePattern}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Generate Pattern
                </button>
              </div>

              {/* Route Coverage Pattern Grid */}
              <div className="border border-gray-300 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Route Coverage Pattern Grid</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Date of Visit
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Day of Visit
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Route Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.coveragePattern.length > 0 ? (
                        formData.coveragePattern.map((pattern) => (
                          <tr key={pattern.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">
                              {pattern.visitDate}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">
                              {pattern.dayOfVisit}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">
                              {pattern.routeName}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">
                              <button
                                onClick={() => handleRemovePattern(pattern.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCoveragePlan;
