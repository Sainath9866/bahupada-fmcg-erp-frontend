import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar.jsx';
import { useState } from 'react';
import { Menu, Search, Bell, User, ChevronRight } from 'lucide-react';

// Import all pages
import Dashboard from './pages/Dashboard.jsx';
import CustomerMaster from './pages/CustomerMaster.jsx';
import VendorMaster from './pages/VendorMaster.jsx';
import ItemMaster from './pages/ItemMaster.jsx';
import WarehouseMaster from './pages/WarehouseMaster.jsx';
import LedgerMaster from './pages/LedgerMaster.jsx';
import EmployeeMaster from './pages/EmployeeMaster.jsx';
import RouteMaster from './pages/RouteMaster.jsx';
import VehicleMaster from './pages/VehicleMaster.jsx';
import SalesInvoices from './pages/SalesInvoices.jsx';
import Purchases from './pages/Purchases.jsx';
import Payments from './pages/Payments.jsx';
import Receipts from './pages/Receipts.jsx';
import Journals from './pages/Journals.jsx';
import StockTransfers from './pages/StockTransfers.jsx';
import Returns from './pages/Returns.jsx';
import Inventory from './pages/Inventory.jsx';
import TrialBalance from './pages/TrialBalance.jsx';
import ProfitLoss from './pages/ProfitLoss.jsx';
import BalanceSheet from './pages/BalanceSheet.jsx';
import StockSummary from './pages/StockSummary.jsx';
import SalesmanPerformance from './pages/SalesmanPerformance.jsx';
import SyncQueue from './pages/SyncQueue.jsx';
import AuditLogs from './pages/AuditLogs.jsx';
import UserManagement from './pages/UserManagement.jsx';
import Login from './pages/Login.jsx';

// Import Journal Master pages
import SalesJournal from './pages/masters/journal/SalesJournal.jsx';
import PurchaseJournal from './pages/masters/journal/PurchaseJournal.jsx';
import ReceiptJournal from './pages/masters/journal/ReceiptJournal.jsx';
import PaymentJournal from './pages/masters/journal/PaymentJournal.jsx';
import ContraJournal from './pages/masters/journal/ContraJournal.jsx';
import DebitNoteJournal from './pages/masters/journal/DebitNoteJournal.jsx';
import CreditNoteJournal from './pages/masters/journal/CreditNoteJournal.jsx';
import AdjustmentsJournal from './pages/masters/journal/AdjustmentsJournal.jsx';

// Import Ledger Master pages
import LedgerManage from './pages/masters/ledger/LedgerManage.jsx';
import LedgerGroups from './pages/masters/ledger/LedgerGroups.jsx';
import LedgerOpeningBalance from './pages/masters/ledger/LedgerOpeningBalance.jsx';
import LedgerReports from './pages/masters/ledger/LedgerReports.jsx';

// Import Item Master pages
import ProductSKU from './pages/masters/item/ProductSKU.jsx';
import HSNGST from './pages/masters/item/HSNGST.jsx';
import BatchExpiry from './pages/masters/item/BatchExpiry.jsx';
import MRPCostMargin from './pages/masters/item/MRPCostMargin.jsx';

// Import UOM Master pages
import BaseUnits from './pages/masters/uom/BaseUnits.jsx';
import AlternateUnits from './pages/masters/uom/AlternateUnits.jsx';

// Import Pricing Master pages
import CustomerWisePricing from './pages/masters/pricing/CustomerWisePricing.jsx';
import ItemWisePricing from './pages/masters/pricing/ItemWisePricing.jsx';

// Import Tax Master pages
import GSTRates from './pages/masters/tax/GSTRates.jsx';
import HSNSACCodes from './pages/masters/tax/HSNSACCodes.jsx';
import Cess from './pages/masters/tax/Cess.jsx';

// Import Batch Master pages
import BatchNumbers from './pages/masters/batch/BatchNumbers.jsx';
import ManufacturingDates from './pages/masters/batch/ManufacturingDates.jsx';
import SerialNumbers from './pages/masters/batch/SerialNumbers.jsx';

// Import Customer Master pages
import Retailers from './pages/masters/customer/Retailers.jsx';
import Distributors from './pages/masters/customer/Distributors.jsx';
import Wholesalers from './pages/masters/customer/Wholesalers.jsx';

