import React, { useState } from 'react';
import { Route, Search, Eye, Edit, Trash2, Plus, Save, X, Minus } from 'lucide-react';

const DeliveryBoyRouteMapping = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMappings, setFilteredMappings] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622-SRI VENKATESWARA AGENCIE!',
    deliveryBoy: '',
    routes: []
  });
  const [newRoute, setNewRoute] = useState({
    routeCode: '',
    routeName: ''
  });

  // Sample data - replace with API call in future
  const sampleMappings = [
    {
      id: 1,
      distributorBranchCode: '16622',
      deliveryBoyName: 'John Doe',
      routeCode: 'R001',
      routeName: 'Mumbai Central Route'
    },
    {
      id: 2,
      distributorBranchCode: '16622',
      deliveryBoyName: 'Jane Smith',
      routeCode: 'R002',
      routeName: 'Mumbai West Route'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleMappings.filter(mapping =>
        mapping.deliveryBoyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mapping.routeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mapping.routeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMappings(filtered);
    } else {
      setFilteredMappings([]);
    }
  };

  const handleViewAll = () => {
    setFilteredMappings(sampleMappings);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredMappings([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewRouteChange = (e) => {
    const { name, value } = e.target;
    setNewRoute(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRoute = () => {
    if (newRoute.routeCode && newRoute.routeName) {
      setFormData(prev => ({
        ...prev,
        routes: [...prev.routes, { ...newRoute, id: Date.now() }]
      }));
      setNewRoute({ routeCode: '', routeName: '' });
    }
  };

  const handleRemoveRoute = (routeId) => {
    setFormData(prev => ({
      ...prev,
      routes: prev.routes.filter(route => route.id !== routeId)
    }));
  };

  const handleSave = () => {
    console.log('Saving delivery boy route mapping:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchCode: '16622-SRI VENKATESWARA AGENCIE!',
      deliveryBoy: '',
      routes: []
    });
    setNewRoute({ routeCode: '', routeName: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Route size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Dist' : 'Distribution'}</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Delivery Boy Route mapping</span>
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
                        Distributor Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Delivery Boy Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Route Code
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
                    {filteredMappings.length > 0 ? (
                      filteredMappings.map((mapping) => (
                        <tr key={mapping.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {mapping.distributorBranchCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {mapping.deliveryBoyName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {mapping.routeCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {mapping.routeName}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Delivery Boy Route mapping</h3>
              
              <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distributor Branch Code *
                    </label>
                    <div className="relative">
                      <select
                        name="distributorBranchCode"
                        value={formData.distributorBranchCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="16622-SRI VENKATESWARA AGENCIE!">16622-SRI VENKATESWARA AGENCIE!</option>
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
                      Delivery Boy *
                    </label>
                    <div className="relative">
                      <select
                        name="deliveryBoy"
                        value={formData.deliveryBoy}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="db001">John Doe</option>
                        <option value="db002">Jane Smith</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attach Routes Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Routes *
                  </label>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      name="routeCode"
                      value={newRoute.routeCode}
                      onChange={handleNewRouteChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter route code"
                    />
                    <input
                      type="text"
                      name="routeName"
                      value={newRoute.routeName}
                      onChange={handleNewRouteChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter route name"
                    />
                    <button
                      onClick={handleAddRoute}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                      Add Route
                    </button>
                  </div>

                  {/* Routes Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Route Code
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
                        {formData.routes.length > 0 ? (
                          formData.routes.map((route) => (
                            <tr key={route.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                {route.routeCode}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                {route.routeName}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                <button
                                  onClick={() => handleRemoveRoute(route.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Minus size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                              No routes added yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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

export default DeliveryBoyRouteMapping;
