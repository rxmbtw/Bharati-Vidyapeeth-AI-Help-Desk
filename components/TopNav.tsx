
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants.tsx';
import { UserRole } from '../types.ts';

interface TopNavProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  pageTitle: string;
  onLogout: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  sidebarWidth?: number;
}

const TopNav: React.FC<TopNavProps> = ({ 
  currentRole, 
  onRoleChange, 
  pageTitle,
  onLogout,
  onOpenNotifications,
  onOpenProfile,
  sidebarWidth = 0
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 fixed top-0 bg-white/80 backdrop-blur-md border-b border-stone-100 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-300" style={{ left: `${sidebarWidth}px`, right: '0' }}>
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-3">
          <h2 className="text-stone-900 text-sm font-extrabold font-serif md:text-lg tracking-tight truncate max-w-[140px] sm:max-w-[240px] md:max-w-none">
            {pageTitle}
          </h2>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-stone-100 text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] rounded border border-stone-200">
            MVP
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Role Quick Switcher (Prototype Only) */}
        <div className="hidden lg:flex items-center gap-2 bg-stone-50/50 p-1 rounded-full border border-stone-100">
          {[UserRole.CANDIDATE, UserRole.ADMIN_CLERK, UserRole.SUPER_ADMIN].map((role) => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all ${
                currentRole === role 
                  ? 'bg-white text-[#5D4037] shadow-sm ring-1 ring-stone-200' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {role === UserRole.CANDIDATE ? 'Student' : role === UserRole.ADMIN_CLERK ? 'Admin' : 'Super'}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-stone-100 mx-1 hidden md:block" />

        <button 
          onClick={onOpenNotifications}
          className="p-2.5 text-stone-400 hover:text-[#5D4037] hover:bg-stone-50 rounded-xl relative transition-all group"
        >
          <Icons.Bell />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#5D4037] rounded-full ring-2 ring-white"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 pl-2 py-1 pr-1 rounded-full hover:bg-stone-50 transition-all group border border-transparent hover:border-stone-100"
          >
            <div className="text-right hidden sm:block">
              <div className="text-[11px] font-black text-stone-900 leading-none mb-1">
                {currentRole === UserRole.CANDIDATE ? 'John Harvard' : 'Elena Gilbert'}
              </div>
              <div className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">
                ID: {currentRole === UserRole.CANDIDATE ? '20240012' : 'ADM-102'}
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#5D4037]/5 flex items-center justify-center text-[#5D4037] border border-[#5D4037]/10 overflow-hidden text-xs font-black shadow-inner">
              {currentRole === UserRole.CANDIDATE ? 'JH' : 'EG'}
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-stone-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-5 py-3 border-b border-stone-50 mb-2">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Signed in as</p>
                <p className="text-xs font-bold text-stone-800 truncate">
                  {currentRole === UserRole.CANDIDATE ? 'john.harvard@university.edu' : 'elena.g@university.edu'}
                </p>
              </div>
              <button 
                onClick={onOpenProfile}
                className="w-full text-left px-5 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors flex items-center gap-3"
              >
                <div className="text-stone-400"><Icons.User /></div>
                Account Profile
              </button>
              <button 
                onClick={onOpenProfile}
                className="w-full text-left px-5 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors flex items-center gap-3"
              >
                <div className="text-stone-400"><Icons.Settings /></div>
                Security Settings
              </button>
              <div className="h-px bg-stone-50 my-2 mx-5" />
              <button 
                onClick={onLogout}
                className="w-full text-left px-5 py-3 text-xs font-black text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
