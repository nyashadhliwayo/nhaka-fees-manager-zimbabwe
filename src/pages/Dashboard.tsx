
import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of fees collection for the current term</p>
      </div>
      
      {/* Term Info */}
      <div className="mb-6 nhaka-card bg-primary/5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Current Term</h2>
            <p className="text-xl font-bold">Term 1, 2025</p>
            <p className="text-sm text-muted-foreground">January 15 - April 10, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Days Remaining</p>
            <p className="text-3xl font-bold text-primary">45</p>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="nhaka-card">
          <h3 className="text-muted-foreground mb-1">Total Fees Due (USD)</h3>
          <p className="text-3xl font-bold">$125,450</p>
          <div className="mt-2 flex items-center">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <span className="text-sm text-muted-foreground ml-2">65%</span>
          </div>
        </div>
        
        <div className="nhaka-card">
          <h3 className="text-muted-foreground mb-1">Total Collected (USD)</h3>
          <p className="text-3xl font-bold">$81,542</p>
          <div className="mt-2 flex items-center">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <span className="text-sm text-muted-foreground ml-2">65%</span>
          </div>
        </div>
        
        <div className="nhaka-card">
          <h3 className="text-muted-foreground mb-1">Total Arrears (USD)</h3>
          <p className="text-3xl font-bold">$43,908</p>
          <div className="mt-2 flex items-center">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
            </div>
            <span className="text-sm text-muted-foreground ml-2">35%</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="nhaka-card">
        <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
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
        <div className="mt-4 text-right">
          <button className="nhaka-btn-outline text-sm">View All Payments</button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
