import {helpers} from "./pokerHandHelpers";

//ToDo: Need to know the high card for comparison of players with the same hand type
export default class compareHighHandsHelpers {

    compareTwoPairHighCards(){
        let playersHighPairValuesSorted = [...this.playersHands].sort((playerA, playerB) => playerB.handValue.highCard[0].value - playerA.handValue.highCard[0].value);
        //if there ate no mathching high cards from plauers return the high hand
        if(playersHighPairValuesSorted[0].handValue.highCard[0].value === playersHighPairValuesSorted[1].handValue.highCard[0].value){
            let playersSecondPairValuesSorted = [...playersHighPairValuesSorted].sort((playerA, playerB) => playerB.handValue.highCard[1].value - playerA.handValue.highCard[1].value);

            if(playersSecondPairValuesSorted[0].handValue.highCard[1].value === playersSecondPairValuesSorted[1].handValue.highCard[1].value){
                // Split pot
                //ToDo: loop
            } else {
                this.kicker = playersSecondPairValuesSorted[0];
            }
        // console.log({playersHighPairValuesSorted, playersHands: [...this.playersHands] })
        } else {
            return playersHighPairValuesSorted[0];
        }
    }
    // Check for the highest hand
    compareHighCards(){
        //console.log({playersHighHands})
        let playersHighCardValuesSorted = [...this.playersHighHands].sort((playerA, playerB) => playerB.handValue.highCard.value - playerA.handValue.highCard.value)
        playersHighCardValuesSorted[0].arrayIndex = this.playersHighHands.findIndex(highHands => highHands.id === playersHighCardValuesSorted[0].id);  
        
        // ToDo: Need a check for same high cards eg Split pot
        return playersHighCardValuesSorted[0];
    }
}
