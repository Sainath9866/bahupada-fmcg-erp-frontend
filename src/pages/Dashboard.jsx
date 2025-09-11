import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Package, 
  Plus, Eye, DollarSign, ShoppingCart, Users, 
  BarChart3, PieChart, Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for charts
const salesData = [
  { day: 'Mon', sales: 24000 },
  { day: 'Tue', sales: 13980 },
  { day: 'Wed', sales: 9800 },
  { day: 'Thu', sales: 39080 },
  { day: 'Fri', sales: 48000 },
  { day: 'Sat', sales: 38000 },
  { day: 'Sun', sales: 43000 }
];

const topCustomersData = [
  { name: 'ABC Traders', amount: 125000 },
  { name: 'XYZ Stores', amount: 98000 },
  { name: 'PQR Mart', amount: 87000 },
  { name: 'DEF Supermarket', amount: 76000 },
  { name: 'GHI Retail', amount: 65000 }
];

const topProductsData = [
  { name: 'Rice 1kg', qty: 1250 },
  { name: 'Oil 1L', qty: 980 },
  { name: 'Sugar 1kg', qty: 870 },
  { name: 'Flour 1kg', qty: 760 },
  { name: 'Salt 500g', qty: 650 }
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    salesToday: 0,
    purchasesToday: 0,
    receivables: 0,
    payables: 0,
    lowStockItems: 0,
    nearExpiryItems: 0
  });

  useEffect(() => {
    // Mock data loading
    setStats({
      salesToday: 125000,
      purchasesToday: 85000,
      receivables: 450000,
      payables: 120000,
      lowStockItems: 12,
      nearExpiryItems: 8
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1">{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const QuickActionButton = ({ title, icon: Icon, to, color = "bg-purple-600 hover:bg-purple-700" }) => (
    <Link 
      to={to}
      className={`${color} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors`}
    >
      <Icon size={16} />
      {title}
    </Link>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales Today"
          value={`₹${stats.salesToday.toLocaleString()}`}
          icon={DollarSign}
          color="bg-green-500"
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Total Purchases Today"
          value={`₹${stats.purchasesToday.toLocaleString()}`}
          icon={ShoppingCart}
          color="bg-blue-500"
          trend="down"
          trendValue="-3.2%"
        />
        <StatCard
          title="Outstanding Receivables"
          value={`₹${stats.receivables.toLocaleString()}`}
          icon={Users}
          color="bg-orange-500"
        />
        <StatCard
          title="Outstanding Payables"
          value={`₹${stats.payables.toLocaleString()}`}
          icon={TrendingDown}
          color="bg-red-500"
        />
      </div>

      {/* Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Stock Alerts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-red-600" />
                <span className="text-sm font-medium text-gray-900">Low Stock Items</span>
              </div>
              <span className="text-sm font-bold text-red-600">{stats.lowStockItems}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-orange-600" />
                <span className="text-sm font-medium text-gray-900">Near Expiry Items</span>
              </div>
              <span className="text-sm font-bold text-orange-600">{stats.nearExpiryItems}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <QuickActionButton title="+ New Invoice" icon={Plus} to="/transactions/invoices" />
            <QuickActionButton title="+ New Purchase" icon={Plus} to="/transactions/purchases" />
            <QuickActionButton 
              title="View Stock" 
              icon={Eye} 
              to="/inventory" 
              color="bg-gray-600 hover:bg-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trend Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Sales Trend (Last 7 Days)</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Customers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Top 5 Customers</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCustomersData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="name" type="category" stroke="#666" width={80} />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top 5 Products */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package size={20} className="text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Top 5 Products</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                formatter={(value) => [value, 'Quantity']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="qty" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

