<template>
    <div>
        <h1>POKER HANDS</h1>
        <button style="width: 100%;" @click.stop="dealCards({players: players.length})">Deal</button>

    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    name: "Poke-Hands",
    props: {
        players: {
            type: Array,
            required: true,
        }
    },
    state() {
        return {
            players: this.players,
        }
    },
    // created: {
    // },
    computed: {
        ...mapState(['deck']),

    },
    methods: {
        ...mapActions(['dealCards']),
 
            //splice out random number 
            //splice out random items from the deck and add 5 cards to each player consecutively

     }

}
</script>

 