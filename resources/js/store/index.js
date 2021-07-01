import Vue from "vue";
import Vuex from 'vuex';
import {deck, getHandValue, compareHighHands} from "../service/PokerHands";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        deck,
        players: [
            // Remove this after doing compare checks
            {"id": 987789, "name":"black","hand":["S3","S4","S5","S6","S2"]},
            {"id": 123321, "name":"white","hand":["C7","C6","C5","C8","C9"]},
            {"id": 345543, "name":"grey","hand":["H5","H6","H7","H8","H9"]},
            {"id": 345543, "name":"red","hand":["D5","H6","H7","H8","H4"]},
        ],
        message: null,
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
        SET_HAND_VALUE(state, {arrayId, rank}){
            state.players[arrayId].handValue = rank;
        },
        SET_WINNING_HAND(state, {playerId}){
            let winnerIndex = state.players.findIndex(player => player.id === playerId);
            state.players[winnerIndex].winner = true;
            state.message = state.players[winnerIndex].handValue.message;
        },
        SET_SPLIT_POT_HANDS(state, {playerIds, message}){
            state.message = message;
            console.log("SET_SPLIT_POT_HANDS", playerIds, message);

            playerIds.forEach(playerId=>{
                state.players.forEach((player, index) => {
                    if(player.id === playerId){
                        state.players[index].splitPotWinner = true;
                    }
                })
            });
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
                commit('SET_HAND_VALUE', {rank, arrayId}); 
            });
            let matchingHighHands = await getters.matchingHighHands;
            if(matchingHighHands.length > 1 ) { //use service to loop through the matching high hands
                let gameResult = new compareHighHands(matchingHighHands);
                console.log({gameResult});

                if(gameResult.splitPotHands.length){ //ToDo: update the split pot hands with a splitPot flag
                    console.log('Reached split pot hands');
                    let message = getters.splitPotMessage(gameResult.splitPotHands),
                    playerIds = gameResult.splitPotHands.map(hand => hand.id);
                    commit('SET_SPLIT_POT_HANDS', {message, playerIds})
                } else {
                    let rank = getters.winningHandMessage(gameResult.highestHand);
                    await commit('SET_HAND_VALUE', {rank, arrayId: gameResult.highestHand.arrayIndex}); 
                    commit('SET_WINNING_HAND', { playerId : gameResult.highestHand.id })
                }
            } else {
                let winningHand = getters.sortHandsByRank.shift(),
                rank = getters.winningHandMessage(winningHand);
                console.log("reached set winning hand...", winningHand, rank);
                await commit('SET_HAND_VALUE', {rank, arrayId: winningHand.arrayIndex}); 
                commit('SET_WINNING_HAND', { playerId : winningHand.id })
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
        },
        winningHandMessage: () => (hand) => {
            //How does the kicker get displayed if it is set???
            return { ...hand.handValue, 
                message: `${hand.name} wins with a ${hand.handValue.type}, ${hand.handValue.highCard.card} high card.`,
            }
        },
        splitPotMessage: () => (splitPotHands) => {
            let names = [...splitPotHands].map(hand => hand.name),
            firstHighCard = [...splitPotHands].shift();
            return `Split pot for ${names}, with a ${firstHighCard.handValue.type} ${firstHighCard.handValue.highCard.value} high card.`
            return message;
            //will this work with full house and two pair split pots??? 
        }
    },
})