import React, { useState } from 'react';
import { Settings, Upload, Download, ChevronDown } from 'lucide-react';

const ETL = () => {
  const [processType, setProcessType] = useState('Stockiest Opening Stock');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDownload = () => {
    alert('Downloading format for: ' + processType);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (!selectedFile) return alert('Please choose a file');
    alert('Uploading: ' + selectedFile.name);
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <Settings size={20} />
          <span className="text-sm sm:text-lg font-semibold">Configuration</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">ETL</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm text-gray-600 mb-6">Home › Configuration › ETL</div>

            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Process</label>
                  <div className="relative">
                    <select value={processType} onChange={(e)=>setProcessType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10">
                      <option>Stockiest Opening Stock</option>
                      <option>Distributor Master</option>
                      <option>Product Master</option>
                      <option>Closing Stock</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="flex gap-2 md:col-span-1">
                  <button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Download size={16}/>Download Format</button>
                </div>
                <div className="md:col-span-1">
                  <input id="etl-file" type="file" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="etl-file" className="w-full inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg cursor-pointer"><Upload size={16}/>Upload File</label>
                  {selectedFile && <div className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</div>}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Process Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">File Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Start Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">End Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="px-3 py-8 text-center text-gray-500">No matching record(s) found</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 text-right text-sm text-gray-500">
              <p>Botree Software International Pvt Ltd</p>
              <p>© All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETL;



