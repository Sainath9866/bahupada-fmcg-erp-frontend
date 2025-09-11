import React, { useState, useEffect } from 'react';
import { Search, Filter, Bell, AlertTriangle, CheckCircle, XCircle, Clock, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import api from '../../lib/api';

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    is_active: true,
    expires_at: ''
  });

  const alertTypes = ['info', 'warning', 'error', 'success'];
  const alertPriorities = ['low', 'medium', 'high', 'critical'];
  const alertStatuses = ['active', 'inactive', 'expired'];

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/utilities/alerts');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAlert) {
        await api.put(`/utilities/alerts/${editingAlert.id}`, formData);
      } else {
        await api.post('/utilities/alerts', formData);
      }
      setShowModal(false);
      setEditingAlert(null);
      resetForm();
      fetchAlerts();
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setFormData(alert);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await api.delete(`/utilities/alerts/${id}`);
        fetchAlerts();
      } catch (error) {
        console.error('Error deleting alert:', error);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await api.put(`/utilities/alerts/${id}`, { is_active: !currentStatus });
      fetchAlerts();
    } catch (error) {
      console.error('Error updating alert status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      priority: 'medium',
      is_active: true,
      expires_at: ''
    });
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || alert.is_active === (filterStatus === 'active');
    const matchesType = !filterType || alert.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">System Alerts</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Alert
          </button>
          <button
            onClick={fetchAlerts}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {alertTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchAlerts}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.filter(a => a.is_active).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.filter(a => a.priority === 'critical').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.filter(a => new Date(a.expires_at) < new Date()).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No alerts found</td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                        <div className="text-sm text-gray-500">{alert.message}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getAlertIcon(alert.type)}
                        <span className="text-sm text-gray-900 capitalize">{alert.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{alert.expires_at || 'Never'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(alert.id, alert.is_active)}
                          className={`${alert.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {alert.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEdit(alert)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingAlert ? 'Edit Alert' : 'Create New Alert'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {alertTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {alertPriorities.map(priority => (
                      <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expires At</label>
                  <input
                    type="datetime-local"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAlert(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingAlert ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemAlerts;
