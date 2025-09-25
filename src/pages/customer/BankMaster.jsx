import React, { useState } from 'react';
import { Building, Search, Eye, Edit, Trash2, Plus, X, Building2 } from 'lucide-react';

const BankMaster = () => {
  const [distributorBranch, setDistributorBranch] = useState('16622-SRI VENKATESWARA AGENC');
  const [bankName, setBankName] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);

  // Sample data - replace with API call in future
  const sampleBanks = [
    {
      id: 1,
      slNo: 1,
      bankName: 'State Bank of India',
      branchDetails: 'Main Branch, Mumbai'
    },
    {
      id: 2,
      slNo: 2,
      bankName: 'HDFC Bank',
      branchDetails: 'Corporate Branch, Delhi'
    },
    {
      id: 3,
      slNo: 3,
      bankName: 'ICICI Bank',
      branchDetails: 'Business Branch, Bangalore'
    }
  ];

  const handleAdd = () => {
    if (bankName.length >= 3) {
      const filtered = sampleBanks.filter(bank =>
        bank.bankName.toLowerCase().includes(bankName.toLowerCase())
      );
      setFilteredBanks(filtered);
    } else {
      setFilteredBanks([]);
    }
  };

  const handleInputChange = (e) => {
    setBankName(e.target.value);
    if (e.target.value.length >= 3) {
      handleAdd();
    } else {
      setFilteredBanks([]);
    }
  };

  const handleCancel = () => {
    setBankName('');
    setFilteredBanks([]);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Building size={20} />
          <span className="text-sm sm:text-lg font-semibold">Customer</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Bank Master</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Customer › Bank Master
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              {/* Distributor Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distributor Branch
                </label>
                <select
                  value={distributorBranch}
                  onChange={(e) => setDistributorBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="16622-SRI VENKATESWARA AGENC">16622-SRI VENKATESWARA AGENC</option>
                  <option value="16623-ANOTHER BRANCH">16623-ANOTHER BRANCH</option>
                </select>
              </div>

              {/* Bank Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bankName}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter atleast 3 characters"
                  />
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Records Table */}
            <div className="mt-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Sl.No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Bank Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Branch Details
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBanks.length > 0 ? (
                      filteredBanks.map((bank) => (
                        <tr key={bank.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {bank.slNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {bank.bankName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">
                            {bank.branchDetails}
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
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          No matching record(s) found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankMaster;


