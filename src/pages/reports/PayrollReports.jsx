import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Users, DollarSign, Calendar, User, Building, BarChart3, PieChart } from 'lucide-react';
import api from '../../lib/api';

const PayrollReports = () => {
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedReport, setSelectedReport] = useState('');

  const payrollReports = [
    { id: 'salary-summary', name: 'Salary Summary', description: 'Total salary payments by period' },
    { id: 'employee-wise', name: 'Employee Wise', description: 'Individual employee salary details' },
    { id: 'department-wise', name: 'Department Wise', description: 'Salary by department' },
    { id: 'attendance-summary', name: 'Attendance Summary', description: 'Employee attendance report' },
    { id: 'overtime-report', name: 'Overtime Report', description: 'Overtime hours and payments' },
    { id: 'deductions-report', name: 'Deductions Report', description: 'Salary deductions summary' },
    { id: 'bonus-report', name: 'Bonus Report', description: 'Bonus payments report' },
    { id: 'tax-summary', name: 'Tax Summary', description: 'Tax deductions and payments' }
  ];

  useEffect(() => {
    fetchReports();
    fetchEmployees();
  }, [dateFrom, dateTo, selectedEmployee, selectedReport]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      if (selectedEmployee) params.append('employee', selectedEmployee);
      if (selectedReport) params.append('report', selectedReport);
      
      const response = await api.get(`/reports/payroll?${params}`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching payroll reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDownload = async (reportId) => {
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      if (selectedEmployee) params.append('employee', selectedEmployee);
      
      const response = await api.get(`/reports/payroll/${reportId}/download?${params}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportId}-report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Reports</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchReports}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Generate Reports
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Employees</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchReports}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Salary</p>
              <p className="text-2xl font-bold text-gray-900">₹1,25,000</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <User className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-gray-900">{employees.filter(e => e.status === 'Active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payrollReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{report.description}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Period: {dateFrom || 'All'} to {dateTo || 'Current'}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(report.id)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setSelectedReport(report.id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Details */}
      {selectedReport && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {payrollReports.find(r => r.id === selectedReport)?.name} Report
          </h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Generating report...</div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">Report data will be displayed here</div>
              <div className="text-sm text-gray-400 mt-2">
                Select filters and click "Generate Reports" to view data
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PayrollReports;
