<template>
  <div
    class="min-h-full bg-dark-100 flex flex-col items-center pb-6 dark:bg-dark-800"
  >
    <AppHeader />
    <h1 class="font-heading font-semibold text-4xl text-center py-3">Events</h1>

    <div
      v-for="event of Object.keys(courses)"
      :key="event"
      class="bg-white inline-block shadow-lg hover:shadow-xl w-10/12 md:w-3/4 lg:w-2/3 px-6 pb-3 my-4 rounded-lg text-center dark:bg-dark-600"
    >
      <h2 class="font-semibold font-heading text-3xl pt-4 pb-4">
        {{ event }}
      </h2>

      <p>
        {{ courses[event].legs.length }} Legs - Planned By:
        {{ courses[event].plannedBy }}
      </p>
      <p v-if="courses[event].description">
        {{ courses[event].description }}
      </p>
      <p v-if="courses[event].penalty">
        There is a penalty of 1/2 a mark if you take longer than
        {{ courses[event].penalty }}s on any leg (if you get the route correct).
      </p>
      <p v-if="courses[event].timeLimit">
        There is a maximum time of {{ courses[event].timeLimit }}s to complete
        each leg.
      </p>
      <p v-if="courses[event].undoButton">There is an Undo Button.</p>
      <router-link :to="`/play/${event}`" class="button-secondary mt-5"
        >Start Game</router-link
      >
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader'

import Courses from '@/assets/Courses'

export default {
  components: {
    AppHeader,
  },

  data: () => ({
    courses: Courses,
  }),
}
</script>
<style>
div {
  transition: 0.5s;
}
</style>
