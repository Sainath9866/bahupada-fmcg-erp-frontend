import { useState } from 'react';
import { 
  Search, Building, Calendar, Eye, Edit, Trash2, 
  Save, X, ArrowLeft, Plus, Minus, Package,
  CheckCircle, XCircle, AlertCircle, FileText
} from 'lucide-react';

export default function PurchaseOrder() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [poDate, setPoDate] = useState('');
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622',
    distributorBranchName: '16622-SRI VENKATESWARA AGEN',
    companyName: 'Marico India Limited',
    supplierName: 'Marico Limited - Vijaywada',
    poReferenceNo: '',
    poDate: '08/09/2025',
    companyPoNo: '',
    companyPoDate: '08/09/2025',
    tentativeOrderValue: '',
    status: 'active',
    remarks: '',
    deliveryDate: '08/09/2025',
    paymentTerms: 'Net 30',
    shippingAddress: 'Main Warehouse, Mumbai',
    billingAddress: 'Head Office, Mumbai'
  });

  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    productCode: '',
    productName: '',
    quantity: '',
    unitPrice: '',
    totalAmount: '',
    uom: 'PCS',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductDataChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (productData.productCode && productData.quantity && productData.unitPrice) {
      const newProduct = {
        id: Date.now(),
        productCode: productData.productCode,
        productName: productData.productName || `Product ${productData.productCode}`,
        quantity: productData.quantity,
        unitPrice: productData.unitPrice,
        totalAmount: (parseFloat(productData.quantity) * parseFloat(productData.unitPrice)).toFixed(2),
        uom: productData.uom,
        description: productData.description
      };
      
      setProducts(prev => [...prev, newProduct]);
      setProductData({
        productCode: '',
        productName: '',
        quantity: '',
        unitPrice: '',
        totalAmount: '',
        uom: 'PCS',
        description: ''
      });
    }
  };

  const handleSave = () => {
    console.log('Saving Purchase Order:', { formData, products });
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    setFormData({
      distributorBranchCode: '16622',
      distributorBranchName: '16622-SRI VENKATESWARA AGEN',
      companyName: 'Marico India Limited',
      supplierName: 'Marico Limited - Vijaywada',
      poReferenceNo: '',
      poDate: '08/09/2025',
      companyPoNo: '',
      companyPoDate: '08/09/2025',
      tentativeOrderValue: '',
      status: 'active',
      remarks: '',
      deliveryDate: '08/09/2025',
      paymentTerms: 'Net 30',
      shippingAddress: 'Main Warehouse, Mumbai',
      billingAddress: 'Head Office, Mumbai'
    });
    setProducts([]);
  };

  const handleSearch = () => {
    console.log('Searching with:', { searchTerm, poDate });
  };

  const handleViewAll = () => {
    setSearchTerm('');
    setPoDate('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Inactive
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
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
          <span className="text-lg font-semibold">Purchase Order</span>
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
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select PO Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={poDate}
                      onChange={(e) => setPoDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={16} className="absolute right-3 top-3 text-gray-400" />
                  </div>
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
                        Distributor Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Distributor Branch Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        PO Reference No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        PO Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Company PO NO
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Company PO Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Tentative Order Value
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
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
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create Purchase Order</h3>
              
              {/* Purchase Order Details */}
              <div className="mb-6 border border-gray-300 rounded-lg">
                <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <FileText size={20} className="text-purple-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-800">Purchase Order Details</h4>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Distributor Branch Code
                        </label>
                        <div className="relative">
                          <select
                            name="distributorBranchCode"
                            value={formData.distributorBranchCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="16622">16622</option>
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
                          Distributor Branch Name
                        </label>
                        <input
                          type="text"
                          value={formData.distributorBranchName}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name *
                        </label>
                        <div className="relative">
                          <select
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Marico India Limited">Marico India Limited</option>
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
                          PO Reference No *
                        </label>
                        <input
                          type="text"
                          name="poReferenceNo"
                          value={formData.poReferenceNo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PO Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="poDate"
                            value={formData.poDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company PO No
                        </label>
                        <input
                          type="text"
                          name="companyPoNo"
                          value={formData.companyPoNo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company PO Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="companyPoDate"
                            value={formData.companyPoDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tentative Order Value *
                        </label>
                        <input
                          type="number"
                          name="tentativeOrderValue"
                          value={formData.tentativeOrderValue}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Terms
                        </label>
                        <div className="relative">
                          <select
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Net 30">Net 30</option>
                            <option value="Net 15">Net 15</option>
                            <option value="COD">COD</option>
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
                          Status
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="status"
                              value="active"
                              checked={formData.status === 'active'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Active
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="status"
                              value="inactive"
                              checked={formData.status === 'inactive'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Inactive
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address
                      </label>
                      <textarea
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Billing Address
                      </label>
                      <textarea
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remarks
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div className="mb-6 border border-gray-300 rounded-lg">
                <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <Package size={20} className="text-purple-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-800">Product Selection</h4>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Code *
                      </label>
                      <input
                        type="text"
                        name="productCode"
                        value={productData.productCode}
                        onChange={handleProductDataChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleProductDataChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleProductDataChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Price *
                      </label>
                      <input
                        type="number"
                        name="unitPrice"
                        value={productData.unitPrice}
                        onChange={handleProductDataChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UOM
                      </label>
                      <div className="relative">
                        <select
                          name="uom"
                          value={productData.uom}
                          onChange={handleProductDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                        >
                          <option value="PCS">PCS</option>
                          <option value="KG">KG</option>
                          <option value="LTR">LTR</option>
                          <option value="BOX">BOX</option>
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
                        Total Amount
                      </label>
                      <input
                        type="text"
                        value={productData.totalAmount}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                      />
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={productData.description}
                      onChange={handleProductDataChange}
                      placeholder="Product description..."
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Product Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Product Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          UOM
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Total Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Description
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
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.productCode}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.productName}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(product.unitPrice)}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.uom}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(product.totalAmount)}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{product.description}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                            No products added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100">
                        <td colSpan="5" className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          Total
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          {formatCurrency(products.reduce((sum, p) => sum + parseFloat(p.totalAmount || 0), 0))}
                        </td>
                        <td colSpan="2" className="px-4 py-3 text-sm font-medium text-gray-900 border-b"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
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
                  Save Purchase Order
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
