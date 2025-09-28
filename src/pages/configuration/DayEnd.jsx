import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

const DayEnd = () => {
  const [formData, setFormData] = useState({
    distributorBranch: '16622',
    closureDate: '',
    lastDayEndDate: ''
  });

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleProcess = () => {
    console.log('Processing Day End:', formData);
    alert('Day End processed');
  };

  const handleCancel = () => setFormData({ distributorBranch: '16622', closureDate: '', lastDayEndDate: '' });

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Settings size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Config' : 'Configuration'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Day End' : 'Day End'}</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-sm text-gray-600 mb-6">Home › Configuration › Day End</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distributor Branch <span className="text-red-500">*</span></label>
                <input type="text" value={formData.distributorBranch} onChange={(e)=>handleInputChange('distributorBranch', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closure Date <span className="text-red-500">*</span></label>
                <input type="date" value={formData.closureDate} onChange={(e)=>handleInputChange('closureDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Day End Date <span className="text-red-500">*</span></label>
                <input type="date" value={formData.lastDayEndDate} onChange={(e)=>handleInputChange('lastDayEndDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
            </div>

            <div className="mb-6 border rounded-lg">
              <div className="px-4 py-2 border-b text-purple-700 font-semibold">Summary For The Day</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 text-sm">
                <div>
                  <div className="text-gray-600">Purchase</div>
                  <div className="h-8 border-b" />
                </div>
                <div>
                  <div className="text-gray-600">Billing</div>
                  <div className="h-8 border-b" />
                </div>
                <div>
                  <div className="text-gray-600">Collections</div>
                  <div className="h-8 border-b" />
                </div>
                <div>
                  <div className="text-gray-600">Purchase Return</div>
                  <div className="h-8 border-b" />
                </div>
                <div>
                  <div className="text-gray-600">Sales Return</div>
                  <div className="h-8 border-b" />
                </div>
                <div>
                  <div className="text-gray-600">Pending Collections</div>
                  <div className="h-8 border-b" />
                </div>
                <div className="md:col-span-3">
                  <div className="text-gray-600">Total Closing Stocks</div>
                  <div className="h-8 border-b" />
                </div>
                <div className="md:col-span-3">
                  <div className="text-gray-600">Pending Payments</div>
                  <div className="h-8 border-b" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={handleProcess} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">process</button>
              <button onClick={handleCancel} className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"><X size={16}/>Cancel</button>
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

export default DayEnd;


