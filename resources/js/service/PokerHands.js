import handChecks from '../helpers/pokerHandsHandChecks';
import compareHighHandsHelpers from '../helpers/pokerHandsCompareHightHandsHelpers';

export class compareHighHands extends compareHighHandsHelpers{
   constructor(hands){
      super();
      this.playersHighHands = [...hands];
      this.handType = null;
      this.highestHand = null;
      this.kicker = null; //Add kicker value in for two pair
      this.splitPotHands = [];
      this.getHandType();
   }
   getHandType(){
      this.handType = this.playersHighHands[0].handValue.type;
      this.checkValue();
   }
   getWinningHandIndex(){
      if(this.highestHand){
         return this.playersHighHands.findIndex(hand => hand.id === this.highestHand.id)
      }
      return;
   }
   checkValue(){
      switch(this.handType){
         // ToDo: these cases can be condensed, the logic is the same
         case "Royal Flush":
            console.log("Royal Flush");
            this.splitPotHands = this.playersHighHands;
            break;
         case "Straight Flush":
            console.log("Straight Flush");
            this.compareHighCards(this.playersHighHands);
            break;
         case "Full House":
            console.log("Reached Full House check");
            this.compareFullHouseCards(this.playersHighHands);
            break;
         case "Flush":
            console.log("Reached Flush check");
            this.compareHighCards(this.playersHighHands);
            break;
         case "Straight":
            console.log("Reached straight check");
            this.compareHighCards(this.playersHighHands);
            break;
         case "Three of a kind":
            console.log("Reached three of a kind check");
            this.compareHighCards(this.playersHighHands);
            break;
         case "Two pairs":
            console.log("Reached two pair check");
            this.compareTwoPairHighCards(this.playersHighHands);
            break;
         case "One pair":
            console.log("Reached one pair check");
            this.compareHighCards(this.playersHighHands);
            break;
         case "High card":
         default :
            console.log("Reached compare high cards check");
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
         return this.rank = {value: 0, type: "Royal Flush", highCard: this.royalFlushCheck(this.playersHighHands)};
      } else if(this.straightFlushCheck(this.playersCards)){
         return this.rank = {value: 1, type: "Straight Flush", highCard: this.straightFlushCheck(this.playersCards)};
      } else if(this.quadsCheck(this.playersCards)){
         return this.rank = {value: 2, type: "Four of a kind", highCard: this.quadsCheck(this.playersCards)};
      } else if (this.bookCheck(this.playersCards)){
         return this.rank = {value: 3, type: "Full House", highCard: this.bookCheck(this.playersCards)};
      } else if(this.flushCheck(this.playersCards)){
         return this.rank = {value: 4, type: "Flush", highCard: this.flushCheck(this.playersCards)};
      } else if(this.straightCheck(this.playersCards)){
         return this.rank = {value: 5, type: "Straight", highCard: this.straightCheck(this.playersCards)};
      } else if (this.tripsCheck(this.playersCards)){
         return this.rank = {value: 6, type: "Three of a kind", highCard: this.tripsCheck(this.playersCards)};
      } else if (this.twoPair(this.playersCards)){
         return this.rank = {value: 7, type: "Two pairs", highCard: this.twoPair(this.playersCards)};
      } else if(this.singlePair(this.playersCards)){   
         return this.rank = {value: 8, type: "One pair", highCard: this.singlePair(this.playersCards) };
      } else {
         return this.rank = {value: 9, type: "High card",  highCard: this.highCard(this.playersCards) };
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

 