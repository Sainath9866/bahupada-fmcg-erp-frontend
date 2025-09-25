import React, { useState } from 'react';
import { Ruler, Plus, Save, X, Info, Edit, Trash2 } from 'lucide-react';

const UOMMaster = () => {
  const [formData, setFormData] = useState({
    reportUomCode: '',
    uomName: ''
  });
  const [uomList, setUomList] = useState([
    {
      id: 1,
      reportUomCode: 'CS',
      uomName: 'Case'
    },
    {
      id: 2,
      reportUomCode: 'NOS',
      uomName: 'Number'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    if (formData.reportUomCode && formData.uomName) {
      const newUom = {
        id: Date.now(),
        reportUomCode: formData.reportUomCode,
        uomName: formData.uomName
      };
      setUomList(prev => [...prev, newUom]);
      setFormData({
        reportUomCode: '',
        uomName: ''
      });
    }
  };

  const handleSave = () => {
    console.log('Saving UOM list:', uomList);
    // Handle save logic here
  };

  const handleCancel = () => {
    setFormData({
      reportUomCode: '',
      uomName: ''
    });
  };

  const handleEdit = (id) => {
    const uom = uomList.find(item => item.id === id);
    if (uom) {
      setFormData({
        reportUomCode: uom.reportUomCode,
        uomName: uom.uomName
      });
    }
  };

  const handleDelete = (id) => {
    setUomList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Ruler size={20} />
          <span className="text-sm sm:text-lg font-semibold">Product & Price</span>
          <span className="text-purple-200">›</span>
          <span className="text-sm sm:text-lg font-semibold">UOM Master</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg">
        <div className="p-3 sm:p-6 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Product & Price › UOM Master
            </div>

            {/* Input Fields for New Entry */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New UOM</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Report Uom Code *
                    </label>
                    <input
                      type="text"
                      name="reportUomCode"
                      value={formData.reportUomCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter UOM code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UOM Name *
                    </label>
                    <input
                      type="text"
                      name="uomName"
                      value={formData.uomName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter UOM name"
                    />
                  </div>

                  <div>
                    <button
                      onClick={handleAdd}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* UOM List Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">UOM List</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full border-collapse" style={{ minWidth: '600px' }}>
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '200px' }}>
                        Report Uom Code
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '200px' }}>
                        UOM Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {uomList.length > 0 ? (
                      uomList.map((uom) => (
                        <tr key={uom.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {uom.reportUomCode}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {uom.uomName}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEdit(uom.id)}
                                className="text-blue-600 hover:text-blue-800 bg-blue-100 rounded-full p-1"
                              >
                                <Info size={16} />
                              </button>
                              <button 
                                onClick={() => handleEdit(uom.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(uom.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-3 py-8 text-center text-gray-500">
                          No UOM records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
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

export default UOMMaster;


