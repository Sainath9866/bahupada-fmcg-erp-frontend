import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Download, ShoppingCart, Factory, DollarSign, Calendar } from 'lucide-react';

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [formData, setFormData] = useState({
    bill_number: '',
    vendor_id: '',
    vendor_name: '',
    bill_date: '',
    due_date: '',
    items: [{ item_id: '', item_name: '', quantity: '', rate: '', amount: '' }],
    subtotal: '',
    tax_amount: '',
    discount_amount: '',
    total_amount: '',
    payment_terms: '',
    status: 'Pending'
  });

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    setLoading(true);
    try {
      // Mock data
      const mockPurchases = [
        {
          id: 1,
          bill_number: 'BILL-2024-001',
          vendor_id: 1,
          vendor_name: 'ABC Suppliers Ltd',
          bill_date: '2024-01-15',
          due_date: '2024-02-15',
          subtotal: 25000,
          tax_amount: 4500,
          discount_amount: 1000,
          total_amount: 28500,
          payment_terms: '30 Days',
          status: 'Paid',
          created_at: '2024-01-15'
        },
        {
          id: 2,
          bill_number: 'BILL-2024-002',
          vendor_id: 2,
          vendor_name: 'XYZ Trading Co',
          bill_date: '2024-01-20',
          due_date: '2024-02-20',
          subtotal: 18000,
          tax_amount: 3240,
          discount_amount: 0,
          total_amount: 21240,
          payment_terms: '15 Days',
          status: 'Pending',
          created_at: '2024-01-20'
        },
        {
          id: 3,
          bill_number: 'BILL-2024-003',
          vendor_id: 3,
          vendor_name: 'PQR Industries',
          bill_date: '2024-01-25',
          due_date: '2024-02-25',
          subtotal: 32000,
          tax_amount: 5760,
          discount_amount: 1500,
          total_amount: 36260,
          payment_terms: '30 Days',
          status: 'Overdue',
          created_at: '2024-01-25'
        }
      ];
      setPurchases(mockPurchases);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingPurchase) {
        // Update purchase
        setPurchases(purchases.map(p => p.id === editingPurchase.id ? { ...p, ...formData } : p));
      } else {
        // Create new purchase
        const newPurchase = {
          id: Date.now(),
          ...formData,
          created_at: new Date().toISOString().split('T')[0]
        };
        setPurchases([...purchases, newPurchase]);
      }
      setShowModal(false);
      setEditingPurchase(null);
      setFormData({
        bill_number: '',
        vendor_id: '',
        vendor_name: '',
        bill_date: '',
        due_date: '',
        items: [{ item_id: '', item_name: '', quantity: '', rate: '', amount: '' }],
        subtotal: '',
        tax_amount: '',
        discount_amount: '',
        total_amount: '',
        payment_terms: '',
        status: 'Pending'
      });
    } catch (error) {
      console.error('Error saving purchase:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setFormData(purchase);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      setPurchases(purchases.filter(p => p.id !== id));
    }
  };

  const filteredPurchases = purchases.filter(purchase =>
    purchase.bill_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.vendor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item_id: '', item_name: '', quantity: '', rate: '', amount: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Calculate amount if quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      newItems[index].amount = (quantity * rate).toFixed(2);
    }
    
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Purchases</h1>
        <p className="text-gray-600 mt-1">Manage your purchase bills and vendor transactions</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-gray-50 border border-gray-200 rounded px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium"
            >
              <Plus size={16} />
              New Purchase
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading purchases...</td>
                </tr>
              ) : filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No purchases found</td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{purchase.bill_number}</div>
                        <div className="text-sm text-gray-500">{purchase.payment_terms}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Factory size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{purchase.vendor_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-900">{new Date(purchase.bill_date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-500">Due: {new Date(purchase.due_date).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">₹{purchase.total_amount.toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-gray-500">Sub: ₹{purchase.subtotal.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(purchase)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(purchase.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPurchase ? 'Edit Purchase' : 'Create New Purchase'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Purchase Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.bill_number}
                    onChange={(e) => setFormData({...formData, bill_number: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.vendor_name}
                    onChange={(e) => setFormData({...formData, vendor_name: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.bill_date}
                    onChange={(e) => setFormData({...formData, bill_date: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <select
                    value={formData.payment_terms}
                    onChange={(e) => setFormData({...formData, payment_terms: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Terms</option>
                    <option value="Cash">Cash</option>
                    <option value="7 Days">7 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="45 Days">45 Days</option>
                    <option value="60 Days">60 Days</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Purchase Items</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                  >
                    <Plus size={14} />
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                        <input
                          type="text"
                          value={item.item_name}
                          onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', e.target.value)}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.amount}
                          readOnly
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="w-full px-3 py-2 text-red-600 border border-red-200 rounded hover:bg-red-50 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtotal</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.subtotal}
                    onChange={(e) => setFormData({...formData, subtotal: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tax_amount}
                    onChange={(e) => setFormData({...formData, tax_amount: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discount_amount}
                    onChange={(e) => setFormData({...formData, discount_amount: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({...formData, total_amount: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPurchase(null);
                    setFormData({
                      bill_number: '',
                      vendor_id: '',
                      vendor_name: '',
                      bill_date: '',
                      due_date: '',
                      items: [{ item_id: '', item_name: '', quantity: '', rate: '', amount: '' }],
                      subtotal: '',
                      tax_amount: '',
                      discount_amount: '',
                      total_amount: '',
                      payment_terms: '',
                      status: 'Pending'
                    });
                  }}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingPurchase ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

