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
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Settings size={20} />
          <span className="text-sm sm:text-lg font-semibold">Configuration</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">Distributor Configuration</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
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
