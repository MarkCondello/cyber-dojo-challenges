import {helpers} from "./pokerHandHelpers";

export default class HandChecks {
    highCard(){
        return helpers.sortCardsByValues([...this.playersCards]).pop();
    }

    singlePair(){
        let pairs = helpers.pairsCheck([...this.playersCards]);
        if(pairs.length === 1) {
            return helpers.getCardsValues(pairs).pop();   
        }
        return false;
    }

    twoPair(){
        let pairs = helpers.pairsCheck([...this.playersCards]);
        if(pairs.length === 2){
           return helpers.sortCardsByValues(pairs, 'desc');
        }
        return false;
    }

    tripsCheck(){
        let cards = [...this.playersCards],
        firstRes = helpers.getCardMatches(cards, 1); // first card gets spliced which mutates the cards array and is used for other checks
 
        if (firstRes.length < 3){
            let secondRes = helpers.getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
            if(secondRes.length < 3){
                let thirdRes = helpers.getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
                if(thirdRes.length < 3){
                    return false;
                } else {
                    return helpers.sortCardsByValues(thirdRes, 'desc').pop(); 
                }
            } else {
                return helpers.sortCardsByValues(secondRes, 'desc').pop(); 
            }
        } else {
            return helpers.sortCardsByValues(firstRes, 'desc').pop();  
        }
    }

    straightCheck(){
        let cards = [...this.playersCards],
        heirarchyOfCards = [],
        itemsSorted = helpers.sortCardsByValues(cards), //order the cards 
        firstSortedItem = itemsSorted[0],
        firstSortedItemValue = firstSortedItem.value;

        for(let i = 2; i <= 14; i++){
            heirarchyOfCards.push(i);
        }

        let aceLowStraightRef = [...heirarchyOfCards].splice(0, 4);
        aceLowStraightRef.push( heirarchyOfCards[heirarchyOfCards.length - 1])
    
        let isAceLowStraight = itemsSorted.filter((item, index) => item.value === aceLowStraightRef[index]).length === 5;
        if(isAceLowStraight) {  // checkForAceBottomStraight
            return helpers.sortCardsByValues(cards, 'desc')[0];
        } else if(firstSortedItemValue < 11 ) {   //else if check firstSortedItemValue < 11
            let firstOrderedCard = heirarchyOfCards.find(card => card === firstSortedItemValue),
            firstOrderedCardIndex = heirarchyOfCards.indexOf(firstOrderedCard),
            splicedHeirarchyOfCardsFromFirstCardIndex = [...heirarchyOfCards].splice(firstOrderedCardIndex, 5),
            isAStraight = itemsSorted.filter((item, index) => item.value === splicedHeirarchyOfCardsFromFirstCardIndex[index]).length === 5;
        // console.log({isAStraight, itemsSorted, splicedHeirarchyOfCardsFromFirstCardIndex, })
            if(isAStraight){
                return helpers.sortCardsByValues(cards, 'dec')[0];
            } else {
                return false
            }
        } 
        else {
            return false
        }
    }

    flushCheck(){
        let cards = [...this.playersCards];
        if(helpers.getCardMatches([...cards], 0).length === 5){
            return helpers.sortCardsByValues(cards).pop(); 
        } 
        return false;
    }

    bookCheck(){
       // console.log("reached book check")
        let hasTrips = this.tripsCheck();
        if(hasTrips){
            let tripsValue = hasTrips.card[1];            //remove items in the hand which match the trips value
            let filteredTripsOut = [...this.playersCards].filter(card => card[1] !== tripsValue);
            if(filteredTripsOut[0][1] === filteredTripsOut[1][1]){          // check the remaining cards are matching
                return {
                    trips: hasTrips,
                    pair: helpers.getCardsValues([filteredTripsOut[0]])[0]
                }
            }
        }
        return false;
    }

    quadsCheck(){
        let cards = [...this.playersCards],
        firstRes = helpers.getCardMatches(cards, 1);
        if (firstRes.length < 4){
            let secondRes = helpers.getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
            if(secondRes.length < 4){
                return false;
            } else {
                return helpers.sortCardsByValues(secondRes, 'desc').shift();
            }
        } else {
            return helpers.sortCardsByValues(firstRes, 'desc').shift();
        }
    }

    straightFlushCheck(){
        let straightCheck = this.straightCheck(this.playersCards);
        if (straightCheck && this.flushCheck(this.playersCards)){
            return straightCheck;
        }
    }

    royalFlushCheck(){
        let firstCardsValue = helpers.sortCardsByValues([...this.playersCards])[0].value;
        if (firstCardsValue === 10 && this.straightCheck(this.playersCards) && this.flushCheck(this.playersCards)){
            return this.playersCards;
        }
    }
}