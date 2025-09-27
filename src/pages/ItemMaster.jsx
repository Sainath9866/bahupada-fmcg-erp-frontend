import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Info } from 'lucide-react';
import api from '../lib/api.js';

export default function ItemMaster() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    hsn: '',
    gst_rate: '',
    base_uom: '',
    alt_uom: '',
    mrp: '',
    cost_price: '',
    brand: '',
    category: '',
    is_active: true
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/items/${editingItem.id}`, formData);
      } else {
        await api.post('/items', formData);
      }
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      sku: '',
      name: '',
      hsn: '',
      gst_rate: '',
      base_uom: '',
      alt_uom: '',
      mrp: '',
      cost_price: '',
      brand: '',
      category: '',
      is_active: true
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const calculateMargin = () => {
    const mrp = parseFloat(formData.mrp) || 0;
    const cost = parseFloat(formData.cost_price) || 0;
    if (mrp > 0 && cost > 0) {
      return ((mrp - cost) / cost * 100).toFixed(2);
    }
    return 0;
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Item Master</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading items...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Item Master</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search items by name, SKU, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Items Table - Desktop View */}
      <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">SKU</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Brand</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">HSN</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">GST %</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">MRP</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Cost Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Margin %</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-4 py-8 text-center text-gray-400">
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="px-4 py-3 text-white font-mono">{item.sku}</td>
                  <td className="px-4 py-3 text-white">{item.name}</td>
                  <td className="px-4 py-3 text-gray-300">{item.brand || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{item.hsn || '-'}</td>
                  <td className="px-4 py-3 text-gray-300">{item.gst_rate ? `${item.gst_rate}%` : '-'}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {item.mrp ? `₹${item.mrp}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {item.cost_price ? `₹${item.cost_price}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {item.mrp && item.cost_price ? 
                      `${((parseFloat(item.mrp) - parseFloat(item.cost_price)) / parseFloat(item.cost_price) * 100).toFixed(2)}%` 
                      : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.is_active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1 text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this item?')) {
                            api.delete(`/items/${item.id}`).then(() => fetchItems());
                          }
                        }}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
            No items found
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-400 text-sm font-mono">{item.sku}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 text-blue-400 hover:text-blue-300"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this item?')) {
                        api.delete(`/items/${item.id}`).then(() => fetchItems());
                      }
                    }}
                    className="p-2 text-red-400 hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-400">Brand:</span>
                  <span className="text-gray-300 ml-2">{item.brand || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">HSN:</span>
                  <span className="text-gray-300 ml-2">{item.hsn || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">GST:</span>
                  <span className="text-gray-300 ml-2">{item.gst_rate ? `${item.gst_rate}%` : '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">MRP:</span>
                  <span className="text-gray-300 ml-2">{item.mrp ? `₹${item.mrp}` : '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-gray-300 ml-2">{item.cost_price ? `₹${item.cost_price}` : '-'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Margin:</span>
                  <span className="text-gray-300 ml-2">
                    {item.mrp && item.cost_price ? 
                      `${((parseFloat(item.mrp) - parseFloat(item.cost_price)) / parseFloat(item.cost_price) * 100).toFixed(2)}%` 
                      : '-'}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.is_active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">SKU *</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">HSN Code</label>
                <input
                  type="text"
                  value={formData.hsn}
                  onChange={(e) => setFormData({...formData, hsn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">GST Rate %</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.gst_rate}
                  onChange={(e) => setFormData({...formData, gst_rate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Base UOM</label>
                <select
                  value={formData.base_uom}
                  onChange={(e) => setFormData({...formData, base_uom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select UOM</option>
                  <option value="Box">Box</option>
                  <option value="Kg">Kg</option>
                  <option value="Liter">Liter</option>
                  <option value="Piece">Piece</option>
                  <option value="Packet">Packet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">MRP</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.mrp}
                  onChange={(e) => setFormData({...formData, mrp: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Cost Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="beverages">Beverages</option>
                  <option value="snacks">Snacks</option>
                  <option value="dairy">Dairy</option>
                  <option value="bakery">Bakery</option>
                  <option value="personal_care">Personal Care</option>
                  <option value="household">Household</option>
                  <option value="frozen">Frozen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Alternate UOM</label>
                <select
                  value={formData.alt_uom}
                  onChange={(e) => setFormData({...formData, alt_uom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Alt UOM</option>
                  <option value="Case">Case</option>
                  <option value="Strip">Strip</option>
                  <option value="Carton">Carton</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Pack">Pack</option>
                </select>
              </div>
              {formData.mrp && formData.cost_price && (
                <div className="bg-gray-700 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Margin Calculation</label>
                  <div className="text-green-400 font-semibold">
                    Margin: {calculateMargin()}%
                  </div>
                  <div className="text-sm text-gray-400">
                    Profit: ₹{(parseFloat(formData.mrp) - parseFloat(formData.cost_price)).toFixed(2)}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-300">
                  Active Item
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
