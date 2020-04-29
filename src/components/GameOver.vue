<template>
  <div class="py-6">
    <h1 class="heading text-4xl">Well Done!</h1>
    <h3 class="font-semibold font-main text-2xl mt-3">Score: {{ score }}</h3>
    <h3 class="font-semibold font-main text-2xl mb-3">
      Time: {{ time / 1000 }}s
    </h3>

    <router-link class="button blue mx-2" to="/">Return Home</router-link>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: String,
      default: '',
    },
    time: {
      type: Number,
      default: 0,
    },
  },
}
</script>
