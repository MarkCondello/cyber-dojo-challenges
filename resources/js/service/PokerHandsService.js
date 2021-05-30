
const suits = ["H", "D", "C", "S"],
cards = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
deck = suits.map(suit => {
   return cards.map(card => {
        return suit + card;
    });
 }).flat();

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
// let pairsCheck = (playersCards)=> {
//     let cards = [...playersCards];
//     let check = cards.map((card, index) =>  {
//         let cardValue = card[1];
//         return cards.map(key => {
//             if(key !== card && key[1] === cardValue){
//                 console.log(key , card);
//                 cards.splice(index, 1); //remove the card from the list
//                 return "pair";
//             }
//             console.log("cards length: ", cards.length)
//         });
//      }).flat().filter(item => item === "pair");
//     return check;
// }
// let playersCards  = [ "D9", "S9", "H4", "CK", "C9"];
// var pairs = pairsCheck(playersCards);
//  console.log({pairs, playersCards});



// helper for 4 and 3 of a kind and flushes
let checkHandCardsByCardIndex = (cardsArr, index) => {
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

let tripsCheck = (playersCards) => {
    let cards = [...playersCards],
    firstRes = checkHandCardsByCardIndex(cards, 1);

    if (firstRes.length < 3){
        console.log("Second Card Loop");
        let secondRes = checkHandCardsByCardIndex(cards, 1); //if firstRes.length < 4, run check again with the shortened array
        if(secondRes.length < 3){
            console.log("Third Card Loop");
            let thirdRes = checkHandCardsByCardIndex(cards, 1); //if firstRes.length < 4, run check again with the shortened array
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

let flushCheck = (playersCards) => {
    let cards = [...playersCards];

    if(checkHandCardsByCardIndex(cards, 0).length === 5){
        return true; //firstRes;
    } 
    return false;
}

let playersCards  = [ "D2", "D3", "DK", "D6", "DA"];
let flushCheckRes = flushCheck(playersCards);
 console.log(flushCheckRes);

let quadsCheck = (playersCards) => {
    let cards = [...playersCards],
    firstRes = checkHandCardsByCardIndex(cards, 1);

    if (firstRes.length < 4){
        console.log("Second Card Loop");
        let secondRes = checkHandCardsByCardIndex(cards, 1); //if firstRes.length < 4, run check again with the shortened array
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
 


