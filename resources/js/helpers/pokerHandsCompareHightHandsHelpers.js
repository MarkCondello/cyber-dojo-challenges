import {helpers} from './pokerHandHelpers.js';

export default class compareHighHandsHelpers {
    compareFullHouseCards(){
        let threeOfAKindHands = [...this.playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard.trips.value - playerA.handValue.highCard.trips.value ); //check if there is 2 hands with the same high three of a kind 
        if(threeOfAKindHands[0].handValue.highCard.trips.value === threeOfAKindHands[1].handValue.highCard.trips.value) {
            //I dont think that the pair check is needed as there can only be 1 three of a kind of any value which mean that the high trips in a book always wins; no need to check pair values
            let twoOfAKindHands = [...this.playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard.pair.value - playerA.handValue.highCard.pair.valuex);
            if(twoOfAKindHands[0].handValue.highCard.pair.value === twoOfAKindHands[1].handValue.highCard.pair.value) {
                let highPairs = [...twoOfAKindHands].filter(hand => hand.handValue.highCard.pair.value === twoOfAKindHands[0].handValue.highCard.pair.value);
                this.splitPotHands = highPairs;
            } else {
                this.highestHand = twoOfAKindHands[0]; //high pair
                this.highestHand.arrayIndex = this.getWinningHandIndex();
            }
        } else {
            this.highestHand = threeOfAKindHands[0];
            this.highestHand.arrayIndex = this.getWinningHandIndex();
        }
    }
    compareTwoPairHighCards() {
        let playersHighPairValuesSorted = [...this.playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard[0].value - playerA.handValue.highCard[0].value);
        //if there are no mathching high cards from players return the high hand
        if (playersHighPairValuesSorted[0].handValue.highCard[0].value === playersHighPairValuesSorted[1].handValue.highCard[0].value) {
            //filter hands by top high card and sort by value
            let playersSecondPairValuesFilteredAndSorted = [...playersHighPairValuesSorted]
                .filter(highHand => highHand.handValue.highCard[0].value === playersHighPairValuesSorted[0].handValue.highCard[0].value)
                .sort((playerA, playerB) => playerB.handValue.highCard[1].value - playerA.handValue.highCard[1].value);
            if (playersSecondPairValuesFilteredAndSorted[0].handValue.highCard[1].value === playersSecondPairValuesFilteredAndSorted[1].handValue.highCard[1].value) { //if second players have same second hand  
                let matchingSecondCardHands = [...playersSecondPairValuesFilteredAndSorted]
                .filter(highHand => highHand.handValue.highCard[1].value === playersSecondPairValuesFilteredAndSorted[0].handValue.highCard[1].value);
                //check for non pair hands //remove pairs to compare kicker cards
                let nonPairHandsSortedByValue = [...matchingSecondCardHands].map(secondCardHand=>{
                    let pairs = [];
                    pairs.push(secondCardHand.handValue.highCard[0].card.slice(1));
                    pairs.push(secondCardHand.handValue.highCard[1].card.slice(1));

                    let nonPairs = [...secondCardHand.hand].filter((card) => !pairs.includes(card.slice(1)));
                    secondCardHand.handValue.nonPairs = helpers.sortCardsByValues(nonPairs);
                    return secondCardHand;
                }).sort((playerA, playerB) => playerB.handValue.nonPairs[0].value - playerA.handValue.nonPairs[0].value);

                if(nonPairHandsSortedByValue[0].handValue.nonPairs[0].value > nonPairHandsSortedByValue[1].handValue.nonPairs[0].value){
                    this.highestHand = nonPairHandsSortedByValue[0];
                    this.highestHand.handValue.kicker = nonPairHandsSortedByValue[0].handValue.nonPairs[0];
                    this.highestHand.arrayIndex = this.getWinningHandIndex();
                } else {
                    let highestNonPairKickerHand = nonPairHandsSortedByValue[0].handValue.nonPairs[0].value,
                    highNonPairKickerHands = [...nonPairHandsSortedByValue].filter(hand => highestNonPairKickerHand === hand.handValue.nonPairs[0].value);
                    //need to set split pot hands to the cards with high non pairs
                    this.splitPotHands = [...highNonPairKickerHands];
                }
            } else {
                this.highestHand = playersSecondPairValuesFilteredAndSorted[0];
                this.highestHand.handValue.kicker = playersSecondPairValuesFilteredAndSorted[0].handValue.highCard[1]; //return the hand with the high second card as kicker value
                this.highestHand.arrayIndex = this.getWinningHandIndex();
            }
        } else {
            this.highestHand = playersHighPairValuesSorted.shift();
            this.highestHand.arrayIndex = this.getWinningHandIndex();
        }
    }
    comparePairHighCards(){
        let playersHighCardValuesSorted = [...this.playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard.value - playerA.handValue.highCard.value);
        if (playersHighCardValuesSorted[0].handValue.highCard.value === playersHighCardValuesSorted[1].handValue.highCard.value) {
            let highCardHandsFiltered = [...playersHighCardValuesSorted].filter(highHand => highHand.handValue.highCard.value === playersHighCardValuesSorted[0].handValue.highCard.value);
            
            let nonPairHandsSortedByValue = [...highCardHandsFiltered].map(highCardHand => { //remove pairs to compare kicker cards
                let pair = highCardHand.handValue.highCard.card.slice(1),
                nonPairs = [...highCardHand.hand].filter(card => !pair.includes(card.slice(1)) );
                highCardHand.handValue.nonPairs = helpers.sortCardsByValues(nonPairs, 'desc');
                return highCardHand;
            }).sort((playerA, playerB) => playerB.handValue.nonPairs[0].value - playerA.handValue.nonPairs[0].value);

            let setWinningKickerHand = (nonPairCardId = 0, sortedCards, nthLabel = "First") => {
                console.log(`${nthLabel} non pair check`, {first: sortedCards[0].handValue.nonPairs[nonPairCardId].value, second: sortedCards[1].handValue.nonPairs[nonPairCardId].value , card: sortedCards[0].handValue.nonPairs[nonPairCardId].card})
                this.highestHand = sortedCards[0];
                this.highestHand.kicker = sortedCards[0].handValue.nonPairs[nonPairCardId].card;
                this.highestHand.arrayIndex = this.getWinningHandIndex();
            }
            //check highest nonPair hands from the 2 hands, there can not be more than 2 pairs of any card
            if(nonPairHandsSortedByValue[0].handValue.nonPairs[0].value === nonPairHandsSortedByValue[1].handValue.nonPairs[0].value){
                let handsSortedBySecondNonPair = [...nonPairHandsSortedByValue].sort((playerA, playerB) => playerB.handValue.nonPairs[1].value - playerA.handValue.nonPairs[1].value)
                if(handsSortedBySecondNonPair[0].handValue.nonPairs[1].value === handsSortedBySecondNonPair[1].handValue.nonPairs[1].value){
                    let handsSortedByThirdNonPair = [...handsSortedBySecondNonPair].sort((playerA, playerB) => playerB.handValue.nonPairs[2].value - playerA.handValue.nonPairs[2].value)
                    if(handsSortedByThirdNonPair[0].handValue.nonPairs[2].value === handsSortedByThirdNonPair[1].handValue.nonPairs[2].value){
                        this.splitPotHands = [...handsSortedByThirdNonPair];
                    } else {
                        setWinningKickerHand(2, handsSortedByThirdNonPair, "Third")
                    }
                } else {
                    setWinningKickerHand(1, handsSortedBySecondNonPair, "Second")
                }
            } else {
                setWinningKickerHand(0, nonPairHandsSortedByValue, "First")
            }
        } else { //if there are no matching high cards from the two players hands, return the first high hand
            this.highestHand = playersHighCardValuesSorted[0];
            this.highestHand.arrayIndex = this.getWinningHandIndex();
        }
    }
    compareHighCards() {
        let playersHighCardValuesSorted = [...this.playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard.value - playerA.handValue.highCard.value);
        if (playersHighCardValuesSorted[0].handValue.highCard.value === playersHighCardValuesSorted[1].handValue.highCard.value) {
            let highCardHandsFiltered = [...playersHighCardValuesSorted].filter(highHand => highHand.handValue.highCard.value === playersHighCardValuesSorted[0].handValue.highCard.value);
            this.splitPotHands = highCardHandsFiltered;
        } else {         //if there are no matching high cards from players return the high hand
            this.highestHand = playersHighCardValuesSorted[0];
            this.highestHand.arrayIndex = this.getWinningHandIndex();
        }
    }
}
