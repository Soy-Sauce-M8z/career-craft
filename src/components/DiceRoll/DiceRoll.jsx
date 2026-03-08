import React, { useState, useEffect } from 'react';

export const DiceRoll = ({ skillModifier, targetValue, onComplete }) => {
  const [rolling, setRolling] = useState(true);
  const [displayRoll, setDisplayRoll] = useState(1 + skillModifier);
  const [total, setTotal] = useState(0);
  const [raw, setRaw] = useState(0);

  useEffect(() => {
    let interval;
    let timeout;
    let finalTimeout;

    if (rolling) {
      interval = setInterval(() => {
        setDisplayRoll(Math.floor(Math.random() * 20) + 1 + skillModifier);
      }, 50);

      timeout = setTimeout(() => {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 20) + 1;
        setRaw(finalRoll);
        const calculatedTotal = finalRoll + skillModifier;
        setDisplayRoll(calculatedTotal);
        setTotal(calculatedTotal);
        setRolling(false);
        finalTimeout = setTimeout(() => {
          onComplete({
            success: calculatedTotal >= targetValue,
            total: calculatedTotal,
            rawRoll: finalRoll
          });
        }, 2000);
      }, 1500);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(finalTimeout);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(5px)'
    }}>
      <div className="glass-panel" style={{ textAlign: 'center', minWidth: '300px' }}>
        <h2 className="glow-text">Skill Check</h2>
        <div style={{ fontSize: '4rem', fontWeight: 'bold', margin: '2rem 0', color: rolling ? 'var(--text-primary)' : (total >= targetValue ? 'var(--neon-green)' : 'var(--neon-red)') }}>
          {displayRoll}
        </div>
        {!rolling && (
          <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            {raw} (Roll) + {skillModifier} (Modifier) = <strong>{total}</strong>
          </div>
        )}
        <div style={{ color: 'var(--text-secondary)' }}>Target: {targetValue}</div>
        {!rolling && (
          <h3 style={{ marginTop: '1rem', color: total >= targetValue ? 'var(--neon-green)' : 'var(--neon-red)' }}>
            {total >= targetValue ? 'SUCCESS!' : 'FAILED'}
          </h3>
        )}
      </div>
    </div>
  );
};
