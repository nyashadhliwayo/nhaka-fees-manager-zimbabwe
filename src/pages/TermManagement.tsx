
import React from 'react';
import Layout from '../components/Layout';

const TermManagement = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Term Management</h1>
        <p className="text-muted-foreground">Manage school terms and academic calendar</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="nhaka-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Academic Terms</h2>
              <button className="nhaka-btn-primary text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Term
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="nhaka-table">
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Term 1</td>
                    <td>2025</td>
                    <td>Jan 15, 2025</td>
                    <td>Apr 10, 2025</td>
                    <td>12 weeks</td>
                    <td><span className="nhaka-badge-green">Current</span></td>
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
                    <td>Term 3</td>
                    <td>2024</td>
                    <td>Sep 9, 2024</td>
                    <td>Dec 5, 2024</td>
                    <td>13 weeks</td>
                    <td><span className="nhaka-badge-blue">Completed</span></td>
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
                    <td>Term 2</td>
                    <td>2024</td>
                    <td>May 14, 2024</td>
                    <td>Aug 15, 2024</td>
                    <td>14 weeks</td>
                    <td><span className="nhaka-badge-blue">Completed</span></td>
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
                    <td>Term 1</td>
                    <td>2024</td>
                    <td>Jan 15, 2024</td>
                    <td>Apr 12, 2024</td>
                    <td>13 weeks</td>
                    <td><span className="nhaka-badge-blue">Completed</span></td>
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
                    <td>Term 3</td>
                    <td>2023</td>
                    <td>Sep 11, 2023</td>
                    <td>Dec 7, 2023</td>
                    <td>13 weeks</td>
                    <td><span className="nhaka-badge-blue">Completed</span></td>
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
          <div className="nhaka-card mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Term</h2>
            <form>
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="term-name">Term Name</label>
                <select id="term-name" className="nhaka-select">
                  <option value="">Select term</option>
                  <option value="term1">Term 1</option>
                  <option value="term2">Term 2</option>
                  <option value="term3">Term 3</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="term-year">Academic Year</label>
                <select id="term-year" className="nhaka-select">
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="term-start">Start Date</label>
                <input id="term-start" type="date" className="nhaka-input" />
              </div>
              
              <div className="mb-6">
                <label className="nhaka-label" htmlFor="term-end">End Date</label>
                <input id="term-end" type="date" className="nhaka-input" />
              </div>
              
              <div className="flex space-x-2">
                <button type="submit" className="nhaka-btn-primary flex-1">
                  Create Term
                </button>
                <button type="button" className="nhaka-btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
          <div className="nhaka-card">
            <h2 className="text-xl font-bold mb-4">Current Term</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium">Term 1, 2025</h3>
                  <p className="text-sm text-muted-foreground">January 15 - April 10, 2025</p>
                </div>
                <span className="nhaka-badge-green">Active</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Start</span>
                <span>60% Complete</span>
                <span>End</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-md">
                <p className="text-sm text-muted-foreground">Days Elapsed</p>
                <p className="text-2xl font-bold">54</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-md">
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="text-2xl font-bold">36</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermManagement;
