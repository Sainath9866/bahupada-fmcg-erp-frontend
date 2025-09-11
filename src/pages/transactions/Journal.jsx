import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, BookOpen, DollarSign, Calendar, User, Building, ArrowUpDown } from 'lucide-react';
import api from '../../lib/api';

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

  const [formData, setFormData] = useState({
    journal_number: '',
    journal_date: '',
    reference: '',
    description: '',
    total_amount: '',
    journal_type: '',
    remarks: ''
  });

  const [journalEntries, setJournalEntries] = useState([
    { ledger_id: '', debit_amount: '', credit_amount: '', narration: '' }
  ]);

  const journalTypes = ['Sales', 'Purchase', 'Receipt', 'Payment', 'Contra', 'Debit Note', 'Credit Note', 'Adjustment'];

  useEffect(() => {
    fetchJournals();
    fetchLedgers();
  }, []);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const response = await api.get('/journals');
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLedgers = async () => {
    try {
      const response = await api.get('/ledgers');
      setLedgers(response.data);
    } catch (error) {
      console.error('Error fetching ledgers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that total debits = total credits
    const totalDebits = journalEntries.reduce((sum, entry) => sum + parseFloat(entry.debit_amount || 0), 0);
    const totalCredits = journalEntries.reduce((sum, entry) => sum + parseFloat(entry.credit_amount || 0), 0);
    
    if (Math.abs(totalDebits - totalCredits) > 0.01) {
      alert('Total debits must equal total credits');
      return;
    }

    try {
      const journalData = {
        ...formData,
        entries: journalEntries
      };

      if (editingJournal) {
        await api.put(`/journals/${editingJournal.id}`, journalData);
      } else {
        await api.post('/journals', journalData);
      }
      setShowModal(false);
      setEditingJournal(null);
      resetForm();
      fetchJournals();
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setFormData(journal);
    setJournalEntries(journal.entries || [{ ledger_id: '', debit_amount: '', credit_amount: '', narration: '' }]);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      try {
        await api.delete(`/journals/${id}`);
        fetchJournals();
      } catch (error) {
        console.error('Error deleting journal:', error);
      }
    }
  };

  const handleViewInfo = (journal) => {
    setSelectedJournal(journal);
    setShowInfoModal(true);
  };

  const resetForm = () => {
    setFormData({
      journal_number: '',
      journal_date: '',
      reference: '',
      description: '',
      total_amount: '',
      journal_type: '',
      remarks: ''
    });
    setJournalEntries([{ ledger_id: '', debit_amount: '', credit_amount: '', narration: '' }]);
  };

  const addJournalEntry = () => {
    setJournalEntries([...journalEntries, { ledger_id: '', debit_amount: '', credit_amount: '', narration: '' }]);
  };

  const removeJournalEntry = (index) => {
    if (journalEntries.length > 1) {
      setJournalEntries(journalEntries.filter((_, i) => i !== index));
    }
  };

  const updateJournalEntry = (index, field, value) => {
    const updatedEntries = [...journalEntries];
    updatedEntries[index][field] = value;
    setJournalEntries(updatedEntries);
  };

  const filteredJournals = journals.filter(journal => {
    const matchesSearch = journal.journal_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterType || journal.journal_type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Journal Entries</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Journal Entry
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search journals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {journalTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredJournals.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No journals found</td>
                </tr>
              ) : (
                filteredJournals.map((journal) => (
                  <tr key={journal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{journal.journal_number}</div>
                        <div className="text-sm text-gray-500">{journal.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{journal.journal_date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-900">{journal.journal_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">₹{journal.total_amount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{journal.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewInfo(journal)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(journal)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(journal.id)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingJournal ? 'Edit Journal Entry' : 'New Journal Entry'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Journal Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.journal_number}
                    onChange={(e) => setFormData({...formData, journal_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Journal Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.journal_date}
                    onChange={(e) => setFormData({...formData, journal_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Journal Type *</label>
                  <select
                    required
                    value={formData.journal_type}
                    onChange={(e) => setFormData({...formData, journal_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {journalTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => setFormData({...formData, reference: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Journal Entries */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Journal Entries *</label>
                  <button
                    type="button"
                    onClick={addJournalEntry}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Entry
                  </button>
                </div>
                <div className="space-y-2">
                  {journalEntries.map((entry, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-4">
                        <select
                          required
                          value={entry.ledger_id}
                          onChange={(e) => updateJournalEntry(index, 'ledger_id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Ledger</option>
                          {ledgers.map(ledger => (
                            <option key={ledger.id} value={ledger.id}>{ledger.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Debit"
                          value={entry.debit_amount}
                          onChange={(e) => updateJournalEntry(index, 'debit_amount', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Credit"
                          value={entry.credit_amount}
                          onChange={(e) => updateJournalEntry(index, 'credit_amount', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Narration"
                          value={entry.narration}
                          onChange={(e) => updateJournalEntry(index, 'narration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-1">
                        {journalEntries.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeJournalEntry(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingJournal(null);
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
                  {editingJournal ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && selectedJournal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Journal Entry Details</h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Journal Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Journal: {selectedJournal.journal_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date: {selectedJournal.journal_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Type: {selectedJournal.journal_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Reference: {selectedJournal.reference}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Amount & Description</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Amount: ₹{selectedJournal.total_amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Description: {selectedJournal.description}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Journal Entries</h3>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Ledger</th>
                        <th className="px-3 py-2 text-right">Debit</th>
                        <th className="px-3 py-2 text-right">Credit</th>
                        <th className="px-3 py-2 text-left">Narration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedJournal.entries?.map((entry, index) => {
                        const ledger = ledgers.find(l => l.id === entry.ledger_id);
                        return (
                          <tr key={index} className="border-t">
                            <td className="px-3 py-2">{ledger?.name || 'N/A'}</td>
                            <td className="px-3 py-2 text-right">{entry.debit_amount ? `₹${entry.debit_amount}` : '-'}</td>
                            <td className="px-3 py-2 text-right">{entry.credit_amount ? `₹${entry.credit_amount}` : '-'}</td>
                            <td className="px-3 py-2">{entry.narration}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Remarks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{selectedJournal.remarks || 'No remarks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
