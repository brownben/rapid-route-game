<template>
  <div class="py-6">
    <h1 class="font-semibold font-heading text-5xl my-2">Well Done!</h1>
    <h3 class="font-semibold font-main text-2xl mt-3">Score: {{ score }}</h3>
    <h3 class="font-semibold font-main text-2xl mb-3">
      Time: {{ time / 1000 }}s
    </h3>

    <router-link class="button-secondary mx-2 mt-4" to="/"
      >Return Home</router-link
    >
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
