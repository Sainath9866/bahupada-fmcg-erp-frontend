import React, { useState } from 'react';
import { Building, Download, Upload, FileText, Calendar, Search, RotateCcw, CheckSquare } from 'lucide-react';

const EInvoiceReport = () => {
  const [activeTab, setActiveTab] = useState('e-invoice');
  const [fromDate, setFromDate] = useState('08/09/2025');
  const [toDate, setToDate] = useState('08/09/2025');
  const [retailer, setRetailer] = useState('');
  const [billNo, setBillNo] = useState('');
  const [customerType, setCustomerType] = useState('registered');
  const [transactionType, setTransactionType] = useState('sales');
  const [invoiceStatus, setInvoiceStatus] = useState('Pending');

  const handleLoadDetails = () => {
    console.log('Loading details...');
    // Handle load details logic here
  };

  const handleReset = () => {
    setFromDate('08/09/2025');
    setToDate('08/09/2025');
    setRetailer('');
    setBillNo('');
    setCustomerType('registered');
    setTransactionType('sales');
    setInvoiceStatus('Pending');
  };

  const handleDownloadFormat = () => {
    console.log('Downloading format...');
    // Handle download format logic here
  };

  const handleSelectFile = () => {
    console.log('Selecting file...');
    // Handle file selection logic here
  };

  const handleUploadFile = () => {
    console.log('Uploading file...');
    // Handle file upload logic here
  };

  const handleGenerate = () => {
    console.log('Generating...');
    // Handle generate logic here
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Building size={20} />
          <span className="text-sm sm:text-lg font-semibold">Distribution</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">E Invoice Report</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-full mx-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('e-invoice')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'e-invoice'
                      ? 'border-yellow-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  E-Invoice
                </button>
                <button
                  onClick={() => setActiveTab('e-invoice-upload')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'e-invoice-upload'
                      ? 'border-yellow-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  E-Invoice Upload
                </button>
              </nav>
            </div>

            {activeTab === 'e-invoice' ? (
              <>
                {/* Summary Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="bg-gray-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">All document</div>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">IRN Generated</div>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">IRN Failed</div>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">IRN Not Generated</div>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">IRN Cancelled</div>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Date *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="dd/mm/yyyy"
                        />
                        <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Date *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="dd/mm/yyyy"
                        />
                        <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Retailer
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={retailer}
                          onChange={(e) => setRetailer(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter retailer"
                        />
                        <button className="px-3 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors">
                          <Search size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bill No
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={billNo}
                          onChange={(e) => setBillNo(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter bill number"
                        />
                        <button className="px-3 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors">
                          <Search size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Type
                      </label>
                      <select
                        value={customerType}
                        onChange={(e) => setCustomerType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="registered">Registered</option>
                        <option value="unregistered">Unregistered</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Invoice Status
                      </label>
                      <select
                        value={invoiceStatus}
                        onChange={(e) => setInvoiceStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Generated">Generated</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>

                  {/* Transaction Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Type
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="transactionType"
                          value="sales"
                          checked={transactionType === 'sales'}
                          onChange={(e) => setTransactionType(e.target.value)}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Sales
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="transactionType"
                          value="sales-return"
                          checked={transactionType === 'sales-return'}
                          onChange={(e) => setTransactionType(e.target.value)}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        Sales Return
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleLoadDetails}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Search size={16} />
                      Load Details
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <RotateCcw size={16} />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Invoice No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Invoice Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          IRN Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Invoice Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Customer Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Customer GSTIN
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Taxable Amt.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Tax Amt.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Net Amt.
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

                {/* Generate Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <CheckSquare size={16} />
                    Generate
                  </button>
                </div>
              </>
            ) : (
              /* E-Invoice Upload Tab */
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">E-invoice Export and Import</h3>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleDownloadFormat}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download size={16} />
                    Download Format
                  </button>
                  
                  <button
                    onClick={handleSelectFile}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Upload size={16} />
                    + Select File
                  </button>
                  
                  <button
                    onClick={handleUploadFile}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FileText size={16} />
                    Upload File
                  </button>
                </div>

                {/* Content Area */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">No data available</p>
                    <p className="text-sm">Upload a file to get started</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EInvoiceReport;
