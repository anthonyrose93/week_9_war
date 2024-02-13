class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0; // Player score will increment by 1 each round.
    }

    addCard(card) {
        this.hand.push(card);
    }

    removeCard() {
        return this.hand.pop();
    }

    hasCards() {
        return this.hand.length > 0;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
        this.shuffle();
    }

    createDeck() {
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
        console.log("Deck has been created", this.cards)
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        if (this.cards.length === 0) {
            console.log("No more cards in the deck!");
            return null;
        }

        return this.cards.pop();
    }
}

class Game {
    constructor() {
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Player 2");
        this.deck = new Deck();
        this.dealInitialCards();
    }

    dealInitialCards() {
        while (this.deck.cards.length > 0) {
            // console.log(this.deck)
            this.player1.addCard(this.deck.deal());
            this.player2.addCard(this.deck.deal());
        }
    }

    playRound() {
        const card1 = this.player1.removeCard();
        const card2 = this.player2.removeCard();

        if (!card1 || !card2) {
            return false;
        }

        console.log(`Player 1 plays: ${card1}`);
        console.log(`Player 2 plays: ${card2}`);

        if (card1.rank > card2.rank) {
            this.player1.score++;
            console.log("Player 1 wins this round!", this.player1.score)
        } else if (card1.rank < card2.rank) {
            this.player2.score++;
            console.log("Player 2 wins this round!", this.player2.score)
        } else {
            console.log("It's a tie! Both players keep their cards.");
        }

        // return this.player1.hasCards() && this.player2.hasCards();
    }

    determineWinner() {
        if (this.player1.score > this.player2.score) {
            console.log("Player 1 wins!", this.player1.score);
            console.log("Player 2 loses.", this.player2.score)
        } else if (this.player2.score > this.player1.score) {
            console.log("Player 2 wins!", this.player2.score);
            console.log("Player 1 loses.", this.player1.score)
        } else {
        console.log("The game ends in a tie", this.player1.score, this.player2.score)
        }
    }
}

const warGame = new Game();

for (let round = 1; round <= 26; round++) {
    console.log(`Round ${round}`);
    warGame.playRound()
}

console.log("Game over.");
warGame.determineWinner();