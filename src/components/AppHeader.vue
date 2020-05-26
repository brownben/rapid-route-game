<template>
  <div
    id="header"
    class="sticky top-0 z-5 w-full h-14 border-b border-dark-200 bg-white-translucent flex items-center justify-center md:justify-between"
  >
    <router-link to="/" class="text-2xl font-semibold font-heading ml-10per"
      >Rapid Route</router-link
    >
    <router-link
      to="/events"
      class="text-white bg-purple hover:bg-purple-dark rounded-lg px-2 py-3/2 font-bold mr-10per hidden md:block w-20 shadow text-center"
    >
      Play!
    </router-link>
  </div>
</template>
<style>
.h-14 {
  height: 3.5rem;
}

.ml-10per {
  margin-left: 5%;
}
.mr-10per {
  margin-right: 5%;
}
</style>
