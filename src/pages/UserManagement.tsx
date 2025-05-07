
import React from 'react';
import Layout from '../components/Layout';

const UserManagement = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage system users and access permissions</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="nhaka-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">System Users</h2>
              <button className="nhaka-btn-primary text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </button>
            </div>
            
            <div className="flex mb-4">
              <div className="relative w-64">
                <input 
                  type="text" 
                  className="nhaka-input pl-9" 
                  placeholder="Search users..."
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
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Moyo</td>
                    <td>jmoyo</td>
                    <td>jmoyo@nhaka.edu.zw</td>
                    <td>Super Admin</td>
                    <td><span className="nhaka-badge-green">Active</span></td>
                    <td>May 7, 2025 (Today)</td>
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
                    <td>Tendai Ndlovu</td>
                    <td>tndlovu</td>
                    <td>tndlovu@nhaka.edu.zw</td>
                    <td>School Head</td>
                    <td><span className="nhaka-badge-green">Active</span></td>
                    <td>May 7, 2025 (Today)</td>
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
                    <td>Grace Sithole</td>
                    <td>gsithole</td>
                    <td>gsithole@nhaka.edu.zw</td>
                    <td>Clerk</td>
                    <td><span className="nhaka-badge-green">Active</span></td>
                    <td>May 6, 2025</td>
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
                    <td>Blessing Moyo</td>
                    <td>bmoyo</td>
                    <td>bmoyo@nhaka.edu.zw</td>
                    <td>Clerk</td>
                    <td><span className="nhaka-badge-green">Active</span></td>
                    <td>May 5, 2025</td>
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
                    <td>Samuel Chirinda</td>
                    <td>schirinda</td>
                    <td>schirinda@nhaka.edu.zw</td>
                    <td>Clerk</td>
                    <td><span className="nhaka-badge-red">Inactive</span></td>
                    <td>Mar 15, 2025</td>
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
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form>
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="user-fullname">Full Name</label>
                <input id="user-fullname" type="text" className="nhaka-input" placeholder="Enter full name" />
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="user-username">Username</label>
                <input id="user-username" type="text" className="nhaka-input" placeholder="Enter username" />
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="user-email">Email Address</label>
                <input id="user-email" type="email" className="nhaka-input" placeholder="Enter email address" />
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="user-role">Role</label>
                <select id="user-role" className="nhaka-select">
                  <option value="">Select role</option>
                  <option value="admin">Super Admin</option>
                  <option value="head">School Head</option>
                  <option value="clerk">Clerk</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="nhaka-label" htmlFor="user-password">Password</label>
                <input id="user-password" type="password" className="nhaka-input" placeholder="Enter password" />
              </div>
              
              <div className="mb-6">
                <label className="nhaka-label" htmlFor="user-confirm-password">Confirm Password</label>
                <input id="user-confirm-password" type="password" className="nhaka-input" placeholder="Confirm password" />
              </div>
              
              <div className="flex space-x-2">
                <button type="submit" className="nhaka-btn-primary flex-1">
                  Create User
                </button>
                <button type="button" className="nhaka-btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
          <div className="nhaka-card">
            <h2 className="text-xl font-bold mb-4">Role Permissions</h2>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Super Admin</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full system access
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manage users and permissions
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Configure system settings
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">School Head</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  View all financial reports
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manage fee structures
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approve payment adjustments
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Clerk</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Record student payments
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  View student payment history
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generate payment receipts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
