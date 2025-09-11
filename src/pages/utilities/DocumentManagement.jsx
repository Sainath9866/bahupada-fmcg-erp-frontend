import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Upload, FileText, Folder, Plus, Edit, Trash2, Eye, Share } from 'lucide-react';
import api from '../../lib/api';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    file: null,
    tags: '',
    is_public: false
  });

  const documentCategories = ['Invoice', 'Receipt', 'Contract', 'Report', 'Certificate', 'Manual', 'Policy', 'Other'];
  const documentTypes = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'TXT', 'Image', 'Other'];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/utilities/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('is_public', formData.is_public);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      if (editingDocument) {
        await api.put(`/utilities/documents/${editingDocument.id}`, formDataToSend);
      } else {
        await api.post('/utilities/documents', formDataToSend);
      }
      setShowModal(false);
      setEditingDocument(null);
      resetForm();
      fetchDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const handleEdit = (document) => {
    setEditingDocument(document);
    setFormData({
      name: document.name,
      description: document.description,
      category: document.category,
      type: document.type,
      file: null,
      tags: document.tags,
      is_public: document.is_public
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await api.delete(`/utilities/documents/${id}`);
        fetchDocuments();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleDownload = async (document) => {
    try {
      const response = await api.get(`/utilities/documents/${document.id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      type: '',
      file: null,
      tags: '',
      is_public: false
    });
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc':
      case 'docx': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xls':
      case 'xlsx': return <FileText className="w-5 h-5 text-green-500" />;
      case 'ppt':
      case 'pptx': return <FileText className="w-5 h-5 text-orange-500" />;
      case 'image': return <FileText className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || doc.category === filterCategory;
    const matchesType = !filterType || doc.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
          <button
            onClick={fetchDocuments}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Folder className="w-4 h-4" />
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
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {documentCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchDocuments}
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
              <Folder className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">PDF Files</p>
              <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.type === 'PDF').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Public Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.is_public).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Upload className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900">2.5 GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="text-gray-500">Loading documents...</div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <div className="text-gray-500">No documents found</div>
          </div>
        ) : (
          filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getFileIcon(document.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{document.name}</h3>
                    <p className="text-sm text-gray-600">{document.category}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  document.is_public ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {document.is_public ? 'Public' : 'Private'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">{document.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Type: {document.type}</span>
                  <span>•</span>
                  <span>Size: {document.size || 'N/A'}</span>
                </div>
                {document.tags && (
                  <div className="flex flex-wrap gap-1">
                    {document.tags.split(',').map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(document)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleEdit(document)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(document.id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingDocument ? 'Edit Document' : 'Upload New Document'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {documentCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File {!editingDocument && '*'}</label>
                  <input
                    type="file"
                    required={!editingDocument}
                    onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={formData.is_public}
                  onChange={(e) => setFormData({...formData, is_public: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_public" className="ml-2 block text-sm text-gray-900">
                  Make this document public
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingDocument(null);
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
                  {editingDocument ? 'Update' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
