import React from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';

export const LoginDemo = () => {
  const { loginAs } = useDemo();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-lg)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="brand-title glow-text-purple" style={{ fontSize: '3.5rem', margin: 0 }}>Career Craft</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Immersive Career Simulator & Learning Platform</p>
      </div>

      <div className="grid-cols-2" style={{ maxWidth: '800px', width: '100%' }}>
        <Card hoverable glow style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem' }}>
          <h2 style={{ color: 'var(--neon-cyan)', textAlign: 'center' }}>Learner Demo</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Experience the immersive career simulator and gamified progression.</p>
          <Button onClick={() => loginAs('student')} style={{ width: '100%' }}>Login as Student</Button>
        </Card>

        <Card hoverable glow style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem' }}>
          <h2 style={{ color: 'var(--neon-cyan)', textAlign: 'center' }}>Mentor Demo</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Review submissions and approve upcoming talent for mentorship.</p>
          <Button onClick={() => loginAs('mentor')} style={{ width: '100%' }}>Login as Mentor</Button>
        </Card>
      </div>
    </div>
  );
};
