import React from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Avatar } from '../components/UI/Avatar';
import { Badge } from '../components/UI/Badge';

export const StudentPortfolio = () => {
  const { activePortfolio, setCurrentView } = useDemo();

  if (!activePortfolio) return null;

  return (
    <div className="container" style={{ paddingBottom: '3rem', maxWidth: '900px' }}>
      <Button variant="ghost" onClick={() => setCurrentView('dashboard')} style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>← Back to Dashboard</Button>
      
      <Card glow style={{ borderColor: 'var(--neon-purple)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Avatar alt={activePortfolio.name} size="80px" border="var(--neon-cyan)" />
          <div style={{ flex: 1 }}>
            <h1 className="glow-text" style={{ margin: '0 0 0.5rem 0' }}>{activePortfolio.name}'s Portfolio</h1>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{activePortfolio.role}</div>
            <div style={{ marginTop: '0.5rem' }}>
              <Badge color="var(--neon-green)">Cybersecurity Lvl 4</Badge>
              <Badge color="var(--neon-cyan)">Programming Lvl 2</Badge>
            </div>
          </div>
        </div>
      </Card>

      <h2 style={{ marginBottom: '1.5rem' }}>Recent Submission: {activePortfolio.recentSubmission}</h2>
      
      <Card style={{ marginBottom: '2rem', background: '#0a0d14' }}>
        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Terminal Execution Log</h4>
        <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.9rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>$ open terminal</div>
          <div style={{ color: 'var(--text-secondary)' }}>&gt; Terminal initialized.</div>
          <div>$ check logs</div>
          <div style={{ color: 'var(--text-secondary)' }}>&gt; Analyzing /var/log/auth.log... found suspected IP 172.31.24.8</div>
          <div>$ block ip 172.31.24.8</div>
          <div style={{ color: 'var(--neon-green)' }}>&gt; SUCCESS: IP blocked via firewall rules. Threat isolated.</div>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginBottom: '1rem', color: 'var(--neon-yellow)' }}>Mentor Feedback</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Provide actionable feedback on the student's methodology and technical execution.</p>
        <textarea 
          rows="5" 
          placeholder="e.g. Great job isolating the threat quickly. Next time, also consider checking for pivot attempts from that IP..." 
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '4px', width: '100%', resize: 'vertical', marginBottom: '1rem' }}
        ></textarea>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="ghost" style={{ border: '1px solid var(--neon-red)', color: 'var(--neon-red)' }}>Request Revision</Button>
          <Button onClick={() => setCurrentView('dashboard')}>Approve & Award XP</Button>
        </div>
      </Card>
    </div>
  );
};
