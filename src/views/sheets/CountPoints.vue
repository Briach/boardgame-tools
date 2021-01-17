<template>

    <div class="container-fluid mt-20" wfd-id="5">

    <add-players @players-added="onPlayersAdded"></add-players>

    <div class="row mb-5 justify-content-center" v-if="players.length > 0">
        <div class="col-11 col-sm-10 col-lg-6 text-center">
            <!-- Striped rows -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="text-center">Round</th>
                        <th class="text-center" v-for="player in players" :key="player"> {{ player.name }} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(round, index) in rounds" :key="round">
                        <th class="text-center"> {{ round }} </th>
                        <td class="text-center" v-for="player in players" :key="player">
                            <div class="form-group">
                            <input type="number" default="0" placeholder="0" class="form-control" style="text-align: center" v-model="player.pointsByRound[index]">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center">Points</th>
                        <th class="text-center" v-for="player in players" :key="player">
                            {{ player.toalPoints() }}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="row mb-5 justify-content-center">
        <div class="col-11 col-sm-10 col-lg-6 text-center">
            <p style="font-size: 2.5rem;" v-if="players.length == 0">
                Here you can keep track of who gained how many points in your favorite Games.
                Start by adding Players to the Table
            </p>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="openModal()">Add Players</button>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="addRound()" v-if="players.length > 0">Add Rounds</button>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="resetGame()" v-if="players.length > 0">Reset Game</button>
        </div>
    </div>

    </div>
    
</template>

<script>
import halfmoon from 'halfmoon';
import AddPlayers from './../../components/AddPlayers.vue';

export default {
    components: { AddPlayers },
    props: {
        cookieConsent: false,
    },
    data() {
        return {
            rounds: [1],
            currentRound: 1,
            players: [],
        }
    },
    methods: {
        openModal: function() {
            halfmoon.toggleModal("modal-add-players");
        },
        addRound: function() {
            this.currentRound++;
            this.rounds.push(this.currentRound);
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].pointsByRound.push(0);
            }
        },
        resetGame: function() {
            if (confirm("Are you sure you want to reset this Game?")) {
                this.rounds = [1];
                this.currentRound = 1;
                for (let i = 0; i < this.players.length; i++) {
                    this.players[i].pointsByRound = [0];
                }
            }
        },
        onPlayersAdded: function(players) {
            this.players = players;
        },
    }
}
</script>

<style scoped>

td .form-group {
    margin: 0;
}

</style>