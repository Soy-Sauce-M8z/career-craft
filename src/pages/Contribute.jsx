import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';

export const Contribute = () => {
  return (
    <div className="container" style={{ paddingBottom: '3rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="glow-text-purple">Community Skill Builder</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Upload your own content, suggest new courses, and embed your classes to grow the open-source learning ecosystem.</p>
      </div>

      <Card glow style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--neon-cyan)' }}>Submit a New Course/Quest</h2>
        
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Course Title</label>
            <input type="text" placeholder="e.g. Intro to Docker Containers" style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', width: '100%', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Description</label>
            <textarea rows="4" placeholder="Describe what students will learn..." style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', width: '100%', resize: 'vertical', fontFamily: 'inherit' }}></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Target Skills (Comma separated)</label>
              <input type="text" placeholder="DevOps, Linux" style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', width: '100%', fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Difficulty Level</label>
              <select style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', width: '100%', fontFamily: 'inherit' }}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Interactive Demo / Embed Link</label>
            <input type="url" placeholder="https://your-interactive-sandbox-link.com" style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', width: '100%', fontFamily: 'inherit' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Link a sandbox environment or video tutorial that will be embedded into the platform.</span>
          </div>

          <Button type="submit" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}>Submit for Community Voting</Button>
        </form>
      </Card>
      
      <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>Your submission will be reviewed by peers. If it reaches 50 upvotes, it becomes official platform canon!</p>
      </div>
    </div>
  );
};
