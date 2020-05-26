<template>
  <div
    id="breadcrumbs"
    class="w-full h-12 bg-purple fixed bottom-0 left-0 text-white select-none shadow-lg text-center"
  >
    <span v-for="item in list" id="all" :key="item">
      <span
        class="h-12 px-3 mx-1 font-semibold inline-block py-3"
        :class="{
          'bg-purple-darker font-bold': item === currentItem,
        }"
      >
        {{ item }}
      </span>
      <span
        v-if="list.indexOf(item) < list.length - 1"
        class="px-2 font-semibold"
        >></span
      >
    </span>

    <span
      id="one"
      class="font-bold h-12 px-3 mx-1 py-1 inline-block text-2xl"
      >{{ currentItem }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    currentItem: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="postcss">
@media (max-width: 785px) {
  #breadcrumbs #all {
    display: none;
  }
  #breadcrumbs #one {
    display: inline-block;
  }
}

@media (min-width: 785px) {
  #breadcrumbs #all {
    display: inline-block;
  }
  #breadcrumbs #one {
    display: none;
  }
}
</style>
