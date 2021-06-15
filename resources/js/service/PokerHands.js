import handChecks from '../helpers/pokerHandsHandChecks';
import {compareHighHandsHelpers} from '../helpers/pokerHandsCompareHightHandsHelpers';

export class compareHighHands {
   constructor(hands){
      this.playersHands = [...hands];
      this.handType = null;
      this.highestHand = null;
      this.kicker = null; //Add kicker value in for two pair
      this.getHandType();
   }
   getHandType(){
      // console.log({'playersHands': this.playersHands})
      this.handType = this.playersHands[0].handValue.type;
      this.checkValue();
   }
   checkValue(){
      switch(this.handType){
         case "Two pairs":
            console.log("Reached two pair check");

            // ToDo: Write the compare logic for 2 pair 
            this.highestHand = compareHighHandsHelpers.compareTwoPairHighCards(this.playersHands);

            break;
         case "One pair":
            console.log("Reached one pair check");
            this.highestHand = compareHighHandsHelpers.compareHighCards(this.playersHands);
            break;
         case "High card":
         default :
         console.log("Reached compare high cards check");
         this.highestHand = compareHighHandsHelpers.compareHighCards(this.playersHands);

         break
      }
   }
}

export class getHandValue extends handChecks{
   constructor(hand){
      super();
      this.playersCards = hand;
      this.rank = {};
      this.checkValue();
   }
   updateRank(rankObj){
      this.rank = rankObj;
   }
   checkValue(){
      if( this.royalFlushCheck(this.playersCards)){
         return this.updateRank({value: 0, type: "Royal Flush"});
      } else if(this.straightFlushCheck(this.playersCards)){
         return this.updateRank({value: 1, type: "Straight Flush"});
      } else if(this.quadsCheck(this.playersCards)){
         return this.updateRank({value: 2, type: "Four of a kind"});
      } else if (this.bookCheck(this.playersCards)){
         return this.updateRank({value: 3, type: "Full House"});
      } else if(this.flushCheck(this.playersCards)){
         return this.updateRank({value: 4, type: "Flush"});
      } else if(this.straightCheck(this.playersCards)){
         return this.updateRank({value: 5, type: "Straight"});
      } else if (this.tripsCheck(this.playersCards)){
         return this.updateRank({value: 6, type: "Three of a kind"});

      } else if (this.twoPair(this.playersCards)){
         return this.updateRank({value: 7, type: "Two pairs", highCard: this.twoPair(this.playersCards)});

      } else if(this.singlePair(this.playersCards)){         
         return this.updateRank({value: 8, type: "One pair", highCard: this.singlePair(this.playersCards) });
      } else {
         return this.updateRank({value: 9, type: "High card",  highCard: this.highCard(this.playersCards) });
      }
   }
}

const suits = ["H", "D", "C", "S"],
cards = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
export const deck = suits.map(suit => {
   return cards.map(card => {
        return suit + card;
    });
 }).flat();

 