import React, { useState } from 'react';
import './Game.css';
import Hand from './Hand';
import { Card, createDeck, shuffle, calculateHandValue } from './gameUtils';

const Game: React.FC = () => {
    const [deck, setDeck] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const startGame = () => {
        const newDeck: Card[] = shuffle(createDeck());
        const playerStartingHand: Card[] = [newDeck.pop()!, newDeck.pop()!];
        const dealerStartingHand: Card[] = [newDeck.pop()!, newDeck.pop()!];

        setDeck(newDeck);
        setPlayerHand(playerStartingHand);
        setDealerHand(dealerStartingHand);
        setGameOver(false);
        setMessage('');
    };

    const hit = () => {
        if (gameOver) return;
        const newDeck = [...deck];//コピーの作成
        const newPlayerHand = [...playerHand, newDeck.pop()!];
        setDeck(newDeck);
        setPlayerHand(newPlayerHand);

        const playerHandValue = calculateHandValue(newPlayerHand);
        if (playerHandValue > 21) {
            setMessage('Player Bust! Dealer Win!');
            setGameOver(true);
        }
    };

    const stand = () => {
        if (gameOver) return;

        let newDealerHand: Card[] = [...dealerHand];
        let newDeck: Card[] = [...deck];
        while (calculateHandValue(newDealerHand) < 17) {
            newDealerHand = [...newDealerHand, newDeck.pop()!];
            setDeck(newDeck);
        }

        const playerHandValue: number = calculateHandValue(playerHand);
        const dealerHandValue: number = calculateHandValue(newDealerHand);

        if (dealerHandValue > 21) {
            setMessage('Dealer Bust! Player Win!');
        } else if (playerHandValue > dealerHandValue) {
            setMessage('Player Win!');
        } else if (playerHandValue < dealerHandValue) {
            setMessage('Dealer Win!');
        } else {
            setMessage('Draw');
        }

        setDealerHand(newDealerHand);
        setGameOver(true);
    };

    return (
        <div className="game">
            <h1>Blackjack</h1>

            <div className="hands">
                <div className='dealerHand'>
                    <h2>Dealer</h2>
                    <Hand cards={dealerHand} />
                </div>
                <div>
                    <Hand cards={playerHand} />
                    <h2>Player</h2>
                </div>
            </div>
            <div className="controls">
                <button onClick={startGame}>スタート</button>
                <button onClick={hit} disabled={gameOver}>Hit</button>
                <button onClick={stand} disabled={gameOver}>Stand</button>
            </div>
            <div className="message">{message}</div>
        </div>
    );
};

export default Game;
