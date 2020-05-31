<template>
  <div class="mb-6">
    <h2
      :class="{ 'text-red-600': overTimeLimit }"
      class="font-main font-semibold text-xl pb-3 select-none"
    >
      <template v-if="!finished">
        Time:
        <span v-if="started">{{
          ((currentTime - startTime) / 1000).toFixed(1)
        }}</span>
        <span v-else>0.0</span>
      </template>
      <template v-else>
        Time:
        <span v-if="started">{{
          ((finishTime - startTime) / 1000).toFixed(1)
        }}</span>
      </template>
    </h2>

    <canvas id="canvas" width="500" height="500" class="border inline-block">
      <p>Sorry, this game doesn't work without the Canvas Enabled</p>
    </canvas>

    <div v-if="!started && !finished" class="beforeStart mt-6">
      <button v-show="imageLoaded" class="button" @click="startGame">
        Start
      </button>
    </div>

    <div v-if="started && !finished && settings.undoButton" class="mt-6">
      <button v-show="imageLoaded" class="button-secondary" @click="undo">
        Undo
      </button>
    </div>

    <div v-if="finished" class="result">
      <h3 v-if="correct" class="font-semibold font-heading text-4xl my-2">
        Correct Route
      </h3>
      <h3 v-else class="font-semibold font-heading text-4xl my-2">
        Incorrect Route
      </h3>

      <button
        v-if="
          settings.showCorrectRoute && !drawnCorrectRoute && !settings.hideMap
        "
        class="button-secondary mx-2 mt-2"
        @click="drawCorrectPath"
      >
        Draw Correct Route
      </button>

      <button class="button mt-2" @click="$emit('nextLeg')">
        Next Leg
      </button>
    </div>
  </div>
</template>

<script>
import {
  drawCircle,
  drawRing,
  drawTriangle,
  drawLine,
  drawPath,
  drawPathWithDots,
  drawCircleWithRing,
  setLineStyle,
} from '@/scripts/CanvasDrawing'
import { distanceBetweenPoints, comparePath } from '@/scripts/PathMatching'
import { findImageScale } from '@/scripts/ImageScale'

