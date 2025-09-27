import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, FolderTree, FolderOpen } from 'lucide-react';
import api from '../../../lib/api.js';

export default function LedgerGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState(new Set());

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    parent_id: '',
    description: '',
    type: 'primary', // primary, secondary
    status: 'active'
  });

  const [parentGroups, setParentGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await api.get('/ledger-groups');
      setGroups(response.data);
      setParentGroups(response.data.filter(g => g.type === 'primary'));
    } catch (error) {
      console.error('Error fetching ledger groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        parent_id: formData.parent_id || null
      };
      
      if (editingGroup) {
        await api.put(`/ledger-groups/${editingGroup.id}`, data);
      } else {
        await api.post('/ledger-groups', data);
      }
      setShowModal(false);
      setEditingGroup(null);
      resetForm();
      fetchGroups();
    } catch (error) {
      console.error('Error saving ledger group:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      parent_id: '',
      description: '',
      type: 'primary',
      status: 'active'
    });
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      code: group.code || '',
      parent_id: group.parent_id || '',
      description: group.description || '',
      type: group.type || 'primary',
      status: group.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ledger group?')) {
      try {
        await api.delete(`/ledger-groups/${id}`);
        fetchGroups();
      } catch (error) {
        console.error('Error deleting ledger group:', error);
      }
    }
  };

  const toggleExpanded = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const buildGroupTree = (groups, parentId = null, level = 0) => {
    return groups
      .filter(group => group.parent_id === parentId)
      .map(group => {
        const children = buildGroupTree(groups, group.id, level + 1);
        const isExpanded = expandedGroups.has(group.id);
        
        return (
          <div key={group.id} className="border border-gray-200 rounded-lg mb-2">
            <div 
              className={`p-4 hover:bg-gray-50 cursor-pointer ${level > 0 ? 'ml-6' : ''}`}
              onClick={() => children.length > 0 && toggleExpanded(group.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {children.length > 0 ? (
                    isExpanded ? <FolderOpen size={16} className="text-blue-600" /> : <FolderTree size={16} className="text-blue-600" />
                  ) : (
                    <div className="w-4 h-4"></div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{group.name}</div>
                    {group.code && <div className="text-sm text-gray-500">Code: {group.code}</div>}
                    {group.description && <div className="text-sm text-gray-600">{group.description}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    group.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {group.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    group.type === 'primary' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {group.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(group);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(group.id);
                      }}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isExpanded && children.length > 0 && (
              <div className="border-t border-gray-200">
                {children}
              </div>
            )}
          </div>
        );
      });
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (group.code && group.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const groupTree = buildGroupTree(filteredGroups);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Ledger Groups (Chart of Accounts)</h1>
          <p className="text-gray-600">Manage ledger groups and chart of accounts structure</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Group
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups by name, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Groups Tree */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : groupTree.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No ledger groups found</div>
        ) : (
          <div className="p-4">
            {groupTree}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingGroup ? 'Edit Ledger Group' : 'Add Ledger Group'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingGroup(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Auto-generated or manual"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Group</label>
                  <select
                    value={formData.parent_id}
                    onChange={(e) => setFormData({...formData, parent_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">No Parent (Root Group)</option>
                    {parentGroups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter group description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingGroup(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {editingGroup ? 'Update' : 'Create'} Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}








