import React, { useState } from 'react';
import { MapPin, Search, Eye, Edit, Trash2, Plus, Save, X, MinusCircle, User, Building } from 'lucide-react';

const MerchandiserRouteMapping = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMappings, setFilteredMappings] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622-SRI VENKATESWARA AGENCIE!',
    salesman: 'Select',
    routes: [] // Array to store attached routes
  });
  const [newRoute, setNewRoute] = useState({ code: '', name: '' });

  // Sample data - replace with API call in future
  const sampleMappings = [
    {
      id: 1,
      distributorBranchCode: '16622-SRI VENKATESWARA AGENCIE!',
      salesmanName: 'John Doe',
      salesmanCode: 'SC001',
      routeCode: 'R001',
      routeName: 'Mumbai Central Route'
    },
    {
      id: 2,
      distributorBranchCode: '16622-SRI VENKATESWARA AGENCIE!',
      salesmanName: 'Jane Smith',
      salesmanCode: 'SC002',
      routeCode: 'R002',
      routeName: 'Mumbai West Route'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleMappings.filter(mapping =>
        mapping.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mapping.salesmanCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    if (newRoute.code && newRoute.name) {
      setFormData(prev => ({
        ...prev,
        routes: [...prev.routes, { ...newRoute, id: Date.now() }] // Add unique ID
      }));
      setNewRoute({ code: '', name: '' }); // Clear input fields
    }
  };

  const handleRemoveRoute = (id) => {
    setFormData(prev => ({
      ...prev,
      routes: prev.routes.filter(route => route.id !== id)
    }));
  };

  const handleSave = () => {
    console.log('Saving merchandiser route mapping:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      distributorBranchCode: '16622-SRI VENKATESWARA AGENCIE!',
      salesman: 'Select',
      routes: []
    });
    setNewRoute({ code: '', name: '' });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin size={20} />
          <span className="text-sm sm:text-lg font-semibold">Distribution</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Merchandiser Route Mapping</span>
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
                        Salesman Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Salesman Code
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
                            {mapping.salesmanName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {mapping.salesmanCode}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Merchandiser Route Mapping</h3>

              {/* Distributor and Salesman Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                      <Building size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salesman *
                  </label>
                  <div className="relative">
                    <select
                      name="salesman"
                      value={formData.salesman}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Select">Select</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Mike Johnson">Mike Johnson</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attach Routes Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Routes *
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter route code or name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                    ...
                  </button>
                </div>
                <button
                  onClick={handleAddRoute}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  Add Route
                </button>
              </div>

              {/* Routes Table */}
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                          Route Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                          Route Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.routes.length > 0 ? (
                        formData.routes.map((route) => (
                          <tr key={route.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-300">
                              {route.code}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-300">
                              {route.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-300">
                              <button
                                onClick={() => handleRemoveRoute(route.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-8 text-center text-gray-500 border-b border-gray-300">
                            No routes added yet
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
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
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

export default MerchandiserRouteMapping;
