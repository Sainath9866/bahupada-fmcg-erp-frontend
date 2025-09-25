import { useState } from 'react';
import { 
  Search, Building, Calendar, Eye, Edit, Trash2, 
  Save, X, ArrowLeft, Plus, Minus, Package,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

export default function GoodsReceiptNote() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [grnCollapsed, setGrnCollapsed] = useState(false);
  const [searchOnCollapsed, setSearchOnCollapsed] = useState(false);
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);
  
  const [formData, setFormData] = useState({
    distributorBranchCode: '16622',
    distributorBranchName: '16622-SRI VENKATESWARA AGEN',
    companyName: 'Marico India Limited',
    supplierName: 'Marico Limited - Vijaywada',
    godownName: 'Main Godown',
    purchaseOrderNo: 'Select',
    companyInvoiceNo: '',
    invoiceDate: '08/09/2025',
    goodsReceiptDate: '08/09/2025',
    manualGoodsReceiptDate: '08/09/2025 00:00:00',
    transporterName: '',
    lrNo: '',
    lrDate: '08/09/2025',
    handlingCharges: '',
    invoiceType: 'GST',
    relatedParty: 'no'
  });

  const [searchOnData, setSearchOnData] = useState({
    productSearch: '',
    companyProductCode: 'Select',
    inputTextProduct: '',
    grnUom: 'Select'
  });

  const [productData, setProductData] = useState({
    productCode: '',
    stockOnHand: '',
    expiryDate: '',
    mrp: '',
    invoiceQty: '',
    receivedQty: '',
    offerQty: '',
    schemeDiscPerc: '',
    schemeDiscAmt: ''
  });

  const [summaryData, setSummaryData] = useState({
    totalGrossAmount: 0.00,
    totalTaxAmount: 0.00,
    totalDiscount: 0.00,
    invoiceDiscount: '',
    netAmount: 0.00,
    invoiceNetPayable: 0.00,
    difference: 0.00,
    totalAdjustedAmount: 0.00
  });

  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchOnChange = (e) => {
    const { name, value } = e.target;
    setSearchOnData(prev => ({
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
    if (productData.productCode && productData.invoiceQty && productData.receivedQty) {
      const newProduct = {
        id: Date.now(),
        distrProdCode: productData.productCode,
        productName: `Product ${productData.productCode}`,
        batch: 'BATCH001',
        csPcs: 'CS',
        expiryDate: productData.expiryDate || 'N/A',
        uom: searchOnData.grnUom,
        invQty: productData.invoiceQty,
        recvQty: productData.receivedQty,
        offerQty: productData.offerQty || '0',
        mrp: productData.mrp || '0.00',
        purRate: '100.00',
        gross: (parseFloat(productData.invoiceQty) * 100).toFixed(2),
        taxAmount: '18.00',
        netAmount: ((parseFloat(productData.invoiceQty) * 100) + 18).toFixed(2)
      };
      
      setProducts(prev => [...prev, newProduct]);
      setProductData({
        productCode: '',
        stockOnHand: '',
        expiryDate: '',
        mrp: '',
        invoiceQty: '',
        receivedQty: '',
        offerQty: '',
        schemeDiscPerc: '',
        schemeDiscAmt: ''
      });
    }
  };

  const handleSave = () => {
    console.log('Saving GRN:', { formData, searchOnData, products, summaryData });
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    setFormData({
      distributorBranchCode: '16622',
      distributorBranchName: '16622-SRI VENKATESWARA AGEN',
      companyName: 'Marico India Limited',
      supplierName: 'Marico Limited - Vijaywada',
      godownName: 'Main Godown',
      purchaseOrderNo: 'Select',
      companyInvoiceNo: '',
      invoiceDate: '08/09/2025',
      goodsReceiptDate: '08/09/2025',
      manualGoodsReceiptDate: '08/09/2025 00:00:00',
      transporterName: '',
      lrNo: '',
      lrDate: '08/09/2025',
      handlingCharges: '',
      invoiceType: 'GST',
      relatedParty: 'no'
    });
    setProducts([]);
  };

  const handleSearch = () => {
    console.log('Searching with:', { searchTerm, fromDate, toDate });
  };

  const handleViewAll = () => {
    setSearchTerm('');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Building size={20} />
          <span className="text-sm sm:text-lg font-semibold">Company</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Goods Receipt Note</span>
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
            <div className="p-3 sm:p-6 border-b border-gray-200 overflow-x-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
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
                    Select From Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar size={16} className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select To Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
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
            <div className="p-3 sm:p-6 overflow-x-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Branch Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        GRN Ref NO
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Comp Inv No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        GRN Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Company Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        Supplier Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                        GRN Net Amount
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
          <div className="p-3 sm:p-6 overflow-x-hidden">
            <div className="w-full max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create Goods Receipt Note</h3>
              
              {/* GRN Component */}
              <div className="mb-6 border border-gray-300 rounded-lg">
                <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <button
                    onClick={() => setGrnCollapsed(!grnCollapsed)}
                    className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 hover:bg-purple-700"
                  >
                    {grnCollapsed ? <Plus size={14} /> : <Minus size={14} />}
                  </button>
                  <h4 className="text-lg font-semibold text-gray-800">GRN</h4>
                </div>
                
                {!grnCollapsed && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
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
                            Godown Name *
                          </label>
                          <div className="relative">
                            <select
                              name="godownName"
                              value={formData.godownName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            >
                              <option value="Main Godown">Main Godown</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Purchase Order No
                          </label>
                          <div className="relative">
                            <select
                              name="purchaseOrderNo"
                              value={formData.purchaseOrderNo}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            >
                              <option value="Select">Select</option>
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
                            Company Invoice No *
                          </label>
                          <input
                            type="text"
                            name="companyInvoiceNo"
                            value={formData.companyInvoiceNo}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="invoiceDate"
                              value={formData.invoiceDate}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Goods Receipt Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="goodsReceiptDate"
                              value={formData.goodsReceiptDate}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Manual Goods Receipt Date *
                          </label>
                          <div className="relative">
                            <input
                              type="datetime-local"
                              name="manualGoodsReceiptDate"
                              value={formData.manualGoodsReceiptDate}
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
                            Transporter Name
                          </label>
                          <input
                            type="text"
                            name="transporterName"
                            value={formData.transporterName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            LR No
                          </label>
                          <input
                            type="text"
                            name="lrNo"
                            value={formData.lrNo}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            LR Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="lrDate"
                              value={formData.lrDate}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Handling Charges
                          </label>
                          <input
                            type="text"
                            name="handlingCharges"
                            value={formData.handlingCharges}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice Type
                          </label>
                          <div className="relative">
                            <select
                              name="invoiceType"
                              value={formData.invoiceType}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            >
                              <option value="GST">GST</option>
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
                            Related Party
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="relatedParty"
                                value="yes"
                                checked={formData.relatedParty === 'yes'}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="relatedParty"
                                value="no"
                                checked={formData.relatedParty === 'no'}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search On Component */}
              <div className="mb-6 border border-gray-300 rounded-lg">
                <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-300">
                  <button
                    onClick={() => setSearchOnCollapsed(!searchOnCollapsed)}
                    className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 hover:bg-purple-700"
                  >
                    {searchOnCollapsed ? <Plus size={14} /> : <Minus size={14} />}
                  </button>
                  <h4 className="text-lg font-semibold text-gray-800">Search On</h4>
                </div>
                
                {!searchOnCollapsed && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Search
                        </label>
                        <div className="relative">
                          <select
                            name="companyProductCode"
                            value={searchOnData.companyProductCode}
                            onChange={handleSearchOnChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Select">Company Product code</option>
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
                          value={searchOnData.inputTextProduct}
                          onChange={handleSearchOnChange}
                          placeholder="Enter atleast 3 characters"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GRN Uom *
                        </label>
                        <div className="relative">
                          <select
                            name="grnUom"
                            value={searchOnData.grnUom}
                            onChange={handleSearchOnChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          >
                            <option value="Select">Select</option>
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
                    </div>

                    {/* Product Details Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-10 gap-3 lg:gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Code
                        </label>
                        <input
                          type="text"
                          value={productData.productCode}
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
                          value={productData.stockOnHand}
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
                          value={productData.expiryDate}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          MRP
                        </label>
                        <input
                          type="text"
                          value={productData.mrp}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Invoice Qty *
                        </label>
                        <input
                          type="text"
                          name="invoiceQty"
                          value={productData.invoiceQty}
                          onChange={handleProductDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Received Qty *
                        </label>
                        <input
                          type="text"
                          name="receivedQty"
                          value={productData.receivedQty}
                          onChange={handleProductDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Offer Qty
                        </label>
                        <input
                          type="text"
                          name="offerQty"
                          value={productData.offerQty}
                          onChange={handleProductDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scheme Disc Perc
                        </label>
                        <input
                          type="text"
                          name="schemeDiscPerc"
                          value={productData.schemeDiscPerc}
                          onChange={handleProductDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scheme Disc Amt
                        </label>
                        <input
                          type="text"
                          name="schemeDiscAmt"
                          value={productData.schemeDiscAmt}
                          onChange={handleProductDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  </div>
                )}
              </div>


              {/* Products Table */}
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[100px]">
                          Distr Prod Code
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[120px]">
                          Product Name
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[80px]">
                          Batch
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          CS/PCS
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[90px]">
                          Expiry Date
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[60px]">
                          Uom
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          Inv Qty
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          Recv.Qty
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          Offer Qty
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          MRP
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          Pur.Rate
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                          Gross
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[80px]">
                          Tax Amount
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[80px]">
                          Net Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.distrProdCode}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.productName}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.batch}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.csPcs}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.expiryDate}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.uom}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.invQty}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.recvQty}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.offerQty}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.mrp}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.purRate}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.gross}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.taxAmount}</td>
                            <td className="px-2 py-3 text-sm text-gray-900 border-b">{product.netAmount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="14" className="px-2 py-8 text-center text-gray-500">
                            No Data found with given criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100">
                        <td colSpan="6" className="px-2 py-3 text-sm font-medium text-gray-900 border-b">
                          Total
                        </td>
                        <td className="px-2 py-3 text-sm font-medium text-gray-900 border-b">
                          {products.reduce((sum, p) => sum + parseFloat(p.invQty || 0), 0)}
                        </td>
                        <td className="px-2 py-3 text-sm font-medium text-gray-900 border-b">
                          {products.reduce((sum, p) => sum + parseFloat(p.recvQty || 0), 0)}
                        </td>
                        <td className="px-2 py-3 text-sm font-medium text-gray-900 border-b">
                          {products.reduce((sum, p) => sum + parseFloat(p.offerQty || 0), 0)}
                        </td>
                        <td colSpan="4" className="px-2 py-3 text-sm font-medium text-gray-900 border-b"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Total {products.reduce((sum, p) => sum + parseFloat(p.invQty || 0), 0)} {products.reduce((sum, p) => sum + parseFloat(p.recvQty || 0), 0)} {products.reduce((sum, p) => sum + parseFloat(p.offerQty || 0), 0)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">(1 of 1)</span>
                    <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">K</button>
                    <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&lt;</button>
                    <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&gt;</button>
                    <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&gt;|</button>
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                      <option>20</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Summary Component */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <button
                      onClick={() => setSummaryCollapsed(!summaryCollapsed)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {summaryCollapsed ? <Plus size={16} /> : <Minus size={16} />}
                    </button>
                    Summary
                  </h4>
                  <div className="w-full h-px bg-purple-600 ml-4"></div>
                </div>
                
                {!summaryCollapsed && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Gross Amount:</span>
                          <span className="text-sm text-gray-900">{summaryData.totalGrossAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Tax Amount:</span>
                          <span className="text-sm text-gray-900">{summaryData.totalTaxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Discount:</span>
                          <span className="text-sm text-gray-900">{summaryData.totalDiscount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Invoice Discount:</span>
                          <input
                            type="text"
                            value={summaryData.invoiceDiscount}
                            onChange={(e) => setSummaryData(prev => ({...prev, invoiceDiscount: e.target.value}))}
                            className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Net Amount:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">{summaryData.netAmount.toFixed(2)}</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Invoice Net Payable:</span>
                          <span className="text-sm text-gray-900">{summaryData.invoiceNetPayable.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Difference:</span>
                          <span className="text-sm text-gray-900">{summaryData.difference.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total Adjusted Amount:</span>
                          <span className="text-sm text-gray-900">{summaryData.totalAdjustedAmount.toFixed(2)}</span>
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
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  Discount
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  Tax Info
                </button>
                <button
                  onClick={handleSave}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  Save & Confirm
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
