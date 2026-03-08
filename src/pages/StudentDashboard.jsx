import React, { useState, useRef, useEffect } from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { ProgressBar } from '../components/UI/ProgressBar';
import { Badge } from '../components/UI/Badge';
import { Avatar } from '../components/UI/Avatar';

export const StudentDashboard = () => {
  const { student, setStudent, startMission } = useDemo();
  
  // AI Career Chat State
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hello! I'm your AI Career Guide. How can I help you level up your skills today?" }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Only scroll the specific chat container instead of the whole page
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [chatHistory]);

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!currentQuestion.trim()) return;

    // Add User Message
    const userMsg = { role: 'user', text: currentQuestion };
    setChatHistory(prev => [...prev, userMsg]);

    const qLower = currentQuestion.toLowerCase();
    setCurrentQuestion('');

    // Mock AI Response based on keywords
    setTimeout(() => {
      let aiMsg = { role: 'ai', text: '', links: [] };

      if (/^(hi|hello|hey|greetings|howdy)\b/.test(qLower) || qLower.includes('how are you')) {
        aiMsg.text = "Hello there! I'm here to help you navigate your career path. You can ask me about resume building, study materials, portfolio projects, or interview prep!";
      } else if (qLower.includes('cybersecurity resume') || qLower.includes('resume')) {
        aiMsg.text = "To boost a cybersecurity resume, it's highly recommended to earn recognized certifications and highlight hands-on labs. The CompTIA Security+ is a foundational cert that validates baseline skills.";
        aiMsg.links = [{ title: 'CompTIA Security+ Certification', url: 'https://www.comptia.org/certifications/security' }];
      } else if (qLower.includes('study material') || qLower.includes('youtube') || qLower.includes('video')) {
        aiMsg.text = "There's a wealth of great study material available for free on YouTube! Check out these top channels for cybersecurity tutorials and practical labs:";
        aiMsg.links = [
          { title: "John Hammond's Channel", url: 'https://www.youtube.com/c/JohnHammond010' },
          { title: "NetworkChuck", url: 'https://www.youtube.com/c/NetworkChuck' }
        ];
      } else if (qLower.includes('project') || qLower.includes('portfolio') || qLower.includes('experience')) {
        aiMsg.text = "Building a portfolio is crucial. I recommend starting with setting up a home lab using VirtualBox or Proxmox to practice Active Directory configuration and Kali Linux tooling.";
        aiMsg.links = [{ title: 'Building a Home Lab Guide', url: 'https://www.cyberseek.org/homelab' }];
      } else if (qLower.includes('interview') || qLower.includes('job') || qLower.includes('hire')) {
        aiMsg.text = "For interviews, be prepared to discuss the OWASP Top 10 and how you would respond to a basic incident scenario. Reviewing common technical questions is key.";
        aiMsg.links = [{ title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }];
      } else if (qLower.includes('language') || qLower.includes('code') || qLower.includes('scripting')) {
        aiMsg.text = "Python and Bash are the most heavily utilized scripting languages in security. Learning how to automate tasks and interact with APIs in Python will give you a significant edge.";
        aiMsg.links = [{ title: 'Automate the Boring Stuff (Python)', url: 'https://automatetheboringstuff.com/' }];
      } else {
        aiMsg.text = "I'm still learning about that specific topic! But I can definitely help you with finding study materials, planning portfolio projects, or preparing for technical interviews. What would you like to explore?";
      }

      setChatHistory(prev => [...prev, aiMsg]);
    }, 600);
  };

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
              Your skills grant modifiers to Dice Rolls during interactive quests. Higher modifiers increase chances of success in complex tasks like brute forcing or debugging.
            </p>
            {Object.entries(student.skills).map(([skill, data]) => (
              <div key={skill} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
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
                    <div style={{ color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                      {student.resumeAnalysis.recommendedPath}
                    </div>
                  </div>

                  <strong>Recommended Courses to bridge gap:</strong>
                  <div style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                    {student.resumeAnalysis.recommendedCourses.map(course => (
                      <Badge key={course} color="var(--neon-green)">{course}</Badge>
                    ))}
                  </div>

                  {/* AI Chat Interface */}
                  <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>💬</span> Guide Chat
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1rem' }}>
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                          <div style={{ 
                            background: msg.role === 'user' ? 'var(--bg-input-card)' : 'rgba(255,255,255,0.05)', 
                            border: `1px solid ${msg.role === 'user' ? 'var(--chat-border)' : 'var(--glass-border)'}`,
                            padding: '0.75rem 1rem', 
                            borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.4'
                          }}>
                            {msg.text}
                          </div>
                          
                          {msg.links && msg.links.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'flex-start' }}>
                              {msg.links.map((link, i) => (
                                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card-hover)', color: 'var(--neon-cyan)', padding: '0.5rem 0.75rem', borderRadius: '4px', textDecoration: 'none', border: '1px solid var(--neon-cyan)', fontSize: '0.85rem', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
                                  🔗 {link.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleAskAI} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Ask for resource links or career advice..."
                        style={{ flex: 1, background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', fontFamily: 'inherit' }}
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card>
            <h3 className="glow-text">Available Quests</h3>
            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', background: 'rgba(255,255,255,0.05)' }}>
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
              <Button onClick={() => startMission('cyber-1')} style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}>Launch Simulator</Button>
            </div>

            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', background: 'rgba(255,255,255,0.05)' }}>
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
              <Button onClick={() => startMission('dev-1')} style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}>Launch Code Editor</Button>
            </div>

            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', background: 'rgba(255,255,255,0.05)' }}>
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
              <Button onClick={() => startMission('cyber-2')} style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}>Launch Sandbox</Button>
            </div>
          </Card>

          <Card>
            <h3 className="glow-text">Completed Quests</h3>
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
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Manage your personal details and skill levels to help matchmaking with parties.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Display Name</label>
              <input type="text" defaultValue={student.name} style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Upload Resume to Scan Skills</label>
              <input type="file" style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '0.65rem', borderRadius: '4px', fontFamily: 'inherit' }} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Additional Skills (Comma separated)</label>
              <input type="text" defaultValue="Cybersecurity, Programming" style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', fontFamily: 'inherit' }} />
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
