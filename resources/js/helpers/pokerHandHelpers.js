export let helpers = {
    //  Helpers Start

    pairsCheck(cards){
        let pairs = [];

        cards.forEach((card, index) =>  {
            let cardValue = card[1];
            cards.forEach(key => {
                if(key !== card && key[1] === cardValue){
                    //console.log({key, card});
                    cards.splice(index, 1); //remove the card from the list
                    pairs.push("pair");
                }
                //console.log("cards length: ", cards.length)
            });
        });
        return pairs.length;
    },

    getCardsValues(cardsArr) {
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
        let matches = [true, ], //first item is always a match
        cardValue = cardsArr.splice(0, 1)[0];

        cardsArr.forEach(card => {
            //console.log(card, cardValue);
            if(card[index] === cardValue[index]){
                matches.push(true);
            }
        })
        return matches;
    },

    sortCardsByValues(cards){
        return this.getCardsValues(cards).sort((first, second) => first.value - second.value);
    }
}