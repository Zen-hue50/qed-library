import React, { useMemo } from 'react';

const Stars: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
      minOpacity: Math.random() * 0.2 + 0.05,
      maxOpacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
            '--min-opacity': star.minOpacity,
            '--max-opacity': star.maxOpacity,
            animationDelay: star.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Stars;
