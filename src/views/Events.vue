<template>
  <div>
    <h1 class="heading text-2xl">Events</h1>

    <router-link
      v-for="event of Object.keys(courses)"
      :key="event"
      tag="div"
      :to="`/play/${event}`"
      class="inline-block shadow-md hover:shadow-lg w-10/12 md:w-3/4 lg:w-2/3 p-5 my-3 hover:bg-blue-100"
    >
      <h2 class="heading text-2xl">{{ event }}</h2>

      <p class="my-1">
        {{ courses[event].legs.length }} Legs - Planned By:
        {{ courses[event].plannedBy }}
      </p>
      <p v-if="courses[event].description" class="my-1">
        {{ courses[event].description }}
      </p>
      <p v-if="courses[event].penalty" class="my-1">
        There is a penalty of 1/2 a mark if you take longer than
        {{ courses[event].penalty }}s on any leg (if you get the route correct).
      </p>
      <p v-if="courses[event].timeLimit" class="my-1">
        There is a maximum time of {{ courses[event].timeLimit }}s to complete
        each leg.
      </p>
    </router-link>
  </div>
</template>
<script>
import Courses from '@/assets/Courses'

export default {
  data: () => ({
    courses: Courses,
  }),
}
</script>
<style>
div {
  transition: 0.3s;
}
</style>
