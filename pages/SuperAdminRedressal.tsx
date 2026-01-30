import React from 'react';

interface RedressalAnalytics {
  requestType: string;
  totalRequests: number;
  resolved: number;
  pending: number;
  escalated: number;
  averageResolutionTime: string;
}

interface RecentRedressalRequest {
  id: string;
  requestId: string;
  studentName: string;
  type: string;
  status: 'Resolved' | 'Pending' | 'Escalated';
  submittedOn: string;
  resolvedOn?: string;
  handledBy?: string;
}

const SuperAdminRedressal: React.FC = () => {
  const redressalAnalytics: RedressalAnalytics[] = [
    {
      requestType: 'Grade Correction',
      totalRequests: 45,
      resolved: 38,
      pending: 5,
      escalated: 2,
      averageResolutionTime: '4.2 days'
    },
    {
      requestType: 'Result Verification',
      totalRequests: 32,
      resolved: 28,
      pending: 3,
      escalated: 1,
      averageResolutionTime: '3.8 days'
    },
    {
      requestType: 'Mark Recalculation',
      totalRequests: 28,
      resolved: 24,
      pending: 3,
      escalated: 1,
      averageResolutionTime: '5.1 days'
    },
    {
      requestType: 'Other',
      totalRequests: 15,
      resolved: 12,
      pending: 2,
      escalated: 1,
      averageResolutionTime: '3.5 days'
    }
  ];

  const recentRequests: RecentRedressalRequest[] = [
    {
      id: '1',
      requestId: 'RED-2024-001',
      studentName: 'Rahul Sharma',
      type: 'Grade Correction',
      status: 'Resolved',
      submittedOn: '15 Oct 2024',
      resolvedOn: '18 Oct 2024',
      handledBy: 'Dr. Sharma'
    },
    {
      id: '2',
      requestId: 'RED-2024-002',
      studentName: 'Priya Patel',
      type: 'Result Verification',
      status: 'Pending',
      submittedOn: '20 Oct 2024',
      handledBy: 'Admin Clerk - Priya'
    },
    {
      id: '3',
      requestId: 'RED-2024-003',
      studentName: 'Amit Kumar',
      type: 'Mark Recalculation',
      status: 'Escalated',
      submittedOn: '18 Oct 2024',
      handledBy: 'Prof. Patel'
    }
  ];

  const totalRequests = redressalAnalytics.reduce((sum, item) => sum + item.totalRequests, 0);
  const totalResolved = redressalAnalytics.reduce((sum, item) => sum + item.resolved, 0);
  const totalPending = redressalAnalytics.reduce((sum, item) => sum + item.pending, 0);
  const totalEscalated = redressalAnalytics.reduce((sum, item) => sum + item.escalated, 0);

  // Calculate average resolution time across all types
  const averageResolutionTime = (
    redressalAnalytics.reduce((sum, item) => sum + parseFloat(item.averageResolutionTime), 0) / redressalAnalytics.length
  ).toFixed(1);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Escalated':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-serif font-bold text-stone-900 leading-tight mb-2">Redressal Analytics</h1>
        <p className="text-stone-500 text-sm">Grievance management overview and performance metrics</p>
      </header>

      {/* Grievance Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-100">
          <div className="text-3xl font-bold text-stone-800 mb-2">{totalRequests}</div>
          <div className="text-sm font-medium text-stone-500">Total Requests</div>
          <div className="text-xs text-stone-400 mt-1">All Time</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-200">
          <div className="text-3xl font-bold text-green-700 mb-2">{totalResolved}</div>
          <div className="text-sm font-medium text-stone-500">Resolved</div>
          <div className="text-xs text-stone-400 mt-1">{Math.round((totalResolved / totalRequests) * 100)}% Resolution Rate</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-300">
          <div className="text-3xl font-bold text-amber-600 mb-2">{totalPending}</div>
          <div className="text-sm font-medium text-stone-500">Pending</div>
          <div className="text-xs text-stone-400 mt-1">Awaiting Resolution</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-400">
          <div className="text-3xl font-bold text-[#5D4037] mb-2">{averageResolutionTime} days</div>
          <div className="text-sm font-medium text-stone-500">Avg Resolution Time</div>
          <div className="text-xs text-stone-400 mt-1">Across All Types</div>
        </div>
      </div>

      {/* Request Type Analytics Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-500">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-800">Request Type Analytics</h3>
          <p className="text-stone-500 text-sm mt-1">Performance breakdown by redressal category</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Request Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Total Requests</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Resolved</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Pending</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Escalated</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Avg Resolution</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {redressalAnalytics.map((item, index) => (
                <tr key={index} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-stone-800">{item.requestType}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-bold text-stone-800">{item.totalRequests}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-bold text-green-700">{item.resolved}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-bold text-amber-600">{item.pending}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-bold text-red-600">{item.escalated}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm text-stone-600">{item.averageResolutionTime}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-bold text-green-700">
                      {Math.round((item.resolved / item.totalRequests) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-300">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-800">Recent Redressal Activity</h3>
          <p className="text-stone-500 text-sm mt-1">Latest requests and resolutions</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold text-stone-800">{request.requestId}</span>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500">
                    {request.studentName} • {request.type} • Submitted {request.submittedOn}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-stone-600">
                    {request.status === 'Resolved' ? `Resolved ${request.resolvedOn}` : 'In Progress'}
                  </div>
                  <div className="text-xs text-stone-400 mt-1">by {request.handledBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-bold text-stone-800 mb-3">Resolution Rate</h4>
          <div className="text-2xl font-bold text-green-700 mb-1">{Math.round((totalResolved / totalRequests) * 100)}%</div>
          <div className="text-xs text-stone-500">Successfully resolved</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-bold text-stone-800 mb-3">Escalation Rate</h4>
          <div className="text-2xl font-bold text-red-600 mb-1">{Math.round((totalEscalated / totalRequests) * 100)}%</div>
          <div className="text-xs text-stone-500">Requires higher authority</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-bold text-stone-800 mb-3">Most Common</h4>
          <div className="text-2xl font-bold text-[#5D4037] mb-1">Grade</div>
          <div className="text-xs text-stone-500">Correction requests</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-bold text-stone-800 mb-3">Peak Month</h4>
          <div className="text-2xl font-bold text-stone-800 mb-1">October</div>
          <div className="text-xs text-stone-500">Highest request volume</div>
        </div>
      </div>

      {/* Escalation Alert */}
      {totalEscalated > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h4 className="text-sm font-bold text-red-800">Escalation Alert</h4>
          </div>
          <p className="text-sm text-red-700">
            {totalEscalated} request{totalEscalated > 1 ? 's' : ''} currently escalated and require{totalEscalated === 1 ? 's' : ''} immediate attention from higher authorities.
          </p>
        </div>
      )}
    </div>
  );
};

export default SuperAdminRedressal;