import {helpers} from "./pokerHandHelpers";

//ToDo: Need to know the high card for comparison of players with the same hand type
export let compareHighHandsHelpers = {

    // Check for the highest hand of pairs
    comparePairs(playersHighHands){

        let playersHighCardValuesSorted = [...playersHighHands].map(playersHand=> {
            return {
                ...playersHand,
                highCard : helpers.pairsCheck([...playersHand.hand]),
            }
        }).map(playersHighCard => {
            return {
                ...playersHighCard,
                highCard : helpers.getCardsValues(playersHighCard.highCard),
            }
        }).sort((playerA, playerB) => playerB.highCard[0].value - playerA.highCard[0].value)

        playersHighCardValuesSorted[0].arrayIndex = playersHighHands.findIndex(highHands=> highHands.id === playersHighCardValuesSorted[0].id);        
        return playersHighCardValuesSorted[0];
        console.log({playersHighCards})
        //
    },
}
