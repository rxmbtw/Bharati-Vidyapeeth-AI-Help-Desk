
import React, { useState } from 'react';
import { UserRole, SidebarItem } from '../types.ts';
import { Icons, COLORS } from '../constants.tsx';

interface SidebarProps {
  isOpen: boolean;
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  activePath: string;
  onClose?: () => void;
  onHoverChange?: (hovered: boolean) => void;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: <Icons.Dashboard />, path: '/', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_CLERK, UserRole.CANDIDATE] },
  { label: 'Help Desk AI', icon: <Icons.HelpDesk />, path: '/helpdesk', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_CLERK, UserRole.CANDIDATE] },
  { label: 'Tickets', icon: <Icons.Tickets />, path: '/tickets', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_CLERK] },
  { label: 'Settings', icon: <Icons.Settings />, path: '/settings', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_CLERK, UserRole.CANDIDATE] },
  { label: 'MVP Status', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>, path: '/mvp-status', roles: [UserRole.SUPER_ADMIN] },
];

const examinationSubItems = [
  { 
    label: 'Exam Forms', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>, 
    path: '/exams/forms' 
  },
  { 
    label: 'Grade Cards', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>, 
    path: '/exams/grades' 
  },
  { 
    label: 'Results', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>, 
    path: '/exams/results' 
  },
  { 
    label: 'Redressal', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>, 
    path: '/exams/redressal' 
  },
];

const notificationsSubItems = [
  { 
    label: 'Activity Journal', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>, 
    path: '/notifications/activity',
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_CLERK, UserRole.CANDIDATE]
  },
  { 
    label: 'Publish Notification', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>, 
    path: '/notifications/publish',
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_CLERK]
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentRole, onNavigate, activePath, onClose, onHoverChange }) => {
  const filteredItems = sidebarItems.filter(item => item.roles.includes(currentRole));
  const [isHovered, setIsHovered] = useState(false);
  const [examinationExpanded, setExaminationExpanded] = useState(false);
  const [notificationsExpanded, setNotificationsExpanded] = useState(false);
  const shouldExpand = isOpen || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <aside 
      className={`sidebar-transition h-screen fixed left-0 top-0 bg-white border-r border-stone-200 z-40 overflow-hidden flex flex-col ${
        shouldExpand ? 'w-64 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full lg:w-20'
      }`}
      style={{ borderColor: COLORS.border }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 shrink-0">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-3 mb-1">
            <img src="/Public/IMED LOGO.jpg" alt="University Logo" className="w-8 h-8 rounded object-contain" />
            {shouldExpand && (
              <img src="/Public/College Title.png" alt="College Title" className="h-14 w-auto object-contain opacity-90 animate-in fade-in duration-300" />
            )}
          </div>
          {shouldExpand && (
            <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest animate-in fade-in duration-300">
              AI University Help Desk
            </span>
          )}
        </div>
        {shouldExpand && (
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-stone-400 hover:text-stone-600 rounded-lg absolute top-4 right-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative ${
              activePath === item.path 
                ? 'bg-stone-50 text-[#5D4037]' 
                : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
            }`}
          >
            <div className={`${activePath === item.path ? 'text-[#5D4037]' : 'text-stone-400 group-hover:text-stone-600'}`}>
              {item.icon}
            </div>
            {shouldExpand && (
              <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                {item.label}
              </span>
            )}
            {!shouldExpand && (
              <div className="absolute left-14 bg-stone-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
        
        {/* Examination Expandable Section */}
        <div className="space-y-1">
          <button
            onClick={() => setExaminationExpanded(!examinationExpanded)}
            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative text-stone-500 hover:bg-stone-50 hover:text-stone-800"
          >
            <div className="text-stone-400 group-hover:text-stone-600">
              <Icons.Exams />
            </div>
            {shouldExpand && (
              <>
                <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 flex-1 text-left">
                  Examination
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${examinationExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            )}
            {!shouldExpand && (
              <div className="absolute left-14 bg-stone-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Examination
              </div>
            )}
          </button>
          
          {/* Sub-items */}
          <div className={`overflow-hidden transition-all duration-200 ${examinationExpanded && shouldExpand ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 space-y-1 pt-1">
              {examinationSubItems.map((subItem) => (
                <button
                  key={subItem.path}
                  onClick={() => onNavigate(subItem.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-xs ${
                    activePath === subItem.path 
                      ? 'bg-stone-50 text-[#5D4037]' 
                      : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'
                  }`}
                >
                  <div className={`${activePath === subItem.path ? 'text-[#5D4037]' : 'text-stone-300 group-hover:text-stone-500'}`}>
                    {subItem.icon}
                  </div>
                  <span className="font-medium whitespace-nowrap">
                    {subItem.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Expandable Section */}
        <div className="space-y-1">
          <button
            onClick={() => setNotificationsExpanded(!notificationsExpanded)}
            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative text-stone-500 hover:bg-stone-50 hover:text-stone-800"
          >
            <div className="text-stone-400 group-hover:text-stone-600">
              <Icons.Bell />
            </div>
            {shouldExpand && (
              <>
                <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 flex-1 text-left">
                  Notifications
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${notificationsExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            )}
            {!shouldExpand && (
              <div className="absolute left-14 bg-stone-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Notifications
              </div>
            )}
          </button>
          
          {/* Sub-items */}
          <div className={`overflow-hidden transition-all duration-200 ${notificationsExpanded && shouldExpand ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 space-y-1 pt-1">
              {notificationsSubItems
                .filter(subItem => subItem.roles.includes(currentRole))
                .map((subItem) => (
                <button
                  key={subItem.path}
                  onClick={() => onNavigate(subItem.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-xs ${
                    activePath === subItem.path 
                      ? 'bg-stone-50 text-[#5D4037]' 
                      : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'
                  }`}
                >
                  <div className={`${activePath === subItem.path ? 'text-[#5D4037]' : 'text-stone-300 group-hover:text-stone-500'}`}>
                    {subItem.icon}
                  </div>
                  <span className="font-medium whitespace-nowrap">
                    {subItem.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {(shouldExpand || window.innerWidth >= 1024) && (
        <div className="p-4 bg-stone-50 border-t border-stone-100 shrink-0">
          <div className={`transition-all duration-300 ${shouldExpand ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Access Level</div>
            <div className="text-xs font-semibold text-stone-700 truncate">
              {currentRole.replace('_', ' ')}
            </div>
          </div>
          {!shouldExpand && (
             <div className="w-8 h-8 rounded-full bg-stone-200/50 flex items-center justify-center text-[10px] font-bold text-stone-500 mx-auto">
               {currentRole.split('_')[0][0]}
             </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
