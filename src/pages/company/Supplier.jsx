import { useState } from 'react';
import { 
  Search, Building, Eye, Edit, Trash2
} from 'lucide-react';

export default function Supplier() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers] = useState([
    {
      id: 1,
      code: 'SUP001',
      supplierName: 'Marico Limited - Vijaywada',
      companyName: 'Marico India Limited',
      geoMapping: 'Vijaywada, AP'
    },
    {
      id: 2,
      code: 'SUP002',
      supplierName: 'Procter & Gamble India',
      companyName: 'P&G India',
      geoMapping: 'Mumbai, MH'
    },
    {
      id: 3,
      code: 'SUP003',
      supplierName: 'Hindustan Unilever Limited',
      companyName: 'HUL',
      geoMapping: 'Delhi, DL'
    }
  ]);

  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 3) {
      const filtered = suppliers.filter(supplier => 
        supplier.supplierName.toLowerCase().includes(value.toLowerCase()) ||
        supplier.code.toLowerCase().includes(value.toLowerCase()) ||
        supplier.companyName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliers);
    }
  };

  const handleViewAll = () => {
    setSearchTerm('');
    setFilteredSuppliers(suppliers);
  };


  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Building size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Co' : 'Company'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Supplier' : 'Supplier'}</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        {/* Quick Search Section */}
        <div className="border-b border-gray-200" style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Quick Search</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:items-end" style={{ margin: 0, width: '100%', boxSizing: 'border-box' }}>
            <div style={{ flex: window.innerWidth < 640 ? '0 0 70%' : '1' }}>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Search Suppliers
              </label>
              <input
                type="text"
                placeholder={window.innerWidth < 640 ? "Search..." : "Enter atleast 3 characters"}
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleViewAll}
              className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 sm:px-6 sm:py-2 text-sm rounded-lg transition-colors whitespace-nowrap"
              style={{ flex: window.innerWidth < 640 ? '0 0 30%' : 'none' }}
            >
              {window.innerWidth < 640 ? "All" : "View All"}
            </button>
          </div>
        </div>

        {/* Search Results Section */}
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Search Results</h3>

          <div className="shadow-sm border border-gray-200 rounded-lg" style={{ width: '100%', overflowX: 'auto', maxWidth: '100vw' }}>
            <table className="border-collapse text-xs sm:text-sm" style={{ minWidth: '700px', width: '100%' }}>
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Supplier Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Company Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Geo Mapping
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {supplier.code}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {supplier.supplierName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {supplier.companyName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        {supplier.geoMapping}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No matching record(s) found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <div>Botree Software International Pvt Ltd</div>
        <div>© All Rights Reserved</div>
      </div>
    </div>
  );
}
