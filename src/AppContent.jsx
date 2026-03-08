import React from 'react';
import { useDemo } from './context/DemoContext';
import { LoginDemo } from './pages/LoginDemo';
import { StudentDashboard } from './pages/StudentDashboard';
import { MentorDashboard } from './pages/MentorDashboard';
import { MissionView } from './pages/MissionView';
import { TeamLobby } from './pages/TeamLobby';
import { Courses } from './pages/Courses';
import { Contribute } from './pages/Contribute';
import { StudentPortfolio } from './pages/StudentPortfolio';
import { MentorQuestBoard } from './pages/MentorQuestBoard';

const Layout = ({ children }) => {
  const { currentView, setCurrentView, currentUser, theme, toggleTheme } = useDemo();

  return (
    <>
      {currentUser && (
        <nav style={{ background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
          <div className="brand-title" style={{ fontSize: '1.4rem' }}>Career Craft</div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button className="nav-tab" onClick={() => setCurrentView('dashboard')} style={{ background: 'none', border: 'none', color: currentView === 'dashboard' ? 'var(--nav-active)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Dashboard</button>
            {currentUser === 'student' && <button className="nav-tab" onClick={() => setCurrentView('courses')} style={{ background: 'none', border: 'none', color: currentView === 'courses' ? 'var(--nav-active)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Courses</button>}
            {currentUser === 'student' && <button className="nav-tab" onClick={() => setCurrentView('team_lobby')} style={{ background: 'none', border: 'none', color: currentView === 'team_lobby' ? 'var(--nav-active)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Party Quests</button>}
            {currentUser === 'mentor' && <button className="nav-tab" onClick={() => setCurrentView('quest_board')} style={{ background: 'none', border: 'none', color: currentView === 'quest_board' ? 'var(--nav-active)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Quest Board</button>}
            <button className="nav-tab" onClick={() => setCurrentView('contribute')} style={{ background: 'none', border: 'none', color: currentView === 'contribute' ? 'var(--nav-active)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Contribute</button>
            <button className="nav-tab" onClick={() => setCurrentView('login')} style={{ background: 'none', border: 'none', color: 'var(--neon-red)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Logout</button>
          </div>
        </nav>
      )}
      <main style={{ padding: currentUser ? '2rem' : 0 }}>
        {children}
      </main>
      <button 
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--glass-shadow)',
          zIndex: 1000,
          color: 'var(--neon-cyan)',
          fontSize: '1.5rem',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          transition: 'all var(--transition-normal)'
        }}
        title="Toggle Theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </>
  );
};

export const AppContent = () => {
  const { currentView, currentUser } = useDemo();

  const renderView = () => {
    switch (currentView) {
      case 'login': return <LoginDemo />;
      case 'dashboard': return currentUser === 'student' ? <StudentDashboard /> : <MentorDashboard />;
      case 'mission': return <MissionView />;
      case 'team_lobby': return <TeamLobby />;
      case 'courses': return <Courses />;
      case 'quest_board': return <MentorQuestBoard />;
      case 'contribute': return <Contribute />;
      case 'portfolio': return <StudentPortfolio />;
      default: return <LoginDemo />;
    }
  };

  return <Layout>{renderView()}</Layout>;
};

export default AppContent;
