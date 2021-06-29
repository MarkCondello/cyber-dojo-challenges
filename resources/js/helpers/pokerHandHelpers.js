export let helpers = {
 
    pairsCheck(cards){
        let pairs = [];
        cards.forEach((card, needleId) =>  {
            let cardValue = card[1];
    
            cards.forEach((key, hayStackId) => {
                //console.log({key, card, key1: key[1], cardValue})
                if(key !== card && key[1] === cardValue){
                    pairs.push(card);
                    cards.splice(needleId, 1); //remove the card from the list
                    let matchIndex = cards.findIndex(item => item === key);
                    cards.splice(matchIndex, 1); //remove the card from the list
    
                }
             });
        });
        return pairs;
    },

    getCardsValues(cardsArr) {
       // console.log("getCardsValues, cardsArr:", cardsArr)
        let cardItemsWithValues = [];
        cardsArr.forEach(card => {
            let cardValue = card[1];

            if(cardValue === "1"){ //check for 10 which is the exception because it has 2 characters for its value
                cardItemsWithValues.push({
                    value: 10,
                    card
                })
            } else if(isNaN(cardValue) ) {
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
    },

    // helper for 4 and 3 of a kind and flushes
    getCardMatches(cardsArr, index){
        let cardValue = cardsArr.splice(0, 1)[0], 
        matches = [cardValue, ]; //first item is always a match

        cardsArr.forEach(card => {
            //console.log(card, cardValue);
            if(card[index] === cardValue[index]){
                matches.push(card);
            }
        })
        return matches;
    },

    sortCardsByValues(cards, dir = 'asc'){
        if(dir === 'asc'){
            return this.getCardsValues(cards).sort((first, second) => first.value - second.value);
        } else {
            return this.getCardsValues(cards).sort((first, second) =>  second.value - first.value);
        }
    }
}