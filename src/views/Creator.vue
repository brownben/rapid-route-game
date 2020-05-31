<template>
  <div>
    <AppHeader />
    <div class="w-full py-6 h-full flex flex-col items-center">
      <h1 v-if="stage === 'Select Image'" class="font-heading text-4xl py-6">
        Rapid Route - Creator
      </h1>

      <div class="button-grid w-full">
        <template v-if="stage === 'Centre Leg'">
          <div class="r1 c2">
            <button class="button" @click="crop('top')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                />
              </svg>
            </button>
            <button class="button-secondary" @click="enlarge('top')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                />
              </svg>
            </button>
          </div>
          <div class="r3 c2">
            <button class="button" @click="crop('bottom')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                />
              </svg>
            </button>
            <button class="button-secondary" @click="enlarge('bottom')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                />
              </svg>
            </button>
          </div>
          <div class="r2 c1">
            <button class="button mb-2" @click="crop('left')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                />
              </svg>
            </button>
            <button
              class="button-secondary block mt-2"
              @click="enlarge('left')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                />
              </svg>
            </button>
          </div>
          <div class="r2 c3">
            <button class="button mb-2" @click="crop('right')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                />
              </svg>
            </button>
            <button class="button-secondary mt-2" @click="enlarge('right')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                />
              </svg>
            </button>
          </div>
        </template>
        <div class="r2 c2">
          <canvas id="canvas" width="0" height="0" class="border inline-block">
            <p>Sorry, this game doesn't work without the Canvas Enabled</p>
          </canvas>
        </div>
      </div>

      <div v-if="stage === 'Select Image'" class="w-full">
        <label
          for="image"
          class="block font-main font-semibold select-none text-center"
          >Map Location:</label
        >
        <input
          v-model.lazy="imageLocation"
          name="image"
          type="text"
          class="block rounded-md border-2 p-1 my-2 text-center"
        />
      </div>

      <div v-if="stage === 'Centre Leg'" class="w-full text-center">
        <div class="mt-8">
          <div class="mr-3 inline">
            <button class="button mx-2" @click="rotate(-5)">
              <svg
                class="big"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"
                />
              </svg>
            </button>
            <button class="button mx-2 mr-6" @click="rotate(5)">
              <svg
                class="big"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"
                />
              </svg>
            </button>
          </div>
          <div class="ml-3 inline">
            <button class="button mx-2 ml-6" @click="scale(true)">
              <svg
                class="big"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
                <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
              </svg>
            </button>
            <button class="button mx-2" @click="scale(false)">
              <svg
                class="big"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-6">
          <button class="button-secondary" @click="resetCrop">
            Reset Cropping
          </button>
        </div>
      </div>

      <div v-if="stage === 'Start/ Finish'" class="mt-4">
        <button class="button mx-2" @click="pointType = 'start'">
          Place Start
        </button>
        <button class="button mx-2" @click="pointType = 'finish'">
          Place Finish
        </button>
      </div>

      <div v-if="stage === 'Route'" class="w-full text-center">
        <h3 class="font-main text-2xl mt-4 font-semibold select-none">
          Route Distance: {{ pathLength(correctPath).toFixed(1) }}
        </h3>

        <button class="button-secondary mx-2 mt-6" @click="undoCorrectRoute">
          Undo
        </button>
        <button
          class="button-secondary mx-2 mt-6"
          @click="clearPoints('correctPath')"
        >
          Clear Correct Route
        </button>
      </div>

      <div v-if="stage === 'Dots'" class="w-full text-center">
        <div class="mt-4">
          <button class="button mx-2" @click="pointType = 'compulsory'">
            Add Compulsory Point
          </button>
          <button class="button mx-2" @click="pointType = 'disallowed'">
            Add Disallowed Point
          </button>
        </div>
        <div class="mt-4">
          <button
            class="button-secondary mx-2"
            @click="clearPoints('compulsory')"
          >
            Clear Compulsory Points
          </button>
          <button
            class="button-secondary mx-2"
            @click="clearPoints('disallowed')"
          >
            Clear Disallowed Points
          </button>
        </div>

        <label
          for="sensitivity"
          class="block font-main font-semibold select-none mt-5"
          >Sensitivity:</label
        >
        <input
          v-model.number="sensitivity"
          name="sensitivity"
          type="number"
          class="inline-block rounded-md border-2 p-1 my-2 text-center"
        />
      </div>

      <div v-if="stage === 'Output'" class="w-full text-center">
        <textarea
          id="output"
          v-model="output"
          class="mt-6 h-64 inline-block rounded-md border-2"
        ></textarea>
        <div class="mt-4">
          <button class="button black mx-2" @click="generateOutput">
            Generate Output
          </button>
          <button
            v-if="output"
            class="button-secondary black mx-2"
            @click="copyOuputToClipboard"
          >
            Copy Output to Clipboard
          </button>
          <a
            v-if="newImage"
            :href="newImage"
            class="button-secondary black mx-2"
            target="_blank"
            rel="noopener noreferrer"
            download="Map"
            >Download Image</a
          >
        </div>
      </div>

      <ForwardsBackwards
        :list="stages"
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
import AppHeader from '@/components/AppHeader'
import ForwardsBackwards from '@/components/ForwardsBackwards'

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
    AppHeader,
    ForwardsBackwards,
  },

  data: () => ({
    stage: 'Select Image',
    stages: [
      'Select Image',
      'Centre Leg',
      'Start/ Finish',
      'Route',
      'Dots',
      'Output',
    ],

    canvas: undefined,
    canvasElement: undefined,
    canvasLocation: undefined,

    imageLocation: '/',
    img: undefined,
    imageLoaded: false,
    imageSize: undefined,
    imageScale: 1,
    imageRotation: 0,
    imagePosition: {},
    newImage: '',

    pointType: '',
    startLocation: undefined,
    finishLocation: undefined,
    correctPath: [],
    compulsoryPoints: [],
    disallowedPoints: [],
    sensitivity: 12,

    output: '',

    pathLength: pathLength,

    drag: {
      mousedown: false,
      start: { x: 0, y: 0 },
    },
  }),

  computed: {
    imageChanged: function () {
      return (
        this.imagePosition.dx !== 0 ||
        this.imagePosition.dy !== 0 ||
        this.imageRotation !== 0 ||
        this.canvasElement.width < this.img.width * this.imageScale - 1 ||
        this.canvasElement.width > this.img.width * this.imageScale + 1 ||
        this.canvasElement.height < this.img.height * this.imageScale - 1 ||
        this.canvasElement.height > this.img.height * this.imageScale + 1
      )
    },
  },

  mounted: function () {
    this.canvasElement = document.getElementById('canvas')
    this.canvas = this.canvasElement.getContext('2d')
  },

  methods: {
    changeStage: function (value) {
      if (this.stage === 'Select Image' && value === 'Centre Leg')
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

    loadImage: function () {
      this.wipeCanvas()
      this.clearData()
      this.img = new Image()
      this.img.onload = this.onImageLoad
      this.img.src = this.imageLocation
    },

    onImageLoad: function () {
      this.stage = 'Centre Leg'

      this.imageScale = findImageScale(this.img)
      this.canvasElement.width = this.img.width * this.imageScale
      this.canvasElement.height = this.img.height * this.imageScale

      this.imagePosition = {
        sx: 0,
        sy: 0,
        sWidth: this.img.width,
        sHeight: this.img.height,
        dx: 0,
        dy: 0,
        dWidth: this.img.width * this.imageScale,
        dHeight: this.img.height * this.imageScale,
      }

      this.drawImage()

      this.imageLoaded = true
      this.canvasElement.addEventListener('click', this.userClick)

      this.canvasElement.addEventListener('mousedown', this.startDragImage)
      this.canvasElement.addEventListener('mousemove', this.dragImage)
      this.canvasElement.addEventListener('mouseup', () => {
        this.drag.mousedown = false
      })
    },

    startDragImage: function (event) {
      this.drag.mousedown = true
      this.drag.start = { x: event.x, y: event.y }
    },

    dragImage: function (event) {
      if (this.drag.mousedown && this.stage === 'Centre Leg') {
        this.imagePosition.dx -= this.drag.start.x - event.x
        this.imagePosition.dy -= this.drag.start.y - event.y

        this.drag.start = { x: event.x, y: event.y }

        this.drawImage()
      }
    },

    drawImage: function () {
      this.wipeCanvas()

      this.canvas.save()

      this.canvas.rotate((this.imageRotation * Math.PI) / 180)

      this.canvas.drawImage(
        this.img,
        this.imagePosition.sx,
        this.imagePosition.sy,
        this.imagePosition.sWidth,
        this.imagePosition.sHeight,
        this.imagePosition.dx,
        this.imagePosition.dy,
        this.imagePosition.dWidth,
        this.imagePosition.dHeight
      )

      this.canvas.restore()
    },

    wipeCanvas: function () {
      this.canvas.clearRect(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )
    },

    clearData: function () {
      this.canvasElement.width = 0
      this.canvasElement.height = 0

      this.startLocation = undefined
      this.finishLocation = undefined

      this.correctPath = []
      this.compulsoryPoints = []
      this.disallowedPoints = []

      this.imageScale = 1
      this.imageRotation = 0

      this.output = ''
    },

    rotate: function (angle) {
      this.imageRotation += angle

      if (this.imageRotation >= 360) this.imageRotation -= 360

      this.drawImage()
    },

    crop: function (side, size = 10) {
      if (['top', 'bottom'].includes(side) && this.canvasElement.height > 20)
        this.canvasElement.height -= size
      else if (
        ['left', 'right'].includes(side) &&
        this.canvasElement.width > 20
      )
        this.canvasElement.width -= size

      if (side === 'top') {
        this.imagePosition.dx -=
          size * Math.sin((this.imageRotation * Math.PI) / 180)
        this.imagePosition.dy -=
          size * Math.cos((this.imageRotation * Math.PI) / 180)
      } else if (side === 'left') {
        this.imagePosition.dx -=
          size * Math.cos((this.imageRotation * Math.PI) / 180)
        this.imagePosition.dy -= Math.abs(
          size * Math.sin((this.imageRotation * Math.PI) / 180)
        )
      }

      this.drawImage()
    },

    resetCrop: function () {
      this.imagePosition = {
        sx: 0,
        sy: 0,
        sWidth: this.img.width,
        sHeight: this.img.height,
        dx: 0,
        dy: 0,
        dWidth: this.img.width * this.imageScale,
        dHeight: this.img.height * this.imageScale,
      }
      this.canvasElement.width = this.img.width * this.imageScale
      this.canvasElement.height = this.img.height * this.imageScale

      this.drawImage()
    },

    enlarge: function (side, size = 10) {
      if (['top', 'bottom'].includes(side)) this.canvasElement.height += size
      else if (['left', 'right'].includes(side))
        this.canvasElement.width += size

      if (side === 'top') {
        this.imagePosition.dx +=
          size * Math.sin((this.imageRotation * Math.PI) / 180)
        this.imagePosition.dy +=
          size * Math.cos((this.imageRotation * Math.PI) / 180)
      } else if (side === 'left') {
        this.imagePosition.dx +=
          size * Math.cos((this.imageRotation * Math.PI) / 180)
        this.imagePosition.dy += Math.abs(
          size * Math.sin((this.imageRotation * Math.PI) / 180)
        )
      }

      this.drawImage()
    },

    scale: function (zoomIn = true) {
      if (zoomIn) this.imageScale += 0.02
      else if (this.imageScale >= 0.02) this.imageScale -= 0.02

      this.imagePosition.dWidth = this.img.width * this.imageScale
      this.imagePosition.dHeight = this.img.height * this.imageScale

      this.drawImage()
    },

    userClick: function (event) {
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

    undoCorrectRoute: function () {
      this.correctPath.pop()
      if (this.correctPath.length === 0)
        this.correctPath.push(this.startLocation)

      this.drawPoints()
    },

    drawPoints: function () {
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

    clearPoints: function (type) {
      if (type === 'compulsory') this.compulsoryPoints = []
      else if (type === 'disallowed') this.disallowedPoints = []
      else if (type === 'correctPath') this.correctPath = []

      this.drawPoints()
    },

    generateOutput: function () {
      let image = ''
      let scale = this.imageScale

      if (this.imageChanged) {
        this.drawImage()
        image = this.canvasElement.toDataURL('image/jpeg', 0.9)
        this.newImage = image
        scale = 1
        this.drawPoints()
      } else image = this.imageLocation

      this.output = JSON.stringify({
        imageLocation: image,
        scale: scale.toFixed(2),
        startLocation: this.startLocation,
        finishLocation: this.finishLocation,
        compulsoryPoints: this.compulsoryPoints,
        disallowedPoints: this.disallowedPoints,
        correctPath: this.correctPath,
      })
    },

    copyOuputToClipboard: function () {
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
  box-sizing: border-box;
  display: inline;
  @apply p-1 h-8 fill-current;
}

svg.big {
  @apply p-2 h-12;
}

canvas {
  align-self: center;
}

input {
  @apply my-3;
  @apply border-2 border-purple outline-none bg-transparent;
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  transition: 0.5s;
}

input:focus,
input:active,
textarea:focus,
textarea:active {
  @apply border-2 border-purple-dark;
}

textarea {
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  @apply bg-transparent p-1;
  transition: 0.5s;
}

.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
}

.button-grid div {
  @apply flex justify-center;
}

.c1 {
  grid-column-start: 1;
  @apply flex-col items-end;
}
.c2 {
  grid-column-start: 2;
  @apply items-center;
}
.c3 {
  grid-column-start: 3;
  @apply flex-col items-start;
}
.r1 {
  grid-row-start: 1;
}
.r2 {
  grid-row-start: 2;
}
.r3 {
  grid-row-start: 3;
}
</style>
