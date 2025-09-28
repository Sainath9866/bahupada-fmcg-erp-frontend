import React, { useState } from 'react';
import { Wrench, Download, Info, CheckCircle2 } from 'lucide-react';

const DownloadPrintServer = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Placeholder download - replace with real URL when available
    const link = document.createElement('a');
    link.href = 'https://example.com/print-server/PrintServer-Setup.exe';
    link.download = 'PrintServer-Setup.exe';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => setIsDownloading(false), 1200);
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{ padding: window.innerWidth < 640 ? '4px' : '24px', maxWidth: window.innerWidth < 640 ? '100vw' : '100%', width: window.innerWidth < 640 ? '100vw' : 'auto', overflowX: 'hidden', margin: 0, boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="bg-purple-600 text-white px-1 sm:px-6 py-1 sm:py-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2" style={{ fontSize: window.innerWidth < 640 ? '11px' : '16px' }}>
          <Wrench size={14} className="sm:w-5 sm:h-5" />
          <span className="font-semibold">{window.innerWidth < 640 ? 'Utilities' : 'Utilities'}</span>
          <span className="text-purple-200">›</span>
          <span className="font-semibold">{window.innerWidth < 640 ? 'Download Print Server' : 'Download Print Server'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg" style={{ margin: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ padding: window.innerWidth < 640 ? '8px' : '24px', margin: 0, boxSizing: 'border-box' }}>
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6">Home › Utilities › Download Print Server</div>

            {/* About */}
            <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-purple-600 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Install the Print Server service on your Windows machine to enable direct printing
                  of invoices and reports from this application. Administrator privileges are required
                  for installation.
                </p>
              </div>
            </div>

            {/* Download card */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Print Server for Windows</h3>
              <p className="text-sm text-gray-600 mb-4">Version 1.0.0 · Supports Windows 10 and above</p>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg text-white transition-colors ${isDownloading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                <Download size={16} /> {isDownloading ? 'Downloading…' : 'Download Installer (.exe)'}
              </button>
            </div>

            {/* Steps */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="text-md font-semibold text-gray-800 mb-4">Installation steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Run the downloaded installer as Administrator.</li>
                <li>Accept the license and complete the setup wizard.</li>
                <li>Ensure the service "Botree Print Server" is running.</li>
                <li>Allow the service through Windows Defender Firewall when prompted.</li>
                <li>Return to this app and try printing a sample document.</li>
              </ol>
              <div className="mt-4 flex items-start gap-2 text-green-700 text-sm">
                <CheckCircle2 size={16} />
                <span>If printing fails, restart the Print Server service and refresh this page.</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-right text-sm text-gray-500">
              <p>Botree Software International Pvt Ltd</p>
              <p>© All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPrintServer;