// Import Vendor Master pages
import FMCGSuppliers from './pages/masters/vendor/FMCGSuppliers.jsx';
import Principals from './pages/masters/vendor/Principals.jsx';
import ServiceProviders from './pages/masters/vendor/ServiceProviders.jsx';

// Import Warehouse Master pages
import MainWarehouse from './pages/masters/warehouse/MainWarehouse.jsx';
import BranchWarehouse from './pages/masters/warehouse/BranchWarehouse.jsx';
import SubWarehouse from './pages/masters/warehouse/SubWarehouse.jsx';

// Import Route Master pages
import Territories from './pages/masters/route/Territories.jsx';

// Import Employee Master pages
import FieldStaff from './pages/masters/employee/FieldStaff.jsx';
import SalesReps from './pages/masters/employee/SalesReps.jsx';

// Import Vehicle Master pages
import Vehicles from './pages/masters/vehicle/Vehicles.jsx';
import Drivers from './pages/masters/vehicle/Drivers.jsx';
import Partners from './pages/masters/vehicle/Partners.jsx';
import Expenses from './pages/masters/vehicle/Expenses.jsx';

// Import Bank Master pages
import Accounts from './pages/masters/bank/Accounts.jsx';
import PaymentModes from './pages/masters/bank/PaymentModes.jsx';

// Import Scheme Master pages
import Promotions from './pages/masters/scheme/Promotions.jsx';
import FreeQty from './pages/masters/scheme/FreeQty.jsx';
import SlabDiscounts from './pages/masters/scheme/SlabDiscounts.jsx';

// Import Document Master pages
import InvoiceNumbering from './pages/masters/document/InvoiceNumbering.jsx';
import ReceiptNumbering from './pages/masters/document/ReceiptNumbering.jsx';
import VoucherNumbering from './pages/masters/document/VoucherNumbering.jsx';

// Import Company Master pages
import MultiCompany from './pages/masters/company/MultiCompany.jsx';
import MultiBranch from './pages/masters/company/MultiBranch.jsx';

// Import User Master pages
import UserManagementMaster from './pages/masters/user/UserManagement.jsx';
import Roles from './pages/masters/user/Roles.jsx';
import Alerts from './pages/masters/user/Alerts.jsx';

// Import Opening Balance Master pages
import LedgerOpeningBalanceMaster from './pages/masters/opening/LedgerOpeningBalance.jsx';
import StockOpeningBalance from './pages/masters/opening/StockOpeningBalance.jsx';

// Import Line Sale Master pages
import OpeningStock from './pages/masters/line-sale/OpeningStock.jsx';
import LineSaleInvoices from './pages/masters/line-sale/LineSaleInvoices.jsx';
import ClosingStock from './pages/masters/line-sale/ClosingStock.jsx';
import LineSaleReturns from './pages/masters/line-sale/LineSaleReturns.jsx';

// Import Return Master pages
import ResalableReturns from './pages/masters/return/ResalableReturns.jsx';
import UnsalableReturns from './pages/masters/return/UnsalableReturns.jsx';

// Import Transaction pages
import SalesInvoice from './pages/transactions/SalesInvoice.jsx';
import PurchaseOrder from './pages/transactions/PurchaseOrder.jsx';
import Payment from './pages/transactions/Payment.jsx';
import Receipt from './pages/transactions/Receipt.jsx';
import Journal from './pages/transactions/Journal.jsx';
import StockTransfer from './pages/transactions/StockTransfer.jsx';

// Import Inventory pages
import StockSummaryInventory from './pages/inventory/StockSummary.jsx';
import BatchExpiryInventory from './pages/inventory/BatchExpiry.jsx';
import ReorderLevel from './pages/inventory/ReorderLevel.jsx';
import RackManagement from './pages/inventory/RackManagement.jsx';
import StockValuation from './pages/inventory/StockValuation.jsx';

// Import Reports pages
import FinancialReports from './pages/reports/FinancialReports.jsx';
import InventoryReports from './pages/reports/InventoryReports.jsx';
import SalesPurchaseReports from './pages/reports/SalesPurchaseReports.jsx';
import PayrollReports from './pages/reports/PayrollReports.jsx';
import TargetReports from './pages/reports/TargetReports.jsx';

