
<template>

    <div class="modal" id="modal-add-players" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <a href="#" class="close" role="button" aria-label="Close" v-on:click="onCloseModal()">
                <span aria-hidden="true">&times;</span>
            </a>
            <h5 class="modal-title">Add Players</h5>
                <div class="form-group" onsubmit="return false">
                    <label for="players">Players</label>
                    <input type="text" id="players" class="form-control" v-model="rawPlayers" placeholder="Fabian, Vanessa, Pina" required="required" v-on:keyup="onKeyUp">
                    <div class="form-text">
                        Add multiple Players by seperating them with ','
                    </div>
                </div>
                <input class="btn btn-primary w-full" type="button" value="Add Players" v-on:click="onAddPlayers()">
            </div>
        </div>
    </div>
        
</template>

<script>
import halfmoon from 'halfmoon';

export default {
    name: "AddPlayers",
    data() {
        return {
            rawPlayers: "",
        }
    },
    computed: {
        players: function() {
            var playerNames = this.rawPlayers.split(",");
            var players = [];
            
            for (let playerName of playerNames) {
                var player = {
                    name: playerName,
                    pointsByRound: [0],
                    winsByRound: [false],
                }
                player.toalPoints = function() { 
                    var value = 0;
                    for (const points of this.pointsByRound) {
                        value += parseInt(points);
                    }
                    return value;
                };
                player.toalWins = function() { 
                    var value = 0;
                    for (const win of this.winsByRound) {
                        if (win) { value++; }
                    }
                    return value;
                };
                players.push(player);
            }

            return players;
        }
    },
    methods: {
        onAddPlayers: function() {
            halfmoon.toggleModal("modal-add-players");
            this.$emit('players-added', this.players);
        },
        onCloseModal: function() {
            halfmoon.toggleModal("modal-add-players");
        },
        onKeyUp: function(event) {
             if(event.keyCode === 13){
                this.onAddPlayers();
            }
        }
    }
}
</script>

<style scoped>

.modal {
    position: fixed;
}

.modal-full .container {
    height: 100%;
    display: flex;
}

.modal-full {
    position: fixed;
}

.modal-full .modal-content {
    height: 100%;
}

</style>