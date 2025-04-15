import React from 'react';

interface BadgeProps {
  count: number;
}

const Badge: React.FC<BadgeProps> = ({ count }) => {
  return (
    <span className="absolute top-2 right-10 flex items-center justify-center w-4 h-4 text-xs  text-black bg-yellow-300 rounded-full">
      {count}
    </span>
  );
};

export default Badge;