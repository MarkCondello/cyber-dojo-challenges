import {helpers} from "./pokerHandHelpers";


//ToDo: Need to know the high card for comparison of players with the same hand type
export default class HandChecks {
    // constructor(hand){
    //     this.playersCards = hand;
    // }

    singlePair(){
        let cards = [...this.playersCards];
        return helpers.pairsCheck(cards) === 1;
    }

    twoPair(){
        let cards = [...this.playersCards];
        return helpers.pairsCheck(cards) === 2;
    }

    tripsCheck(){
        let cards = [...this.playersCards],
        firstRes = helpers.getCardMatches(cards, 1);
        console.log("First Card Loop", {cards});

        if (firstRes.length < 3){
            console.log("Second Card Loop", {cards});
            let secondRes = helpers.getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
            if(secondRes.length < 3){
                console.log("Third Card Loop", {cards});
                let thirdRes = helpers.getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
                if(thirdRes.length < 3){
                    return false;
                } else {
                    return true; //thirdRes;  
                }
            } else {
                return true;//secondRes; 
            }
        } else {
            return true;//firstRes;  
        }
    }
    // let playersCards  = [ "D2", "S3", "H7", "C1", "H2"];
    // let tripsCheckRes = tripsCheck(playersCards);
    // console.log(tripsCheckRes);

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
            return true
        } else if(firstSortedItemValue < 11 ) {   //else if check firstSortedItemValue < 11
            let firstOrderedCard = heirarchyOfCards.find(card => card === firstSortedItemValue),
            firstOrderedCardIndex = heirarchyOfCards.indexOf(firstOrderedCard),
            splicedHeirarchyOfCardsFromFirstCardIndex = [...heirarchyOfCards].splice(firstOrderedCardIndex, 5),
            isAStraight = itemsSorted.filter((item, index) => item.value === splicedHeirarchyOfCardsFromFirstCardIndex[index]).length === 5;
        // console.log({isAStraight, itemsSorted, splicedHeirarchyOfCardsFromFirstCardIndex, })
            if(isAStraight){
                return true;
            } else {
                return false
            }
        } 
        else {
            return false
        }
    }
    // let playersCards  = [ "SJ", "HJ", "CA", "HK", "DA"];
    // let straightCheckRes = straightCheck(playersCards);
    // console.log(straightCheckRes);

    flushCheck(){
        let cards = [...this.playersCards];
        if(helpers.getCardMatches(cards, 0).length === 5){
            return true; //firstRes;
        } 
        return false;
    }
    // let playersCards  = [ "D2", "D3", "DK", "D6", "DA"];
    // let flushCheckRes = flushCheck(playersCards);
    //  console.log(flushCheckRes);

    bookCheck(){
        let checkDeckForPair = [...this.playersCards],
        has1Pair = this.singlePair(checkDeckForPair),
        checkDeckForTrips = [...playersCards],
        hasTrips = this.tripsCheck(checkDeckForTrips)

        //console.log({hasTrips, has1Pair});
        if(hasTrips && has1Pair){
            return true;
        }
        return false;
    }
    //  let playersCards  = [ "D2", "H2", "S2", "D6", "S6"];
    //  let bookCheckRes = bookCheck(playersCards);
    //  console.log(bookCheckRes);


    //ToDo: Fix bug = Cards is not defined
    quadsCheck(){
        let cards = [...this.playersCards],
        firstRes = helpers.getCardMatches(cards, 1);

        if (firstRes.length < 4){
          
            let secondRes = helpers.getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
            console.log("Second Card Loop", {cards, secondRes});

            if(secondRes.length < 4 ){
                return false;
            } else {
                return true; //return secondRes;
            }
        } else {
            return true; // return firstRes;
        }
    }
    // let playersCards  = [ "D2", "S1", "H1", "C1", "D1"];
    // let quadsCheckRes = quadsCheck(playersCards);
    // console.log(quadsCheckRes);

    straightFlushCheck(){
        // console.log(straightCheck(this.playersCards), flushCheck(this.playersCards))
        if(this.straightCheck(this.playersCards) && this.flushCheck(this.playersCards)){
            return true;
        }
        return false;
    }
    // let playersCards  = [ "H10", "HJ", "HQ", "HK", "HA"];
    // let straightFlushCheckRes = straightFlushCheck(playersCards);
    // console.log(straightFlushCheckRes);

    royalFlushCheck(){
       // console.log("reached royal flush check")
        let firstCardsValue = helpers.sortCardsByValues([...this.playersCards])[0].value;
        if(firstCardsValue === 10 && this.straightCheck(this.playersCards) && this.flushCheck(this.playersCards)){
            return true;
        }
        return false;
    }

    // let playersCards = [ "H10", "HJ", "HQ", "HK", "HA"];
    // let royalFlushCheckRes = royalFlushCheck(playersCards);
    // console.log(royalFlushCheckRes);
}