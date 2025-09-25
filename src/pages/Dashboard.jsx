import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Wrench, Building, Settings, Tag, Boxes, Truck, Bookmark, CircleDollarSign } from 'lucide-react';

const modules = [
  {
    key: 'customer',
    title: 'Customer',
    color: 'bg-green-600 hover:bg-green-700',
    icon: Users,
    links: [
      { label: 'Billing', to: '/customer/billing' },
      { label: 'Retailer', to: '/customer/retailer' },
      { label: 'Order to Billing', to: '/customer/o2b' },
      { label: 'Order Booking', to: '/customer/order-booking' },
      { label: 'Collections', to: '/customer/collections' },
    ]
  },
  
  {
    key: 'company',
    title: 'Company',
    color: 'bg-sky-700 hover:bg-sky-800',
    icon: Building,
    links: [
      { label: 'Goods Receipt Note', to: '/company/goods-receipt-note' },
      { label: 'Purchase Order', to: '/company/purchase-order' },
      { label: 'Purchase Return', to: '/company/purchase-return' },
      { label: 'Credit/Debit Note', to: '/company/credit-debit-note' },
      { label: 'GST Mapping', to: '/company/gst-mapping' }
    ]
  },
  {
    key: 'configuration',
    title: 'Configuration',
    color: 'bg-pink-700 hover:bg-pink-800',
    icon: Settings,
    links: [
      { label: 'PDA Export', to: '/configuration/pda-export' },
      { label: 'User Profile', to: '/configuration/user-profile' },
      { label: 'User Group', to: '/configuration/user-group' },
      { label: 'JC Calendar', to: '/configuration/jc-calendar' },
      { label: 'Holiday Calendar', to: '/configuration/holiday-calendar' },
      ]
  },
  {
    key: 'schemes',
    title: 'Schemes & Claims',
    color: 'bg-teal-600 hover:bg-teal-700',
    icon: Tag,
    links: [
      { label: 'Scheme', to: '/schemes/scheme' },
      { label: 'Claim Type', to: '/schemes/claim-type' },
      { label: 'GST Claim', to: '/schemes/gst-claim' },
     
     
      { label: 'Invoice Tot Claim', to: '/schemes/invoice-tot-claim' },
      
      { label: 'TBTL Claim', to: '/schemes/tbtl-claim' },
      
    ]
  },
  {
    key: 'inventory',
    title: 'Inventory',
    color: 'bg-cyan-700 hover:bg-cyan-800',
    icon: Boxes,
    links: [
      { label: 'Godown', to: '/inventory/godown' },
      { label: 'Stock Adjustment', to: '/inventory/stock-adjustment' },
      { label: 'Batch Transfer', to: '/inventory/batch-transfer' },
      { label: 'Product', to: '/product/product' },
      { label: 'Price Discount', to: '/product/price-discount' }
    ]
  },
  {
    key: 'product',
    title: 'Product & Price',
    color: 'bg-orange-600 hover:bg-orange-700',
    icon: Bookmark,
    links: [
      { label: 'Product', to: '/product/product' },
      { label: 'Price Discount', to: '/product/price-discount' },
      { label: 'UOM Master', to: '/product/uom-master' },
      { label: 'GST Tax Structure', to: '/product/gst-tax-structure' }
    ]
  },
  {
    key: 'distribution',
    title: 'Distribution',
    color: 'bg-purple-700 hover:bg-purple-800',
    icon: Truck,
    links: [
      { label: 'E-Invoice Report', to: '/distribution/e-invoice-report' },
      { label: 'Distributor Branch', to: '/distribution/distributor-branch' },
      { label: 'Vehicle', to: '/distribution/vehicle' },
      { label: 'Vehicle Allocation', to: '/distribution/vehicle-allocation' },
      { label: 'Merchandiser Route Mapping', to: '/distribution/merchandiser-route-mapping' }
    ]
  },
  {
    key: 'finance',
    title: 'Finance',
    color: 'bg-green-500 hover:bg-green-600',
    icon: CircleDollarSign,
    links: [
      { label: 'Accounts Calendar', to: '/finance/accounts-calendar' }
    ]
  },{
    key: 'utilities',
    title: 'Utilities',
    color: 'bg-indigo-700 hover:bg-indigo-800',
    icon: Wrench,
    links: [
      { label: 'Download Print Server', to: '/utilities/download-print-server' }
    ]
  },
];

function Tile({ title, icon: Icon, color, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`relative rounded-xl shadow-md text-white ${color} transition-transform duration-200 hover:-translate-y-0.5`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Tile body */}
      <div className="p-3 h-36 flex items-center justify-center select-none">
        {!open ? (
          <div className="flex items-center justify-center flex-col">
            <Icon size={40} className="opacity-90 mb-3" />
            <div className="text-lg font-semibold tracking-wide">{title}</div>
          </div>
        ) : (
          <div className="w-full">
            <ul className="space-y-1.5">
              {links.map((l, idx) => (
                <li key={idx}>
                  <Link
                    to={l.to}
                    className="block w-full text-left px-0 py-0.5 text-sm text-white/90 hover:text-white transition duration-150 filter hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.65)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((m) => (
          <Tile key={m.key} title={m.title} icon={m.icon} color={m.color} links={m.links} />
        ))}
      </div>
      <div className="mt-10 text-center text-xs text-gray-500">Botree Software International Pvt Ltd · © All Rights Reserved</div>
    </div>
  );
}






