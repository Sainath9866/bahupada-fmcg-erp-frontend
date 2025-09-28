import React, { useState } from 'react';
import { Route as RouteIcon, Search, Eye, Edit, Trash2, Plus, Save, X, ArrowRight } from 'lucide-react';

const RouteSam = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [activeTab, setActiveTab] = useState('general'); // 'general' or 'other-attributes'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchName: '16622 SRI VENKATESWARA AGE',
    code: '',
    routeName: '',
    distance: '',
    population: '',
    city: 'Atmakur',
    isVanRoute: 'No',
    routeType: 'Sales Route',
    isActive: 'Yes',
    localUpCountry: 'Local',
    priorityRoute: 'No',
    vehicleName: '',
    routeGtmType: 'ALL',
    routeUniqueCode: '',
    callDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }
  });

  // Sample data - replace with API call in future
  const sampleRoutes = [
    {
      id: 1,
      branchCode: '16622',
      routeCode: 'R001',
      routeName: 'Mumbai Central Route',
      routeType: 'Sales Route',
      routeGtmType: 'Primary',
      isActive: true
    },
    {
      id: 2,
      branchCode: '16622',
      routeCode: 'R002',
      routeName: 'Mumbai West Route',
      routeType: 'Delivery Route',
      routeGtmType: 'Secondary',
      isActive: true
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleRoutes.filter(route =>
        route.routeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.routeType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes([]);
    }
  };

  const handleViewAll = () => {
    setFilteredRoutes(sampleRoutes);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredRoutes([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('callDays.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        callDays: {
          ...prev.callDays,
          [day]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = () => {
    console.log('Saving route:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchName: '16622 SRI VENKATESWARA AGE',
      code: '',
      routeName: '',
      distance: '',
      population: '',
      city: 'Atmakur',
      isVanRoute: 'No',
      routeType: 'Sales Route',
      isActive: 'Yes',
      localUpCountry: 'Local',
      priorityRoute: 'No',
      vehicleName: '',
      routeGtmType: 'ALL',
      routeUniqueCode: '',
      callDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <RouteIcon size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Dist' : 'Distribution'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Route' : 'Route'}</span>
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
                        Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route Gtm Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Is Active
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoutes.length > 0 ? (
                      filteredRoutes.map((route) => (
                        <tr key={route.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {route.branchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {route.routeCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {route.routeName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {route.routeType}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {route.routeGtmType}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              route.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {route.isActive ? 'Yes' : 'No'}
                            </span>
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
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Route</h3>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'general'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab('other-attributes')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'other-attributes'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Other Attributes
                  </button>
                </nav>
              </div>

              {activeTab === 'general' ? (
                <div className="space-y-6">
                  {/* First Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distributor Branch Name
                      </label>
                      <div className="relative">
                        <select
                          name="distributorBranchName"
                          value={formData.distributorBranchName}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="16622 SRI VENKATESWARA AGE">16622 SRI VENKATESWARA AGE</option>
                          <option value="16623 DELHI BRANCH">16623 DELHI BRANCH</option>
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
                        Code *
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter route code"
                      />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Route Name *
                      </label>
                      <input
                        type="text"
                        name="routeName"
                        value={formData.routeName}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter route name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distance
                      </label>
                      <input
                        type="text"
                        name="distance"
                        value={formData.distance}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter distance"
                      />
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Population
                      </label>
                      <input
                        type="text"
                        name="population"
                        value={formData.population}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter population"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <div className="relative">
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="Atmakur">Atmakur</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Vijayawada">Vijayawada</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Radio Button Groups */}
                  <div className="space-y-4">
                    {/* Is Van Route */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Is Van Route
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="isVanRoute"
                            value="Yes"
                            checked={formData.isVanRoute === 'Yes'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="isVanRoute"
                            value="No"
                            checked={formData.isVanRoute === 'No'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/* Route Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Route Type
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="routeType"
                            value="Delivery Route"
                            checked={formData.routeType === 'Delivery Route'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Delivery Route
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="routeType"
                            value="Sales Route"
                            checked={formData.routeType === 'Sales Route'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Sales Route
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="routeType"
                            value="Merchandise Route"
                            checked={formData.routeType === 'Merchandise Route'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Merchandise Route
                        </label>
                      </div>
                    </div>

                    {/* Is Active */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Is Active
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="isActive"
                            value="Yes"
                            checked={formData.isActive === 'Yes'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="isActive"
                            value="No"
                            checked={formData.isActive === 'No'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/* Local/UpCountry */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Local/UpCountry
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="localUpCountry"
                            value="Local"
                            checked={formData.localUpCountry === 'Local'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Local
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="localUpCountry"
                            value="UpCountry"
                            checked={formData.localUpCountry === 'UpCountry'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          UpCountry
                        </label>
                      </div>
                    </div>

                    {/* Priority Route */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Route
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="priorityRoute"
                            value="Yes"
                            checked={formData.priorityRoute === 'Yes'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="priorityRoute"
                            value="No"
                            checked={formData.priorityRoute === 'No'}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Other Attributes Tab */
                <div className="space-y-6">
                  {/* Vehicle Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Name
                    </label>
                    <div className="relative">
                      <select
                        name="vehicleName"
                        value={formData.vehicleName}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="vehicle1">Vehicle 1</option>
                        <option value="vehicle2">Vehicle 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Route GTM Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Route GTM Type
                    </label>
                    <div className="relative">
                      <select
                        name="routeGtmType"
                        value={formData.routeGtmType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="ALL">ALL</option>
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Route Unique Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Route Unique Code
                    </label>
                    <input
                      type="text"
                      name="routeUniqueCode"
                      value={formData.routeUniqueCode}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter route unique code"
                    />
                  </div>

                  {/* Call Days */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Days
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(formData.callDays).map(([day, checked]) => (
                        <label key={day} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`callDays.${day}`}
                            checked={checked}
                            onChange={handleFormChange}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
                {activeTab === 'general' ? (
                  <button
                    onClick={() => setActiveTab('other-attributes')}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteSam;
