import React, { useState } from 'react';
import { Users, Search, Eye, Edit, Trash2, Plus, Save, X, Building, User, Tag, FileText } from 'lucide-react';

const RetailerChannel = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [formData, setFormData] = useState({
    channelCode: '',
    channelName: '',
    description: '',
    isActive: 'Yes'
  });

  // Sample data - replace with API call in future
  const sampleChannels = [
    {
      id: 1,
      channelCode: 'CH001',
      channelName: 'General Trade',
      description: 'Traditional retail channels',
      isActive: true
    },
    {
      id: 2,
      channelCode: 'CH002',
      channelName: 'Modern Trade',
      description: 'Supermarkets and hypermarkets',
      isActive: true
    },
    {
      id: 3,
      channelCode: 'CH003',
      channelName: 'E-commerce',
      description: 'Online retail platforms',
      isActive: false
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleChannels.filter(channel =>
        channel.channelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.channelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChannels(filtered);
    } else {
      setFilteredChannels([]);
    }
  };

  const handleViewAll = () => {
    setFilteredChannels(sampleChannels);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      setFilteredChannels([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Saving retailer channel:', formData);
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      channelCode: '',
      channelName: '',
      description: '',
      isActive: 'Yes'
    });
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Users size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Retailer Channel</span>
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
                        Channel Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Channel Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Description
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
                    {filteredChannels.length > 0 ? (
                      filteredChannels.map((channel) => (
                        <tr key={channel.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {channel.channelCode}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {channel.channelName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {channel.description}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              channel.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {channel.isActive ? 'Yes' : 'No'}
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
              {/* Breadcrumbs */}
              <div className="text-sm text-gray-600 mb-4">
                Home › Customer › Retailer Channel
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Channel Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Channel Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="channelCode"
                      value={formData.channelCode}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter channel code"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Tag size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Channel Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Channel Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="channelName"
                      value={formData.channelName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter channel name"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Users size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter channel description"
                    />
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText size={16} className="text-gray-400" />
                    </div>
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

export default RetailerChannel;
