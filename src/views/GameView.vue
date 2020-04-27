<template>
  <div>
    <div v-if="isNotJoined">
      <form class="pure-form" style="margin: 1rem auto; width: 200px">
        <input v-model="name" type="text" placeholder="Your name"><br>
      </form>
      <button class="pure-button pure-button-primary" @click="findGame">Find a game</button>
    </div>

    <div v-else>
      <div class="game">
        <div class="widget" v-if="gameState.started">
          <div style="color: #00bbff" v-if="players.length === 2">
            <span :class="{'u': gameState.turn===1}">{{players[0].name}} (X)</span>
            VS
            <span :class="{'u': gameState.turn===2}">{{players[1].name}} (O)</span>
          </div>

          <div v-if="!gameState.opDeserted && !gameState.finished">
            <b v-if="yourTurn === gameState.turn">Your turn</b>
            <b v-else style="color: crimson;">Opponenet's turn</b>
          </div>
        </div>

        <div v-if="gameState.finished" class="widget">
          <b v-if="gameState.winner === yourTurn">You've won!</b>
          <b v-else style="color: crimson;">You've lost!</b>
        </div>

        <div v-if="gameState.waitingForOpponent" class="widget">Looking for opponent</div>

        <Board :win-type="gameState.winType" v-else-if="!gameState.opDeserted && gameState.map" :map="gameState.map"/>

        <div class="widget" v-if="gameState.opDeserted">
          Opponent left game
        </div>

        <div class="pure-button pure-button-primary" @click="leave">
          Leave game
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ConnectionState, getters} from "@/store";
import Board from "@/components/game/Board";
import * as GameHelper from "@/GameHelper";

export default {
    name: "GameView",
    components: {Board},
    data() {
        return {
            gameState: {},
            name: 'Player'
        }
    },

    created() {
        GameHelper.reconnectLastRoom().then(room => {
            GameHelper.initGame(room, this.onGameStateListener)
        }).catch((e) => {
            console.log(e)
        })
    },

    methods: {
        findGame() {
            this.$store.connectionState = ConnectionState.JOINING;

            this.$client.joinOrCreate('battleRoom', {
                name: this.name
            }).then(room => {
                GameHelper.initGame(room, this.onGameStateListener)
            }).catch(() => {
                this.$store.connectionState = ConnectionState.NOT_CONNECTED;
            })
        },

        onGameStateListener(state) {
            this.gameState = state;
            this.$forceUpdate()
        },

        leave() {
            GameHelper.leaveRoom(this.room)
            this.gameState = {}
        }
    },

    computed: {
        isNotJoined() {
            return getters.isNotJoined();
        },

        room() {
            return getters.room();
        },

        map() {
            return this.room.state.map;
        },

        yourTurn() {
            return this.room.state.entities[this.room.sessionId].order
        },

        players() {
            return Object.values(this.room.state.entities)
        }
    }
}
</script>

<style scoped lang="scss">
  .game {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
      margin-bottom: 2rem;
    }
  }

  .widget {
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 24px;
    font-weight: bold;
    color: #91e365;
    border: 3px solid #55565c;
    background: #75777f;
  }

  .u {
    text-decoration: #5ccd6f underline;
  }
</style>
