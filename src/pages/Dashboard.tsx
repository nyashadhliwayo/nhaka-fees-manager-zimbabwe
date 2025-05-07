
import React from 'react';
import Layout from '../components/Layout';
import { 
  BarChart2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  BookOpen,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <div className="mb-6">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/dashboard" className="text-sm text-gray-700 hover:text-akkhor-yellow">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-500">Dashboard</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of fees collection for the current term</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="nhaka-card bg-white">
          <div className="flex items-center">
            <div className="stats-icon bg-green-100 text-green-500">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <div className="stats-label">Students</div>
              <div className="stats-value">1,250</div>
            </div>
          </div>
        </div>
        
        <div className="nhaka-card bg-white">
          <div className="flex items-center">
            <div className="stats-icon bg-blue-100 text-blue-500">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <div className="stats-label">Teachers</div>
              <div className="stats-value">86</div>
            </div>
          </div>
        </div>
        
        <div className="nhaka-card bg-white">
          <div className="flex items-center">
            <div className="stats-icon bg-yellow-100 text-yellow-500">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <div className="stats-label">Total Fees Due</div>
              <div className="stats-value">$125,450</div>
            </div>
          </div>
        </div>
        
        <div className="nhaka-card bg-white">
          <div className="flex items-center">
            <div className="stats-icon bg-red-100 text-red-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <div className="stats-label">Total Collected</div>
              <div className="stats-value">$81,542</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Term Info */}
      <div className="mb-6 nhaka-card bg-white border-l-4 border-l-akkhor-yellow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Current Term</h2>
            <p className="text-xl font-bold">Term 1, 2025</p>
            <p className="text-sm text-muted-foreground">January 15 - April 10, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Days Remaining</p>
            <p className="text-3xl font-bold text-akkhor-blue">45</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Fees Collection Chart */}
        <div className="nhaka-card bg-white lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Fees Collection & Expenses</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-akkhor-blue">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
              <button className="text-sm text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex mb-4">
            <div className="flex items-center mr-4">
              <span className="h-3 w-3 block bg-blue-500 rounded-sm mr-2"></span>
              <span className="text-sm">Collections ($10,000)</span>
            </div>
            <div className="flex items-center mr-4">
              <span className="h-3 w-3 block bg-red-500 rounded-sm mr-2"></span>
              <span className="text-sm">Fees ($8,000)</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 block bg-yellow-500 rounded-sm mr-2"></span>
              <span className="text-sm">Expenses ($5,000)</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-around pb-4">
            <div className="w-1/3 flex flex-col items-center">
              <div className="bg-blue-500 h-48 w-16 rounded-t-md"></div>
              <span className="text-xs mt-2">Collections</span>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <div className="bg-red-500 h-32 w-16 rounded-t-md"></div>
              <span className="text-xs mt-2">Fees</span>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <div className="bg-yellow-500 h-24 w-16 rounded-t-md"></div>
              <span className="text-xs mt-2">Expenses</span>
            </div>
          </div>
        </div>
        
        {/* Calendar */}
        <div className="nhaka-card bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Calendar</h3>
            <div className="flex">
              <button className="p-1 text-akkhor-blue">
                <Calendar className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="text-center mb-2">
            <h4 className="font-medium">May 2025</h4>
          </div>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="py-2">Sun</th>
                <th className="py-2">Mon</th>
                <th className="py-2">Tue</th>
                <th className="py-2">Wed</th>
                <th className="py-2">Thu</th>
                <th className="py-2">Fri</th>
                <th className="py-2">Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-sm">
                <td className="py-2 text-muted-foreground">30</td>
                <td className="py-2">1</td>
                <td className="py-2">2</td>
                <td className="py-2">3</td>
                <td className="py-2">4</td>
                <td className="py-2">5</td>
                <td className="py-2">6</td>
              </tr>
              <tr className="text-center text-sm">
                <td className="py-2">7</td>
                <td className="py-2 bg-akkhor-yellow text-akkhor-blue rounded-full">8</td>
                <td className="py-2">9</td>
                <td className="py-2">10</td>
                <td className="py-2">11</td>
                <td className="py-2">12</td>
                <td className="py-2">13</td>
              </tr>
              <tr className="text-center text-sm">
                <td className="py-2">14</td>
                <td className="py-2">15</td>
                <td className="py-2">16</td>
                <td className="py-2">17</td>
                <td className="py-2">18</td>
                <td className="py-2">19</td>
                <td className="py-2">20</td>
              </tr>
              <tr className="text-center text-sm">
                <td className="py-2">21</td>
                <td className="py-2">22</td>
                <td className="py-2">23</td>
                <td className="py-2">24</td>
                <td className="py-2">25</td>
                <td className="py-2">26</td>
                <td className="py-2">27</td>
              </tr>
              <tr className="text-center text-sm">
                <td className="py-2">28</td>
                <td className="py-2">29</td>
                <td className="py-2">30</td>
                <td className="py-2">31</td>
                <td className="py-2 text-muted-foreground">1</td>
                <td className="py-2 text-muted-foreground">2</td>
                <td className="py-2 text-muted-foreground">3</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-4 border-t pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">School Opening</span>
              <span className="text-xs text-muted-foreground">May 8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fee Payment Deadline</span>
              <span className="text-xs text-muted-foreground">May 15</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="nhaka-card bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Payments</h3>
          <Link to="/students" className="text-akkhor-blue hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="nhaka-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Date</th>
                <th>Receipt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tatenda Moyo</td>
                <td>$350</td>
                <td>USD</td>
                <td>May 5, 2025</td>
                <td>RC-2025-0123</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
              </tr>
              <tr>
                <td>Chiedza Mutasa</td>
                <td>$420</td>
                <td>USD</td>
                <td>May 5, 2025</td>
                <td>RC-2025-0122</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
              </tr>
              <tr>
                <td>Farai Ndlovu</td>
                <td>ZWL 1,200,000</td>
                <td>ZIG</td>
                <td>May 4, 2025</td>
                <td>RC-2025-0121</td>
                <td><span className="nhaka-badge-yellow">Pending</span></td>
              </tr>
              <tr>
                <td>Ruvimbo Dziva</td>
                <td>$275</td>
                <td>USD</td>
                <td>May 4, 2025</td>
                <td>RC-2025-0120</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
              </tr>
              <tr>
                <td>Tendai Chikowore</td>
                <td>$500</td>
                <td>USD</td>
                <td>May 3, 2025</td>
                <td>RC-2025-0119</td>
                <td><span className="nhaka-badge-green">Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
