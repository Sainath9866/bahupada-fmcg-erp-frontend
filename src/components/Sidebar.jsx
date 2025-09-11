import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderTree, ShoppingCart, Package, BarChart3,
  Settings, Users, Factory, ReceiptIndianRupee, FileText, Layers,
  CircleDollarSign, MapPinned, UserRound, Bus, Warehouse, ClipboardList,
  ChevronRight, ChevronDown, AlertTriangle, Target, Bell, Database, Barcode,
  BookOpen, Calculator, Tag, Scale, CreditCard, Gift, Hash, Building,
  UserCheck, Truck, Banknote, Percent, FileCheck, Calendar, Upload,
  Download, Shield, Globe, QrCode
} from 'lucide-react';

function Node({ icon: Icon, label, children, to }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = to && location.pathname.startsWith(to);
  const base = 'flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700';
  if (children) {
    return (
      <div className="text-sm">
        <button className={`${base} w-full text-left`} onClick={() => setOpen(!open)}>
          {open ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}<Icon size={16}/><span>{label}</span>
        </button>
        {open && <div className="ml-5 border-l border-gray-200 pl-3 flex flex-col gap-1">{children}</div>}
      </div>
    );
  }
  return (
    <Link className={`${base} ${isActive ? 'bg-purple-100 text-purple-700' : ''}`} to={to || '#'}>
      <Icon size={16}/><span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ open = true }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => {}}></div>}
      <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} w-72 bg-white text-gray-800 h-screen fixed top-0 left-0 z-40 overflow-y-auto transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-gray-200`}> 
        <div className="p-4 text-lg font-semibold border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">B</div>
            <span>Bahupada</span>
          </div>
          <span className="text-xs text-gray-500">FMCG ERP</span>
        </div>
        
        <nav className="flex flex-col gap-1 p-2">
          <Node icon={LayoutDashboard} label="Dashboard" to="/" />
          
          <Node icon={FolderTree} label="Masters">
            <Node icon={BookOpen} label="Journal Master">
              <Node icon={FileText} label="Sales Journal" to="/masters/journal/sales" />
              <Node icon={FileText} label="Purchase Journal" to="/masters/journal/purchase" />
              <Node icon={FileText} label="Receipt Journal" to="/masters/journal/receipt" />
              <Node icon={FileText} label="Payment Journal" to="/masters/journal/payment" />
              <Node icon={FileText} label="Contra Journal" to="/masters/journal/contra" />
              <Node icon={FileText} label="Debit Note Journal" to="/masters/journal/debit-note" />
              <Node icon={FileText} label="Credit Note Journal" to="/masters/journal/credit-note" />
              <Node icon={FileText} label="Journal Proper (Adjustments)" to="/masters/journal/adjustments" />
            </Node>
            
            <Node icon={ClipboardList} label="Ledger Master">
              <Node icon={Users} label="Create / Modify / Delete Ledger" to="/masters/ledger/manage" />
              <Node icon={FolderTree} label="Ledger Groups (Chart of Accounts)" to="/masters/ledger/groups" />
              <Node icon={Calculator} label="Ledger Opening Balance" to="/masters/ledger/opening-balance" />
              <Node icon={BarChart3} label="Ledger Reports / View" to="/masters/ledger/reports" />
            </Node>
            
            <Node icon={Package} label="Item Master">
              <Node icon={Barcode} label="Product / SKU Details" to="/masters/item/product" />
              <Node icon={Tag} label="HSN / GST" to="/masters/item/hsn-gst" />
              <Node icon={Calendar} label="Batch / Expiry" to="/masters/item/batch-expiry" />
              <Node icon={Calculator} label="MRP / Cost / Margin" to="/masters/item/pricing" />
            </Node>
            
            <Node icon={Scale} label="Unit of Measure Master">
              <Node icon={Scale} label="Base Units (Box, Kg, Liter)" to="/masters/uom/base" />
              <Node icon={Scale} label="Alternate Units (Case, Strip, Piece)" to="/masters/uom/alternate" />
            </Node>
            
            <Node icon={Tag} label="Price List / Rate Master">
              <Node icon={Users} label="Customer-wise Pricing" to="/masters/pricing/customer" />
              <Node icon={Package} label="Item-wise Pricing" to="/masters/pricing/item" />
            </Node>
            
            <Node icon={Percent} label="Tax Master">
              <Node icon={Percent} label="GST %" to="/masters/tax/gst" />
              <Node icon={Tag} label="HSN / SAC Codes" to="/masters/tax/hsn-sac" />
              <Node icon={Percent} label="Cess if any" to="/masters/tax/cess" />
            </Node>
            
            <Node icon={Calendar} label="Batch / Lot / Serial Master">
              <Node icon={Hash} label="Batch Numbers" to="/masters/batch/numbers" />
              <Node icon={Calendar} label="Manufacturing / Expiry Dates" to="/masters/batch/dates" />
              <Node icon={Hash} label="Serial Numbers" to="/masters/batch/serial" />
            </Node>
            
            <Node icon={Users} label="Customer Master">
              <Node icon={Users} label="Retailers" to="/masters/customer/retailers" />
              <Node icon={Users} label="Distributors" to="/masters/customer/distributors" />
              <Node icon={Users} label="Wholesalers" to="/masters/customer/wholesalers" />
            </Node>
            
            <Node icon={Factory} label="Vendor / Supplier Master">
              <Node icon={Factory} label="FMCG Suppliers" to="/masters/vendor/fmcg" />
              <Node icon={Factory} label="Principals" to="/masters/vendor/principals" />
              <Node icon={Factory} label="Service Providers" to="/masters/vendor/service" />
            </Node>
            
            <Node icon={Warehouse} label="Warehouse / Godown Master">
              <Node icon={Warehouse} label="Main Warehouse" to="/masters/warehouse/main" />
              <Node icon={Warehouse} label="Branch Stock" to="/masters/warehouse/branch" />
              <Node icon={Warehouse} label="Sub-godowns / Bins" to="/masters/warehouse/sub" />
            </Node>
            
            <Node icon={MapPinned} label="Route / Beat Master">
              <Node icon={MapPinned} label="Routes / Territories" to="/masters/route/territories" />
            </Node>
            
            <Node icon={UserRound} label="Salesman / Employee Master">
              <Node icon={UserRound} label="Field Staff" to="/masters/employee/field-staff" />
              <Node icon={UserRound} label="Sales Representatives (Linked to Routes)" to="/masters/employee/sales-rep" />
            </Node>
            
            <Node icon={Bus} label="Vehicle / Transporter Master">
              <Node icon={Bus} label="Vehicles (Lorry, Van)" to="/masters/vehicle/vehicles" />
              <Node icon={UserRound} label="Driver Details" to="/masters/vehicle/drivers" />
              <Node icon={Truck} label="Transport Partners" to="/masters/vehicle/partners" />
              <Node icon={Calculator} label="Transport Expenses" to="/masters/vehicle/expenses" />
            </Node>
            
            <Node icon={Banknote} label="Bank Master">
              <Node icon={Banknote} label="Bank Accounts" to="/masters/bank/accounts" />
              <Node icon={CreditCard} label="Payment Modes (NEFT, UPI, Cheque, Cash)" to="/masters/bank/payment-modes" />
            </Node>
            
            <Node icon={Gift} label="Scheme / Discount Master">
              <Node icon={Gift} label="Promotions" to="/masters/scheme/promotions" />
              <Node icon={Package} label="Free Qty" to="/masters/scheme/free-qty" />
              <Node icon={Percent} label="Slab Discounts" to="/masters/scheme/slab-discounts" />
            </Node>
            
            <Node icon={Hash} label="Document Numbering Master">
              <Node icon={FileText} label="Invoice Numbering" to="/masters/document/invoice" />
              <Node icon={ReceiptIndianRupee} label="Receipt Numbering" to="/masters/document/receipt" />
              <Node icon={FileText} label="Voucher Numbering" to="/masters/document/voucher" />
            </Node>
            
            <Node icon={Building} label="Company / Branch Master">
              <Node icon={Building} label="Multi-Company Setup" to="/masters/company/multi-company" />
              <Node icon={Building} label="Multi-Branch Setup" to="/masters/company/multi-branch" />
            </Node>
            
            <Node icon={UserCheck} label="User / Role Master">
              <Node icon={Users} label="User Management" to="/masters/user/management" />
              <Node icon={Shield} label="Roles & Permissions" to="/masters/user/roles" />
              <Node icon={Bell} label="Alerts (Temp User / Price Discount / Red Outlet)" to="/masters/user/alerts" />
            </Node>
            
            <Node icon={Calculator} label="Opening Balance Master">
              <Node icon={ClipboardList} label="Ledger Opening Balances" to="/masters/opening/ledger" />
              <Node icon={Package} label="Stock Opening Balances" to="/masters/opening/stock" />
            </Node>
            
            <Node icon={ShoppingCart} label="Line Sale Master">
              <Node icon={Package} label="Opening Stock" to="/masters/line-sale/opening" />
              <Node icon={FileText} label="App Invoices (Cash, Credit, QR)" to="/masters/line-sale/invoices" />
              <Node icon={Package} label="Closing Stock" to="/masters/line-sale/closing" />
              <Node icon={AlertTriangle} label="Returns / Damage Report" to="/masters/line-sale/returns" />
            </Node>
            
            <Node icon={AlertTriangle} label="Return Master">
              <Node icon={Package} label="Resalable Returns" to="/masters/return/resalable" />
              <Node icon={AlertTriangle} label="Unsalable Returns" to="/masters/return/unsalable" />
            </Node>
          </Node>

          <Node icon={ShoppingCart} label="Transactions">
            <Node icon={ReceiptIndianRupee} label="Sales">
              <Node icon={ReceiptIndianRupee} label="Cash Sale" to="/transactions/sales/cash" />
              <Node icon={ReceiptIndianRupee} label="Credit Sale" to="/transactions/sales/credit" />
              <Node icon={FileText} label="GST Invoice" to="/transactions/sales/gst-invoice" />
              <Node icon={AlertTriangle} label="Returns" to="/transactions/sales/returns" />
            </Node>
            
            <Node icon={Factory} label="Purchase">
              <Node icon={Factory} label="Cash Purchase" to="/transactions/purchase/cash" />
              <Node icon={Factory} label="Credit Purchase" to="/transactions/purchase/credit" />
              <Node icon={FileCheck} label="Goods Receipt Note (GRN)" to="/transactions/purchase/grn" />
            </Node>
            
            <Node icon={CircleDollarSign} label="Payment">
              <Node icon={Factory} label="To Supplier" to="/transactions/payment/supplier" />
              <Node icon={UserRound} label="To Employee (Salary / Expenses)" to="/transactions/payment/employee" />
              <Node icon={CircleDollarSign} label="Miscellaneous" to="/transactions/payment/miscellaneous" />
            </Node>
            
            <Node icon={ReceiptIndianRupee} label="Receipt">
              <Node icon={Users} label="From Customers" to="/transactions/receipt/customers" />
              <Node icon={CircleDollarSign} label="Other Income" to="/transactions/receipt/other-income" />
            </Node>
            
            <Node icon={FileText} label="Journal / Voucher">
              <Node icon={FileText} label="Adjustment Journal" to="/transactions/journal/adjustment" />
              <Node icon={FileText} label="Contra Entry" to="/transactions/journal/contra" />
              <Node icon={FileText} label="Debit Note" to="/transactions/journal/debit-note" />
              <Node icon={FileText} label="Credit Note" to="/transactions/journal/credit-note" />
            </Node>
            
            <Node icon={Layers} label="Stock Transfer">
              <Node icon={Warehouse} label="Between Warehouses" to="/transactions/stock-transfer/warehouses" />
              <Node icon={Building} label="Branch Transfers" to="/transactions/stock-transfer/branches" />
            </Node>
          </Node>

          <Node icon={Package} label="Inventory Management">
            <Node icon={Package} label="Stock Summary" to="/inventory/stock-summary" />
            <Node icon={Calendar} label="Batch / Expiry Tracking" to="/inventory/batch-expiry" />
            <Node icon={AlertTriangle} label="Reorder Alerts" to="/inventory/reorder-alerts" />
            <Node icon={Layers} label="Rack Stacking (Brand-wise)" to="/inventory/rack-stacking" />
            <Node icon={Calculator} label="Stock Valuation (Cost, MRP, FIFO, Avg.)" to="/inventory/stock-valuation" />
          </Node>

          <Node icon={BarChart3} label="Reports">
            <Node icon={BarChart3} label="Financial Reports">
              <Node icon={FileText} label="Trial Balance" to="/reports/financial/trial-balance" />
              <Node icon={FileText} label="Profit & Loss" to="/reports/financial/profit-loss" />
              <Node icon={FileText} label="Balance Sheet" to="/reports/financial/balance-sheet" />
              <Node icon={CircleDollarSign} label="Cash Flow" to="/reports/financial/cash-flow" />
              <Node icon={Banknote} label="Bank Reconciliation" to="/reports/financial/bank-reconciliation" />
            </Node>
            
            <Node icon={Package} label="Inventory Reports">
              <Node icon={Package} label="Stock Summary" to="/reports/inventory/stock-summary" />
              <Node icon={Calendar} label="Batch-wise / Expiry Report" to="/reports/inventory/batch-expiry" />
              <Node icon={BarChart3} label="Item-wise Sales / Movement" to="/reports/inventory/item-movement" />
            </Node>
            
            <Node icon={BarChart3} label="Sales & Purchase Reports">
              <Node icon={MapPinned} label="Route-wise Sales" to="/reports/sales-purchase/route-sales" />
              <Node icon={Users} label="Customer Outstanding" to="/reports/sales-purchase/customer-outstanding" />
              <Node icon={Factory} label="Supplier History" to="/reports/sales-purchase/supplier-history" />
              <Node icon={UserRound} label="Salesman Performance" to="/reports/sales-purchase/salesman-performance" />
            </Node>
            
            <Node icon={UserRound} label="Payroll Reports">
              <Node icon={UserRound} label="Salary Register" to="/reports/payroll/salary-register" />
              <Node icon={Calendar} label="Attendance" to="/reports/payroll/attendance" />
              <Node icon={Calculator} label="PF / ESI Deductions" to="/reports/payroll/pf-esi" />
            </Node>
            
            <Node icon={Target} label="Target Reports">
              <Node icon={Target} label="Brand-wise Salesman Targets" to="/reports/target/brand-targets" />
              <Node icon={Calculator} label="Incentive Calculations" to="/reports/target/incentives" />
            </Node>
          </Node>

          <Node icon={Settings} label="Utilities & Settings">
            <Node icon={Bell} label="Alerts & Notifications">
              <Node icon={Package} label="Stock Shortage" to="/utilities/alerts/stock-shortage" />
              <Node icon={CircleDollarSign} label="Payment Due" to="/utilities/alerts/payment-due" />
              <Node icon={Calendar} label="Expiry Alerts" to="/utilities/alerts/expiry" />
            </Node>
            
            <Node icon={FileText} label="Document Management">
              <Node icon={Upload} label="Upload Invoices / Bills" to="/utilities/document/upload" />
              <Node icon={FileText} label="Attach Docs to Customers / Vendors" to="/utilities/document/attach" />
            </Node>
            
            <Node icon={Database} label="Backup & Restore" to="/utilities/backup" />
            <Node icon={ClipboardList} label="Audit Logs (User Activity)" to="/utilities/audit-logs" />
            <Node icon={Calculator} label="Budgeting & Cost Control" to="/utilities/budgeting" />
            <Node icon={Globe} label="Multi-Currency / Multi-Language" to="/utilities/multi-currency" />
            <Node icon={QrCode} label="Barcoding & Scanning" to="/utilities/barcoding" />
          </Node>
        </nav>
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <div>Sales Support</div>
            <div>Technology Support</div>
            <div>support@bahupada.com</div>
            <div>+91-XXXX-XXXXXX</div>
          </div>
        </div>
      </aside>
    </>
  );
}
