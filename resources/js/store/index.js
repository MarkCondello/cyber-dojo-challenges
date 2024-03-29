import Vue from "vue";
import Vuex from 'vuex';
import {deckOfCards, getHandValue, compareHighHands, animals, adjectives} from "../service/PokerHands";
import textFormatting from "../helpers/textFormatting";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        deck: [...deckOfCards],
        players: [
            // {"id": 987789, "name":"black","hand":["CA","CJ","CQ","H6","CK"]},
            // {"id": 123321, "name":"white","hand":["DQ","DJ","C4","DK","DA"]},
            // {"id": 345543, "name":"grey","hand":["SK","SJ","S10","HA","S2"]},
            // {"id": 343554, "name":"red","hand":["D2","HJ","HQ","H8","HK"]},
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
        SET_WINNING_HAND(state, {playerId, message}){
            let winnerIndex = state.players.findIndex(player => player.id === playerId);
            state.players[winnerIndex].winner = true;
            state.message = message;
            // state.message = state.players[winnerIndex].handValue.message; // this is not working
        },
        SET_SPLIT_POT_HANDS(state, {playerIds, message}){
            state.message = message;
            playerIds.forEach(playerId=>{
                state.players.forEach((player, index) => {
                    if(player.id === playerId){
                        state.players[index].splitPotWinner = true;
                    }
                })
            });
        },
        SET_CARDS(state){
            state.deck = [...deckOfCards];
        },
        SET_HANDS(state){
            state.players = state.players.map(player => {
                player.hand = [];
                return player;
            });
        },
        SET_MESSAGE(state){
            state.message = null
        },
    },
    actions: {
        resetGame({commit}){
            commit("SET_CARDS");
            commit("SET_HANDS");
            commit("SET_MESSAGE");
        },
        addPlayers({commit},  playersName){
            let players = [];
            players.push({
                id: 123,
                name: playersName,
                hand:[],
            });
            for(let i = 0; i < 2; i++){
                players.push(
                    {
                        id: Math.floor(Math.random() * 1000),
                        name: `${textFormatting.ucFirst(adjectives[Math.floor(Math.random() * adjectives.length)])} ${animals[Math.floor(Math.random() * animals.length)]}`,
                        hand:[],
                    }
                );
            }
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
            state.players.forEach((player, arrayId)=>{
                let rank = new getHandValue(player.hand).rank;
                commit('SET_HAND_VALUE', {rank, arrayId}); 
            });
            let matchingHighHands = await getters.matchingHighHands;
            console.log({matchingHighHands})
            if(matchingHighHands.length > 1 ) { //use service to loop through the matching high hands
                let gameResult = new compareHighHands(matchingHighHands);
                  console.log("matchingHighHands.length > 1, Matching high hands check", {gameResult});
                if(gameResult.splitPotHands.length){  
                    let message = getters.splitPotMessage(gameResult.splitPotHands),
                    playerIds = gameResult.splitPotHands.map(hand => hand.id);
                    commit('SET_SPLIT_POT_HANDS', {message, playerIds})
                } else {
                    let rank = await getters.winningHandMessage(gameResult.highestHand);
                    // ToDo: SHould remove the arrayIndex set in the PokerHands Service and use the getter instead...
                    commit('SET_HAND_VALUE', {rank, arrayId: gameResult.highestHand.arrayIndex}); 
                    commit('SET_WINNING_HAND', { playerId : gameResult.highestHand.id, message: rank.message });
                }
            } else {
                let winningHand = await getters.sortHandsByRank.shift(),
                arrayId = await getters.handArrayIndex(winningHand), 
                rank = await getters.winningHandMessage(winningHand);
                console.log("No mathcing hands", {winningHand})
                commit('SET_HAND_VALUE', {rank, arrayId}); 
                commit('SET_WINNING_HAND', { playerId : winningHand.id, message: rank.message })
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
            let sortedPlayersHands = getters.sortHandsByRank,
            firstHighestHand = sortedPlayersHands[0].handValue.value;
            // console.log({sortedPlayersHands, firstHighestHand});
            return sortedPlayersHands.filter(player => player.handValue.value === firstHighestHand);
        },
        winningHandMessage: () => (hand) => {
            let message = '';

            switch(hand.handValue.type){
                case "Royal Flush":
                case "Flush":
                case "Four of a kind":
                    message = 'a';
                break;
                case "Two pairs":
                    message = `a ${hand.handValue.highCard[0].card[1]} high,`;
                break;
                case "Full House":
                    message = `a ${hand.handValue.highCard.trips.highCard.value} high,`;
                break;
                default:
                    console.log("default message, card:", hand.handValue.highCard.card)
                    message = `${hand.handValue.highCard.card[1]} high,`;
            }
            if(hand.handValue.kicker){
                message = `a ${hand.handValue.kicker.card.slice(1)} high kicker,`;
            }
            return { ...hand.handValue, 
                message: `${textFormatting.ucFirst(hand.name)} wins with ${message} ${hand.handValue.type}.`,
            };
        },
        splitPotMessage: () => (splitPotHands) => {
            let names = [...splitPotHands].map(hand => textFormatting.ucFirst(hand.name)).join(", "),
            firstHighCard = [...splitPotHands].shift(),
            highCard = firstHighCard.handValue.highCard,
            highCardMessage = highCard.value;

            if(highCardMessage > 9){
                highCardMessage = highCard.card.splice(1); 
            }
            if([...splitPotHands].length === 2){
                names = names.replaceAll(", ", " & ");
            }
            names = names.slice(0, names.length);
            if(firstHighCard.handValue.type === "Two pairs"){  
                highCardMessage = `${firstHighCard.handValue.highCard[0].card.splice(1)}`;
            }
            if(firstHighCard.handValue.type === "Full House"){  
                highCardMessage = `${firstHighCard.handValue.highCard.trips.highCard.card.splice(1)}`;
            }
            return `Split pot for players ${names} with ${firstHighCard.handValue.type.toLowerCase()}, ${highCardMessage} high.`
        },
        handArrayIndex: (state) => (hand) => {
            return state.players.findIndex(player =>  player.id === hand.id);
        }
    },
})