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
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 sm:px-6 py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Building size={20} />
          <span className="text-lg font-semibold">Company</span>
          <span className="text-purple-200">›</span>
          <span className="text-lg font-semibold">Supplier</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg">
        {/* Quick Search Section */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Suppliers
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter atleast 3 characters"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleViewAll}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View All
            </button>
          </div>
        </div>

        {/* Search Results Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
          </div>

          {/* Simple Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
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
