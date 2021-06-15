import {helpers} from "./pokerHandHelpers";

//ToDo: Need to know the high card for comparison of players with the same hand type
export let compareHighHandsHelpers = {

    compareTwoPairHighCards(playersHighHands){

    },
    // Check for the highest hand
    compareHighCards(playersHighHands){
        //console.log({playersHighHands})
        let playersHighCardValuesSorted = [...playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard.value - playerA.handValue.highCard.value)
        playersHighCardValuesSorted[0].arrayIndex = playersHighHands.findIndex(highHands => highHands.id === playersHighCardValuesSorted[0].id);  
        return playersHighCardValuesSorted[0];
    },
}
