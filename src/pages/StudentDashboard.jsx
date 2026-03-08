import React from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { ProgressBar } from '../components/UI/ProgressBar';
import { Badge } from '../components/UI/Badge';
import { Avatar } from '../components/UI/Avatar';

export const StudentDashboard = () => {
  const { student, setStudent, startMission } = useDemo();

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <Avatar alt={student.name} size="100px" />
        <div style={{ flex: 1 }}>
          <h1 className="glow-text">{student.name}</h1>
          <div style={{ fontSize: '1.2rem', color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>
            Level {student.level} Hacker
          </div>
          <ProgressBar current={student.xp} max={student.xpToNext} label="Experience Points" color="var(--neon-purple)" height="12px" />
        </div>
      </div>

      <div className="grid-cols-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card>
            <h3 className="glow-text">Current Skills & Modifiers</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Your skills grant modifiers to Dice Rolls during interactive missions. Higher modifiers increase chances of success in complex tasks like brute forcing or debugging.
            </p>
            {Object.entries(student.skills).map(([skill, data]) => (
              <div key={skill} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                <span style={{ textTransform: 'capitalize' }}>{skill} <span style={{ color: 'var(--text-secondary)' }}>(Lvl {data.level})</span></span>
                <span style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>{data.modifier} Roll Bonus</span>
              </div>
            ))}
          </Card>

          <Card glow style={{ borderColor: 'var(--neon-cyan)' }}>
            <h3 className="glow-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              AI Career Guide
            </h3>
            <div style={{ marginTop: '1rem' }}>
              {!student.insightsLoaded ? (
                <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                  <p style={{ marginBottom: '1.5rem' }}>Ready to level up? Generate an AI-powered skill gap assessment and personalized career path based on your resume and current skills.</p>
                  <Button onClick={() => setStudent(prev => ({...prev, insightsLoaded: true}))}>Receive Insights</Button>
                </div>
              ) : (
                <>
                  <p><strong>Analysis:</strong> You're strong in <span style={{ color: 'var(--neon-green)' }}>{student.resumeAnalysis.strengths.join(', ')}</span> but lack fundamentals in <span style={{ color: 'var(--neon-red)' }}>{student.resumeAnalysis.gaps.join(', ')}</span>.</p>
                  
                  <div style={{ margin: '1.5rem 0' }}>
                    <strong>Recommended Path:</strong>
                    <div style={{ fontSize: '1.2rem', color: 'var(--neon-purple)', marginTop: '0.5rem' }}>
                      {student.resumeAnalysis.recommendedPath}
                    </div>
                  </div>

                  <strong>Recommended Courses to bridge gap:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    {student.resumeAnalysis.recommendedCourses.map(course => (
                      <Badge key={course} color="var(--neon-green)">{course}</Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card>
            <h3 className="glow-text">Available Quests</h3>
            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--neon-purple)' }}>Investigate a Suspicious Login</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cybersecurity • +500 XP</span>
                </div>
                <Badge color="var(--neon-yellow)">Medium</Badge>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                A suspicious login attempt has been detected on the internal server. Open the terminal, inspect the logs, and neutralize the threat.
              </p>
              <Button onClick={() => startMission('cyber-1')} style={{ width: '100%' }}>Launch Simulator</Button>
            </div>

            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--neon-purple)' }}>Fix Authentication Bypass</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Software Dev • +800 XP</span>
                </div>
                <Badge color="var(--neon-red)">Hard</Badge>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Debug a critical REST endpoint that is returning unauthorized data. Inspect network payloads and patch the middleware logic.
              </p>
              <Button onClick={() => startMission('dev-1')} style={{ width: '100%' }}>Launch Code Editor</Button>
            </div>

            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--neon-purple)' }}>Phishing Email Analysis</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cybersecurity • +300 XP</span>
                </div>
                <Badge color="var(--neon-green)">Easy</Badge>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Employees are reporting suspicious emails. Examine the headers and attachment payloads to determine the vector.
              </p>
              <Button onClick={() => startMission('cyber-2')} style={{ width: '100%' }}>Launch Sandbox</Button>
            </div>
          </Card>

          <Card>
            <h3 className="glow-text">Completed Missions</h3>
            {student.completedMissions.map((mission, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--neon-green)' }}>✔</span>
                <span>{mission}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Card>
          <h3>Update Profile</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Manage your personal details and skill levels to help matchmaking with teams.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Display Name</label>
              <input type="text" defaultValue={student.name} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.75rem', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Upload Resume to Scan Skills</label>
              <input type="file" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '0.65rem', borderRadius: '4px', fontFamily: 'inherit' }} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Additional Skills (Comma separated)</label>
              <input type="text" defaultValue="Cybersecurity, Programming" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.75rem', borderRadius: '4px', fontFamily: 'inherit' }} />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-neon">Save Changes</button>
          </div>
        </Card>
      </div>
    </div>
  );
};
