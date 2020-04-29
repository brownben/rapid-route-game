<template>
  <div>
    {{ $router.params }}
    <template v-if="legNumber <= course.legs.length">
      <h3 class="font-main font-semibold text-2xl py-4 select-none">
        Leg: {{ legNumber }}
      </h3>
      <Game
        :key="legNumber"
        :settings="gameSettings"
        @finished="gameFinished"
        @nextLeg="nextLeg"
      />
    </template>

    <GameOver v-else :score="score" :time="time" />
  </div>
</template>
<script>
import Game from '@/components/Game'
import GameOver from '@/components/GameOver'

import Courses from '@/assets/Courses'

export default {
  components: {
    Game,
    GameOver,
  },

  data: function() {
    return {
      course: Courses[this.$route.params.event],
      legNumber: 1,

      correct: [],
      times: [],
      paths: [],
    }
  },

  computed: {
    currentLeg: function() {
      return this.course.legs[this.legNumber - 1]
    },

    gameSettings: function() {
      return {
        ...this.currentLeg,
        showCorrectRoute: this.course.showSolution,
        hideMap: this.course.hideMap,
        penalty: this.course.penalty,
        timeLimit: this.course.timeLimit,
      }
    },

    score: function() {
      const penalty =
        this.times.filter(
          (time, index) =>
            time / 1000 > this.course.penalty && this.correct[index]
        ).length * 0.5
      const numberCorrect = this.correct.reduce((a, b) => a + b, 0)
      const score = numberCorrect - penalty

      return `${score}/${this.course.legs.length}`
    },

    time: function() {
      return this.times.reduce((a, b) => a + b, 0)
    },
  },

  methods: {
    gameFinished: function({ correct, path, time }) {
      this.correct.push(correct)
      this.times.push(time)
      this.paths.push(path)
    },

    nextLeg: function() {
      this.legNumber += 1
    },
  },
}
</script>
