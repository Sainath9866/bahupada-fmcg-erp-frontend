import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon, Building, Tag, Users, Package, Bookmark,
  CircleDollarSign, Settings, BarChart3, Wrench, ChevronRight, ChevronDown, X,
  FileText, User, RotateCcw, Percent, Truck, MapPin, Route, UserCheck, Upload,
  Shield, ShoppingCart, BarChart, CreditCard, Calendar, Plus, ArrowRight, Ruler, Receipt, Download
} from 'lucide-react';

function Node({ icon: Icon, label, children, to }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = to && location.pathname.startsWith(to);
  const base = 'flex items-center gap-2 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 text-gray-700 text-sm';
  if (children) {
    return (
      <div className="text-sm">
        <button className={`${base} w-full text-left`} onClick={() => setOpen(!open)}>
          {open ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}<Icon size={14}/><span className="truncate">{label}</span>
        </button>
        {open && <div className="ml-4 sm:ml-5 border-l border-gray-200 pl-2 sm:pl-3 flex flex-col gap-1">{children}</div>}
      </div>
    );
  }
  return (
    <Link className={`${base} ${isActive ? 'bg-purple-100 text-purple-700' : ''}`} to={to || '#'}>
      <Icon size={14}/><span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar({ open = false, onToggle }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onToggle}></div>}
      <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} w-64 sm:w-72 bg-white text-gray-800 h-screen fixed top-0 left-0 z-40 overflow-y-auto transition-transform duration-300 ease-in-out border-r border-gray-200`}> 
        <div className="p-3 sm:p-4 text-lg font-semibold border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">B</div>
              <span className="hidden sm:block">Bahupada</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 lg:hidden"
              aria-label="Close Sidebar"
            >
              <X size={20} />
            </button>
          </div>
          <span className="text-xs text-gray-500">FMCG ERP</span>
        </div>
        
        <nav className="flex flex-col gap-1 p-1 sm:p-2">
          <Node icon={HomeIcon} label="Home" to="/" />
          <Node icon={Building} label="Company">
            <Node icon={FileText} label="Credit Note - Debit Note" to="/company/credit-debit-note" />
            <Node icon={User} label="Supplier" to="/company/supplier" />
            <Node icon={FileText} label="Goods Receipt Note" to="/company/goods-receipt-note" />
            <Node icon={FileText} label="Purchase Order" to="/company/purchase-order" />
            <Node icon={RotateCcw} label="Purchase Return" to="/company/purchase-return" />
            <Node icon={Percent} label="GST Mapping" to="/company/gst-mapping" />
          </Node>
          <Node icon={Tag} label="Distribution">
            <Node icon={FileText} label="E Invoice Report" to="/distribution/e-invoice-report" />
            <Node icon={Building} label="Distributor Branch" to="/distribution/distributor-branch" />
            <Node icon={Truck} label="Vehicle" to="/distribution/vehicle" />
            <Node icon={MapPin} label="Vehicle Allocation" to="/distribution/vehicle-allocation" />
            <Node icon={UserCheck} label="Delivery Boy" to="/distribution/delivery-boy" />
            <Node icon={Route} label="Delivery Boy Route Map" to="/distribution/delivery-boy-route" />
            <Node icon={Truck} label="Customer Shipping Address" to="/distribution/customer-shipping" />
            <Node icon={Route} label="Route" to="/distribution/route" />
            <Node icon={MapPin} label="Route Coverage Plan" to="/distribution/route-coverage" />
            <Node icon={UserCheck} label="Salesman" to="/distribution/salesman" />
            <Node icon={MapPin} label="Salesman Route Map" to="/distribution/salesman-route" />
            <Node icon={Shield} label="Salesman KYC" to="/distribution/salesman-kyc" />
            <Node icon={ShoppingCart} label="Merchandiser" to="/distribution/merchandiser" />
            <Node icon={MapPin} label="Merchandiser Route Mapping" to="/distribution/merchandiser-route" />
            <Node icon={BarChart} label="Stockiest TMR" to="/distribution/stockiest-tmr" />
          </Node>
          <Node icon={Users} label="Customer">
            <Node icon={CreditCard} label="Credit Note - Debit Note" to="/customer/credit-debit-note" />
            <Node icon={FileText} label="Billing" to="/customer/billing" />
            <Node icon={CircleDollarSign} label="Collections" to="/customer/collections" />
            <Node icon={User} label="Retailer" to="/customer/retailer" />
            <Node icon={ShoppingCart} label="Delivery Process" to="/customer/delivery-process" />
            <Node icon={Plus} label="Order Booking" to="/customer/order-booking" />
            <Node icon={Users} label="Retailer Channel" to="/customer/retailer-channel" />
            <Node icon={Users} label="Retailer Class" to="/customer/retailer-class" />
            <Node icon={Users} label="Retailer Group" to="/customer/retailer-group" />
            <Node icon={RotateCcw} label="Sales Return" to="/customer/sales-return" />
            <Node icon={Building} label="Bank Master" to="/customer/bank-master" />
        <Node icon={Percent} label="Collections Discount Master" to="/customer/collections-discount-master" />
        <Node icon={RotateCcw} label="Midas Sales Return" to="/customer/midas-sales-return" />
        <Node icon={Building} label="Order to Billing (O2B)" to="/customer/order-to-billing" />
          </Node>
          <Node icon={Package} label="Inventory">
            <Node icon={Building} label="Godown" to="/inventory/godown" />
            <Node icon={RotateCcw} label="Stock Adjustment" to="/inventory/stock-adjustment" />
            <Node icon={ArrowRight} label="Batch Transfer" to="/inventory/batch-transfer" />
          </Node>
          <Node icon={Bookmark} label="Product & Price">
            <Node icon={Package} label="Product" to="/product/product" />
            <Node icon={Percent} label="% Price Discount" to="/product/price-discount" />
            <Node icon={Ruler} label="UOM Master" to="/product/uom-master" />
            <Node icon={Receipt} label="GST Tax Structure" to="/product/gst-tax-structure" />
          </Node>
          <Node icon={Tag} label="Schemes & Claims">
            <Node icon={Tag} label="Scheme" to="/schemes/scheme" />
            <Node icon={Tag} label="Claim Type" to="/schemes/claim-type" />
            <Node icon={Tag} label="Others Claim" to="/schemes/others-claim" />
            <Node icon={Tag} label="Secondary Scheme C..." to="/schemes/secondary-scheme-claim" />
            <Node icon={Tag} label="Invoice Tot Claim" to="/schemes/invoice-tot-claim" />
            <Node icon={Tag} label="Program Material Cla..." to="/schemes/program-material-claim" />
            <Node icon={Tag} label="GST Claim" to="/schemes/gst-claim" />
            <Node icon={Tag} label="TBTL Claim" to="/schemes/tbtl-claim" />
            <Node icon={Tag} label="Other Service Claim" to="/schemes/other-service-claim" />
            <Node icon={Tag} label="Program Service Claim" to="/schemes/program-service-claim" />
            <Node icon={Tag} label="TO Claim" to="/schemes/to-claim" />
            <Node icon={Tag} label="Manual Claim" to="/schemes/manual-claim" />
            <Node icon={Tag} label="Leak Damage Return Claim" to="/schemes/leak-claim" />
          </Node>
          <Node icon={CircleDollarSign} label="Finance">
            <Node icon={Calendar} label="Accounts Calendar" to="/finance/accounts-calendar" />
          </Node>
          <Node icon={Settings} label="Configuration">
            <Node icon={Settings} label="PDA Export" to="/configuration/pda-export" />
            <Node icon={Settings} label="Distributor Configuration" to="/configuration/distributor-configuration" />
            <Node icon={User} label="User Profile" to="/configuration/user-profile" />
            <Node icon={Users} label="User Group" to="/configuration/user-group" />
            <Node icon={Calendar} label="JC Calendar" to="/configuration/jc-calendar" />
            <Node icon={Calendar} label="Holiday Calendar" to="/configuration/holiday-calendar" />
            <Node icon={Receipt} label="Bill Print Configuration" to="/configuration/bill-print-configuration" />
            <Node icon={BarChart} label="Day End" to="/configuration/day-end" />
            <Node icon={Upload} label="ETL" to="/configuration/etl" />
            <Node icon={Shield} label="E Invoice Authentication" to="/configuration/e-invoice-authentication" />
          </Node>
          <Node icon={BarChart3} label="Reports">
            <Node icon={BarChart} label="Purchase Reports" to="/reports/purchase" />
            <Node icon={BarChart} label="Sales Reports" to="/reports/sales" />
            <Node icon={BarChart} label="Live Reports" to="/reports/live" />
            <Node icon={BarChart} label="Scheme and Claims" to="/reports/scheme-claims" />
            <Node icon={BarChart} label="Collection Reports" to="/reports/collections" />
            <Node icon={BarChart} label="Stock Reports" to="/reports/stock" />
            <Node icon={BarChart} label="Bill Print" to="/reports/bill-print" />
            <Node icon={BarChart} label="Informative Reports" to="/reports/informative" />
            <Node icon={BarChart} label="Finance Reports" to="/reports/finance" />
            <Node icon={BarChart} label="Claims Reports" to="/reports/claims" />
            <Node icon={BarChart} label="GST Reports" to="/reports/gst" />
            <Node icon={BarChart} label="GSTR Reports" to="/reports/gstr" />
          </Node>
          <Node icon={Wrench} label="Utilities">
            <Node icon={Download} label="Download Print Server" to="/utilities/download-print-server" />
          </Node>
        </nav>
        
        <div className="mt-auto p-3 sm:p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="hidden sm:block">Sales Support</div>
            <div className="hidden sm:block">Technology Support</div>
            <div className="truncate">support@bahupada.com</div>
            <div className="truncate">+91-XXXX-XXXXXX</div>
          </div>
        </div>
      </aside>
    </>
  );
}