// Import Utilities pages
import SystemAlerts from './pages/utilities/SystemAlerts.jsx';
import DocumentManagement from './pages/utilities/DocumentManagement.jsx';
import BackupRestore from './pages/utilities/BackupRestore.jsx';

function Page({ title }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h1>
      <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-600">Coming soon…</div>
    </div>
  );
}

function Breadcrumb() {
  const location = useLocation();
  
  const getBreadcrumbFromPath = (pathname) => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    
    if (pathSegments.length === 0) {
      return [{ label: 'Dashboard', path: '/' }];
    }
    
    const breadcrumbs = [];
    let currentPath = '';
    
    // Map path segments to readable labels
    const segmentLabels = {
      'masters': 'Masters',
      'transactions': 'Transactions',
      'inventory': 'Inventory Management',
      'reports': 'Reports',
      'utilities': 'Utilities & Settings',
      'journal': 'Journal Master',
      'ledger': 'Ledger Master',
      'item': 'Item Master',
      'uom': 'Unit of Measure Master',
      'pricing': 'Price List / Rate Master',
      'tax': 'Tax Master',
      'batch': 'Batch / Lot / Serial Master',
      'customer': 'Customer Master',
      'vendor': 'Vendor / Supplier Master',
      'warehouse': 'Warehouse / Godown Master',
      'route': 'Route / Beat Master',
      'employee': 'Salesman / Employee Master',
      'vehicle': 'Vehicle / Transporter Master',
      'bank': 'Bank Master',
      'scheme': 'Scheme / Discount Master',
      'document': 'Document Numbering Master',
      'company': 'Company / Branch Master',
      'user': 'User / Role Master',
      'opening': 'Opening Balance Master',
      'line-sale': 'Line Sale Master',
      'return': 'Return Master',
      'sales': 'Sales',
      'purchase': 'Purchase',
      'payment': 'Payment',
      'receipt': 'Receipt',
      'stock-transfer': 'Stock Transfer',
      'financial': 'Financial Reports',
      'sales-purchase': 'Sales & Purchase Reports',
      'payroll': 'Payroll Reports',
      'target': 'Target Reports',
      'alerts': 'Alerts & Notifications',
      'backup': 'Backup & Restore',
      'audit-logs': 'Audit Logs',
      'budgeting': 'Budgeting & Cost Control',
      'multi-currency': 'Multi-Currency / Multi-Language',
      'barcoding': 'Barcoding & Scanning'
    };
    
    // Map specific page labels
    const pageLabels = {
      'sales': 'Sales Journal',
      'purchase': 'Purchase Journal',
      'receipt': 'Receipt Journal',
      'payment': 'Payment Journal',
      'contra': 'Contra Journal',
      'debit-note': 'Debit Note Journal',
      'credit-note': 'Credit Note Journal',
      'adjustments': 'Journal Proper (Adjustments)',
      'manage': 'Create / Modify / Delete Ledger',
      'groups': 'Ledger Groups (Chart of Accounts)',
      'opening-balance': 'Ledger Opening Balance',
      'reports': 'Ledger Reports / View',
      'product': 'Product / SKU Details',
      'hsn-gst': 'HSN / GST',
      'batch-expiry': 'Batch / Expiry',
      'pricing': 'MRP / Cost / Margin',
      'base': 'Base Units (Box, Kg, Liter)',
      'alternate': 'Alternate Units (Case, Strip, Piece)',
      'customer': 'Customer-wise Pricing',
      'item': 'Item-wise Pricing',
      'gst': 'GST %',
      'hsn-sac': 'HSN / SAC Codes',
      'cess': 'Cess if any',
      'numbers': 'Batch Numbers',
      'dates': 'Manufacturing / Expiry Dates',
      'serial': 'Serial Numbers',
      'retailers': 'Retailers',
      'distributors': 'Distributors',
      'wholesalers': 'Wholesalers',
      'fmcg': 'FMCG Suppliers',
      'principals': 'Principals',
      'service': 'Service Providers',
      'main': 'Main Warehouse',
      'branch': 'Branch Stock',
      'sub': 'Sub-godowns / Bins',
      'territories': 'Routes / Territories',
      'field-staff': 'Field Staff',
      'sales-rep': 'Sales Representatives (Linked to Routes)',
      'vehicles': 'Vehicles (Lorry, Van)',
      'drivers': 'Driver Details',
      'partners': 'Transport Partners',
      'expenses': 'Transport Expenses',
      'accounts': 'Bank Accounts',
      'payment-modes': 'Payment Modes (NEFT, UPI, Cheque, Cash)',
      'promotions': 'Promotions',
      'free-qty': 'Free Qty',
      'slab-discounts': 'Slab Discounts',
      'invoice': 'Invoice Numbering',
      'receipt': 'Receipt Numbering',
      'voucher': 'Voucher Numbering',
      'multi-company': 'Multi-Company Setup',
      'multi-branch': 'Multi-Branch Setup',
      'management': 'User Management',
      'roles': 'Roles & Permissions',
      'alerts': 'Alerts (Temp User / Price Discount / Red Outlet)',
      'ledger': 'Ledger Opening Balances',
      'stock': 'Stock Opening Balances',
      'opening': 'Opening Stock',
      'invoices': 'App Invoices (Cash, Credit, QR)',
      'closing': 'Closing Stock',
      'returns': 'Returns / Damage Report',
      'resalable': 'Resalable Returns',
      'unsalable': 'Unsalable Returns',
      'cash': 'Cash Sale',
      'credit': 'Credit Sale',
      'gst-invoice': 'GST Invoice',
      'grn': 'Goods Receipt Note (GRN)',
      'supplier': 'To Supplier',
      'employee': 'To Employee (Salary / Expenses)',
      'miscellaneous': 'Miscellaneous',
      'customers': 'From Customers',
      'other-income': 'Other Income',
      'adjustment': 'Adjustment Journal',
      'contra': 'Contra Entry',
      'debit-note': 'Debit Note',
      'credit-note': 'Credit Note',
      'warehouses': 'Between Warehouses',
      'branches': 'Branch Transfers',
      'stock-summary': 'Stock Summary',
      'batch-expiry': 'Batch / Expiry Tracking',
      'reorder-alerts': 'Reorder Alerts',
      'rack-stacking': 'Rack Stacking (Brand-wise)',
      'stock-valuation': 'Stock Valuation (Cost, MRP, FIFO, Avg.)',
      'trial-balance': 'Trial Balance',
      'profit-loss': 'Profit & Loss',
      'balance-sheet': 'Balance Sheet',
      'cash-flow': 'Cash Flow',
      'bank-reconciliation': 'Bank Reconciliation',
      'item-movement': 'Item-wise Sales / Movement',
      'route-sales': 'Route-wise Sales',
      'customer-outstanding': 'Customer Outstanding',
      'supplier-history': 'Supplier History',
      'salesman-performance': 'Salesman Performance',
      'salary-register': 'Salary Register',
      'attendance': 'Attendance',
      'pf-esi': 'PF / ESI Deductions',
      'brand-targets': 'Brand-wise Salesman Targets',
      'incentives': 'Incentive Calculations',
      'stock-shortage': 'Stock Shortage',
      'payment-due': 'Payment Due',
      'expiry': 'Expiry Alerts',
      'upload': 'Upload Invoices / Bills',
      'attach': 'Attach Docs to Customers / Vendors'
    };
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      let label = pageLabels[segment] || segmentLabels[segment] || segment;
      
      // Capitalize first letter and replace hyphens with spaces
      if (!pageLabels[segment] && !segmentLabels[segment]) {
        label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      }
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbFromPath(location.pathname);
  
  return (
    <div className="flex items-center text-sm text-gray-600">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          {index > 0 && <ChevronRight size={16} className="mx-2 text-gray-400" />}
          <span className={breadcrumb.isLast ? "text-purple-600 font-medium" : "text-gray-600"}>
            {breadcrumb.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex bg-gray-50 text-gray-800 min-h-screen w-full">
        <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
          {/* Top Bar */}
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 h-14 flex items-center gap-3 shadow-sm">
            <button 
              className="p-2 rounded hover:bg-gray-100" 
              onClick={toggleSidebar} 
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
            
            {/* Dynamic Breadcrumb */}
            <Breadcrumb />
            
            <div className="flex-1"></div>
            
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                placeholder="Search" 
                className="w-64 bg-gray-50 border border-gray-200 rounded px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              />
            </div>
            
            {/* Notifications */}
            <button className="p-2 rounded hover:bg-gray-100 relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">1</span>
            </button>
            
            {/* User */}
            <button className="p-2 rounded hover:bg-gray-100">
              <User size={18} />
            </button>
          </div>
          
          {/* Routes */}
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Masters */}
            {/* Journal Master */}
            <Route path="/masters/journal/sales" element={<SalesJournal />} />
            <Route path="/masters/journal/purchase" element={<PurchaseJournal />} />
            <Route path="/masters/journal/receipt" element={<ReceiptJournal />} />
            <Route path="/masters/journal/payment" element={<PaymentJournal />} />
            <Route path="/masters/journal/contra" element={<ContraJournal />} />
            <Route path="/masters/journal/debit-note" element={<DebitNoteJournal />} />
            <Route path="/masters/journal/credit-note" element={<CreditNoteJournal />} />
            <Route path="/masters/journal/adjustments" element={<AdjustmentsJournal />} />
            
            {/* Ledger Master */}
            <Route path="/masters/ledger/manage" element={<LedgerManage />} />
            <Route path="/masters/ledger/groups" element={<LedgerGroups />} />
            <Route path="/masters/ledger/opening-balance" element={<LedgerOpeningBalance />} />
            <Route path="/masters/ledger/reports" element={<LedgerReports />} />
            
            {/* Item Master */}
            <Route path="/masters/item/product" element={<ProductSKU />} />
            <Route path="/masters/item/hsn-gst" element={<HSNGST />} />
            <Route path="/masters/item/batch-expiry" element={<BatchExpiry />} />
            <Route path="/masters/item/pricing" element={<MRPCostMargin />} />
            
            {/* UOM Master */}
            <Route path="/masters/uom/base" element={<BaseUnits />} />
            <Route path="/masters/uom/alternate" element={<AlternateUnits />} />
            
            {/* Pricing Master */}
            <Route path="/masters/pricing/customer" element={<CustomerWisePricing />} />
            <Route path="/masters/pricing/item" element={<ItemWisePricing />} />
            
            {/* Tax Master */}
            <Route path="/masters/tax/gst" element={<GSTRates />} />
            <Route path="/masters/tax/hsn-sac" element={<HSNSACCodes />} />
            <Route path="/masters/tax/cess" element={<Cess />} />
            
            {/* Batch Master */}
            <Route path="/masters/batch/numbers" element={<BatchNumbers />} />
            <Route path="/masters/batch/dates" element={<ManufacturingDates />} />
            <Route path="/masters/batch/serial" element={<SerialNumbers />} />
            
            {/* Customer Master */}
            <Route path="/masters/customer/retailers" element={<Retailers />} />
            <Route path="/masters/customer/distributors" element={<Distributors />} />
            <Route path="/masters/customer/wholesalers" element={<Wholesalers />} />
            
            {/* Vendor Master */}
            <Route path="/masters/vendor/fmcg" element={<FMCGSuppliers />} />
            <Route path="/masters/vendor/principals" element={<Principals />} />
            <Route path="/masters/vendor/service" element={<ServiceProviders />} />
            
            {/* Warehouse Master */}
            <Route path="/masters/warehouse/main" element={<MainWarehouse />} />
            <Route path="/masters/warehouse/branch" element={<BranchWarehouse />} />
            <Route path="/masters/warehouse/sub" element={<SubWarehouse />} />
            
            {/* Route Master */}
            <Route path="/masters/route/territories" element={<Territories />} />
            
            {/* Employee Master */}
            <Route path="/masters/employee/field-staff" element={<FieldStaff />} />
            <Route path="/masters/employee/sales-rep" element={<SalesReps />} />
            
            {/* Vehicle Master */}
            <Route path="/masters/vehicle/vehicles" element={<Vehicles />} />
            <Route path="/masters/vehicle/drivers" element={<Drivers />} />
            <Route path="/masters/vehicle/partners" element={<Partners />} />
            <Route path="/masters/vehicle/expenses" element={<Expenses />} />
            
            {/* Bank Master */}
            <Route path="/masters/bank/accounts" element={<Accounts />} />
            <Route path="/masters/bank/payment-modes" element={<PaymentModes />} />
            
            {/* Scheme Master */}
            <Route path="/masters/scheme/promotions" element={<Promotions />} />
            <Route path="/masters/scheme/free-qty" element={<FreeQty />} />
            <Route path="/masters/scheme/slab-discounts" element={<SlabDiscounts />} />
            
            {/* Document Master */}
            <Route path="/masters/document/invoice" element={<InvoiceNumbering />} />
            <Route path="/masters/document/receipt" element={<ReceiptNumbering />} />
            <Route path="/masters/document/voucher" element={<VoucherNumbering />} />
            
            {/* Company Master */}
            <Route path="/masters/company/multi-company" element={<MultiCompany />} />
            <Route path="/masters/company/multi-branch" element={<MultiBranch />} />
            
            {/* User Master */}
            <Route path="/masters/user/management" element={<UserManagementMaster />} />
            <Route path="/masters/user/roles" element={<Roles />} />
            <Route path="/masters/user/alerts" element={<Alerts />} />
            
            {/* Opening Balance Master */}
            <Route path="/masters/opening/ledger" element={<LedgerOpeningBalanceMaster />} />
            <Route path="/masters/opening/stock" element={<StockOpeningBalance />} />
            
            {/* Line Sale Master */}
            <Route path="/masters/line-sale/opening" element={<OpeningStock />} />
            <Route path="/masters/line-sale/invoices" element={<LineSaleInvoices />} />
            <Route path="/masters/line-sale/closing" element={<ClosingStock />} />
            <Route path="/masters/line-sale/returns" element={<LineSaleReturns />} />
            
            {/* Return Master */}
            <Route path="/masters/return/resalable" element={<ResalableReturns />} />
            <Route path="/masters/return/unsalable" element={<UnsalableReturns />} />
            
            {/* Other Masters */}
            <Route path="/masters/customers" element={<CustomerMaster />} />
            <Route path="/masters/vendors" element={<VendorMaster />} />
            <Route path="/masters/items" element={<ItemMaster />} />
            <Route path="/masters/warehouses" element={<WarehouseMaster />} />
            <Route path="/masters/ledgers" element={<LedgerMaster />} />
            <Route path="/masters/employees" element={<EmployeeMaster />} />
            <Route path="/masters/routes" element={<RouteMaster />} />
            <Route path="/masters/vehicles" element={<VehicleMaster />} />
            
            {/* Transactions */}
            {/* Sales */}
            <Route path="/transactions/sales/cash" element={<SalesInvoice />} />
            <Route path="/transactions/sales/credit" element={<SalesInvoice />} />
            <Route path="/transactions/sales/gst-invoice" element={<SalesInvoice />} />
            <Route path="/transactions/sales/returns" element={<Returns />} />
            
            {/* Purchase */}
            <Route path="/transactions/purchase/cash" element={<PurchaseOrder />} />
            <Route path="/transactions/purchase/credit" element={<PurchaseOrder />} />
            <Route path="/transactions/purchase/grn" element={<PurchaseOrder />} />
            
            {/* Payment */}
            <Route path="/transactions/payment/supplier" element={<Payment />} />
            <Route path="/transactions/payment/employee" element={<Payment />} />
            <Route path="/transactions/payment/miscellaneous" element={<Payment />} />
            
            {/* Receipt */}
            <Route path="/transactions/receipt/customers" element={<Receipt />} />
            <Route path="/transactions/receipt/other-income" element={<Receipt />} />
            
            {/* Journal */}
            <Route path="/transactions/journal/adjustment" element={<Journal />} />
            <Route path="/transactions/journal/contra" element={<Journal />} />
            <Route path="/transactions/journal/debit-note" element={<Journal />} />
            <Route path="/transactions/journal/credit-note" element={<Journal />} />
            
            {/* Stock Transfer */}
            <Route path="/transactions/stock-transfer/warehouses" element={<StockTransfer />} />
            <Route path="/transactions/stock-transfer/branches" element={<StockTransfer />} />
            
            {/* Legacy routes for backward compatibility */}
            <Route path="/transactions/sales-invoice" element={<SalesInvoice />} />
            <Route path="/transactions/purchase-order" element={<PurchaseOrder />} />
            <Route path="/transactions/payment" element={<Payment />} />
            <Route path="/transactions/receipt" element={<Receipt />} />
            <Route path="/transactions/journal" element={<Journal />} />
            <Route path="/transactions/stock-transfer" element={<StockTransfer />} />
            <Route path="/transactions/returns" element={<Returns />} />
            
            {/* Inventory */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/stock-summary" element={<StockSummaryInventory />} />
            <Route path="/inventory/batch-expiry" element={<BatchExpiryInventory />} />
            <Route path="/inventory/reorder-alerts" element={<ReorderLevel />} />
            <Route path="/inventory/rack-stacking" element={<RackManagement />} />
            <Route path="/inventory/stock-valuation" element={<StockValuation />} />
            
            {/* Legacy inventory routes */}
            <Route path="/inventory/reorder-level" element={<ReorderLevel />} />
            <Route path="/inventory/rack-management" element={<RackManagement />} />
            
            {/* Reports */}
            <Route path="/reports/financial" element={<FinancialReports />} />
            <Route path="/reports/inventory" element={<InventoryReports />} />
            <Route path="/reports/sales-purchase" element={<SalesPurchaseReports />} />
            <Route path="/reports/payroll" element={<PayrollReports />} />
            <Route path="/reports/targets" element={<TargetReports />} />
            <Route path="/reports/financial/trial-balance" element={<TrialBalance />} />
            <Route path="/reports/financial/profit-loss" element={<ProfitLoss />} />
            <Route path="/reports/financial/balance-sheet" element={<BalanceSheet />} />
            <Route path="/reports/financial/cash-flow" element={<FinancialReports />} />
            <Route path="/reports/financial/bank-reconciliation" element={<FinancialReports />} />
            
            <Route path="/reports/inventory/stock-summary" element={<StockSummary />} />
            <Route path="/reports/inventory/batch-expiry" element={<InventoryReports />} />
            <Route path="/reports/inventory/item-movement" element={<InventoryReports />} />
            
            <Route path="/reports/sales-purchase/route-sales" element={<SalesPurchaseReports />} />
            <Route path="/reports/sales-purchase/customer-outstanding" element={<SalesPurchaseReports />} />
            <Route path="/reports/sales-purchase/supplier-history" element={<SalesPurchaseReports />} />
            <Route path="/reports/sales-purchase/salesman-performance" element={<SalesmanPerformance />} />
            
            <Route path="/reports/payroll/salary-register" element={<PayrollReports />} />
            <Route path="/reports/payroll/attendance" element={<PayrollReports />} />
            <Route path="/reports/payroll/pf-esi" element={<PayrollReports />} />
            
            <Route path="/reports/target/brand-targets" element={<TargetReports />} />
            <Route path="/reports/target/incentives" element={<TargetReports />} />
            
            {/* Utilities */}
            {/* Alerts & Notifications */}
            <Route path="/utilities/alerts/stock-shortage" element={<SystemAlerts />} />
            <Route path="/utilities/alerts/payment-due" element={<SystemAlerts />} />
            <Route path="/utilities/alerts/expiry" element={<SystemAlerts />} />
            
            {/* Document Management */}
            <Route path="/utilities/document/upload" element={<DocumentManagement />} />
            <Route path="/utilities/document/attach" element={<DocumentManagement />} />
            
            {/* Other Utilities */}
            <Route path="/utilities/backup" element={<BackupRestore />} />
            <Route path="/utilities/audit-logs" element={<AuditLogs />} />
            <Route path="/utilities/budgeting" element={<Page title="Budgeting & Cost Control" />} />
            <Route path="/utilities/multi-currency" element={<Page title="Multi-Currency / Multi-Language" />} />
            <Route path="/utilities/barcoding" element={<Page title="Barcoding & Scanning" />} />
            
            {/* Legacy utility routes */}
            <Route path="/utilities/alerts" element={<SystemAlerts />} />
            <Route path="/utilities/documents" element={<DocumentManagement />} />
            <Route path="/utilities/sync-queue" element={<SyncQueue />} />
            <Route path="/utilities/users" element={<UserManagement />} />
            
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
