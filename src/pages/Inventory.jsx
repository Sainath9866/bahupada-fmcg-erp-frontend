import { useState, useEffect } from 'react';
import { Search, Filter, Download, Package, AlertTriangle, TrendingUp, TrendingDown, Warehouse } from 'lucide-react';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    try {
      // Mock data
      const mockInventory = [
        {
          id: 1,
          item_name: 'Rice 1kg',
          sku: 'RICE001',
          brand: 'Basmati',
          category: 'Grains',
          warehouse: 'Main Warehouse',
          current_stock: 150,
          min_stock: 50,
          max_stock: 500,
          unit_cost: 45.00,
          total_value: 6750.00,
          last_updated: '2024-01-15',
          status: 'Normal'
        },
        {
          id: 2,
          item_name: 'Oil 1L',
          sku: 'OIL001',
          brand: 'Sunflower',
          category: 'Cooking Oil',
          warehouse: 'Main Warehouse',
          current_stock: 25,
          min_stock: 30,
          max_stock: 200,
          unit_cost: 120.00,
          total_value: 3000.00,
          last_updated: '2024-01-20',
          status: 'Low Stock'
        },
        {
          id: 3,
          item_name: 'Sugar 1kg',
          sku: 'SUGAR001',
          brand: 'White',
          category: 'Sweeteners',
          warehouse: 'Secondary Warehouse',
          current_stock: 80,
          min_stock: 40,
          max_stock: 300,
          unit_cost: 35.00,
          total_value: 2800.00,
          last_updated: '2024-01-18',
          status: 'Normal'
        },
        {
          id: 4,
          item_name: 'Flour 1kg',
          sku: 'FLOUR001',
          brand: 'Wheat',
          category: 'Grains',
          warehouse: 'Main Warehouse',
          current_stock: 15,
          min_stock: 25,
          max_stock: 150,
          unit_cost: 28.00,
          total_value: 420.00,
          last_updated: '2024-01-22',
          status: 'Low Stock'
        },
        {
          id: 5,
          item_name: 'Salt 500g',
          sku: 'SALT001',
          brand: 'Iodized',
          category: 'Spices',
          warehouse: 'Secondary Warehouse',
          current_stock: 200,
          min_stock: 50,
          max_stock: 400,
          unit_cost: 15.00,
          total_value: 3000.00,
          last_updated: '2024-01-25',
          status: 'Normal'
        }
      ];
      setInventory(mockInventory);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouse === selectedWarehouse;
    const matchesBrand = selectedBrand === 'all' || item.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesWarehouse && matchesBrand && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Low Stock': return 'bg-red-100 text-red-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Overstock': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (current, min, max) => {
    const percentage = (current / max) * 100;
    if (current <= min) return 'Low Stock';
    if (current >= max * 0.9) return 'Overstock';
    return 'Normal';
  };

  const getUniqueValues = (key) => {
    return [...new Set(inventory.map(item => item[key]))];
  };

  const totalValue = inventory.reduce((sum, item) => sum + item.total_value, 0);
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = inventory.filter(item => item.current_stock === 0).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-1">Monitor your stock levels and inventory status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{inventory.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{lowStockItems}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{outOfStockItems}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <TrendingDown size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-gray-50 border border-gray-200 rounded px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Warehouse Filter */}
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Warehouses</option>
              {getUniqueValues('warehouse').map(warehouse => (
                <option key={warehouse} value={warehouse}>{warehouse}</option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Brands</option>
              {getUniqueValues('brand').map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {getUniqueValues('category').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading inventory...</td>
                </tr>
              ) : filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No items found</td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.item_name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                        <div className="text-sm text-gray-500">{item.brand} - {item.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Warehouse size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{item.warehouse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{item.current_stock} units</div>
                        <div className="text-sm text-gray-500">Min: {item.min_stock} | Max: {item.max_stock}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              item.current_stock <= item.min_stock ? 'bg-red-500' :
                              item.current_stock >= item.max_stock * 0.9 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((item.current_stock / item.max_stock) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.unit_cost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.total_value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.last_updated).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Alerts */}
      {lowStockItems > 0 && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-600" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Stock Alerts</h3>
              <p className="text-sm text-red-700 mt-1">
                {lowStockItems} item{lowStockItems > 1 ? 's' : ''} {lowStockItems > 1 ? 'are' : 'is'} running low on stock and may need reordering.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}









