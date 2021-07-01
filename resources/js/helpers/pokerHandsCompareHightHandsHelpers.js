
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

            if (playersSecondPairValuesFilteredAndSorted[0].handValue.highCard[1].value === playersSecondPairValuesFilteredAndSorted[1].handValue.highCard[1].value) { //if second players have same second hand split pot
                let matchingSecondCardHands = [...playersSecondPairValuesFilteredAndSorted]
                    .filter(highHand => highHand.handValue.highCard[1].value === playersSecondPairValuesFilteredAndSorted[0].handValue.highCard[1].value);
                this.splitPotHands = matchingSecondCardHands;
            } else {
                this.kicker = playersSecondPairValuesFilteredAndSorted[0]; //return the hand with the high second card as kicker value
            }
        } else {
            this.highestHand = playersHighPairValuesSorted[0];
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
