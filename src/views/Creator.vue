<template>
  <div>
    <div class="my-4">
      <label for="image" class="block font-main select-none"
        >Map Location:</label
      >
      <input
        v-model.lazy="imageLocation"
        name="image"
        type="text"
        class="inline-block rounded border-2 border-blue-400 p-1 my-2 text-center"
      />
      <button class="button white" @click="loadImage">Load Map</button>
    </div>
    <canvas id="canvas" width="500" height="500" class="border inline-block">
      <p>Sorry, this game doesn't work without the Canvas Enabled</p>
    </canvas>

    <div v-if="imageLoaded" class="my-4">
      <button class="button pink mx-2" @click="pointType = 'start'">
        Place Start
      </button>
      <button class="button pink mx-2" @click="pointType = 'finish'">
        Place Finish
      </button>
      <template v-if="startLocation && finishLocation">
        <button class="button green mx-2" @click="pointType = 'correct'">
          Draw Correct Route
        </button>
        <button class="button green mx-2" @click="clearPoints('correctPath')">
          Clear Correct Route
        </button>
        <h3 class="font-main text-lg mt-3 font-semibold select-none">
          Correct Route Distance: {{ pathLength(correctPath).toFixed(1) }}
        </h3>
      </template>
      <div v-if="startLocation && finishLocation">
        <button class="button blue mx-2" @click="pointType = 'compulsory'">
          Add Compulsory Point
        </button>
        <button class="button blue mx-2" @click="clearPoints('compulsory')">
          Clear Compulsory Points
        </button>
        <button class="button red mx-2" @click="pointType = 'disallowed'">
          Add Disallowed Point
        </button>
        <button class="button red mx-2" @click="clearPoints('disallowed')">
          Clear Disallowed Points
        </button>
        <label for="sensitivity" class="block font-main select-none mt-3"
          >Sensitivity:</label
        >
        <input
          v-model.number="sensitivity"
          name="sensitivity"
          type="number"
          class="inline-block rounded border-2 border-blue-400 p-1 my-2 text-center"
        />
      </div>
      <div v-if="startLocation && finishLocation" class="mb-4">
        <button class="button white mx-2" @click="generateOutput">
          Copy Output to Clipboard
        </button>
        <textarea id="output" v-model="output"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {
  drawRing,
  drawTriangle,
  drawPath,
  drawCircleWithRing,
  setLineStyle,
} from '@/scripts/CanvasDrawing'
import { pathLength } from '@/scripts/PathMatching'
import { imageScale } from '@/scripts/ImageScale'

export default {
  data: () => ({
    canvas: undefined,
    canvasElement: undefined,
    canvasLocation: undefined,
    imageLocation: '/',
    img: undefined,
    imageLoaded: false,

    pointType: 'start',
    startLocation: undefined,
    finishLocation: undefined,
    correctPath: [],
    compulsoryPoints: [],
    disallowedPoints: [],
    sensitivity: 10,

    output: '',

    pathLength: pathLength,
  }),

  mounted: function() {
    this.canvasElement = document.getElementById('canvas')
    this.canvas = this.canvasElement.getContext('2d')
  },

  methods: {
    loadImage: function() {
      this.wipeCanvas()
      this.img = new Image()
      this.img.onload = this.onImageLoad
      this.img.src = this.imageLocation
    },

    onImageLoad: function() {
      const imageSize = imageScale(this.img)
      this.canvasElement.width = imageSize.width
      this.canvasElement.height = imageSize.height

      this.canvas.drawImage(
        this.img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )

      this.imageLoaded = true
      this.canvasElement.addEventListener('click', this.userClick)
    },

    wipeCanvas: function() {
      this.canvas.clearRect(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )
      this.startLocation = undefined
      this.finishLocation = undefined
      this.correctPath = []
      this.compulsoryPoints = []
      this.disallowedPoints = []
    },

    userClick: function(event) {
      const canvasLocation = this.canvasElement.getBoundingClientRect()

      const point = [
        event.clientX - canvasLocation.left,
        event.clientY - canvasLocation.top,
      ]

      if (this.pointType === 'start') this.startLocation = point
      else if (this.pointType === 'finish') this.finishLocation = point
      else if (this.pointType === 'compulsory')
        this.compulsoryPoints.push({ location: point, size: this.sensitivity })
      else if (this.pointType === 'disallowed')
        this.disallowedPoints.push({ location: point, size: this.sensitivity })
      else if (this.pointType === 'correct') this.correctPath.push(point)

      this.drawPoints()
    },

    drawPoints: function() {
      // Draw Map Again to Blank Previous Versions
      this.onImageLoad()

      setLineStyle(this.canvas, 'purple')
      if (this.startLocation) drawTriangle(this.canvas, this.startLocation, 14)
      if (this.finishLocation) drawRing(this.canvas, this.finishLocation, 14)

      for (const point of this.disallowedPoints) {
        drawCircleWithRing(this.canvas, point.location, point.size - 1.5, [
          'red-dark',
          'red',
        ])
      }
      for (const point of this.compulsoryPoints) {
        drawCircleWithRing(this.canvas, point.location, point.size - 1.5, [
          'blue-dark',
          'blue',
        ])
      }
      if (this.startLocation)
        drawPath(this.canvas, [this.startLocation, ...this.correctPath])
    },

    clearPoints: function(type) {
      if (type === 'compulsory') this.compulsoryPoints = []
      else if (type === 'disallowed') this.disallowedPoints = []
      else if (type === 'correctPath') this.correctPath = []

      this.drawPoints()
    },

    generateOutput: function() {
      this.output = JSON.stringify({
        imageLocation: this.imageLocation,
        startLocation: this.startLocation,
        finishLocation: this.finishLocation,
        compulsoryPoints: this.compulsoryPoints,
        disallowedPoints: this.disallowedPoints,
        correctPath: this.correctPath,
      })

      const output = document.getElementById('output')
      output.select()
      output.setSelectionRange(0, 99999)
      document.execCommand('copy')
    },
  },
}
</script>
<style>
canvas {
  align-self: center;
}

input {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
  transition: 0.5s;
  outline-color: blue;
}

textarea {
  width: 50px;
  position: absolute;
  top: 0;
  left: -100px;
}
</style>
