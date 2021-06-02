import { indexOf } from "lodash";

const suits = ["H", "D", "C", "S"],
cards = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
deck = suits.map(suit => {
   return cards.map(card => {
        return suit + card;
    });
 }).flat();

//  Helpers
let getCardsValues = (cardsArr) => {
    let cardItemsWithValues = [];
    cardsArr.forEach(card => {
        let cardValue = card[1];
        if(isNaN(cardValue) ) {
            switch(cardValue){ // change the JQKA to be numbers to sort against more easily
                case "J":
                    cardItemsWithValues.push({
                        value: 11,
                        card
                    })
                break;
                case "Q":
                    cardItemsWithValues.push({
                        value: 12,
                        card
                    })
                break;
                case "K":
                    cardItemsWithValues.push({
                        value: 13,
                        card
                    })
                break;
                case "A":
                    cardItemsWithValues.push({
                        value: 14,
                        card
                    })
                break;
            }
        } else {
            cardItemsWithValues.push({
                value: parseInt(cardValue),
                card
            })
        } 
    });
    return cardItemsWithValues;
}

// helper for 4 and 3 of a kind and flushes
let getCardMatches = (cardsArr, index) => {
    let matches = [true, ], //first item is always a match
    cardValue = cardsArr.splice(0, 1)[0];
    cardsArr.forEach(card => {
        console.log(card, cardValue);
        if(card[index] === cardValue[index]){
            matches.push(true);
        }
    })
    return matches;
}

let pairsCheck = (playersCards)=> {
    let pairs = [],
    cards = [...playersCards];

    cards.forEach((card, index) =>  {
        let cardValue = card[1];
        cards.forEach(key => {
            if(key !== card && key[1] === cardValue){
                console.log({key, card});
                cards.splice(index, 1); //remove the card from the list
                pairs.push("pair");
            }
            console.log("cards length: ", cards.length)
        });
    });
    return pairs.length;
}

let tripsCheck = (playersCards) => {
    let cards = [...playersCards],
    firstRes = getCardMatches(cards, 1);

    if (firstRes.length < 3){
        console.log("Second Card Loop");
        let secondRes = getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
        if(secondRes.length < 3){
            console.log("Third Card Loop");
            let thirdRes = getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
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

let straightCheck = (playersCards) => {
    let cards = [...playersCards],
    heirarchyOfCards = [],
    cardItemsWithValues = getCardsValues(cards),
    itemsSorted = cardItemsWithValues.sort((first, second) => first.value - second.value), //order the cards 
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

let playersCards  = [ "SJ", "HJ", "CA", "HK", "DA"];
let straightCheckRes = straightCheck(playersCards);
console.log(straightCheckRes);



let flushCheck = (playersCards) => {
    let cards = [...playersCards];

    if(getCardMatches(cards, 0).length === 5){
        return true; //firstRes;
    } 
    return false;
}

// let playersCards  = [ "D2", "D3", "DK", "D6", "DA"];
// let flushCheckRes = flushCheck(playersCards);
//  console.log(flushCheckRes);

let bookCheck = (playersCards) => {
    let checkDeckForPair = [...playersCards],
      has1Pair = pairsCheck(checkDeckForPair),
      checkDeckForTrips = [...playersCards],
        hasTrips = tripsCheck(checkDeckForTrips)

    console.log({hasTrips, has1Pair});
    if(hasTrips && has1Pair){
        return true;
    }
    return false;
}
//  let playersCards  = [ "D2", "H2", "S2", "D6", "S6"];
//  let bookCheckRes = bookCheck(playersCards);
//  console.log(bookCheckRes);


let quadsCheck = (playersCards) => {
    let cards = [...playersCards],
    firstRes = getCardMatches(cards, 1);

    if (firstRes.length < 4){
        console.log("Second Card Loop");
        let secondRes = getCardMatches(cards, 1); //if firstRes.length < 4, run check again with the shortened array
        if(secondRes.length < 4){
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




 export default deck;
 


