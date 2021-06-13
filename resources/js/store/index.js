import { forEach } from "lodash";
import Vue from "vue";
import Vuex from 'vuex';
import {deck, getHandValue} from "../service/PokerHands";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        deck,
        players: [],
    },
    mutations: {
        REMOVE_CARD(state, cardIndex){
            state.deck.splice(cardIndex, 1);
        },
        SET_PLAYERS(state, players){
            state.players = players;
        },
        SET_PLAYERS_CARD(state, {playerId, card}){
            state.players[playerId].hand.push(card);
        }
    },
    actions: {
        addPlayers({commit}, {players}){
            commit("SET_PLAYERS", players);
        },
        dealCards(
            { state, commit, getters },
        ){
            let i = 0;
            while(i < 5){
                for(let j = 0; j < state.players.length; j++) {
                    let cardIndex = getters.randomCardIndex,
                    card = getters.getCard(cardIndex);
                    commit("REMOVE_CARD", cardIndex);
                    commit("SET_PLAYERS_CARD", {playerId: j, card});
                }
                i++;
            }
        },
        winningHand({state},
            ){
             let results= [];

            state.players.forEach(player=>{
                let val = new getHandValue(player.hand);
                //console.log(val)
                results.push(val);
            });

            console.log({results})
        }

    },
    getters: {
        remainingCardsCount: state=>{
            return state.deck.length;
        },
        randomCardIndex: (state, getters) => {
            return Math.floor(Math.random() * getters.remainingCardsCount);
        },
        getCard: state => index => {
            return state.deck[index];
        },
    
    },
})