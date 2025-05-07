
import React from 'react';
import Layout from '../components/Layout';

const StudentPayment = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Student Payment</h1>
        <p className="text-muted-foreground">Record and manage student fee payments</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Student Search Section */}
        <div className="md:w-1/3">
          <div className="nhaka-card mb-6">
            <h2 className="text-xl font-bold mb-4">Find Student</h2>
            <div className="relative mb-4">
              <input 
                type="text" 
                className="nhaka-input pl-9" 
                placeholder="Search by name or ID..."
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 border border-border rounded-md bg-muted/20 cursor-pointer hover:bg-muted/50">
                <div className="flex justify-between">
                  <p className="font-medium">Tatenda Moyo</p>
                  <span className="nhaka-badge-green">Form 3A</span>
                </div>
                <p className="text-sm text-muted-foreground">ID: ST-2025-0123</p>
              </div>
              
              <div className="p-3 border border-primary rounded-md bg-primary/5 cursor-pointer">
                <div className="flex justify-between">
                  <p className="font-medium text-primary">Chiedza Mutasa</p>
                  <span className="nhaka-badge-green">Form 4B</span>
                </div>
                <p className="text-sm text-muted-foreground">ID: ST-2025-0124</p>
              </div>
              
              <div className="p-3 border border-border rounded-md bg-muted/20 cursor-pointer hover:bg-muted/50">
                <div className="flex justify-between">
                  <p className="font-medium">Farai Ndlovu</p>
                  <span className="nhaka-badge-green">Form 2C</span>
                </div>
                <p className="text-sm text-muted-foreground">ID: ST-2025-0125</p>
              </div>
              
              <div className="p-3 border border-border rounded-md bg-muted/20 cursor-pointer hover:bg-muted/50">
                <div className="flex justify-between">
                  <p className="font-medium">Ruvimbo Dziva</p>
                  <span className="nhaka-badge-green">Form 1A</span>
                </div>
                <p className="text-sm text-muted-foreground">ID: ST-2025-0126</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Details Section */}
        <div className="md:w-2/3">
          <div className="nhaka-card mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">Chiedza Mutasa</h2>
                <p className="text-muted-foreground">Form 4B • ID: ST-2025-0124</p>
              </div>
              <span className="nhaka-badge-yellow">Partial Payment</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/20 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Current Term</p>
                <p className="font-medium">Term 1, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <p className="font-medium">65% Paid</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Fees Due</p>
                <p className="font-medium">$650.00</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                <p className="font-medium text-red-600">$227.50</p>
              </div>
            </div>
            
            <h3 className="font-medium mb-2">Fee Breakdown</h3>
            <div className="overflow-x-auto mb-6">
              <table className="nhaka-table">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Balance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tuition Fee</td>
                    <td>$250.00</td>
                    <td>$250.00</td>
                    <td>$0.00</td>
                    <td><span className="nhaka-badge-green">Paid</span></td>
                  </tr>
                  <tr>
                    <td>Boarding Fee</td>
                    <td>$320.00</td>
                    <td>$150.00</td>
                    <td>$170.00</td>
                    <td><span className="nhaka-badge-yellow">Partial</span></td>
                  </tr>
                  <tr>
                    <td>Technology Fee</td>
                    <td>$35.00</td>
                    <td>$0.00</td>
                    <td>$35.00</td>
                    <td><span className="nhaka-badge-red">Unpaid</span></td>
                  </tr>
                  <tr>
                    <td>Sports Fee</td>
                    <td>$25.00</td>
                    <td>$2.50</td>
                    <td>$22.50</td>
                    <td><span className="nhaka-badge-yellow">Partial</span></td>
                  </tr>
                  <tr className="font-medium">
                    <td>Total</td>
                    <td>$650.00</td>
                    <td>$422.50</td>
                    <td>$227.50</td>
                    <td><span className="nhaka-badge-yellow">Partial</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="font-medium mb-2">Record Payment</h3>
            <form className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="nhaka-label" htmlFor="payment-amount">Amount</label>
                  <input id="payment-amount" type="text" className="nhaka-input" placeholder="0.00" />
                </div>
                <div>
                  <label className="nhaka-label" htmlFor="payment-currency">Currency</label>
                  <select id="payment-currency" className="nhaka-select">
                    <option value="usd">USD</option>
                    <option value="zig">ZIG (ZWL)</option>
                  </select>
                </div>
                <div>
                  <label className="nhaka-label" htmlFor="payment-date">Payment Date</label>
                  <input id="payment-date" type="date" className="nhaka-input" />
                </div>
                <div>
                  <label className="nhaka-label" htmlFor="payment-method">Payment Method</label>
                  <select id="payment-method" className="nhaka-select">
                    <option value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="mobile">Mobile Money</option>
                    <option value="check">Check</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="nhaka-label" htmlFor="payment-notes">Payment Notes</label>
                  <textarea id="payment-notes" className="nhaka-input" rows={2} placeholder="Additional notes about this payment..."></textarea>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button type="submit" className="nhaka-btn-primary flex-1">
                  Record Payment
                </button>
                <button type="button" className="nhaka-btn-outline">
                  Cancel
                </button>
              </div>
            </form>
            
            <h3 className="font-medium mb-2">Payment History</h3>
            <div className="overflow-x-auto">
              <table className="nhaka-table">
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Method</th>
                    <th>Recorded By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>RC-2025-0122</td>
                    <td>May 5, 2025</td>
                    <td>$150.00</td>
                    <td>USD</td>
                    <td>Bank Transfer</td>
                    <td>J. Moyo</td>
                    <td>
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>RC-2025-0095</td>
                    <td>Apr 12, 2025</td>
                    <td>$250.00</td>
                    <td>USD</td>
                    <td>Cash</td>
                    <td>T. Ndlovu</td>
                    <td>
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>RC-2025-0076</td>
                    <td>Jan 15, 2025</td>
                    <td>ZWL 8,750</td>
                    <td>ZIG</td>
                    <td>Mobile Money</td>
                    <td>T. Ndlovu</td>
                    <td>
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentPayment;
