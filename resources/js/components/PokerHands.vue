<template>
    <div>
        <template v-if="this.players">
            <h1>POKER HANDS</h1><!-- should use a computed method to check each player has their hand -->
            <template v-if="players[0].hand.length">
                <button style="width: 100%;" @click.stop="handleGetWinner">Who wins?</button>
                <div class="container">
                    <article v-for="(player, pid) in this.players" :key="pid">
                        <h2>{{player.name}}</h2>
                        <ul>
                           <li v-for="(card, cid) in player.hand" :key="pid + cid">
                               {{card}}
                           </li>
                        </ul>
                    </article>
                </div>
            </template>
            <button v-else style="width: 100%;" @click.stop="dealCards">Deal</button>
        </template>
        <!-- Show winners hand with meta -->
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
        ...mapState(['players']),
    },
    methods: {
        ...mapActions(['dealCards', 'addPlayers', 'winningHand']),
         handleGetWinner(){
            this.winningHand()
        }
    },
}
</script>

<style>
.container {
    padding: 25px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
}
</style>   
 