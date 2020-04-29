<template>
  <div class="py-6">
    <h1 class="heading text-4xl my-3">Rapid Route</h1>
    <h3 class="font-main text-2xl my-2 mb-6">
      Draw the Shortest Route!
    </h3>

    <div class="my-6 ">
      <div>
        <p class="mb-2 w-3/4 md:w-2/3 lg:w-1/2 inline-block">
          Two points are displayed on a map, and you have to draw the shortest
          route between the two points. The route is then automatically marked
          to see if you got the shortest route. To see how it is marked click
          `Draw Correct Route` after you have drawn your route, and the correct
          path will be displayed along side some blue and red dots. Your path
          must pass through all of the blue dots and must not go through any red
          dot. Any blue dots which you miss, or red dots you hit will be darker,
          with a white ring
        </p>
      </div>

      <div>
        <p class="mt-2 mb-1 w-3/4 md:w-2/3 lg:w-1/2 inline-block font-semibold">
          It is Recommended to Play on a Laptop or Desktop
        </p>
      </div>
    </div>

    <router-link to="/events" class="button">Play Game</router-link>

    <p class="absolute right-0 bottom-0 p-3">
      Created By
      <a href="https://brownben.github.io" class="text-black font-semibold"
        >Ben Brown</a
      >
    </p>
  </div>
</template>
