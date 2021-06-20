import { first, forEach } from "lodash";
import Vue from "vue";
import Vuex from 'vuex';
import {deck, getHandValue, compareHighHands} from "../service/PokerHands";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        deck,
        players: [
            // Remove this after doing compare checks
            {"id": 987789, "name":"black","hand":["S9","H9","C4","H6","D6"]},
            {"id": 123321, "name":"white","hand":["HQ","CQ","SK","H2","C2"]},
            {"id": 345543, "name":"grey","hand":["DQ","SQ","C10","C4","S4"]}
        ],
    },
    mutations: {
        REMOVE_CARD(state, cardIndex){
            state.deck.splice(cardIndex, 1);
        },
        SET_PLAYERS(state, players){
            state.players = players;
        },
        SET_PLAYERS_CARD(state, {arrayId, card}){
            state.players[arrayId].hand.push(card);
        },
        SET_HAND_RANK(state, {arrayId, rank}){
            state.players[arrayId].handValue = rank;
        },
        SET_WINNING_HAND(state, {playerId}){
            let winnerIndex = state.players.findIndex(player => player.id === playerId);
            state.players[winnerIndex].winner = true;
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
                    commit("SET_PLAYERS_CARD", {arrayId: j, card});
                }
                i++;
            }
        },
        async winningHand(
            {state, commit, getters},
            ){

            await state.players.forEach((player, arrayId)=>{
                let rank = new getHandValue(player.hand).rank;
                commit('SET_HAND_RANK', {rank, arrayId}); 
            });

            let matchingHighHands = await getters.matchingHighHands;

            console.log({matchingHighHands})
            if(matchingHighHands.length > 1 ) {
                //use service to loop through the matching high hands
                let result = new compareHighHands(matchingHighHands);
                console.log({result});
                //before creating the compare method, return out the rank and commit setup below...
                return;
                let rank = { ...result.highestHand.handValue, 
                    type: `${result.handType} with a ${result.highestHand.handValue.highCard.card} high card`,
                }
                commit('SET_HAND_RANK', {rank, arrayId: result.highestHand.arrayIndex}); 
                commit('SET_WINNING_HAND', { playerId : result.highestHand.id })
            } else {
                commit('SET_WINNING_HAND', { playerId : getters.sortHandsByRank[0].id })
                ///console.log("Winning player id", getters.sortHandsByRank[0].id);
            }
        },

    },
    getters: {
        remainingCardsCount: state => {
            return state.deck.length;
        },
        randomCardIndex: (state, getters) => {
            return Math.floor(Math.random() * getters.remainingCardsCount);
        },
        getCard: state => index => {
            return state.deck[index];
        },
        sortHandsByRank: state => {
            return [...state.players].sort(( firstPlayer, secondPlayer ) => firstPlayer.handValue.value - secondPlayer.handValue.value );
        },
        matchingHighHands: (state, getters) => {
            //loop through the sortedHands and return the matching ranked cards
            let sortedPlayersHands = getters.sortHandsByRank,
            firstHighestHand = sortedPlayersHands[0].handValue.value;
            return sortedPlayersHands.filter(player => player.handValue.value === firstHighestHand);

         }
    },
})