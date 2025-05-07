
import React from 'react';
import Layout from '../components/Layout';

const FeeStructure = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fee Structure Management</h1>
        <p className="text-muted-foreground">Manage school fees and payment structure</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <div className="nhaka-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Current Fee Structure</h2>
              <div className="flex space-x-2">
                <button className="nhaka-btn-outline text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
                <button className="nhaka-btn-primary text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Fee
                </button>
              </div>
            </div>
            
            <div className="flex mb-4">
              <div className="relative w-64">
                <input 
                  type="text" 
                  className="nhaka-input pl-9" 
                  placeholder="Search fees..."
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="nhaka-table">
                <thead>
                  <tr>
                    <th>Fee Name</th>
                    <th>Amount (USD)</th>
                    <th>Amount (ZIG)</th>
                    <th>Frequency</th>
                    <th>Required</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tuition Fee</td>
                    <td>$250</td>
                    <td>ZWL 875,000</td>
                    <td>Per Term</td>
                    <td>
                      <span className="nhaka-badge-blue">Required</span>
                    </td>
                    <td className="flex space-x-1">
                      <button className="p-1 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Boarding Fee</td>
                    <td>$320</td>
                    <td>ZWL 1,120,000</td>
                    <td>Per Term</td>
                    <td>
                      <span className="nhaka-badge-yellow">Optional</span>
                    </td>
                    <td className="flex space-x-1">
                      <button className="p-1 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Technology Fee</td>
                    <td>$35</td>
                    <td>ZWL 122,500</td>
                    <td>Per Term</td>
                    <td>
                      <span className="nhaka-badge-blue">Required</span>
                    </td>
                    <td className="flex space-x-1">
                      <button className="p-1 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Sports Fee</td>
                    <td>$25</td>
                    <td>ZWL 87,500</td>
                    <td>Per Term</td>
                    <td>
                      <span className="nhaka-badge-blue">Required</span>
                    </td>
                    <td className="flex space-x-1">
                      <button className="p-1 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>School Uniform</td>
                    <td>$85</td>
                    <td>ZWL 297,500</td>
                    <td>Once-off</td>
                    <td>
                      <span className="nhaka-badge-yellow">Optional</span>
                    </td>
                    <td className="flex space-x-1">
                      <button className="p-1 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="nhaka-card">
            <h2 className="text-xl font-bold mb-4">Add New Fee</h2>
            <form>
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="fee-name">Fee Name</label>
                <input id="fee-name" type="text" className="nhaka-input" placeholder="e.g., Tuition Fee" />
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="fee-amount-usd">Amount (USD)</label>
                <input id="fee-amount-usd" type="text" className="nhaka-input" placeholder="0.00" />
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="fee-amount-zig">Amount (ZIG)</label>
                <input id="fee-amount-zig" type="text" className="nhaka-input" placeholder="0.00" />
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="fee-frequency">Frequency</label>
                <select id="fee-frequency" className="nhaka-select">
                  <option value="">Select frequency</option>
                  <option value="term">Per Term</option>
                  <option value="once">Once-off</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span>Required fee (mandatory for all students)</span>
                </label>
              </div>
              
              <div className="flex space-x-2">
                <button type="submit" className="nhaka-btn-primary flex-1">
                  Save Fee
                </button>
                <button type="button" className="nhaka-btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
          <div className="nhaka-card mt-6">
            <h2 className="text-xl font-bold mb-4">Exchange Rate</h2>
            <form>
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="exchange-rate">USD to ZIG Rate</label>
                <input id="exchange-rate" type="text" className="nhaka-input" placeholder="1 USD = ? ZIG" value="1 USD = ZWL 3,500" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">Last updated: May 7, 2025 (Today)</p>
              <button type="submit" className="nhaka-btn-outline w-full">
                Update Exchange Rate
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeeStructure;
