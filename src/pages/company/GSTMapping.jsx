import React, { useState } from 'react';
import { Building, Download, Upload, FileText } from 'lucide-react';

const GSTMapping = () => {
  const [masterFile, setMasterFile] = useState('GST Customer');
  const [distributorCode, setDistributorCode] = useState('16622');

  const handleMasterFileChange = (e) => {
    setMasterFile(e.target.value);
  };

  const handleDistributorCodeChange = (e) => {
    setDistributorCode(e.target.value);
  };

  const handleDownloadFormat = () => {
    console.log('Downloading format...');
    // Handle download format logic here
  };

  const handleBrowse = () => {
    console.log('Opening file browser...');
    // Handle file browse logic here
  };

  const handleImport = () => {
    console.log('Importing data...');
    // Handle import logic here
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Building size={20} />
          <span className="text-sm sm:text-lg font-semibold">Company</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">GST Mapping</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">GST Mapping</h3>
            
            {/* Input Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Master File */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Master File *
                  </label>
                  <div className="relative">
                    <select
                      value={masterFile}
                      onChange={handleMasterFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="GST Customer">GST Customer</option>
                      <option value="GST Supplier">GST Supplier</option>
                      <option value="GST Product">GST Product</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Distributor Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distributor Code *
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={distributorCode}
                      onChange={handleDistributorCodeChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter distributor code"
                    />
                    <button className="px-3 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors">
                      <FileText size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownloadFormat}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Download Format
                </button>
                
                <button
                  onClick={handleBrowse}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Upload size={16} />
                  + Browse
                </button>
                
                <button
                  onClick={handleImport}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FileText size={16} />
                  Import
                </button>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default GSTMapping;