export default {
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    canvas: undefined,
    canvasElement: undefined,
    img: undefined,
    audio: undefined,

    currentTime: 0,
    startTime: undefined,
    finishTime: undefined,
    userPath: [],
    correct: false,
    comparedPoints: {},

    imageLoaded: false,
    started: false,
    finished: false,
    drawnCorrectRoute: false,
    beeped: 0,
  }),

  computed: {
    overTimeLimit: function () {
      const timeLimit = this.settings?.penalty ?? this.settings?.timeLimit
      const latestTime = this.finishTime ?? this.currentTime

      if (timeLimit) return (latestTime - this.startTime) / 1000 >= timeLimit
      else return false
    },
  },

  watch: {
    currentTime: function () {
      const timeInSeconds =
        Math.round((this.currentTime - this.startTime) / 100) / 10

      if (
        this.settings.penalty &&
        timeInSeconds === this.settings.penalty &&
        !this.finished
      )
        this.beep(100, 520, 500, 'penalty')

      if (typeof this.settings?.timeLimit === 'number' && !this.finished) {
        if (timeInSeconds >= this.settings.timeLimit) this.whenFinished()

        if (timeInSeconds === this.settings.timeLimit - 10)
          this.beep(50, 520, 300, 10)
        if (timeInSeconds === this.settings.timeLimit - 3)
          this.beep(50, 520, 300, 3)
        else if (timeInSeconds === this.settings.timeLimit - 2)
          this.beep(50, 520, 300, 2)
        else if (timeInSeconds === this.settings.timeLimit - 1)
          this.beep(50, 520, 300, 1)
        else if (timeInSeconds === this.settings.timeLimit)
          this.beep(100, 524, 1000, 0)
      }
    },
  },

  mounted: function () {
    setInterval(this.getCurrentTime, 100)

    this.canvasElement = document.getElementById('canvas')
    this.canvas = this.canvasElement.getContext('2d')

    if (window.AudioContext) this.audio = new AudioContext()

    this.img = new Image()
    this.img.onload = this.onImageLoad
    this.imageLoaded = false
    this.img.src = this.settings.imageLocation
    this.img.onerror = async (event) => {
      await this.delay(1000)
      const source = this.img.src
      this.img.src = source
    }
  },

  methods: {
    delay: function (time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    },

    getCurrentTime: function () {
      this.currentTime = Date.now()
    },

    onImageLoad: function () {
      const imageScale = this.settings?.scale || findImageScale(this.img)
      this.canvasElement.width = this.img.width * imageScale
      this.canvasElement.height = this.img.height * imageScale

      this.imageLoaded = true
    },

    userClick: function (event) {
      const canvasLocation = this.canvasElement.getBoundingClientRect()

      const point = [
        Math.round(event.clientX - canvasLocation.left),
        Math.round(event.clientY - canvasLocation.top),
      ]

      setLineStyle(this.canvas, 'purple')
      drawLine(this.canvas, this.userPath[this.userPath.length - 1], point)
      drawCircle(this.canvas, point, 4)

      this.userPath.push(point)
      this.checkIfFinished(point)
    },

    drawMap: function () {
      this.canvas.drawImage(
        this.img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )
      setLineStyle(this.canvas, 'purple')
      drawTriangle(this.canvas, this.settings.startLocation, 14)
      drawRing(this.canvas, this.settings.finishLocation, 14)
    },

    startGame: function () {
      this.started = true
      this.startTime = Date.now()

      this.drawMap()

      this.userPath.push(this.settings.startLocation)
      this.canvasElement.addEventListener('click', this.userClick)
    },

    undo: function () {
      this.userPath.pop()

      if (this.settings.undoPenalty)
        this.startTime -= this.settings.undoPenalty * 1000

      if (this.userPath.length === 0)
        this.userPath.push(this.settings.startLocation)

      this.drawMap()
      drawPathWithDots(this.canvas, this.userPath, 3.5)
    },

    whenFinished: function () {
      this.finished = true
      this.finishTime = Date.now()
      this.comparedPoints = comparePath(
        this.settings.compulsoryPoints,
        this.settings.disallowedPoints,
        this.userPath
      )
      this.correct = this.comparedPoints.correct

      this.canvasElement.removeEventListener('click', this.userClick)

      if (this.settings?.hideMap)
        this.canvas.clearRect(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        )

      this.$emit('finished', {
        correct: this.correct,
        path: this.userPath,
        time: this.finishTime - this.startTime,
      })
    },

    drawCorrectPath: function () {
      if (this.drawnCorrectRoute) return

      setLineStyle(this.canvas, 'blue')
      drawPath(this.canvas, [
        this.settings.startLocation,
        ...this.settings.correctPath,
        this.settings.finishLocation,
      ])

      this.settings.compulsoryPoints.forEach((point, index) => {
        if (!this.comparedPoints?.compulsoryPoints?.[index])
          drawCircleWithRing(this.canvas, point.location, point.size - 1.5, [
            'blue-dark',
          ])
        else
          drawCircleWithRing(this.canvas, point.location, point.size - 1.5, [
            'blue',
            'dark-blue',
          ])
      })

      this.settings.disallowedPoints.forEach((point, index) => {
        if (this.comparedPoints?.disallowedPoints?.[index])
          drawCircleWithRing(this.canvas, point.location, point.size, [
            'red-dark',
          ])
        else
          drawCircleWithRing(this.canvas, point.location, point.size, [
            'red',
            'red-dark',
          ])
      })

      this.drawnCorrectRoute = true
    },

    checkIfFinished: function (point) {
      if (distanceBetweenPoints(point, this.settings.finishLocation) <= 10)
        this.whenFinished()
    },

    beep: function (vol, freq, duration, type) {
      if (!this.audio) return
      if (type === this.beeped) return
      this.beeped = type

      navigator.vibrate(500)

      const oscillator = this.audio.createOscillator()
      const gain = this.audio.createGain()
      oscillator.connect(gain)
      oscillator.frequency.value = freq
      oscillator.type = 'square'
      gain.connect(this.audio.destination)
      gain.gain.value = vol * 0.01
      oscillator.start(this.audio.currentTime)
      oscillator.stop(this.audio.currentTime + duration * 0.001)
    },
  },
}
</script>
<style>
canvas {
  align-self: center;
}
</style>
