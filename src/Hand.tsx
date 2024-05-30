import React from 'react';
import CardComponent from './Card';  // 名前の衝突を避けるためにCardComponentに名前を変更
import { Card } from './gameUtils';

interface HandProps {
  cards: Card[];
}

const Hand: React.FC<HandProps> = ({ cards }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <CardComponent key={index} rank={card.rank} suit={card.suit} />
      ))}
    </div>
  );
};

export default Hand;
