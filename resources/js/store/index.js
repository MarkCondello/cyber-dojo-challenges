import Vue from "vue";
import Vuex from 'vuex';
 import deck from "../service/PokerHandsService.js";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        deck ,
    },
    mutations: {
        REMOVE_CARD(state, cardIndex){
            // console.log("Reached remove card", {cardIndex})
            state.deck.splice(cardIndex, 1);
        },
    },
    actions: {
        dealCards(
            { commit, getters },
            { players }
        ){
            let i = 0,
            playersCards = [];
            for(let j = 0; j < players; j++) {
                playersCards.push([]);
            }
            while(i < 5){
                for(let j = 0; j < players; j++) {

                    let cardIndex = getters.randomCardIndex,
                    card = getters.getCard(cardIndex);

                    commit("REMOVE_CARD", cardIndex);
                    playersCards[j].push(card);
                }
                i++;
            }
            console.log( { playersCards})
            return playersCards;
        }
    },
    getters: {
        remainingCardsCount: state=>{
            //  console.log("deck length", state.deck.length)
            return state.deck.length;
        },
        randomCardIndex: (state, getters) => {
            return Math.floor(Math.random() * getters.remainingCardsCount);
        },
        getCard: state => index => {
            return state.deck[index];
        }
    },
})