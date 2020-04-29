<template>
  <div class="mb-6">
    <canvas id="canvas" width="500" height="500" class="border inline-block">
      <p>Sorry, this game doesn't work without the Canvas Enabled</p>
    </canvas>

    <div v-if="started" class="time select-none">
      <h2
        :class="{ 'text-red-600': overTimeLimit }"
        class="font-main font-semibold text-2xl mt-4 select-none"
      >
        <template v-if="!finished">
          Time: {{ ((currentTime - startTime) / 1000).toFixed(1) }}
        </template>
        <template v-else>
          Time: {{ ((finishTime - startTime) / 1000).toFixed(1) }}
        </template>
      </h2>
    </div>

    <div v-if="!started && !finished" class="beforeStart mt-3">
      <button v-show="imageLoaded" class="button green" @click="startGame">
        Start
      </button>
    </div>

    <div v-if="started && !finished" class="mt-3">
      <button v-show="imageLoaded" class="button white small" @click="undo">
        Undo
      </button>
    </div>

    <div v-if="finished" class="result">
      <h1 v-if="correct" class="heading text-4xl my-3">Correct Route</h1>
      <h1 v-else class="heading text-4xl my-3">Incorrect Route</h1>

      <button
        v-if="
          settings.showCorrectRoute && !drawnCorrectRoute && !settings.hideMap
        "
        class="button blue mx-2"
        @click="drawCorrectPath"
      >
        Draw Correct Route
      </button>
      <button class="button pink" @click="$emit('nextLeg')">
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
import { imageScale } from '@/scripts/ImageScale'

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
    overTimeLimit: function() {
      const timeLimit = this.settings?.penalty ?? this.settings?.timeLimit
      const latestTime = this.finishTime ?? this.currentTime

      if (timeLimit) return (latestTime - this.startTime) / 1000 >= timeLimit
      else return false
    },
  },

  watch: {
    currentTime: function() {
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

  mounted: function() {
    setInterval(this.getCurrentTime, 100)

    this.canvasElement = document.getElementById('canvas')
    this.canvas = this.canvasElement.getContext('2d')

    this.audio = new AudioContext()

    this.img = new Image()
    this.img.onload = this.onImageLoad
    this.imageLoaded = false
    this.img.src = this.settings.imageLocation
  },

  methods: {
    getCurrentTime: function() {
      this.currentTime = Date.now()
    },

    onImageLoad: function() {
      const imageSize = imageScale(this.img)
      this.canvasElement.width = imageSize.width
      this.canvasElement.height = imageSize.height

      this.imageLoaded = true
    },

    userClick: function(event) {
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

    drawMap: function() {
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

    startGame: function() {
      this.started = true
      this.startTime = Date.now()

      this.drawMap()

      this.userPath.push(this.settings.startLocation)
      this.canvasElement.addEventListener('click', this.userClick)
    },

    undo: function() {
      this.userPath.pop()
      if (this.userPath.length === 0)
        this.userPath.push(this.settings.startLocation)

      this.drawMap()
      drawPathWithDots(this.canvas, this.userPath, 3.5)
    },

    whenFinished: function() {
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

    drawCorrectPath: function() {
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

    checkIfFinished: function(point) {
      if (distanceBetweenPoints(point, this.settings.finishLocation) <= 10)
        this.whenFinished()
    },

    beep: function(vol, freq, duration, type) {
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
