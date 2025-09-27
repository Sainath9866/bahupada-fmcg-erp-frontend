import React, { useState } from 'react';
import { Tag, Search, Plus, Save, X, Eye, Edit, Trash2 } from 'lucide-react';

const ClaimType = () => {
  const [view, setView] = useState('list');
  const [searchBy, setSearchBy] = useState('Claim Type');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClaimTypes, setFilteredClaimTypes] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    claimType: '',
    type: 'Manual',
    serviceGoods: 'Goods Based'
  });

  // Sample data - replace with API call in future
  const sampleClaimTypes = [
    {
      id: 1,
      claimType: 'Volume Discount',
      type: 'Manual',
      serviceGoods: 'Goods Based',
      status: 'Active'
    },
    {
      id: 2,
      claimType: 'Target Achievement',
      type: 'Automatic',
      serviceGoods: 'Service Based',
      status: 'Active'
    },
    {
      id: 3,
      claimType: 'Product Launch',
      type: 'Manual',
      serviceGoods: 'Goods Based',
      status: 'Inactive'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      claimType: '',
      type: 'Manual',
      serviceGoods: 'Goods Based'
    });
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

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving claim type:', formData);
    // For now, just go back to list
    setView('list');
  };

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleClaimTypes.filter(claimType =>
        claimType.claimType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClaimTypes(filtered);
    } else {
      setFilteredClaimTypes([]);
    }
  };

  const handleViewAll = () => {
    setFilteredClaimTypes(sampleClaimTypes);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag size={20} />
          <span className="text-sm sm:text-lg font-semibold">Schemes & Claims</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Claim Type</span>
        </div>
        {view === 'list' && (
          <button
            onClick={handleCreateNew}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Create New
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Schemes & Claims › Claim Type
            </div>

            {view === 'list' ? (
              <>
                {/* Quick Search Section */}
                <div className="mb-6">
                  <div className="bg-purple-600 text-white px-4 py-3 rounded-t-lg">
                    <h3 className="text-lg font-semibold">Quick Search</h3>
                  </div>
                  <div className="border border-purple-200 border-t-0 rounded-b-lg p-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search By</label>
                        <select
                          value={searchBy}
                          onChange={(e) => setSearchBy(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Claim Type">Claim Type</option>
                          <option value="Type">Type</option>
                          <option value="Service/Goods">Service/Goods</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Input</label>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Enter atleast 3 characters"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleSearch}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        <Search size={16} />
                        Go
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search Results Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse" style={{ minWidth: '800px' }}>
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '200px' }}>
                            Claim Type
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                            Type
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                            Service/Goods
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClaimTypes.length > 0 ? (
                          filteredClaimTypes.map((claimType) => (
                            <tr key={claimType.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {claimType.claimType}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  claimType.type === 'Manual' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {claimType.type}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  claimType.serviceGoods === 'Goods Based' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {claimType.serviceGoods}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  claimType.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {claimType.status}
                                </span>
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
                              No Matching record(s) found
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
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Claim Type Definition</h3>
                  
                  <div className="space-y-6">
                    {/* Claim Type Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.claimType}
                        onChange={(e) => handleInputChange('claimType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="Volume Discount">Volume Discount</option>
                        <option value="Target Achievement">Target Achievement</option>
                        <option value="Product Launch">Product Launch</option>
                        <option value="Seasonal Promotion">Seasonal Promotion</option>
                      </select>
                    </div>

                    {/* Type Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value="Manual"
                            checked={formData.type === 'Manual'}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Manual</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value="Automatic"
                            checked={formData.type === 'Automatic'}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Automatic</span>
                        </label>
                      </div>
                    </div>

                    {/* Service/Goods Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service/Goods <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="serviceGoods"
                            value="Goods Based"
                            checked={formData.serviceGoods === 'Goods Based'}
                            onChange={(e) => handleInputChange('serviceGoods', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Goods Based</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="serviceGoods"
                            value="Service Based"
                            checked={formData.serviceGoods === 'Service Based'}
                            onChange={(e) => handleInputChange('serviceGoods', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Service Based</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      onClick={handleBackToList}
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

export default ClaimType;



