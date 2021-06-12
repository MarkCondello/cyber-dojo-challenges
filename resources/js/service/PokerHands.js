import handChecks from '../helpers/pokerHandsHandChecks';

export class getHandValue extends handChecks{
   constructor(hand){
      super();
      this.playersCards = hand;
      this.rank = {
         value: null,
         type: null,
      };

      this.checkValue();
   }

   updateRank({rankObj}){
      this.rank = {...this.rank, rankObj}
   }

   checkValue(){
      switch(this.playersCards){
         case(this.royalFlushCheck(this.playersCards)):
            this.updateRank({value: 0, type: "Royal Flush"});
         break;

         case(this.straightFlushCheck(this.playersCards)):
            this.updateRank({value: 1, type: "Straight Flush"});
         break;

         case(this.quadsCheck(this.playersCards)):
            this.updateRank({value: 2, type: "Four of a kind"});
         break;

         case(this.bookCheck(this.playersCards)):
            this.updateRank({value: 3, type: "Full House"});
         break;

         case(this.flushCheck(this.playersCards)):
            this.updateRank({value: 4, type: "Flush"});
         break;

         case(this.straightCheck(this.playersCards)):
            this.updateRank({value: 5, type: "Straight"});
         break;

         case(this.tripsCheck(this.playersCards)):
            this.updateRank({value: 6, type: "Three of a kind"});
         break;

         case(this.twoPair(this.playersCards)):
            this.updateRank({value: 7, type: "Two pairs"});
         break;

         case(this.singlePair(this.playersCards)):
            this.updateRank({value: 8, type: "One pair"});
         break;

         default:
            this.updateRank({value: 9, type: ""});

      }

      return this.rank;
   }
}

const suits = ["H", "D", "C", "S"],
cards = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
export const deck = suits.map(suit => {
   return cards.map(card => {
        return suit + card;
    });
 }).flat();

 