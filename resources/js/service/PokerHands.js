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
         case "High card":
            this.compareCards(this.playersHighHands);
            break;
         case "Straight Flush":
         case "Flush":
         case "Straight":
         case "Three of a kind":
         case "High card":
         default :
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
export const deckOfCards = suits.map(suit => {
   return cards.map(card => {
        return suit + card;
    });
 }).flat();

export const adjectives = ["adorable", "adventurous", "aggressive", "agreeable", "alert", "alive", "amused", "angry", "annoyed", "annoying", "anxious", "arrogant", "ashamed", "attractive", "average", "awful", "bad", "beautiful", "better", "bewildered", "black", "bloody", "blue", "blue-eyed", "blushing", "bored", "brainy", "brave", "breakable", "bright", "busy", "calm", "careful", "cautious", "charming", "cheerful", "clean", "clear", "clever", "cloudy", "clumsy", "colorful", "combative", "comfortable", "concerned", "condemned", "confused", "cooperative", "courageous", "crazy", "creepy", "crowded", "cruel", "curious", "cute", "dangerous", "dark", "dead", "defeated", "defiant", "delightful", "depressed", "determined", "different", "difficult", "disgusted", "distinct", "disturbed", "dizzy", "doubtful", "drab", "dull"];
export const animals = ["Aardvark", "Addax", "Adelie Penguin", "African Elephant", "African Forest Elephant", "African Lions", "African Penguin", "African Spurred Tortoise", "African Wild Dog", "Africanized Bees", "Allen’s Swamp Monkeys", "Alligator", "Allis Shad", "Alpine Ibex", "Amazonian Manatee", "American Oystercatcher Bird", "Anaconda Snake", "Ants", "Aquatic Warbler", "Arctic Wolf", "Armadillo", "Asian Elephant", "Asian Lion", "Atlantic Puffin", "Atlantic Spotted Dolphins", "Atlas Beetle", "Audubon’s Shearwater", "Australasian Grebe", "Australian Dingo", "Australian Pelican", "Australian Swiftlet", "Bactrian Camels", "Badger", "Bean Goose", "Bees", "Beetle", "Bengal Tigers", "Big Eyed Squirrel Fish", "Bison", "Black Caimans", "Black House Spider", "Black Mamba Snakes", "Black Necked Stilt", "Black Rhinoceros", "Black Widow Spider", "Blacktip Reef Shark", "Blacktip Shark", "Blister Beetle", "Blue and Yellow Macaw", "Blue Whale", "Blue-footed Booby Bird", "Boa Constrictor Snake", "Bottlenose Dolphins", "Bowhead Whale", "Brandling Worms", "Brazilian Wandering Spider", "British Mice", "British Moles", "British Water Vole", "British Wild Cats", "Broad-Snouted Caimans", "Brown Recluse Spider", "Brown Trout", "Bumble Bees", "Burying Beetle", "Butterflies", "Camels", "Campbell’s Dwarf Hamster", "Cape Gannet Bird", "Capercaillie", "Capuchin Monkeys", "Capybara", "Caracal", "Cardinal Birds", "Caribbean Reef Shark", "Caribou", "Cats", "Centipede", "Cheetah", "Chickaree", "Chickens", "Chimpanzee", "Chinchilla", "Chinese Hamsters", "Chinstrap Penguin", "Chipmunk", "Christmas Beetle", "Cicada Killer Wasps", "Click Beetle", "Commerson Dolphin", "Common Buzzard", "Common Dolphin", "Common Frog", "Common Hippopotamus", "Common Kingfisher", "Common Lizard", "Common Newt", "Common Palm Civet", "Common Seal", "Common Toad"];