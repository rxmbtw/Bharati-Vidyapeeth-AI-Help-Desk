import React, { useState } from 'react';

interface RedressalRequest {
  id: string;
  requestId: string;
  studentName: string;
  prn: string;
  type: 'Grade Correction' | 'Result Verification' | 'Mark Recalculation' | 'Other';
  semester: string;
  submittedOn: string;
  status: 'Submitted' | 'Under Review' | 'Resolved' | 'Closed' | 'More Info Required';
  priority: 'High' | 'Medium' | 'Low';
  subject?: string;
}

const AdminRedressal: React.FC = () => {
  const [requests, setRequests] = useState<RedressalRequest[]>([
    {
      id: '1',
      requestId: 'RED-2024-001',
      studentName: 'Rahul Sharma',
      prn: 'PRN2024001',
      type: 'Grade Correction',
      semester: 'Semester 6',
      submittedOn: '15 Oct 2024',
      status: 'Submitted',
      priority: 'High',
      subject: 'Mathematics'
    },
    {
      id: '2',
      requestId: 'RED-2024-002',
      studentName: 'Priya Patel',
      prn: 'PRN2024002',
      type: 'Result Verification',
      semester: 'Semester 5',
      submittedOn: '20 Oct 2024',
      status: 'Under Review',
      priority: 'Medium'
    },
    {
      id: '3',
      requestId: 'RED-2024-003',
      studentName: 'Amit Kumar',
      prn: 'PRN2024003',
      type: 'Mark Recalculation',
      semester: 'Semester 4',
      submittedOn: '18 Oct 2024',
      status: 'More Info Required',
      priority: 'Low',
      subject: 'Physics'
    },
    {
      id: '4',
      requestId: 'RED-2024-004',
      studentName: 'Sneha Gupta',
      prn: 'PRN2024004',
      type: 'Other',
      semester: 'Semester 6',
      submittedOn: '22 Oct 2024',
      status: 'Resolved',
      priority: 'Medium'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<RedressalRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [adminRemarks, setAdminRemarks] = useState('');

  const handleStatusUpdate = (requestId: string, newStatus: RedressalRequest['status']) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const handleViewDetails = (request: RedressalRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
    setAdminRemarks('');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Closed':
        return 'bg-stone-50 text-stone-500 border-stone-200';
      case 'Submitted':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'More Info Required':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  const getStatusCount = (status: RedressalRequest['status']) => {
    return requests.filter(request => request.status === status).length;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-serif font-bold text-stone-900 leading-tight mb-2">Redressal Management</h1>
        <p className="text-stone-500 text-sm">Review and manage student redressal requests</p>
      </header>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(['Submitted', 'Under Review', 'More Info Required', 'Resolved', 'Closed'] as const).map((status) => (
          <div key={status} className="bg-white border border-stone-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-stone-800">{getStatusCount(status)}</div>
            <div className="text-xs text-stone-500 font-medium">{status.replace(' ', '\n')}</div>
          </div>
        ))}
      </div>

      {/* Redressal Requests Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-800">Redressal Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Request ID</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Student Name / PRN</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Type</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Submitted On</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Priority</th>
                <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono text-stone-800">{request.requestId}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-bold text-stone-800">{request.studentName}</div>
                      <div className="text-xs text-stone-500 font-mono">{request.prn}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{request.type}</span>
                    {request.subject && (
                      <div className="text-xs text-stone-500">{request.subject}</div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{request.semester}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{request.submittedOn}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityStyle(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(request)}
                        className="text-[10px] font-bold text-stone-500 hover:text-[#5D4037] uppercase tracking-widest transition-colors"
                      >
                        View Details
                      </button>
                      {request.status === 'Submitted' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(request.id, 'More Info Required')}
                            className="text-[10px] font-bold text-purple-600 hover:text-purple-700 uppercase tracking-widest transition-colors"
                          >
                            More Info
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(request.id, 'Resolved')}
                            className="text-[10px] font-bold text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {request.status === 'Under Review' && (
                        <button 
                          onClick={() => handleStatusUpdate(request.id, 'Resolved')}
                          className="text-[10px] font-bold text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                      {request.status === 'Resolved' && (
                        <button 
                          onClick={() => handleStatusUpdate(request.id, 'Closed')}
                          className="text-[10px] font-bold text-stone-600 hover:text-stone-700 uppercase tracking-widest transition-colors"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-stone-100">
              <h3 className="text-xl font-serif font-bold text-stone-900">Redressal Request Details</h3>
              <p className="text-stone-500 text-sm mt-1">{selectedRequest.requestId}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Student Name</label>
                  <p className="text-sm font-bold text-stone-800 mt-1">{selectedRequest.studentName}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">PRN</label>
                  <p className="text-sm font-mono text-stone-600 mt-1">{selectedRequest.prn}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Request Type</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedRequest.type}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Semester</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedRequest.semester}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Submitted On</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedRequest.submittedOn}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Priority</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mt-1 ${getPriorityStyle(selectedRequest.priority)}`}>
                    {selectedRequest.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Student Submission</label>
                <div className="mt-2 p-4 bg-stone-50 rounded-lg">
                  <p className="text-sm text-stone-700">
                    I believe there is an error in my grade calculation for Mathematics in Semester 6. 
                    According to my records, I should have received a higher grade based on my internal 
                    assessment marks and final examination performance. Please review and verify my marks.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Supporting Documents</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                    <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span className="text-sm text-stone-600">Internal_Assessment_Marks.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                    <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm text-stone-600">Answer_Sheet_Copy.jpg</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">AI Notes (Read-only)</label>
                <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <strong>AI Analysis:</strong> Student's internal marks show 85/100, final exam 78/100. 
                    Current grade: B+. Expected grade based on calculation: A-. Discrepancy detected in final grade computation.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Admin Remarks</label>
                <textarea 
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  placeholder="Add your remarks and resolution notes..."
                  className="mt-2 w-full p-4 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037] resize-none"
                  rows={4}
                />
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 flex gap-3">
              <button 
                onClick={() => setShowDetailModal(false)}
                className="py-3 px-4 border border-stone-200 text-stone-600 rounded-lg font-bold text-sm hover:bg-stone-50 transition-all"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  handleStatusUpdate(selectedRequest.id, 'More Info Required');
                  setShowDetailModal(false);
                }}
                className="py-3 px-4 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700 transition-all"
              >
                Request More Info
              </button>
              <button 
                onClick={() => {
                  handleStatusUpdate(selectedRequest.id, 'Resolved');
                  setShowDetailModal(false);
                }}
                className="py-3 px-4 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-all"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRedressal;