import React, { useState } from 'react';

interface RedressalRequest {
  id: string;
  requestId: string;
  type: string;
  semester: string;
  subject?: string;
  submittedOn: string;
  status: 'Submitted' | 'Under Review' | 'Additional Info Required' | 'Resolved' | 'Closed';
  description: string;
  documents?: string[];
  timeline: {
    date: string;
    status: string;
    note?: string;
  }[];
}

const mockRequests: RedressalRequest[] = [
  {
    id: '1',
    requestId: 'RED-2024-001',
    type: 'Grade Issue',
    semester: 'Even Semester End Examination 2024–25',
    subject: 'Computer Networks',
    submittedOn: '15 Oct 2024',
    status: 'Under Review',
    description: 'I believe there is an error in my grade calculation for Computer Networks. According to my records, I should have received a higher grade.',
    documents: ['Internal_Assessment_Marks.pdf', 'Answer_Sheet_Copy.jpg'],
    timeline: [
      { date: '15 Oct 2024', status: 'Submitted', note: 'Request submitted successfully' },
      { date: '16 Oct 2024', status: 'Under Review', note: 'Assigned to examination committee' }
    ]
  },
  {
    id: '2',
    requestId: 'RED-2024-002',
    type: 'Result Discrepancy',
    semester: 'Odd Semester End Examination 2024–25',
    submittedOn: '20 Oct 2024',
    status: 'Resolved',
    description: 'My result shows incorrect marks for Mathematics subject.',
    timeline: [
      { date: '20 Oct 2024', status: 'Submitted', note: 'Request submitted successfully' },
      { date: '21 Oct 2024', status: 'Under Review', note: 'Verification in progress' },
      { date: '23 Oct 2024', status: 'Resolved', note: 'Marks corrected and updated' }
    ]
  }
];

const Redressal: React.FC = () => {
  const [formData, setFormData] = useState({
    type: '',
    semester: '',
    subject: '',
    description: '',
    documents: null as File | null
  });
  const [requests, setRequests] = useState<RedressalRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<RedressalRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redressalTypes = [
    'Result Discrepancy',
    'Marksheet Error',
    'Grade Issue',
    'Revaluation Request',
    'Exam Form Issue'
  ];

  const semesters = [
    'Odd Semester End Examination 2025–26',
    'Even Semester End Examination 2024–25',
    'Odd Semester End Examination 2024–25',
    'Supplementary Examination 2024–25'
  ];

  const subjects = [
    'Advanced Data Structures',
    'Machine Learning',
    'Software Engineering',
    'Computer Networks',
    'Database Management Systems',
    'Operating Systems',
    'Compiler Design',
    'Web Technologies',
    'Artificial Intelligence'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, documents: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.semester || !formData.description) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRequest: RedressalRequest = {
      id: Date.now().toString(),
      requestId: `RED-2024-${String(requests.length + 1).padStart(3, '0')}`,
      type: formData.type,
      semester: formData.semester,
      subject: formData.subject || undefined,
      submittedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Submitted',
      description: formData.description,
      documents: formData.documents ? [formData.documents.name] : undefined,
      timeline: [
        { date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Submitted', note: 'Request submitted successfully' }
      ]
    };

    setRequests(prev => [newRequest, ...prev]);
    setFormData({ type: '', semester: '', subject: '', description: '', documents: null });
    setIsSubmitting(false);
  };

  const handleViewRequest = (request: RedressalRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
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
      case 'Additional Info Required':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-serif font-bold text-stone-900 leading-tight mb-2">Redressal</h1>
        <p className="text-stone-500 text-sm font-medium">Raise and track examination-related grievances and requests</p>
      </header>

      {/* Raise New Redressal Request */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-800">Raise New Redressal Request</h3>
          <p className="text-stone-500 text-sm mt-1">Submit your examination-related concerns for review</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">
                      Redressal Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                      required
                    >
                      <option value="">Select type...</option>
                      {redressalTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">
                      Examination / Semester *
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                      required
                    >
                      <option value="">Select semester...</option>
                      {semesters.map((semester) => (
                        <option key={semester} value={semester}>{semester}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">
                    Subject (Optional)
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                  >
                    <option value="">Select subject...</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please describe your concern in detail..."
                    className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037] resize-none"
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">
                    Supporting Document (Optional)
                  </label>
                  <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center hover:border-stone-300 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="document-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <svg className="w-8 h-8 text-stone-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="text-sm text-stone-500">
                        {formData.documents ? formData.documents.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-stone-400 mt-1">PDF, JPG, PNG, DOC files only</p>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.type || !formData.semester || !formData.description}
                  className="w-full md:w-auto px-8 py-4 bg-[#5D4037] text-white rounded-xl font-bold text-sm hover:bg-[#4E342E] transition-all duration-200 disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>

            {/* AI Assistance Panel */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-blue-800">AI Tips</h4>
                </div>
                <div className="space-y-3 text-xs text-blue-700">
                  <p>• Please ensure all details are accurate before submitting</p>
                  <p>• Upload supporting documents if available for faster resolution</p>
                  <p>• Be specific about the issue you're facing</p>
                  <p>• Check your email regularly for updates on your request</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Redressal Requests */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-800">My Redressal Requests</h3>
          <p className="text-stone-500 text-sm mt-1">Track the status of your submitted requests</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Request ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Submitted On</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Current Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-mono font-bold text-stone-800">{request.requestId}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-800">{request.type}</span>
                    {request.subject && (
                      <div className="text-xs text-stone-500 mt-1">{request.subject}</div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{request.semester}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{request.submittedOn}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleViewRequest(request)}
                      className="text-[10px] font-bold text-stone-500 hover:text-[#5D4037] uppercase tracking-widest transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-stone-400 text-sm">No redressal requests found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-stone-100">
              <h3 className="text-xl font-serif font-bold text-stone-900">Request Details</h3>
              <p className="text-stone-500 text-sm mt-1">{selectedRequest.requestId}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Request Type</label>
                  <p className="text-sm font-bold text-stone-800 mt-1">{selectedRequest.type}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Semester</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedRequest.semester}</p>
                </div>
                {selectedRequest.subject && (
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Subject</label>
                    <p className="text-sm text-stone-600 mt-1">{selectedRequest.subject}</p>
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Current Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mt-1 ${getStatusStyle(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Description</label>
                <div className="mt-2 p-4 bg-stone-50 rounded-lg">
                  <p className="text-sm text-stone-700">{selectedRequest.description}</p>
                </div>
              </div>

              {selectedRequest.documents && (
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Supporting Documents</label>
                  <div className="mt-2 space-y-2">
                    {selectedRequest.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                        <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm text-stone-600">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Status Timeline</label>
                <div className="mt-4 space-y-4">
                  {selectedRequest.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[#5D4037] rounded-full mt-1 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-bold text-stone-800">{item.status}</span>
                          <span className="text-xs text-stone-500">{item.date}</span>
                        </div>
                        {item.note && (
                          <p className="text-sm text-stone-600">{item.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 flex justify-end">
              <button 
                onClick={() => setShowDetailModal(false)}
                className="py-3 px-6 border border-stone-200 text-stone-600 rounded-lg font-bold text-sm hover:bg-stone-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Redressal;