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
            {"id": 987789, "name":"black","hand":["SJ","H9","C4","H6","D4"]},
            {"id": 123321, "name":"white","hand":["D8","D10","HK","H2","C2"]},
            {"id": 345543, "name":"grey","hand":["DJ","S9","C9","S6","S4"]}
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
                //console.log("winningHand action: ", {rank, arrayId})
                commit('SET_HAND_RANK', {rank, arrayId}); 
            });

            let matchingHighHands = await getters.matchingHighHands;
            if(matchingHighHands.length > 1 ) {
                //use service to loop through the matching high hands
                let result = new compareHighHands(matchingHighHands);
                console.log({result, highestHand: result.highestHand});

                //ToDo: 
                //I want to update the handValue if the winning hand
                //let rank = { ...result.highestHand.handValue, 
                // type: `${result.highestHand.type} with a ${result.highestHand.highCard[0].card} high card`,
                //}
                 //commit('SET_HAND_RANK', {rank: , arrayId: result.highestHand.arrayIndex}); 

                 //Check this below works properly
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