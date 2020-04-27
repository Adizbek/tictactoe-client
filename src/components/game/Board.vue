<template>
  <div class="board">
    <div v-if="winType > 0" class="win-line" :class="`win-type-${winType}`"></div>
    <div class="board-item" :class="`cell-${c}`" @click="clickCell(index)" :key="index"
         v-for="(c,index) in map">
      {{symbol[c]}}
    </div>
  </div>
</template>

<script>
import {getters} from "@/store";

export default {
    name: "Board",

    props: {
        map: {},
        winType: Number
    },

    data() {
        return {
            symbol: ['-', 'X', 'O']
        }
    },

    methods: {
        clickCell(index) {
            getters.room().send('pick', index)
        }
    },

    computed: {

    }
}
</script>

<style scoped lang="scss">
  .board {
    grid-template-columns: auto auto auto;
    display: grid;
    border: 3px solid #55565c;
    background: #75777f;
    border-radius: 10px;
    width: 350px;
    height: 350px;
    position: relative;
  }

  .board-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #55565c;
    font-size: 48px;
    font-weight: bold;

    &:hover {
      background: rgba(0, 153, 255, .1);
    }

    text-shadow: 2px 2px 1px #0004;
  }

  .cell-0 {
    text-shadow: none;
    color: transparent;
  }

  .cell-1 {
    color: #6eab97;
  }

  .cell-2 {
    color: #e4ae2f;
  }

  .win-line {
    width: 345px;
    top: 170px;
    left: 5px;
    transform-origin: center;
    height: 10px;
    background: firebrick;
    position: absolute;
  }

  .win-type-1 {
    transform: rotateZ(45deg);
  }

  .win-type-2 {
    transform: rotateZ(135deg);
  }

  .win-type-3 {
    transform: translateY(-115px);
  }

  .win-type-4 {
  }

  .win-type-5 {
    transform: translateY(115px);
  }

  .win-type-6 {
    transform: rotateZ(90deg) translateY(115px);
  }
  .win-type-7 {
    transform: rotateZ(90deg);
  }
  .win-type-8 {
    transform: rotateZ(90deg) translateY(-115px);
  }

</style>
