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
  const [failedRollExplanation, setFailedRollExplanation] = useState(null);
  const [questReadyToComplete, setQuestReadyToComplete] = useState(false);
  const endOfTerminal = useRef(null);

  useEffect(() => {
    // Determine mission complete state only when the user clicks 'Complete Quest'
    // Do nothing on activeMissionData change for auto-completion.
  }, [activeMissionData]);

  useEffect(() => {
    endOfTerminal.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const [pendingAction, setPendingAction] = useState(null);

  const handleTerminalSubmit = (e) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      const command = terminalInput.trim().toLowerCase();
      setTerminalHistory(prev => [...prev, `> ${command}`]);
      setTerminalInput('');

      // New Simulator Logic with 1d20
      if (activeMissionData.currentTaskIndex === 0 && command === 'open terminal') {
        completeTask();
        setTerminalHistory(prev => [...prev, 'Terminal opened successfully. Usage: `check logs`']);
      } 
      else if (activeMissionData.currentTaskIndex === 1 && (command === 'check logs' || command === 'cat /var/log/auth.log')) {
        completeTask();
        setLogs([
          '[11:42:01] INFO  - Normal login user: admin',
          '[11:43:10] WARN  - Failed login user: root from IP 172.31.24.8',
          '[11:43:11] WARN  - Failed login user: root from IP 172.31.24.8',
          '[11:43:12] ERROR - Multiple failed logins. Potential Brute Force.'
        ]);
        setTerminalHistory(prev => [...prev, '[SYSTEM] auth.log parsed and loaded. 341 lines verified.', 'Next step: `identify ip <ip_address>`']);
      } 
      else if (activeMissionData.currentTaskIndex === 2 && command.startsWith('identify ip')) {
        const ip = command.replace('identify ip', '').trim();
        if (ip === '172.31.24.8') {
          setTerminalHistory(prev => [...prev, `[SUCCESS] IP 172.31.24.8 successfully identified as source of brute force.`, 'Next step: `block ip`']);
          completeTask();
        } else if (ip === '') {
          setTerminalHistory(prev => [...prev, `Usage: identify ip <ip_address>`]);
        } else {
          setTerminalHistory(prev => [...prev, `[FAILED] ${ip} is not the primary source of the brute force attack. Review the logs and try again.`]);
        }
      }
      else if (activeMissionData.currentTaskIndex === 3 && command === 'block ip') {
        setPendingAction('blockIP');
        setShowDiceRoll(true);
      }
      else {
        setTerminalHistory(prev => [...prev, `Command not recognized or out of sequence: ${command}`]);
      }
    }
  };

  const handleDiceRollComplete = (result) => {
    setShowDiceRoll(false);
    const { total } = result;

    if (pendingAction === 'blockIP') {
      if (total < 10) {
        setTerminalHistory(prev => [...prev, `[Roll: ${total}] FAILED: The hacker evaded the initial block! They are pivoting.`]);
        setFailedRollExplanation("Block IP Failed: The attacker noticed your probe and evaded the initial firewall rule by pivoting their connection. You must act faster. Close this modal and type 'block ip' to try again.");
      } else {
        setTerminalHistory(prev => [...prev, `[Roll: ${total}] SUCCESS: Firewall rule updated seamlessly. IP blocked without alerting the attacker.`, '>> QUEST METRICS MET. <<']);
        completeTask();
        setQuestReadyToComplete(true);
      }
    }
    setPendingAction(null);
  };

  if (!activeMissionData) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}><h2 className="glow-text">No active quest.</h2><Button onClick={() => setCurrentView('dashboard')}>Return to Dashboard</Button></div>;

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
          <h3 className="glow-text">Quest Objectives</h3>
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
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Party Messages</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', border: 'var(--chat-border)' }}>
              <strong style={{ color: 'var(--neon-purple)', display: 'block', fontSize: '0.85rem' }}>PM Morgan:</strong>
              <span style={{ fontSize: '0.9rem' }}>We're seeing unusual traffic. Can you investigate?</span>
            </div>
            {activeMissionData.currentTaskIndex >= 2 && (
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', borderLeft: '2px solid var(--neon-cyan)', border: 'var(--chat-border)' }}>
                <strong style={{ color: 'var(--neon-purple)', display: 'block', fontSize: '0.85rem' }}>Dev Taylor:</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>It looks like multiple endpoints are hitting the DB concurrently.</span>
              </div>
            )}
            
            {questReadyToComplete && !missionComplete && (
               <Button className="btn-neon-purple" style={{ padding: '1rem', fontSize: '1.2rem', marginTop: '1rem' }} onClick={() => setMissionComplete(true)}>
                 Complete Quest
               </Button>
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

      {failedRollExplanation && (
        <GlassModal title="Simulation Encounter" onClose={() => setFailedRollExplanation(null)}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{failedRollExplanation}</p>
            <Button onClick={() => setFailedRollExplanation(null)} style={{ width: '100%' }}>Acknowledge & Try Again</Button>
          </div>
        </GlassModal>
      )}

      {missionComplete && (
        <GlassModal title="Quest Complete!" onClose={() => setCurrentView('dashboard')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>You successfully neutralized the threat!</p>
            <p style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '2rem' }}>+500 XP Earned</p>
            <Button onClick={() => setCurrentView('dashboard')} style={{ width: '100%' }}>Return to Dashboard</Button>
          </div>
        </GlassModal>
      )}
    </div>
  );
};
