<template functional>
  <div class="w-full md:w-1/2 p-6 pt-3 inline-block align-top">
    <div
      class="shadow-lg bg-white px-6 pb-3 first:mt-0 rounded-lg dark:bg-dark-600"
    >
      <h3 class="font-heading text-2xl pt-3 pb-2">
        {{ props.name }}
      </h3>
      <p v-for="line of props.description.split('\\')" :key="line">
        {{ line }}
      </p>
      <router-link :to="props.location" class="button-secondary mt-3"
        >Play Game</router-link
      >
    </div>
  </div>
</template>
