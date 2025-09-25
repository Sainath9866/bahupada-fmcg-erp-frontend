import React, { useState } from 'react';
import { RotateCcw, Search, Eye, Edit, Trash2, Plus, Save, X, Calendar, Building, Package, ArrowRight } from 'lucide-react';

const BatchTransfer = () => {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [docDate, setDocDate] = useState('');
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622',
    userRefNumber: '',
    godown: 'Main Godown',
    reasons: '',
    date: '08/09/2025',
    remarks: '',
    stockType: 'Saleable',
    companyProductCode: '',
    inputTextProduct: '',
    fromBatch: '',
    toBatch: ''
  });
  const [productList, setProductList] = useState([]);

  // Sample data - replace with API call in future
  const sampleTransfers = [
    {
      id: 1,
      referenceNumber: 'BT001',
      documentDate: '08/09/2025',
      companyProductCode: 'CP001',
      distrProdCode: 'DP001',
      fromBatchCode: 'BATCH001',
      toBatchCode: 'BATCH002',
      status: 'Active'
    },
    {
      id: 2,
      referenceNumber: 'BT002',
      documentDate: '08/09/2025',
      companyProductCode: 'CP002',
      distrProdCode: 'DP002',
      fromBatchCode: 'BATCH003',
      toBatchCode: 'BATCH004',
      status: 'Active'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleTransfers.filter(transfer =>
        transfer.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.companyProductCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransfers(filtered);
    } else {
      setFilteredTransfers([]);
    }
  };

  const handleViewAll = () => {
    setFilteredTransfers(sampleTransfers);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (formData.companyProductCode && formData.fromBatch && formData.toBatch) {
      const newProduct = {
        id: Date.now(),
        stockType: formData.stockType,
        productCode: formData.companyProductCode,
        fromBatch: formData.fromBatch,
        toBatch: formData.toBatch,
        transferQty: 0
      };
      setProductList(prev => [...prev, newProduct]);
      
      // Reset product search fields
      setFormData(prev => ({
        ...prev,
        companyProductCode: '',
        inputTextProduct: '',
        fromBatch: '',
        toBatch: ''
      }));
    }
  };

  const handleRemoveProduct = (id) => {
    setProductList(prev => prev.filter(product => product.id !== id));
  };

  const handleSave = () => {
    console.log('Saving batch transfer:', { formData, productList });
    // Handle save logic here
    setView('list');
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      distributorBranchCode: '16622',
      userRefNumber: '',
      godown: 'Main Godown',
      reasons: '',
      date: '08/09/2025',
      remarks: '',
      stockType: 'Saleable',
      companyProductCode: '',
      inputTextProduct: '',
      fromBatch: '',
      toBatch: ''
    });
    setProductList([]);
    setView('list');
  };

  const handleCreateNew = () => {
    setView('form');
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <ArrowRight size={20} />
          <span className="text-sm sm:text-lg font-semibold">Inventory</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Batch Transfer</span>
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
              Home › Inventory › Batch Transfer
            </div>

            {view === 'list' ? (
              <>
                {/* List View */}
                {/* Quick Search Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter atleast 3 characters"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Document Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={docDate}
                          onChange={(e) => setDocDate(e.target.value)}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
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
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            Reference Number
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                            Document Date
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[150px]">
                            Company Product code
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            Distr Prod Code
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            From Batch Code
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                            To Batch Code
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransfers.length > 0 ? (
                          filteredTransfers.map((transfer) => (
                            <tr key={transfer.id} className="hover:bg-gray-50">
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {transfer.referenceNumber}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {transfer.documentDate}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {transfer.companyProductCode}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {transfer.distrProdCode}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {transfer.fromBatchCode}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                {transfer.toBatchCode}
                              </td>
                              <td className="px-2 py-3 text-sm text-gray-900 border-b">
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
                            <td colSpan="7" className="px-2 py-8 text-center text-gray-500">
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
              <>
                {/* Form View */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distributor Branch Code
                      </label>
                      <select
                        name="distributorBranchCode"
                        value={formData.distributorBranchCode}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="16622">16622</option>
                        <option value="16623">16623</option>
                        <option value="16624">16624</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Ref. Number
                      </label>
                      <input
                        type="text"
                        name="userRefNumber"
                        value={formData.userRefNumber}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Godown
                      </label>
                      <select
                        name="godown"
                        value={formData.godown}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Main Godown">Main Godown</option>
                        <option value="Secondary Godown">Secondary Godown</option>
                        <option value="Warehouse A">Warehouse A</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reasons *
                      </label>
                      <select
                        name="reasons"
                        value={formData.reasons}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Reason</option>
                        <option value="Quality Issue">Quality Issue</option>
                        <option value="Expiry">Expiry</option>
                        <option value="Damage">Damage</option>
                        <option value="Reorganization">Reorganization</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks
                      </label>
                      <input
                        type="text"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Product Search Section */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Search</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Type
                        </label>
                        <select
                          name="stockType"
                          value={formData.stockType}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Saleable">Saleable</option>
                          <option value="Non-Saleable">Non-Saleable</option>
                          <option value="Damaged">Damaged</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Product code
                        </label>
                        <select
                          name="companyProductCode"
                          value={formData.companyProductCode}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select Product</option>
                          <option value="CP001">Product 1</option>
                          <option value="CP002">Product 2</option>
                          <option value="CP003">Product 3</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Input Text-Product
                        </label>
                        <input
                          type="text"
                          name="inputTextProduct"
                          value={formData.inputTextProduct}
                          onChange={handleFormChange}
                          placeholder="Enter atleast 3 characters"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          From Batch *
                        </label>
                        <input
                          type="text"
                          name="fromBatch"
                          value={formData.fromBatch}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          To Batch *
                        </label>
                        <select
                          name="toBatch"
                          value={formData.toBatch}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="BATCH001">BATCH001</option>
                          <option value="BATCH002">BATCH002</option>
                          <option value="BATCH003">BATCH003</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={handleAddProduct}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product List Table */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Product List</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Stock Type
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              Product Code
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              From Batch
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              To Batch
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                              Transfer Qty
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productList.length > 0 ? (
                            productList.map((product) => (
                              <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                  {product.stockType}
                                </td>
                                <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                  {product.productCode}
                                </td>
                                <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                  {product.fromBatch}
                                </td>
                                <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                  {product.toBatch}
                                </td>
                                <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                  <input
                                    type="number"
                                    value={product.transferQty}
                                    onChange={(e) => {
                                      const updatedProducts = productList.map(p =>
                                        p.id === product.id ? { ...p, transferQty: parseFloat(e.target.value) || 0 } : p
                                      );
                                      setProductList(updatedProducts);
                                    }}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  />
                                </td>
                                <td className="px-2 py-3 text-sm text-gray-900 border-b">
                                  <button
                                    onClick={() => handleRemoveProduct(product.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="px-2 py-8 text-center text-gray-500">
                                No Matching records found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </>
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

export default BatchTransfer;


