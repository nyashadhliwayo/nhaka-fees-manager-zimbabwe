
import React from 'react';
import Layout from '../components/Layout';

const Reports = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Payment Reports</h1>
        <p className="text-muted-foreground">Generate and export payment reports</p>
      </div>
      
      <div className="nhaka-card mb-6">
        <h2 className="text-xl font-bold mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="nhaka-label" htmlFor="report-term">Term</label>
            <select id="report-term" className="nhaka-select">
              <option value="all">All Terms</option>
              <option value="term1-2025" selected>Term 1, 2025</option>
              <option value="term3-2024">Term 3, 2024</option>
              <option value="term2-2024">Term 2, 2024</option>
              <option value="term1-2024">Term 1, 2024</option>
            </select>
          </div>
          
          <div>
            <label className="nhaka-label" htmlFor="report-class">Class/Form</label>
            <select id="report-class" className="nhaka-select">
              <option value="all">All Classes</option>
              <option value="form1">Form 1</option>
              <option value="form2">Form 2</option>
              <option value="form3">Form 3</option>
              <option value="form4">Form 4</option>
            </select>
          </div>
          
          <div>
            <label className="nhaka-label" htmlFor="report-currency">Currency</label>
            <select id="report-currency" className="nhaka-select">
              <option value="all">All Currencies</option>
              <option value="usd">USD</option>
              <option value="zig">ZIG (ZWL)</option>
            </select>
          </div>
          
          <div>
            <label className="nhaka-label" htmlFor="report-status">Payment Status</label>
            <select id="report-status" className="nhaka-select">
              <option value="all">All Statuses</option>
              <option value="paid">Fully Paid</option>
              <option value="partial">Partial Payment</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          
          <div>
            <label className="nhaka-label" htmlFor="report-date-from">Date From</label>
            <input id="report-date-from" type="date" className="nhaka-input" />
          </div>
          
          <div>
            <label className="nhaka-label" htmlFor="report-date-to">Date To</label>
            <input id="report-date-to" type="date" className="nhaka-input" />
          </div>
          
          <div>
            <label className="nhaka-label" htmlFor="report-student">Student (Optional)</label>
            <input id="report-student" type="text" className="nhaka-input" placeholder="Enter student name or ID" />
          </div>
          
          <div className="flex items-end">
            <button className="nhaka-btn-primary w-full">
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="nhaka-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment Report: Term 1, 2025</h2>
          <div className="flex space-x-2">
            <button className="nhaka-btn-outline text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
            <button className="nhaka-btn-outline text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="nhaka-table">
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Student</th>
                <th>Class</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Payment Date</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RC-2025-0123</td>
                <td>Tatenda Moyo</td>
                <td>Form 3A</td>
                <td>$350.00</td>
                <td>USD</td>
                <td>May 5, 2025</td>
                <td>Bank Transfer</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>J. Moyo</td>
              </tr>
              <tr>
                <td>RC-2025-0122</td>
                <td>Chiedza Mutasa</td>
                <td>Form 4B</td>
                <td>$420.00</td>
                <td>USD</td>
                <td>May 5, 2025</td>
                <td>Cash</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>J. Moyo</td>
              </tr>
              <tr>
                <td>RC-2025-0121</td>
                <td>Farai Ndlovu</td>
                <td>Form 2C</td>
                <td>ZWL 1,200,000</td>
                <td>ZIG</td>
                <td>May 4, 2025</td>
                <td>Mobile Money</td>
                <td><span className="nhaka-badge-yellow">Pending</span></td>
                <td>T. Ndlovu</td>
              </tr>
              <tr>
                <td>RC-2025-0120</td>
                <td>Ruvimbo Dziva</td>
                <td>Form 1A</td>
                <td>$275.00</td>
                <td>USD</td>
                <td>May 4, 2025</td>
                <td>Cash</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>T. Ndlovu</td>
              </tr>
              <tr>
                <td>RC-2025-0119</td>
                <td>Tendai Chikowore</td>
                <td>Form 2B</td>
                <td>$500.00</td>
                <td>USD</td>
                <td>May 3, 2025</td>
                <td>Bank Transfer</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>J. Moyo</td>
              </tr>
              <tr>
                <td>RC-2025-0118</td>
                <td>Simba Madzima</td>
                <td>Form 4A</td>
                <td>$325.00</td>
                <td>USD</td>
                <td>May 3, 2025</td>
                <td>Cash</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>T. Ndlovu</td>
              </tr>
              <tr>
                <td>RC-2025-0117</td>
                <td>Nyasha Gumbo</td>
                <td>Form 1C</td>
                <td>ZWL 875,000</td>
                <td>ZIG</td>
                <td>May 2, 2025</td>
                <td>Mobile Money</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>J. Moyo</td>
              </tr>
              <tr>
                <td>RC-2025-0116</td>
                <td>Tawanda Moyo</td>
                <td>Form 3B</td>
                <td>$280.00</td>
                <td>USD</td>
                <td>May 2, 2025</td>
                <td>Check</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>J. Moyo</td>
              </tr>
              <tr>
                <td>RC-2025-0115</td>
                <td>Kudzai Ncube</td>
                <td>Form 4C</td>
                <td>$450.00</td>
                <td>USD</td>
                <td>May 1, 2025</td>
                <td>Bank Transfer</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
                <td>T. Ndlovu</td>
              </tr>
              <tr>
                <td>RC-2025-0114</td>
                <td>Vimbai Moyo</td>
                <td>Form 2A</td>
                <td>ZWL 980,000</td>
                <td>ZIG</td>
                <td>May 1, 2025</td>
                <td>Mobile Money</td>
                <td><span className="nhaka-badge-yellow">Pending</span></td>
                <td>T. Ndlovu</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="font-medium">
                <td colSpan={3}>Total (USD)</td>
                <td>$2,600.00</td>
                <td colSpan={5}></td>
              </tr>
              <tr className="font-medium">
                <td colSpan={3}>Total (ZIG)</td>
                <td>ZWL 3,055,000</td>
                <td colSpan={5}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 10 of 156 entries
          </div>
          <div className="flex space-x-1">
            <button className="nhaka-btn-outline text-sm px-3 py-1" disabled>Previous</button>
            <button className="nhaka-btn-primary text-sm px-3 py-1">1</button>
            <button className="nhaka-btn-outline text-sm px-3 py-1">2</button>
            <button className="nhaka-btn-outline text-sm px-3 py-1">3</button>
            <button className="nhaka-btn-outline text-sm px-3 py-1">...</button>
            <button className="nhaka-btn-outline text-sm px-3 py-1">16</button>
            <button className="nhaka-btn-outline text-sm px-3 py-1">Next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
