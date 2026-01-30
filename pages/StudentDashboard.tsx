
import React from 'react';
import { Icons } from '../constants';

interface StudentDashboardProps {
  onNavigate: (path: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const stats = [
    { title: 'Total Queries', value: '05', color: 'text-stone-900' },
    { title: 'In Review', value: '02', color: 'text-[#5D4037]' },
    { title: 'Resolved', value: '03', color: 'text-green-600' },
  ];

  const quickActions = [
    { label: 'Raise New Query', icon: <Icons.HelpDesk />, desc: 'AI-assisted help desk for marksheet, name correction, and re-evaluation.', path: '/helpdesk' },
    { label: 'View My Queries', icon: <Icons.Tickets />, desc: 'Real-time tracking of your submitted requests and department responses.', path: '/tickets' },
    { label: 'Convocation Info', icon: <Icons.Exams />, desc: 'Check graduation eligibility, ceremony dates, and degree collection policy.', path: '/exams' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Card */}
      <section className="bg-white border border-stone-200 rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
        </div>
        <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-[11px] font-black text-[#5D4037] uppercase tracking-[0.3em]">
              <span className="w-8 h-[2px] bg-[#5D4037]"></span>
              Candidate Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-stone-900 leading-tight tracking-tight">
              Welcome, <br className="hidden md:block" /> John Harvard
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border border-stone-100 rounded-2xl">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">PRN:</span>
                <span className="text-xs font-black text-stone-800 font-mono tracking-tighter">20240012</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border border-stone-100 rounded-2xl">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Dept:</span>
                <span className="text-xs font-black text-stone-800">Examination</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-40 h-40 bg-stone-50/50 rounded-[2rem] border border-stone-100 p-8 shrink-0 shadow-inner">
             <div className="w-full h-full flex items-center justify-center text-[#5D4037]/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             </div>
          </div>
        </div>
      </section>

      {/* Status Overview */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em]">Query Status</h3>
            <button onClick={() => onNavigate('/tickets')} className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest hover:underline">View History →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#5D4037]/10 transition-all group">
              <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest mb-3">{stat.title}</p>
              <div className={`text-5xl font-serif font-black ${stat.color} group-hover:scale-110 transition-transform origin-left`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-6 px-2">Institutional Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <button 
              key={i} 
              onClick={() => onNavigate(action.path)}
              className="flex flex-col items-start text-left bg-white border border-stone-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-[#5D4037]/20 transition-all group w-full relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-[#5D4037] group-hover:bg-[#5D4037] group-hover:text-white group-hover:shadow-lg transition-all mb-6">
                {action.icon}
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">{action.label}</h4>
              <p className="text-xs text-stone-500 leading-relaxed font-medium">{action.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[#5D4037] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Launch Module
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="pt-10 border-t border-stone-100 text-center">
          <p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.5em]">College AI • 2024 Prototype • Phase 14 Complete</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;
