import React from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Avatar } from '../components/UI/Avatar';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

export const MentorDashboard = () => {
  const { mentor, approveMentee, rejectMentee } = useDemo();

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <Avatar alt={mentor.name} size="80px" border="var(--neon-purple)" />
        <div>
          <h1 className="glow-text-purple">{mentor.name}</h1>
          <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {mentor.role}
          </div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card glow style={{ borderColor: 'var(--neon-yellow)' }}>
            <h3 style={{ color: 'var(--neon-yellow)', marginBottom: '1.5rem' }}>Incoming Mentee Requests</h3>
            {mentor.pendingRequests.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No pending requests.</p>
            ) : (
              mentor.pendingRequests.map(req => (
                <div key={req.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>{req.name}</h4>
                      <Badge color="var(--neon-cyan)">{req.role}</Badge>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
                    "{req.message}"
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button onClick={() => approveMentee(req.id)} style={{ flex: 1, padding: '0.5rem' }}>✅ Approve</Button>
                    <Button className="btn-neon-red" onClick={() => rejectMentee(req.id)} style={{ flex: 1, padding: '0.5rem', background: 'transparent' }}>❌ Reject</Button>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card>
            <h3>Active Mentees</h3>
            {mentor.mentees.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No active mentees.</p>
            ) : (
              mentor.mentees.map(m => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <Avatar alt={m.name} size="50px" />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0 }}>{m.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.role}</span>
                  </div>
                  <div>
                    {m.recentSubmission ? (
                      <Button onClick={() => viewStudentPortfolio(m.id)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>Review Work</Button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', color: 'var(--text-secondary)', border: '1px dashed var(--text-secondary)', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Up to date</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Card>
          <h3>Update Profile</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Manage your mentor details publicly visible to students.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Display Name</label>
              <input type="text" defaultValue={mentor.name} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.75rem', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Professional Role</label>
              <input type="text" defaultValue={mentor.role} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.75rem', borderRadius: '4px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Focus Areas (Comma separated)</label>
              <input type="text" defaultValue="Cybersecurity, Threat Hunting, Career Advice" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.75rem', borderRadius: '4px' }} />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
