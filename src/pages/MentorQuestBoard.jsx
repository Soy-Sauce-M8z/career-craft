import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { Avatar } from '../components/UI/Avatar';

export const MentorQuestBoard = () => {
  const { mentor, addQuestPosting, recommendMenteeForQuest } = useDemo();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Internship',
    description: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [activeRecommendationId, setActiveRecommendationId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.company && formData.description) {
      addQuestPosting(formData);
      setFormData({ title: '', company: '', type: 'Internship', description: '' });
      setShowForm(false);
    }
  };

  const handleRecommend = (questId, menteeId) => {
    recommendMenteeForQuest(questId, menteeId);
    setActiveRecommendationId(null);
  };

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="glow-text">Mentor Quest Board</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel Posting' : 'Post New Quest'}
        </Button>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Post job and internship opportunities from your company and recommend specific mentees 
        to help them fast-track their career levels.
      </p>

      {showForm && (
        <Card style={{ marginBottom: '3rem', border: '1px solid var(--neon-cyan)' }}>
          <h3 className="glow-text" style={{ marginBottom: '1.5rem' }}>Create a New Quest</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Quest Title (Role)</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="e.g. Junior Dev"
                  style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', fontFamily: 'inherit' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Company</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                  placeholder="e.g. Acme Corp"
                  style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', fontFamily: 'inherit' }} 
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Quest Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', fontFamily: 'inherit' }}
              >
                <option>Internship</option>
                <option>Full-time</option>
                <option>Contract</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Quest Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows="4"
                placeholder="Describe the quest responsibilities and rewards..."
                style={{ background: 'var(--bg-input)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '4px', fontFamily: 'inherit', resize: 'vertical' }} 
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button type="submit">Post Quest</Button>
            </div>
          </form>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {mentor.questBoard.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No quests posted yet. Create one above.</p>
        ) : (
          mentor.questBoard.map(quest => (
            <Card key={quest.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{quest.title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.2rem' }}>{quest.company}</p>
                </div>
                <Badge color={quest.type === 'Internship' ? 'var(--neon-cyan)' : 'var(--neon-purple)'}>{quest.type}</Badge>
              </div>
              
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                {quest.description}
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Recommended Apprentices ({quest.recommendedMentees.length})
                </h4>
                
                {quest.recommendedMentees.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {quest.recommendedMentees.map(mId => {
                      const mentee = mentor.mentees.find(m => m.id === mId);
                      return mentee ? (
                        <div key={mId} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                          <Avatar size="20px" alt={mentee.name} glow={false} />
                          <span style={{ fontSize: '0.85rem' }}>{mentee.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                {activeRecommendationId === quest.id ? (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Select apprentice:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {mentor.mentees.filter(m => !quest.recommendedMentees.includes(m.id)).length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>All apprentices recommended.</p>
                      ) : (
                        mentor.mentees
                          .filter(m => !quest.recommendedMentees.includes(m.id))
                          .map(mentee => (
                            <div 
                              key={mentee.id} 
                              onClick={() => handleRecommend(quest.id, mentee.id)}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', cursor: 'pointer', borderRadius: '4px', hover: { background: 'var(--bg-card-hover)' } }}
                              className="mentee-hover-row"
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Avatar size="24px" alt={mentee.name} glow={false} />
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{mentee.name}</span>
                              </div>
                              <Badge color="var(--neon-green)">+ Add</Badge>
                            </div>
                          ))
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveRecommendationId(null)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.75rem', cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setActiveRecommendationId(quest.id)}
                    style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', width: '100%' }}
                  >
                    + Recommend Apprentice
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
      <style>{`
        .mentee-hover-row:hover {
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
};
