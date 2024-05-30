import React from 'react';
import './Card.css';

interface CardProps {
    rank: string;
    suit: string;
}

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  return (
    <div className="card">
      <div className="rank">{rank}</div>
      <div className="suit">{suit}</div>
    </div>
  );
};

export default Card;
