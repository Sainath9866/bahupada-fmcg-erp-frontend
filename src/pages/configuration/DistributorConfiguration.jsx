import React, { useState } from 'react';
import { Settings, Save, ChevronDown } from 'lucide-react';

const DistributorConfiguration = () => {
  const [configurations, setConfigurations] = useState([
    {
      id: 1,
      description: 'Allow Sales Return Credit Note to be adjust in Bill',
      status: 'Yes'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.id === id 
          ? { ...config, status: newStatus }
          : config
      )
    );
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving distributor configuration:', configurations);
    alert('Configuration saved successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Settings size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Config' : 'Configuration'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Distributor Config' : 'Distributor Configuration'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Configuration › Distributor Configuration
            </div>

            {/* Configuration Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Distributor Configuration Settings</h3>
              
              {/* Configuration Table */}
              <div className="border border-gray-200 rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {configurations.map((config) => (
                      <tr key={config.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900 border-b">
                          {config.description}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 border-b">
                          <div className="relative">
                            <select
                              value={config.status}
                              onChange={(e) => handleStatusChange(config.id, e.target.value)}
                              className="w-24 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-8"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>

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

export default DistributorConfiguration;
