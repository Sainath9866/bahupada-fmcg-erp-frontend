import React, { useState } from 'react';
import { Package, Search, Eye, Edit, Trash2, Info } from 'lucide-react';

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Sample data - replace with API call in future
  const sampleProducts = [
    {
      id: 1,
      productCode: '731856',
      productName: 'PCNO RED 900ML PJ',
      distributorProductCode: '731856',
      shortName: 'PCNO RED 900ML PJ',
      mrp: '540.00',
      stockOnHand: '0',
      status: 'Active'
    },
    {
      id: 2,
      productCode: '731763',
      productName: 'SAFF GOLD 2730G NO RTN',
      distributorProductCode: '731763',
      shortName: 'SAFF GOLD 2730G NO RTN',
      mrp: '10.00',
      stockOnHand: '0',
      status: 'Active'
    },
    {
      id: 3,
      productCode: '731764',
      productName: 'SAFF GOLD 500G NO RTN',
      distributorProductCode: '731764',
      shortName: 'SAFF GOLD 500G NO RTN',
      mrp: '20.00',
      stockOnHand: '0',
      status: 'Active'
    },
    {
      id: 4,
      productCode: '731765',
      productName: 'SAFF GOLD 1KG NO RTN',
      distributorProductCode: '731765',
      shortName: 'SAFF GOLD 1KG NO RTN',
      mrp: '109.00',
      stockOnHand: '0',
      status: 'Active'
    },
    {
      id: 5,
      productCode: '731766',
      productName: 'SAFF GOLD 2KG NO RTN',
      distributorProductCode: '731766',
      shortName: 'SAFF GOLD 2KG NO RTN',
      mrp: '118.00',
      stockOnHand: '0',
      status: 'Active'
    },
    {
      id: 6,
      productCode: '731767',
      productName: 'SAFF GOLD 100G NO RTN',
      distributorProductCode: '731767',
      shortName: 'SAFF GOLD 100G NO RTN',
      mrp: '17.00',
      stockOnHand: '0',
      status: 'Active'
    },
    {
      id: 7,
      productCode: '731768',
      productName: 'SAFF GOLD 250G NO RTN',
      distributorProductCode: '731768',
      shortName: 'SAFF GOLD 250G NO RTN',
      mrp: '18.00',
      stockOnHand: '0',
      status: 'Active'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = sampleProducts.filter(product =>
        product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleViewAll = () => {
    setFilteredProducts(sampleProducts);
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Package size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Product' : 'Product & Price'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Product' : 'Product'}</span>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">
              Home › Product & Price › Product
            </div>

            {/* Quick Search Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter atleast 3 characters"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleViewAll}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Recent Records Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Records</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Product Code
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '200px' }}>
                        Product Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '150px' }}>
                        Distributor Product Code
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '200px' }}>
                        Short Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                        MRP
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '120px' }}>
                        Stock On Hand
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" style={{ minWidth: '100px' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {product.productCode}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {product.productName}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {product.distributorProductCode}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            {product.shortName}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b font-medium">
                            {formatCurrency(product.mrp)}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.stockOnHand === '0' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {product.stockOnHand}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 border-b">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-800 bg-blue-100 rounded-full p-1">
                                <Info size={16} />
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
                        <td colSpan="7" className="px-3 py-8 text-center text-gray-500">
                          No matching record(s) found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

export default Product;




