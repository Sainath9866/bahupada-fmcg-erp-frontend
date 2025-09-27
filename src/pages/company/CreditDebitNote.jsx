import { useState } from 'react';
import { 
  Plus, Search, Calendar, Eye, Edit, Trash2, 
  Save, X, ArrowLeft, FileText, Building, User, 
  DollarSign, CheckCircle, AlertCircle 
} from 'lucide-react';

export default function CreditDebitNote() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [formData, setFormData] = useState({
    referenceNo: '',
    distributorBranch: '16622-16622-SRI VENI',
    creditNoteDate: '08/09/2025',
    noteType: 'credit', // 'credit' or 'debit'
    companyCode: 'MIL-Marico India Limited',
    supplierCode: 'D572-Marico Limited - Vijaywada',
    accountName: '',
    creditAmount: '',
    remarks: '',
    status: 'active' // 'active' or 'inactive'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving credit/debit note:', formData);
    // After successful save, switch back to list view
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    // Reset form data
    setFormData({
      referenceNo: '',
      distributorBranch: '16622-16622-SRI VENI',
      creditNoteDate: '08/09/2025',
      noteType: 'credit',
      companyCode: 'MIL-Marico India Limited',
      supplierCode: 'D572-Marico Limited - Vijaywada',
      accountName: '',
      creditAmount: '',
      remarks: '',
      status: 'active'
    });
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching with:', { searchTerm, receiptDate });
  };

  const handleViewAll = () => {
    // Handle view all logic here
    console.log('Viewing all records');
  };

  return (
    <div className="p-1 sm:p-6 bg-gray-50 min-h-screen max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-2 sm:px-6 py-2 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Building size={16} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-lg font-semibold">Company</span>
          <span className="text-purple-200 text-sm sm:text-base">›</span>
          <span className="text-sm sm:text-lg font-semibold">Credit Note - Debit Note</span>
        </div>
        {view === 'list' && (
          <button
            onClick={() => setView('form')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Create New</span>
            <span className="xs:hidden">New</span>
          </button>
        )}
        {view === 'form' && (
          <button
            onClick={() => setView('list')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back to List</span>
            <span className="xs:hidden">Back</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-b-lg shadow-lg">
        {view === 'list' ? (
          <>
            {/* Quick Search Section */}
            <div className="p-2 sm:p-6 border-b border-gray-200">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Quick Search</h3>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:items-end">
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Search Term
                  </label>
                  <input
                    type="text"
                    placeholder="Enter atleast 3 characters"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Select Receipt Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={receiptDate}
                      onChange={(e) => setReceiptDate(e.target.value)}
                      className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={12} className="sm:w-4 sm:h-4 absolute right-2 top-2 text-gray-400" />
                  </div>
                </div>
                <button
                  onClick={handleViewAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-6 sm:py-2 text-sm rounded-lg transition-colors whitespace-nowrap"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Search Results Section */}
            <div className="p-2 sm:p-6">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Search Results</h3>
              <div className="w-full overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                <div className="min-w-[800px]">
                  <table className="w-full border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Branch Code
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Reference No.
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Date
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Company
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Supplier Name
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Amount
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Settled Status
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Status
                        </th>
                        <th className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b whitespace-nowrap">
                          Balance Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="9" className="px-3 py-6 sm:px-4 sm:py-8 text-center text-xs sm:text-sm text-gray-500">
                          No matching record(s) found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Form View */
          <div className="p-3 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Create Credit Note - Debit Note</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {/* Reference No. */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Reference No.
                  </label>
                  <input
                    type="text"
                    name="referenceNo"
                    value={formData.referenceNo}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Distributor Branch */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Distributor Branch *
                  </label>
                  <select
                    name="distributorBranch"
                    value={formData.distributorBranch}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="16622-16622-SRI VENI">16622-16622-SRI VENI</option>
                  </select>
                </div>

                {/* Credit Note Date */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Credit Note Date *
                  </label>
                  <input
                    type="date"
                    name="creditNoteDate"
                    value={formData.creditNoteDate}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Credit or Debit Note */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Credit or Debit Note
                  </label>
                  <div className="flex gap-3 sm:gap-4">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="noteType"
                        value="credit"
                        checked={formData.noteType === 'credit'}
                        onChange={handleInputChange}
                        className="mr-1.5 sm:mr-2"
                      />
                      Credit Note
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="noteType"
                        value="debit"
                        checked={formData.noteType === 'debit'}
                        onChange={handleInputChange}
                        className="mr-1.5 sm:mr-2"
                      />
                      Debit Note
                    </label>
                  </div>
                </div>

                {/* Company Code-Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Company Code-Name *
                  </label>
                  <select
                    name="companyCode"
                    value={formData.companyCode}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="MIL-Marico India Limited">MIL-Marico India Limited</option>
                  </select>
                </div>

                {/* Supplier Code Or Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Supplier Code Or Name *
                  </label>
                  <select
                    name="supplierCode"
                    value={formData.supplierCode}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="D572-Marico Limited - Vijaywada">D572-Marico Limited - Vijaywada</option>
                  </select>
                </div>

                {/* Account Name-Debit */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Account Name-Debit *
                  </label>
                  <div className="flex gap-1 sm:gap-2">
                    <input
                      type="text"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-sm">
                      ...
                    </button>
                  </div>
                </div>

                {/* Credit Amount */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Credit Amount *
                  </label>
                  <div className="flex gap-1 sm:gap-2">
                    <input
                      type="number"
                      name="creditAmount"
                      value={formData.creditAmount}
                      onChange={handleInputChange}
                      className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                      Tax Breakup
                    </button>
                  </div>
                </div>

                {/* Remarks */}
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Remarks *
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Status
                  </label>
                  <div className="flex gap-3 sm:gap-4">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleInputChange}
                        className="mr-1.5 sm:mr-2"
                      />
                      Active
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleInputChange}
                        className="mr-1.5 sm:mr-2"
                      />
                      In Active
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-8 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 sm:px-6 rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 sm:px-6 rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  <Save size={14} />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
        <div>Botree Software International Pvt Ltd</div>
        <div>© All Rights Reserved</div>
      </div>
    </div>
  );
}