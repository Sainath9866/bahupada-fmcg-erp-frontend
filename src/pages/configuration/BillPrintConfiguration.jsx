import React, { useState } from 'react';
import { Settings, Save, X, ChevronDown } from 'lucide-react';

const BillPrintConfiguration = () => {
  const [docType, setDocType] = useState('Invoice');
  const [formData, setFormData] = useState({
    template: 'EinvoiceMarico',
    defaultDesign: 'FP_PDF',
    declaration: 'Whether the tax is payable on reverse charge basis: No'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving bill print config:', { docType, formData });
    alert('Bill print configuration saved');
  };

  const handleCancel = () => {
    setDocType('Invoice');
    setFormData({ template: 'EinvoiceMarico', defaultDesign: 'FP_PDF', declaration: 'Whether the tax is payable on reverse charge basis: No' });
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Settings size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Config' : 'Configuration'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Bill Print Config' : 'Bill Print Configuration'}</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-gray-600 mb-6">Home › Configuration › Bill Print Configuration</div>

            <div className="mb-6 flex flex-wrap gap-4 text-sm">
              {['Invoice','SalesReturn','Cr/Db Supplier','Cr/Db Customer','Sample Issue','Sample Return','Inter Distributor Transfer'].map(type => (
                <label key={type} className="inline-flex items-center gap-2">
                  <input type="radio" name="doctype" value={type} checked={docType === type} onChange={(e)=>setDocType(e.target.value)} className="text-purple-600 focus:ring-purple-500" />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select value={formData.template} onChange={(e)=>handleInputChange('template', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10">
                    <option value="EinvoiceMarico">EinvoiceMarico</option>
                    <option value="Standard">Standard</option>
                    <option value="Compact">Compact</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Design <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select value={formData.defaultDesign} onChange={(e)=>handleInputChange('defaultDesign', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10">
                    <option value="FP_PDF">FP_PDF</option>
                    <option value="A4_PDF">A4_PDF</option>
                    <option value="Thermal">Thermal</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Declaration</label>
              <textarea value={formData.declaration} onChange={(e)=>handleInputChange('declaration', e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={handleSave} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"><Save size={16}/>Save</button>
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

export default BillPrintConfiguration;





