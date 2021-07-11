import handChecks from '../helpers/pokerHandsHandChecks';
import compareHighHandsHelpers from '../helpers/pokerHandsCompareHightHandsHelpers';

export class compareHighHands extends compareHighHandsHelpers{
   constructor(hands){
      super();
      this.playersHighHands = [...hands];
      this.handType = null;
      this.highestHand = null;
      this.splitPotHands = [];
      this.getHandType();
   }
   getHandType(){
      this.handType = this.playersHighHands[0].handValue.type;
      this.checkValue();
   }
   getWinningHandIndex(){
      if(this.highestHand){
         return this.playersHighHands.findIndex(hand => hand.id === this.highestHand.id);
      }
      return;
   }
   checkValue(){
      switch(this.handType){
         case "Royal Flush":
            this.splitPotHands = this.playersHighHands;
            break;
         case "Two pairs":
            //need to check for non pair cards high card
             this.compareTwoPairHighCards(this.playersHighHands);
            break;
         case "Full House":
            this.compareFullHouseCards(this.playersHighHands);
            break;
         case "Pair":
            this.comparePairHighCards(this.playersHighHands);
            break;  //need to check for non pair cards high card
         case "Straight Flush":
         case "Flush":
         case "Straight":
         case "Three of a kind":
         case "High card":
         default :
            console.log("Reached compare high hands check");
            this.compareHighCards(this.playersHighHands);
            break
      }
   }
}

export class getHandValue extends handChecks{
   constructor(hand){
      super();
      this.playersCards = hand;
      this.rank = null;
      this.checkValue();
   }
   checkValue(){
      if(this.royalFlushCheck(this.playersCards)){
      } else if(this.straightFlushCheck(this.playersCards)){
      } else if(this.quadsCheck(this.playersCards)){
      } else if(this.bookCheck(this.playersCards)){
      } else if(this.flushCheck(this.playersCards)){
      } else if(this.straightCheck(this.playersCards)){
      } else if(this.tripsCheck(this.playersCards)){
      } else if(this.twoPair(this.playersCards)){
      } else if(this.singlePair(this.playersCards)){   
      } else if(this.highCard(this.playersCards)){
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

 