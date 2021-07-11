<template>
    <div class="poker-hands">
        <template v-if="this.players">
            <h1>POKER HANDS</h1><!-- should use a computed method to check each player has their hand -->
            <template v-if="players[0].hand.length">
                <template v-if="message">
                    <h3 v-text="message"></h3>
                    <!-- Add button to play again -->
                </template>
                <button v-else style="width: 100%;" @click.stop="handleGetWinner" class="btn btn-primary">Who wins?</button>
        <!-- Show winners hand with meta -->
                <div class="container">
                    <article v-for="(player, pid) in this.players" :key="pid">
                        <h2>{{player.name}}</h2>
                        <ul class="hand">
                           <li v-for="(card, cid) in player.hand" :key="pid + cid" class="card" :style="`color:${cardColor(card[0])}`">
                               <div>
                                    <span>{{card.slice(1)}}</span>
                                    <span v-html="cardSuit(card[0])"></span>
                               </div>
                                <div>
                                    <span>{{card.slice(1)}}</span>
                                    <span v-html="cardSuit(card[0])"></span>
                               </div>
                           </li>
                        </ul>
                    </article>
                </div>
            </template>
            <button v-else style="width: 100%;" @click.stop="dealCards" class="btn btn-primary">Deal</button>
        </template>

    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    name: "Poker-Hands",
    props: {
        playerItems: {
            type: Array,
            required: true,
        }
    },
    created() {
        // Add this back in after testings
        // this.addPlayers({players: this.playerItems});
    },
    computed: {
        ...mapState(['players', 'message']),
    },
    methods: {
        ...mapActions(['dealCards', 'addPlayers', 'winningHand']),
         handleGetWinner(){
            this.winningHand()
        },
        cardSuit(suit){
            switch(suit){
                case('H'):
                    return '&hearts;';
                case('S'):
                    return '&spades;';
                case('D'):
                    return '&diams;';
                case('C'):
                    return '&clubs;';
            }
        },
         cardColor(suit){
            switch(suit){
                case('H'):
                case('D'):
                    return '#F00';
                case('S'):
                case('C'):
                    return '#000;';
            }
        }
    },
}
</script>  
 