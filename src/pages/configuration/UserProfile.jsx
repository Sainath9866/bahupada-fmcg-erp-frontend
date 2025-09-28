import React, { useState } from 'react';
import { Settings, Search, Plus, Save, ArrowLeft, Eye, Edit, Trash2, ChevronDown, User, Upload, X } from 'lucide-react';

const UserProfile = () => {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    userGroup: '',
    userName: '',
    userLoginCode: '',
    designation: '',
    regionHO: '',
    emailId: '',
    mobileNo: '',
    employeeCode: '',
    distributorBranch: '16622-16622-SRI VENKATESWARA AGENCIES',
    accessRights: 'Restrict Access',
    status: 'Active',
    photo: null
  });

  // Sample data - replace with API call in future
  const sampleUsers = [
    {
      id: 1,
      userGroupName: 'Administrator',
      userName: 'John Doe',
      userLoginCode: 'JDOE001',
      designation: 'System Administrator',
      status: 'Active'
    },
    {
      id: 2,
      userGroupName: 'Manager',
      userName: 'Jane Smith',
      userLoginCode: 'JSMITH002',
      designation: 'Sales Manager',
      status: 'Active'
    },
    {
      id: 3,
      userGroupName: 'User',
      userName: 'Mike Johnson',
      userLoginCode: 'MJOHNSON003',
      designation: 'Sales Executive',
      status: 'Inactive'
    }
  ];

  const handleCreateNew = () => {
    setView('form');
    setFormData({
      userGroup: '',
      userName: '',
      userLoginCode: '',
      designation: '',
      regionHO: '',
      emailId: '',
      mobileNo: '',
      employeeCode: '',
      distributorBranch: '16622-16622-SRI VENKATESWARA AGENCIES',
      accessRights: 'Restrict Access',
      status: 'Active',
      photo: null
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

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleUsers.filter(user =>
        user.userGroupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userLoginCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.designation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleViewAll = () => {
    setFilteredUsers(sampleUsers);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 200 * 1024) { // 200KB limit
      if (['image/png', 'image/gif', 'image/jpeg'].includes(file.type)) {
        setFormData(prev => ({
          ...prev,
          photo: file
        }));
      } else {
        alert('Please choose only png, gif, jpeg image types.');
      }
    } else {
      alert('Please choose image size less than 200kb.');
    }
  };

  const handleSetPassword = () => {
    // Here you would typically open a password setting modal
    console.log('Setting password for user:', formData.userLoginCode);
    alert('Password setting functionality would be implemented here');
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving user profile:', formData);
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
          <span className="font-semibold">{window.innerWidth < 640 ? 'User Profile' : 'User Profile'}</span>
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
              Home › Configuration › User Profile
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
                            User Group Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            User Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            User Login Code
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Designation
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {user.userGroupName}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {user.userName}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                                {user.userLoginCode}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-b">
                                {user.designation}
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">User Profile</h3>
                  
                  {/* User Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Group
                      </label>
                      <div className="relative">
                        <select
                          value={formData.userGroup}
                          onChange={(e) => handleInputChange('userGroup', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                        >
                          <option value="">Select</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Manager">Manager</option>
                          <option value="User">User</option>
                          <option value="Guest">Guest</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter user name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Login Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.userLoginCode}
                        onChange={(e) => handleInputChange('userLoginCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter login code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter designation"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region / HO <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.regionHO}
                          onChange={(e) => handleInputChange('regionHO', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                        >
                          <option value="">Select</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="Central">Central</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Id
                      </label>
                      <input
                        type="email"
                        value={formData.emailId}
                        onChange={(e) => handleInputChange('emailId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile No
                      </label>
                      <input
                        type="tel"
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter mobile number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee Code
                      </label>
                      <input
                        type="text"
                        value={formData.employeeCode}
                        onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter employee code"
                      />
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="mb-6">
                    <button
                      onClick={handleSetPassword}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <User size={16} />
                      Set User Password <span className="text-red-500">*</span>
                    </button>
                  </div>

                  {/* Photo Upload Section */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">
                      Please choose only png, gif, jpeg image types and size less than 200kb.
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/png,image/gif,image/jpeg"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <Upload size={16} />
                        + Select Photo
                      </label>
                      {formData.photo && (
                        <span className="text-sm text-green-600">
                          Photo selected: {formData.photo.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User-Branch Mapping Section */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">User-Branch Mapping <span className="text-red-500">*</span></h4>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Distributor Branch
                          </label>
                          <input
                            type="text"
                            value={formData.distributorBranch}
                            onChange={(e) => handleInputChange('distributorBranch', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Access Rights
                          </label>
                          <div className="relative">
                            <select
                              value={formData.accessRights}
                              onChange={(e) => handleInputChange('accessRights', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                            >
                              <option value="Restrict Access">Restrict Access</option>
                              <option value="Full Access">Full Access</option>
                              <option value="Limited Access">Limited Access</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="Active"
                          checked={formData.status === 'Active'}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-900">Active</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="Inactive"
                          checked={formData.status === 'Inactive'}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-900">In Active</span>
                      </label>
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

export default UserProfile;



