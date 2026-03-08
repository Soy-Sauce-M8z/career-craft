import React, { useState, useEffect, useRef } from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { DiceRoll } from '../components/DiceRoll/DiceRoll';
import { GlassModal } from '../components/UI/GlassModal';

export const MissionView = () => {
  const { student, activeMissionData, completeTask, setCurrentView } = useDemo();
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState(['> System initialized.', '> Awaiting command...']);
  const [logs, setLogs] = useState([]);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const endOfTerminal = useRef(null);

  useEffect(() => {
    if (activeMissionData?.isComplete && !missionComplete) {
      setMissionComplete(true);
    }
  }, [activeMissionData]);

  useEffect(() => {
    endOfTerminal.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      const command = terminalInput.trim().toLowerCase();
      setTerminalHistory(prev => [...prev, `> ${command}`]);
      setTerminalInput('');

      // Mock Simulator Logic
      if (activeMissionData.currentTaskIndex === 0 && command === 'open terminal') {
        completeTask();
        setTerminalHistory(prev => [...prev, 'Terminal opened successfully. Try checking logs.']);
      } else if (activeMissionData.currentTaskIndex === 1 && (command === 'check logs' || command === 'cat /var/log/auth.log')) {
        completeTask();
        setLogs([
          '[11:42:01] INFO  - Normal login user: admin',
          '[11:43:10] WARN  - Failed login user: root from IP 172.31.24.8',
          '[11:43:11] WARN  - Failed login user: root from IP 172.31.24.8',
          '[11:43:12] ERROR - Multiple failed logins. Potential Brute Force.'
        ]);
        setTerminalHistory(prev => [...prev, 'Logs fetched. Notice suspicious IP? identify it.']);
      } else if (activeMissionData.currentTaskIndex === 2 && command.includes('172.31.24.8')) {
        completeTask();
        setTerminalHistory(prev => [...prev, 'Target IP 172.31.24.8 locked. How do you want to handle it? Try "block ip".']);
      } else if (activeMissionData.currentTaskIndex === 3 && command.includes('block ip')) {
        setShowDiceRoll(true);
      } else {
        setTerminalHistory(prev => [...prev, `Command not found or irrelevant right now: ${command}`]);
      }
    }
  };

  const handleDiceRollComplete = (success) => {
    setShowDiceRoll(false);
    if (success) {
      setTerminalHistory(prev => [...prev, 'SUCCESS: Firewall rule updated. IP blocked.']);
      completeTask();
    } else {
      setTerminalHistory(prev => [...prev, 'FAILED: Insufficient permission or syntax error. Try again.', '> block ip']);
    }
  };

  if (!activeMissionData) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}><h2 className="glow-text">No active mission.</h2><Button onClick={() => setCurrentView('dashboard')}>Return to Dashboard</Button></div>;

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--spacing-lg)', height: 'calc(100vh - 100px)' }}>
      {/* Workstation Simulation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', height: '100%' }}>
        <Card style={{ flex: 1, backgroundColor: '#000', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#64748b' }}>Terminal - bash</div>
          <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'var(--font-family-mono)', fontSize: '0.9rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {terminalHistory.map((line, i) => <div key={i}>{line}</div>)}
            <div ref={endOfTerminal} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            <span style={{ color: '#10b981', marginRight: '0.5rem', fontFamily: 'var(--font-family-mono)' }}>$</span>
            <input 
              type="text" 
              value={terminalInput} 
              onChange={e => setTerminalInput(e.target.value)} 
              onKeyDown={handleTerminalSubmit}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#10b981', fontFamily: 'var(--font-family-mono)', outline: 'none', fontSize: '1rem' }}
              placeholder="Type command here..."
              autoFocus
            />
          </div>
        </Card>

        <Card style={{ height: '30%', minHeight: '200px', overflowY: 'auto' }}>
          <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Log Viewer</div>
          <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.85rem' }}>
            {logs.length === 0 ? <span style={{ color: 'var(--text-secondary)' }}>No logs loaded.</span> : logs.map((log, i) => (
              <div key={i} style={{ color: log.includes('ERROR') ? 'var(--neon-red)' : log.includes('WARN') ? 'var(--neon-yellow)' : 'var(--text-primary)' }}>{log}</div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right side overlays */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <Card glow style={{ borderColor: 'var(--neon-cyan)' }}>
          <h3 className="glow-text">Mission Objectives</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{activeMissionData.title}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {activeMissionData.tasks.map((task, idx) => (
              <li key={idx} style={{ 
                margin: '0.5rem 0', 
                color: idx < activeMissionData.currentTaskIndex ? 'var(--neon-green)' : (idx === activeMissionData.currentTaskIndex ? 'var(--text-primary)' : 'var(--text-secondary)'),
                textDecoration: idx < activeMissionData.currentTaskIndex ? 'line-through' : 'none',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                {idx < activeMissionData.currentTaskIndex ? '☑' : (idx === activeMissionData.currentTaskIndex ? '▶' : '☐')} {task}
              </li>
            ))}
          </ul>
        </Card>

        <Card style={{ flex: 1 }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Team Messages</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--neon-purple)', display: 'block', fontSize: '0.85rem' }}>PM Morgan:</strong>
              <span style={{ fontSize: '0.9rem' }}>We're seeing unusual traffic. Can you investigate?</span>
            </div>
            {activeMissionData.currentTaskIndex >= 2 && (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--neon-yellow)', display: 'block', fontSize: '0.85rem' }}>Dev Taylor:</strong>
                <span style={{ fontSize: '0.9rem' }}>I see you found it. Feel free to block the IP if you verify it's hostile.</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {showDiceRoll && (
        <DiceRoll 
          skillModifier={student.skills.cybersecurity?.level || 1} 
          targetValue={10} 
          onComplete={handleDiceRollComplete} 
        />
      )}

      {missionComplete && (
        <GlassModal title="Mission Complete!" onClose={() => setCurrentView('dashboard')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>You successfully neutralized the threat!</p>
            <p style={{ color: 'var(--neon-purple)', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '2rem' }}>+500 XP Earned</p>
            <Button onClick={() => setCurrentView('dashboard')} style={{ width: '100%' }}>Return to Dashboard</Button>
          </div>
        </GlassModal>
      )}
    </div>
  );
};
