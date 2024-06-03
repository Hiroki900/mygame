import React from 'react';
import CardComponent from './Card';  // 名前の衝突を避けるためにCardComponentに名前を変更
import { Card } from './gameUtils';

interface HandProps {
  cards: Card[];
  showSecondCard?: boolean;
}

const Hand: React.FC<HandProps> = ({ cards, showSecondCard = true }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => {
        if (index === 1 && !showSecondCard) {
          return <div key={index} className="card back">?</div>;
        }
        return <CardComponent key={index} rank={card.rank} suit={card.suit} />;
      })}
    </div>
  );
};

export default Hand;
