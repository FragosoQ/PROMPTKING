import React from 'react';

const Fireworks: React.FC = () => {
  const fireworks = Array.from({ length: 5 }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 50 + 20}%`,
      animationDelay: `${Math.random() * 2}s, ${Math.random() * 2 + 0.5}s`,
    };
    return <div key={i} className="firework" style={style} />;
  });

  return <div className="absolute inset-0 w-full h-full pointer-events-none z-50">{fireworks}</div>;
};

export default Fireworks;
