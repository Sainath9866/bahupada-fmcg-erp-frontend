import React, { useState } from 'react';
import { Settings, Search, Plus, Save, ArrowLeft, Eye, Edit, Trash2, ChevronDown, X, CheckSquare } from 'lucide-react';

const UserGroup = () => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    groupCode: '',
    groupName: '',
    moduleName: '',
    screenName: ''
  });

  const [screenPermissions, setScreenPermissions] = useState([]);

  // Sample data - replace with API call in future
  const sampleGroups = [
    {
      id: 1,
      groupCode: 'ADMIN',
      groupName: 'Administrator',
      status: 'Active'
    },
    {
      id: 2,
      groupCode: 'MANAGER',
      groupName: 'Manager',
      status: 'Active'
    },
    {
      id: 3,
      groupCode: 'USER',
      groupName: 'User',
      status: 'Active'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      groupCode: '',
      groupName: '',
      moduleName: '',
      screenName: ''
    });
    setScreenPermissions([]);
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

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleGroups.filter(group =>
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

  const handleAddScreenPermission = () => {
    if (formData.screenName.trim()) {
      const newPermission = {
        id: Date.now(),
        screenName: formData.screenName,
        create: false,
        view: false,
        edit: false,
        delete: false
      };
      setScreenPermissions(prev => [...prev, newPermission]);
      setFormData(prev => ({ ...prev, screenName: '' }));
    }
  };

  const handlePermissionChange = (id, permission, value) => {
    setScreenPermissions(prev =>
      prev.map(perm =>
        perm.id === id ? { ...perm, [permission]: value } : perm
      )
    );
  };

  const handleSelectAll = (id, value) => {
    setScreenPermissions(prev =>
      prev.map(perm =>
        perm.id === id ? { 
          ...perm, 
          create: value, 
          view: value, 
          edit: value, 
          delete: value 
        } : perm
      )
    );
  };

  const handleRemovePermission = (id) => {
    setScreenPermissions(prev => prev.filter(perm => perm.id !== id));
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving user group:', { formData, screenPermissions });
    // For now, just go back to list
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Settings size={20} />
          <span className="text-sm sm:text-lg font-semibold">Configuration</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">User Group</span>
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
              Home › Configuration › User Group
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
                            User Group Code
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            User Group Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGroups.length > 0 ? (
                          filteredGroups.map((group) => (
                            <tr key={group.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {group.groupCode}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {group.groupName}
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
                            <td colSpan="3" className="px-3 py-8 text-center text-gray-500">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">User Group Configuration</h3>
                  
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.groupCode}
                        onChange={(e) => handleInputChange('groupCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter group code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.groupName}
                        onChange={(e) => handleInputChange('groupName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter group name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Module Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.moduleName}
                          onChange={(e) => handleInputChange('moduleName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                        >
                          <option value="">Select Module</option>
                          <option value="Company">Company</option>
                          <option value="Distribution">Distribution</option>
                          <option value="Customer">Customer</option>
                          <option value="Inventory">Inventory</option>
                          <option value="Product & Price">Product & Price</option>
                          <option value="Schemes & Claims">Schemes & Claims</option>
                          <option value="Finance">Finance</option>
                          <option value="Configuration">Configuration</option>
                          <option value="Reports">Reports</option>
                          <option value="Utilities">Utilities</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Screen Name <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.screenName}
                          onChange={(e) => handleInputChange('screenName', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter screen name"
                        />
                        <button
                          onClick={handleAddScreenPermission}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Screen Permissions Table */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">Screen Permissions</h4>
                    <div className="border border-gray-200 rounded-lg">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Screen Name
                            </th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Create
                            </th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              View
                            </th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Edit
                            </th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Delete
                            </th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Select All
                            </th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {screenPermissions.length > 0 ? (
                            screenPermissions.map((permission) => (
                              <tr key={permission.id} className="hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                  {permission.screenName}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b text-center">
                                  <input
                                    type="checkbox"
                                    checked={permission.create}
                                    onChange={(e) => handlePermissionChange(permission.id, 'create', e.target.checked)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b text-center">
                                  <input
                                    type="checkbox"
                                    checked={permission.view}
                                    onChange={(e) => handlePermissionChange(permission.id, 'view', e.target.checked)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b text-center">
                                  <input
                                    type="checkbox"
                                    checked={permission.edit}
                                    onChange={(e) => handlePermissionChange(permission.id, 'edit', e.target.checked)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b text-center">
                                  <input
                                    type="checkbox"
                                    checked={permission.delete}
                                    onChange={(e) => handlePermissionChange(permission.id, 'delete', e.target.checked)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                  />
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b text-center">
                                  <button
                                    onClick={() => {
                                      const allSelected = permission.create && permission.view && permission.edit && permission.delete;
                                      handleSelectAll(permission.id, !allSelected);
                                    }}
                                    className="text-purple-600 hover:text-purple-800"
                                  >
                                    <CheckSquare size={16} />
                                  </button>
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-900 border-b text-center">
                                  <button
                                    onClick={() => handleRemovePermission(permission.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="px-3 py-8 text-center text-gray-500">
                                No records found.
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

export default UserGroup;


