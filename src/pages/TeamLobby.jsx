import React, { useState, useRef, useEffect } from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';

export const TeamLobby = () => {
  const { teamData, addXP } = useDemo();
  const [hoveredMember, setHoveredMember] = useState(null);

  const [activeQuest, setActiveQuest] = useState(false);
  const [chatLog, setChatLog] = useState([
    { sender: 'System', text: 'Connecting to secure channel...', time: '00:00' },
    { sender: 'Maya (Manager)', text: 'Party, marketing is holding off the press but we need this API patched ASAP.', time: '00:01' },
    { sender: 'David (Backend Dev)', text: 'I found the compromised endpoint. I need security to block the botnet IPs so I can push the patch safely.', time: '00:03' }
  ]);
  const [taskPhase, setTaskPhase] = useState(1); // 1 = firewall, 2 = purge cache
  const [missionComplete, setMissionComplete] = useState(false);
  const [questReadyToComplete, setQuestReadyToComplete] = useState(false);

  const [fwIp, setFwIp] = useState('');
  const [fwAction, setFwAction] = useState('SELECT ACTION');
  const [cdnRegion, setCdnRegion] = useState('GLOBAL (ALL REGIONS)');
  const [cdnTarget, setCdnTarget] = useState('api.startup.com/*');
  const [earnedXp, setEarnedXp] = useState(2000);
  const [xpAnnouncements, setXpAnnouncements] = useState([]);
  
  const showXpChange = (amount) => {
    const id = Date.now() + Math.random();
    setXpAnnouncements(prev => [...prev, { id, amount }]);
    setTimeout(() => {
      setXpAnnouncements(prev => prev.filter(a => a.id !== id));
    }, 2500);
  };
  
  const timeRef = useRef(4);
  const getNextTime = () => {
    const t = timeRef.current;
    timeRef.current += 1;
    return `00:${t.toString().padStart(2, '0')}`;
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [chatLog]);

  const handleCompleteFirewall = () => {
    const ip = (fwIp || '').trim().toLowerCase();
    const action = (fwAction || '').toUpperCase();
    if (!ip.includes('198.51.100.42') || !action.includes('BLOCK')) {
      setEarnedXp(prev => Math.max(0, prev - 500));
      showXpChange(-500);
      setChatLog(prev => [...prev, 
        { sender: 'You (Security Analyst)', text: `Executed ${fwAction} on ${fwIp || 'empty IP'}.`, time: getNextTime() },
        { sender: 'Maya (Manager)', text: `Wait, that didn't stop the attack! Are you sure you blocked the correct IP (198.51.100.42) and chose BLOCK?`, time: getNextTime() }
      ]);
      return;
    }

    showXpChange(1000);
    setTaskPhase(1.5); // Intermediate state
    setChatLog(prev => [...prev, { sender: 'You (Security Analyst)', text: 'Target IP blocked on the perimeter firewall.', time: getNextTime() }]);
    
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'System', text: 'Firewall rules updated. Threat IP isolated.', time: getNextTime() }]);
      setTimeout(() => {
        setChatLog(prev => [...prev, { sender: 'David (Backend Dev)', text: 'Awesome, applying the patch now. Great job!', time: getNextTime() }]);
        setTimeout(() => {
          setChatLog(prev => [...prev, { sender: 'David (Backend Dev)', text: 'Patch applied. Can you purge the CDN cache to ensure the clean API serves to customers immediately?', time: getNextTime() }]);
          setTaskPhase(2);
        }, 3000);
      }, 2000);
    }, 1000);
  };

  const handleCompletePurge = () => {
    const region = (cdnRegion || '').trim().toUpperCase();
    const target = (cdnTarget || '').trim().toLowerCase();
    if (!region.includes('GLOBAL') || !target.includes('api.startup.com/*')) {
      setEarnedXp(prev => Math.max(0, prev - 500));
      showXpChange(-500);
      setChatLog(prev => [...prev, 
        { sender: 'You (Security Analyst)', text: `Purging ${cdnTarget} in ${cdnRegion}.`, time: getNextTime() },
        { sender: 'David (Backend Dev)', text: `Our users are still seeing the old cached errors. Make sure you clear the entire API surface (api.startup.com/*) globally!`, time: getNextTime() }
      ]);
      return;
    }

    showXpChange(1000);
    setTaskPhase(2.5); // Intermediate state
    setChatLog(prev => [...prev, { sender: 'You (Security Analyst)', text: 'Purging edge cache now.', time: getNextTime() }]);
    
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'System', text: 'CDN Edge Cache Cleared successfully.', time: getNextTime() }]);
      setTimeout(() => {
        setChatLog(prev => [...prev, { sender: 'Maya (Manager)', text: 'Excellent work everyone. The leak is sealed. Sending the all-clear to marketing.', time: getNextTime() }]);
        setTimeout(() => {
          setQuestReadyToComplete(true);
        }, 2000);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="glow-text">Party Multiplayer Lobby</h1>
        <Badge color="var(--neon-red)">Quest: {teamData.mission}</Badge>
      </div>

      {!activeQuest ? (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(300px, 800px)', gap: 'var(--spacing-lg)', justifyContent: 'center' }}>
          {/* Active Mission Block */}
          <Card>
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
              <h3 className="glow-text" style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>Current Quest: {teamData.mission}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Your startup's database has been compromised. The attacker left a backdoor in the API. Collaborate with your cross-functional party to secure the endpoint, patch the vulnerability, and deploy the fix before customer data is exfiltrated.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Badge color="var(--neon-red)">Time Remaining: 45:00</Badge>
                <Badge color="var(--neon-cyan)">Reward: +2000 XP</Badge>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <Button className="btn-neon-purple" onClick={() => setActiveQuest(true)} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Join Quest</Button>
              </div>
            </div>
            
            <h4 style={{ marginBottom: '1rem' }}>Assigned Strike Party</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {teamData.members.map(member => (
                <div 
                  key={member.id} 
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    background: 'var(--bg-input-card)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--neon-cyan)' }}>{member.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{member.location} &middot; {member.timezone} &middot; {member.role}</div>
                    <div>
                      {member.skills.map(s => <Badge key={s} color="var(--neon-green)">{s}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <Button style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
          <Card style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
            <h3 style={{ color: 'var(--neon-cyan)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>Comms Channel: Incident Alpha</h3>
            <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '1rem', minHeight: 0, scrollBehavior: 'smooth' }}>
              {chatLog.map((log, idx) => (
                <div key={idx} style={{ 
                  background: log.sender === 'System' ? 'rgba(0,0,0,0.2)' : 'var(--bg-input-card)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  border: 'var(--chat-border)',
                  borderLeft: log.sender === 'System' ? '3px solid var(--neon-green)' : '3px solid var(--neon-cyan)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: log.sender === 'System' ? 'var(--neon-green)' : 'var(--text-primary)' }}>{log.sender}</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{log.time}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{log.text}</div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
            <h3 style={{ color: 'var(--neon-cyan)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              {taskPhase < 2 ? 'Assigned Task: Isolate Threat' : 'Assigned Task: Purge Endpoint Cache'}
            </h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {taskPhase < 2 ? (
                <>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    David discovered the attacker is establishing connections via <span style={{ color: 'var(--neon-red)' }}>198.51.100.42</span>. 
                    Configure the firewall rules immediately to block inbound and outbound traffic from this IP so David can deploy the patch securely.
                  </p>
                  
                  <div style={{ padding: '1.5rem', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Firewall Configuration Console</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <label style={{ width: '100px', color: 'var(--text-secondary)' }}>Target IP:</label>
                        <input type="text" value={fwIp} onChange={e => setFwIp(e.target.value)} placeholder="e.g. 198.51.100.42" style={{ flex: 1, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '4px' }} disabled={taskPhase >= 1.5} />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <label style={{ width: '100px', color: 'var(--text-secondary)' }}>Action:</label>
                        <select value={fwAction} onChange={e => setFwAction(e.target.value)} style={{ flex: 1, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '4px' }} disabled={taskPhase >= 1.5}>
                          <option>SELECT ACTION</option>
                          <option>ALLOW</option>
                          <option>BLOCK (DENY)</option>
                        </select>
                      </div>
                    </div>
                    {taskPhase === 1 ? (
                      <Button onClick={handleCompleteFirewall} className="btn-neon" style={{ width: '100%' }}>Execute Override</Button>
                    ) : (
                      <div style={{ padding: '1rem', background: 'rgba(57, 255, 20, 0.1)', color: 'var(--neon-green)', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--neon-green)' }}>
                        Rule Applied: Connection terminated. Standby for further requests.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    The backend patch is live. Purge the CDN edge cache so that the clean application state propagates to all global users.
                  </p>
                  
                  <div style={{ padding: '1.5rem', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ marginBottom: '1rem' }}>CDN Edge Control</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <label style={{ width: '100px', color: 'var(--text-secondary)' }}>Region:</label>
                        <select value={cdnRegion} onChange={e => setCdnRegion(e.target.value)} style={{ flex: 1, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '4px' }} disabled={taskPhase >= 2.5}>
                          <option>GLOBAL (ALL REGIONS)</option>
                          <option>US-EAST</option>
                          <option>EU-WEST</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <label style={{ width: '100px', color: 'var(--text-secondary)' }}>Target List:</label>
                        <input type="text" value={cdnTarget} onChange={e => setCdnTarget(e.target.value)} style={{ flex: 1, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '4px' }} disabled={taskPhase >= 2.5} />
                      </div>
                    </div>
                    {taskPhase === 2 ? (
                      <Button onClick={handleCompletePurge} className="btn-neon-purple" style={{ width: '100%' }}>Initiate Invalidation</Button>
                    ) : (
                      <div style={{ padding: '1rem', background: 'rgba(57, 255, 20, 0.1)', color: 'var(--neon-green)', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--neon-green)' }}>
                        Invalidation Complete: CDN cache purged.
                      </div>
                    )}
                    
                    {questReadyToComplete && !missionComplete && (
                       <Button className="btn-neon-purple" style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', marginTop: '1rem' }} onClick={() => { setMissionComplete(true); addXP(earnedXp); }}>
                         Complete Quest
                       </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {missionComplete && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'
        }}>
          <div className="glass-panel" style={{ textAlign: 'center', minWidth: '400px', padding: '3rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
            <h2 className="glow-text">Operation Successful!</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Your party successfully secured the startup API and prevented data exfiltration.</p>
            <p style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '2rem' }}>+{earnedXp} XP Earned</p>
            <Button onClick={() => { 
                setActiveQuest(false); 
                setMissionComplete(false); 
                setQuestReadyToComplete(false);
                setTaskPhase(1); 
                setFwIp(''); 
                setFwAction('SELECT ACTION');
                setCdnRegion('GLOBAL (ALL REGIONS)');
                setCdnTarget('api.startup.com/*');
                setEarnedXp(2000);
                setChatLog([
                  { sender: 'System', text: 'Connecting to secure channel...', time: '00:00' },
                  { sender: 'Maya (Manager)', text: 'Party, marketing is holding off the press but we need this API patched ASAP.', time: '00:01' },
                  { sender: 'David (Backend Dev)', text: 'I found the compromised endpoint. I need security to block the botnet IPs so I can push the patch safely.', time: '00:03' }
                ]);
                timeRef.current = 4;
              }} style={{ width: '100%', padding: '1rem' }}>Return to Lobby</Button>
          </div>
        </div>
      )}

      {/* Floating XP Announcements */}
      <div style={{ position: 'fixed', top: '6rem', right: '2rem', zIndex: 1100, display: 'flex', flexDirection: 'column', gap: '0.5rem', pointerEvents: 'none' }}>
        {xpAnnouncements.map(ann => (
          <div key={ann.id} className="xp-float" style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${ann.amount > 0 ? 'var(--neon-green)' : 'var(--neon-red)'}`,
            color: ann.amount > 0 ? 'var(--neon-green)' : 'var(--neon-red)',
            fontWeight: 'bold', fontSize: '1.1rem',
            textAlign: 'center',
            boxShadow: `0 0 10px ${ann.amount > 0 ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 7, 58, 0.2)'}`
          }}>
            {ann.amount > 0 ? `+${ann.amount} XP (Task Correct)` : `${ann.amount} XP (Task Failed)`}
          </div>
        ))}
      </div>

    </div>
  );
};
