import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';

export const TeamLobby = () => {
  const { teamData } = useDemo();
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="glow-text">Team Multiplayer Lobby</h1>
        <Badge color="var(--neon-yellow)">Mission: {teamData.mission}</Badge>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(300px, 800px)', gap: 'var(--spacing-lg)', justifyContent: 'center' }}>
        {/* Active Mission Block */}
        <Card>
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
            <h3 className="glow-text" style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>Current Operation: {teamData.mission}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your startup's database has been compromised. The attacker left a backdoor in the API. Collaborate with your cross-functional team to secure the endpoint, patch the vulnerability, and deploy the fix before customer data is exfiltrated.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Badge color="var(--neon-red)">Difficulty: Critical</Badge>
              <Badge color="var(--neon-yellow)">Time Remaining: 45:00</Badge>
              <Badge color="var(--neon-cyan)">Reward: +2000 XP</Badge>
            </div>
          </div>
          
          <h4 style={{ marginBottom: '1rem' }}>Assigned Strike Team</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {teamData.members.map(member => (
              <div 
                key={member.id} 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)',
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
    </div>
  );
};
