<template>
  <div class="mt-6">
    <button
      v-if="list.indexOf(currentItem) >= 1"
      class="button-secondary"
      @click="$emit('changeStage', list[list.indexOf(currentItem) - 1])"
    >
      Back</button
    ><button
      v-if="list.indexOf(currentItem) < list.length - 1 && !blockNext"
      class="button-secondary"
      @click="$emit('changeStage', list[list.indexOf(currentItem) + 1])"
    >
      Next
    </button>
    <button
      v-if="list.indexOf(currentItem) === list.length - 1"
      class="button"
      @click="$emit('changeStage', list[0])"
    >
      Restart
    </button>
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
    blockNext: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
