import React from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';
import { useDemo } from '../context/DemoContext';

export const Courses = () => {
  const { student } = useDemo();

  const courses = [
    { id: 1, title: 'Network Security Fundamentals', provider: 'Hack-RPG Core', alignScore: 95, tags: ['Networking', 'Cybersecurity'], difficulty: 'Beginner', desc: 'Learn the basics of packet sniffing, firewalls, and securing local networks.', recommended: true },
    { id: 2, title: 'Linux Command Line Mastery', provider: 'Community: xX_Hacker_Xx', alignScore: 88, tags: ['Linux', 'DevOps'], difficulty: 'Intermediate', desc: 'Deep dive into bash scripting and server management.', recommended: true },
    { id: 3, title: 'Web3 Smart Contract Security', provider: 'Community: CryptoSec', alignScore: 45, tags: ['Web3', 'Blockchain'], difficulty: 'Advanced', desc: 'Identify vulnerabilities in Solidity smart contracts.', recommended: false },
    { id: 4, title: 'React Performance Optimization', provider: 'Hack-RPG Core', alignScore: 60, tags: ['Programming', 'Frontend'], difficulty: 'Advanced', desc: 'Master rendering lifecycles and memoization in React apps.', recommended: false }
  ];

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text">Skill Catalog & Courses</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Browse available training modules. AI has highlighted courses that best align with your current skill gaps.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
        {courses.map(course => (
          <Card key={course.id} glow={course.recommended} style={{ display: 'flex', flexDirection: 'column', borderColor: course.recommended ? 'var(--neon-green)' : 'var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <Badge color={course.difficulty === 'Beginner' ? 'var(--neon-green)' : course.difficulty === 'Intermediate' ? 'var(--neon-yellow)' : 'var(--neon-red)'}>{course.difficulty}</Badge>
              {course.recommended && <span style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '0.85rem' }}>✨ Highly Aligned ({course.alignScore}%)</span>}
              {!course.recommended && <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.85rem' }}>Alignment: {course.alignScore}%</span>}
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{course.title}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', marginBottom: '1rem' }}>By: {course.provider}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>{course.desc}</p>
            <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              {course.tags.map(t => <Badge key={t} color="var(--neon-purple)">{t}</Badge>)}
            </div>
            <Button style={{ width: '100%' }}>Enroll in Course</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
