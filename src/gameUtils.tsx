export interface Card {
    rank: string;
    suit: string;
}
// デック作成
export const createDeck = (): Card[] => {
    const ranks: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits: string[] = ['♠', '♣', '♦', '♥'];
    const deck: Card[] = [];
    for (let rank of ranks) {
        for (let suit of suits) {
            deck.push({ rank, suit });
        }
    }
    return deck;
};

// デックのシャッフル
export const shuffle = (deck: Card[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

// 手札の合計値計算
export const calculateHandValue = (cards: Card[]): number => {
    let sum: number = 0;
    let aceCount: number = 0;

    for (let card of cards) {
        if (card.rank === 'A') {
            aceCount++;
        } else if (['J', 'Q', 'K'].includes(card.rank)) {
            sum += 10;
        } else {
            sum += parseInt(card.rank, 10);
        }
    }

    for (let i = 0; i < aceCount; i++) {
        if (sum + 11 <= 21) {
            sum += 11;
        } else {
            sum += 1;
        }
    }

    return sum;
};