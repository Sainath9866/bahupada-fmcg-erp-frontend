import { useState } from 'react';
import { 
  Search, Building, Calendar, Eye, Edit, Trash2, 
  Save, X, ArrowLeft, Plus, Minus, Package,
  CheckCircle, XCircle, AlertCircle, RotateCcw
} from 'lucide-react';

export default function PurchaseReturn() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByCollapsed, setSearchByCollapsed] = useState(false);
  const [returnDetailsCollapsed, setReturnDetailsCollapsed] = useState(false);
  
  const [formData, setFormData] = useState({
    distributorBranch: '16622-16622-SRI VENKATESWARA AGENCIES',
    date: '08/09/2025',
    purchaseReturnMode: 'without-reference',
    godown: 'Main Godowr',
    supplierName: 'Marico Limited - Vijaywada',
    productSearch: 'Company Product code',
    inputTextProduct: '',
    uom: 'Select'
  });

  const [returnData, setReturnData] = useState({
    productCode: '',
    stockOnHand: '',
    expiryDate: '',
    returnSaleableQty: '',
    returnUnsaleableQty: '',
    returnOfferQty: '',
    reason: 'Select',
    remarks: ''
  });

  const [summaryData, setSummaryData] = useState({
    totalGrossAmount: 0.00,
    totalTaxAmount: 0.00,
    totalDiscount: 0.00,
    prnNetAmount: 0.00
  });

  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReturnDataChange = (e) => {
    const { name, value } = e.target;
    setReturnData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (returnData.productCode && (returnData.returnSaleableQty || returnData.returnUnsaleableQty || returnData.returnOfferQty)) {
      const newProduct = {
        id: Date.now(),
        distrProdCode: returnData.productCode,
        productName: `Product ${returnData.productCode}`,
        batch: 'BATCH001',
        expiryDate: returnData.expiryDate || 'N/A',
        uom: formData.uom,
        retSaleableQty: returnData.returnSaleableQty || '0',
        retUnsaleableQty: returnData.returnUnsaleableQty || '0',
        retOfferQty: returnData.returnOfferQty || '0',
        mrp: '100.00',
        reason: returnData.reason
      };
      
      setProducts(prev => [...prev, newProduct]);
      setReturnData({
        productCode: '',
        stockOnHand: '',
        expiryDate: '',
        returnSaleableQty: '',
        returnUnsaleableQty: '',
        returnOfferQty: '',
        reason: 'Select',
        remarks: ''
      });
    }
  };

  const handleSave = () => {
    console.log('Saving Purchase Return:', { formData, returnData, products, summaryData });
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    setFormData({
      distributorBranch: '16622-16622-SRI VENKATESWARA AGENCIES',
      date: '08/09/2025',
      purchaseReturnMode: 'without-reference',
      godown: 'Main Godowr',
      supplierName: 'Marico Limited - Vijaywada',
      productSearch: 'Company Product code',
      inputTextProduct: '',
      uom: 'Select'
    });
    setProducts([]);
  };

  const handleSearch = () => {
    console.log('Searching with:', { searchTerm });
  };

  const handleViewAll = () => {
    setSearchTerm('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Draft
          </span>
        );
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Building size={20} />
          <span className="text-lg font-semibold">Company</span>
          <span className="text-purple-200">›</span>
          <span className="text-lg font-semibold">Purchase Return</span>
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
        {view === 'form' && (
          <button
            onClick={() => setView('list')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to List
          </button>
        )}
      </div>

      <div className="bg-white rounded-b-lg shadow-lg">
        {view === 'list' ? (
          <>
            {/* Quick Search Section */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Term
                  </label>
                  <input
                    type="text"
                    placeholder="Enter atleast 3 characters"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleViewAll}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Search Results Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Branch Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Purchase Return Ref No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        GRN Ref No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Comp Inv No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Purchase Return Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Supplier Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Return Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Approval Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Remarks Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                        No matching record(s) found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Form View */
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create Purchase Return</h3>
              
              {/* Basic Information */}
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distributor Branch *
                    </label>
                    <div className="relative">
                      <select
                        name="distributorBranch"
                        value={formData.distributorBranch}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="16622-16622-SRI VENKATESWARA AGENCIES">16622-16622-SRI VENKATESWARA AGENCIES</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Return Mode
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="purchaseReturnMode"
                          value="without-reference"
                          checked={formData.purchaseReturnMode === 'without-reference'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Without Reference
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="purchaseReturnMode"
                          value="with-reference"
                          checked={formData.purchaseReturnMode === 'with-reference'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        With Reference
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search By Component */}
              <div className="mb-6 border border-gray-300 rounded-lg">
                <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <button
                    onClick={() => setSearchByCollapsed(!searchByCollapsed)}
                    className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 hover:bg-purple-700"
                  >
                    {searchByCollapsed ? <Plus size={14} /> : <Minus size={14} />}
                  </button>
                  <h4 className="text-lg font-semibold text-gray-800">Search By</h4>
                </div>
                
                {!searchByCollapsed && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Godown *
                        </label>
                        <div className="relative">
                          <select
                            name="godown"
                            value={formData.godown}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Main Godowr">Main Godowr</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Supplier Name *
                        </label>
                        <div className="relative">
                          <select
                            name="supplierName"
                            value={formData.supplierName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Marico Limited - Vijaywada">Marico Limited - Vijaywada</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Search
                        </label>
                        <div className="relative">
                          <select
                            name="productSearch"
                            value={formData.productSearch}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Company Product code">Company Product code</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Input Text-Product *
                        </label>
                        <input
                          type="text"
                          name="inputTextProduct"
                          value={formData.inputTextProduct}
                          onChange={handleInputChange}
                          placeholder="Enter atleast 3 characters"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Uom *
                        </label>
                        <div className="relative">
                          <select
                            name="uom"
                            value={formData.uom}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Select">Select</option>
                            <option value="PCS">PCS</option>
                            <option value="KG">KG</option>
                            <option value="LTR">LTR</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Details Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Code
                        </label>
                        <input
                          type="text"
                          value={returnData.productCode}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock On Hand
                        </label>
                        <input
                          type="text"
                          value={returnData.stockOnHand}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={returnData.expiryDate}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock on hand (Offer qty)
                        </label>
                        <input
                          type="text"
                          value="0"
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Return Qty *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            name="returnSaleableQty"
                            value={returnData.returnSaleableQty}
                            onChange={handleReturnDataChange}
                            placeholder="Saleable"
                            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            name="returnUnsaleableQty"
                            value={returnData.returnUnsaleableQty}
                            onChange={handleReturnDataChange}
                            placeholder="Offer"
                            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reason *
                        </label>
                        <div className="relative">
                          <select
                            name="reason"
                            value={returnData.reason}
                            onChange={handleReturnDataChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Select">Select</option>
                            <option value="Damaged">Damaged</option>
                            <option value="Expired">Expired</option>
                            <option value="Wrong Item">Wrong Item</option>
                            <option value="Quality Issue">Quality Issue</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          &nbsp;
                        </label>
                        <div className="h-10"></div>
                      </div>
                      
                      <div className="flex items-end">
                        <button
                          onClick={handleAddProduct}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Return Details Component */}
              <div className="mb-6 border border-gray-300 rounded-lg">
                <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <button
                    onClick={() => setReturnDetailsCollapsed(!returnDetailsCollapsed)}
                    className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 hover:bg-purple-700"
                  >
                    {returnDetailsCollapsed ? <Plus size={14} /> : <Minus size={14} />}
                  </button>
                  <h4 className="text-lg font-semibold text-gray-800">Return Details</h4>
                </div>
                
                {!returnDetailsCollapsed && (
                  <div className="p-4">
                    {/* Products Table */}
                    <div className="mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Distr Prod Code
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Product Name
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Batch
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Expiry Date
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Uom
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Ret.Saleable Qty
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Ret.Unsaleable Qty
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Ret.Offer Qty
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                MRP Reason
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.length > 0 ? (
                              products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.distrProdCode}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.productName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.batch}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.expiryDate}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.uom}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.retSaleableQty}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.retUnsaleableQty}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.retOfferQty}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.mrp} - {product.reason}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                    <button className="text-red-600 hover:text-red-800">
                                      <Trash2 size={16} />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                                  No Data found with given criteria
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remarks
                        </label>
                        <textarea
                          name="remarks"
                          value={returnData.remarks}
                          onChange={handleReturnDataChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Gross Amount:</span>
                          <span className="text-sm text-gray-900">{formatCurrency(summaryData.totalGrossAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Tax Amount:</span>
                          <span className="text-sm text-gray-900">{formatCurrency(summaryData.totalTaxAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Discount:</span>
                          <span className="text-sm text-gray-900">{formatCurrency(summaryData.totalDiscount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">PRN Net Amount:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">{formatCurrency(summaryData.prnNetAmount)}</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <div>Botree Software International Pvt Ltd</div>
        <div>© All Rights Reserved</div>
      </div>
    </div>
  );
}
