<template>
  <div>
    <Breadcrumbs
      :list="['Select Image', 'Start/ Finish', 'Route', 'Dots', 'Output']"
      :currentItem="stage"
    />

    <div class="fixed top-12 w-full py-6 overflow-y-auto h-full--12">
      <canvas id="canvas" width="0" height="0" class="border inline-block">
        <p>Sorry, this game doesn't work without the Canvas Enabled</p>
      </canvas>

      <div v-if="stage === 'Select Image'">
        <label for="image" class="block font-main select-none"
          >Map Location:</label
        >
        <input
          v-model.lazy="imageLocation"
          name="image"
          type="text"
          class="inline-block rounded border-2 border-blue-400 p-1 my-2 text-center"
        />
      </div>

      <div v-if="stage === 'Start/ Finish'">
        <button class="button pink mx-2" @click="pointType = 'start'">
          Place Start
        </button>
        <button class="button pink mx-2" @click="pointType = 'finish'">
          Place Finish
        </button>
      </div>

      <div v-if="stage === 'Route'">
        <h3 class="font-main text-lg mt-3 font-semibold select-none">
          Route Distance: {{ pathLength(correctPath).toFixed(1) }}
        </h3>

        <button class="button green mx-2" @click="clearPoints('correctPath')">
          Clear Correct Route
        </button>
      </div>

      <div v-if="stage === 'Dots'">
        <div>
          <button class="button blue mx-2" @click="pointType = 'compulsory'">
            Add Compulsory Point
          </button>
          <button class="button blue mx-2" @click="clearPoints('compulsory')">
            Clear Compulsory Points
          </button>
        </div>
        <div>
          <button class="button red mx-2" @click="pointType = 'disallowed'">
            Add Disallowed Point
          </button>
          <button class="button red mx-2" @click="clearPoints('disallowed')">
            Clear Disallowed Points
          </button>
        </div>

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

      <div v-if="stage === 'Output'">
        <textarea
          id="output"
          v-model="output"
          class="mt-6 h-64 inline-block rounded border-2 border-blue-400  "
        ></textarea>
        <button class="button black mx-2" @click="generateOutput">
          Generate Output
        </button>
        <button
          v-if="output"
          class="button black mx-2"
          @click="copyOuputToClipboard"
        >
          Copy Output to Clipboard
        </button>
      </div>

      <ForwardsBackwards
        :list="['Select Image', 'Start/ Finish', 'Route', 'Dots', 'Output']"
        :currentItem="stage"
        :blockNext="
          stage === 'Start/ Finish' && (!startLocation || !finishLocation)
        "
        @changeStage="changeStage"
      />
    </div>
  </div>
</template>

<script>
import ForwardsBackwards from '@/components/ForwardsBackwards'
import Breadcrumbs from '@/components/Breadcrumbs'

import {
  drawRing,
  drawTriangle,
  drawPath,
  drawCircleWithRing,
  setLineStyle,
} from '@/scripts/CanvasDrawing'
import { pathLength } from '@/scripts/PathMatching'
import { findImageScale } from '@/scripts/ImageScale'

export default {
  components: {
    ForwardsBackwards,
    Breadcrumbs,
  },

  data: () => ({
    stage: 'Select Image',

    canvas: undefined,
    canvasElement: undefined,
    canvasLocation: undefined,

    imageLocation: '/',
    img: undefined,
    imageLoaded: false,
    imageSize: undefined,

    pointType: 'start',
    startLocation: undefined,
    finishLocation: undefined,
    correctPath: [],
    compulsoryPoints: [],
    disallowedPoints: [],
    sensitivity: 12,

    output: '',

    pathLength: pathLength,

    imageScale: 1,
  }),

  mounted: function() {
    this.canvasElement = document.getElementById('canvas')
    this.canvas = this.canvasElement.getContext('2d')
  },

  methods: {
    changeStage: function(value) {
      if (this.stage === 'Select Image' && value === 'Start/ Finish')
        this.loadImage()
      else this.stage = value

      if (value === 'Select Image') {
        this.clearData()
        this.wipeCanvas()
      } else if (value === 'Start/ Finish') this.pointType = 'start'
      else if (value === 'Route') this.pointType = 'correct'
      else if (value === 'Dots') this.pointType = 'compulsory'
      else if (value === 'Output') this.pointType = ''
    },

    loadImage: function() {
      this.wipeCanvas()
      this.clearData()
      this.img = new Image()
      this.img.onload = this.onImageLoad
      this.img.src = this.imageLocation
    },

    onImageLoad: function() {
      this.stage = 'Start/ Finish'

      this.imageScale = findImageScale(this.img)
      this.canvasElement.width = this.img.width * this.imageScale
      this.canvasElement.height = this.img.height * this.imageScale
      this.drawImage()

      this.imageLoaded = true
      this.canvasElement.addEventListener('click', this.userClick)
    },

    drawImage: function() {
      this.wipeCanvas()

      this.canvas.drawImage(
        this.img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )
    },

    wipeCanvas: function() {
      this.canvas.clearRect(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )
    },

    clearData: function() {
      this.canvasElement.width = 0
      this.canvasElement.height = 0

      this.startLocation = undefined
      this.finishLocation = undefined

      this.correctPath = []
      this.compulsoryPoints = []
      this.disallowedPoints = []

      this.imageScale = 1
    },

    userClick: function(event) {
      const canvasLocation = this.canvasElement.getBoundingClientRect()

      const point = [
        Math.round(event.clientX - canvasLocation.left),
        Math.round(event.clientY - canvasLocation.top),
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
      this.drawImage()

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

      setLineStyle(this.canvas, 'purple')
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
      this.output = JSON.stringify(
        {
          imageLocation: this.imageLocation,
          scale: this.imageScale,
          startLocation: this.startLocation,
          finishLocation: this.finishLocation,
          compulsoryPoints: this.compulsoryPoints,
          disallowedPoints: this.disallowedPoints,
          correctPath: this.correctPath,
        },
        null,
        4
      )
    },

    copyOuputToClipboard: function() {
      const output = document.getElementById('output')
      output.select()
      output.setSelectionRange(0, 99999)
      document.execCommand('copy')
    },
  },
}
</script>

<style lang="postcss">
svg {
  fill: white;
  box-sizing: border-box;
  @apply p-2 h-12;
}

canvas {
  align-self: center;
}

input {
  @apply my-3;

  width: 60%;
  margin-left: 15%;
  margin-right: 15%;
  transition: 0.5s;
  outline-color: blue;
}

textarea {
  width: 60%;
  margin-left: 15%;
  margin-right: 15%;
  transition: 0.5s;
  outline-color: blue;
}

.top-12 {
  top: 3rem;
}

.h-full--12 {
  height: calc(100% - 3rem);
}
</style>
