import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

const EInvoiceAuthentication = () => {
  const [formData, setFormData] = useState({
    authenticationToken: '',
    ownerId: '',
    gstinNumber: '',
    userName: '16622',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving E-Invoice auth:', formData);
    alert('E-Invoice authentication saved');
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Settings size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Config' : 'Configuration'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'E Invoice Auth' : 'E Invoice Authentication'}</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-gray-600 mb-6">Home › Configuration › E Invoice Authentication</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Token</label>
                <input type="text" value={formData.authenticationToken} onChange={(e)=>handleInputChange('authenticationToken', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Id</label>
                <input type="text" value={formData.ownerId} onChange={(e)=>handleInputChange('ownerId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN Number <span className="text-red-500">*</span></label>
                <input type="text" value={formData.gstinNumber} onChange={(e)=>handleInputChange('gstinNumber', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Name <span className="text-red-500">*</span></label>
                <input type="text" value={formData.userName} onChange={(e)=>handleInputChange('userName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                <input type="password" value={formData.password} onChange={(e)=>handleInputChange('password', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={handleSave} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"><Save size={16}/>Save</button>
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

export default EInvoiceAuthentication;





