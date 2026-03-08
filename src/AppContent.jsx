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

const Layout = ({ children }) => {
  const { currentView, setCurrentView, currentUser, theme, toggleTheme } = useDemo();

  return (
    <>
      {currentUser && (
        <nav style={{ background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--neon-cyan)' }}>Career Craft</div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button onClick={() => setCurrentView('dashboard')} style={{ background: 'none', border: 'none', color: currentView === 'dashboard' ? 'var(--neon-cyan)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', textShadow: currentView === 'dashboard' ? '0 0 8px var(--neon-cyan)' : 'none' }}>Dashboard</button>
            {currentUser === 'student' && <button onClick={() => setCurrentView('courses')} style={{ background: 'none', border: 'none', color: currentView === 'courses' ? 'var(--neon-cyan)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', textShadow: currentView === 'courses' ? '0 0 8px var(--neon-cyan)' : 'none' }}>Courses</button>}
            {currentUser === 'student' && <button onClick={() => setCurrentView('team_lobby')} style={{ background: 'none', border: 'none', color: currentView === 'team_lobby' ? 'var(--neon-cyan)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', textShadow: currentView === 'team_lobby' ? '0 0 8px var(--neon-cyan)' : 'none' }}>Team Missions</button>}
            {currentUser === 'student' && <button onClick={() => setCurrentView('contribute')} style={{ background: 'none', border: 'none', color: currentView === 'contribute' ? 'var(--neon-cyan)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', textShadow: currentView === 'contribute' ? '0 0 8px var(--neon-cyan)' : 'none' }}>Contribute</button>}
            <button onClick={() => setCurrentView('login')} style={{ background: 'none', border: 'none', color: 'var(--neon-red)', cursor: 'pointer', fontFamily: 'var(--font-family-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Logout</button>
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
      case 'contribute': return <Contribute />;
      case 'portfolio': return <StudentPortfolio />;
      default: return <LoginDemo />;
    }
  };

  return <Layout>{renderView()}</Layout>;
};

export default AppContent;
