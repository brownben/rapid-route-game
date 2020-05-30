<template>
  <div>
    <AppHeader />
    <div
      id="main"
      class="bg-dark-200 text-center py-8 flex flex-col items-center justify-center md:flex-row border-b border-dark-200 justify-around"
    >
      <div class="md:w-1/2">
        <h1 class="font-heading font-black text-5xl sm:text-6xl px-2 m-0">
          Rapid Route
        </h1>
        <h2 class="font-main font-semibold text-2xl">
          Draw the Shortest Route!
        </h2>
        <router-link
          to="/events"
          class="bg-purple hover:bg-purple-dark text-white font-heading font-semibold shadow-lg rounded-lg text-lg py-3/2 px-6 my-6 inline-block dark:text-dark-900 select-none"
        >
          Play Now!
        </router-link>
      </div>

      <img
        src="@/assets/HomeGraphic.svg"
        alt="Rapid Route Game - Mockup"
        class="shadow-xl md:mx-4 mt-6 md:mt-0"
      />
    </div>
    <div
      class="bg-white pb-0 pt-8 text-center border-b border-dark-200 flex flex-row flex-wrap items-start justify-center dark:bg-dark-900"
    >
      <div class="text-left px-8 md:px-10 pb-6 sm:pb-4">
        <img
          src="@/assets/Simple.svg"
          alt="Route and Cursor"
          class="h-28 mb-2"
        />
        <h3 class="text-2xl font-semibold font-heading">Simple to Use</h3>
        <p class="font-main w-48">Just Click Your Route.</p>
      </div>

      <div class="text-left px-8 md:px-10 pb-6 sm:pb-4">
        <img
          src="@/assets/Automatic.svg"
          alt="Marking 'Dots' and Tick"
          class="h-28 mb-2"
        />
        <h3 class="text-2xl font-semibold font-heading w-48">
          Auto Marking
        </h3>
        <p class="font-main w-48">Instantly Told If Your Route Is Correct.</p>
      </div>

      <div class="text-left px-8 md:px-10 pb-6 sm:pb-4">
        <img
          src="@/assets/Challenging.svg"
          alt="Complex Maze"
          class="h-28 mb-2"
        />
        <h3 class="text-2xl font-semibold font-heading w-48">
          Challenging
        </h3>
        <p class="font-main w-48">Puzzles to Challenge All.</p>
      </div>
      <div class="text-left px-8 md:px-10 pb-6 sm:pb-4">
        <img
          src="@/assets/Trophy.svg"
          alt="Trophy and Fireworks"
          class="h-28 mb-2"
        />
        <h3 class="text-2xl font-semibold font-heading w-48">
          Benificial
        </h3>
        <p class="font-main w-48">
          Improve Your Orienteering. Become a Champion.
        </p>
      </div>
    </div>
    <div class="bg-dark-100 text-center dark:bg-dark-800">
      <h2 class="font-main font-semibold text-4xl py-3 font-heading">Events</h2>
      <div class="align-top md:w-10/12 md:mx-1/12 xl:w-8/12 xl:mx-2/12">
        <div class="w-full md:w-1/2 p-6 pt-3 inline-block">
          <div
            class="shadow-lg bg-white px-6 pb-3 first:mt-0 rounded-lg dark:bg-dark-600"
          >
            <h3 class="font-semibold font-heading text-2xl pt-3 pb-2">Denny</h3>
            <p>
              22 Legs Around Denny, Falkirk - Used for the Lockdown Easter
              Championships
            </p>

            <p>Planned By: Jon Cross</p>
            <router-link to="/play/Denny" class="button-secondary mt-3"
              >Play</router-link
            >
          </div>
        </div>
        <div class="align-top w-full md:w-1/2 p-6 pt-3 inline-block">
          <div
            class="shadow-lg bg-white px-6 pb-3 first:mt-0 rounded-lg dark:bg-dark-600"
          >
            <h3 class="font-semibold font-heading text-2xl pt-3 pb-2">
              Bughtlin
            </h3>
            <p>8 Legs Around Bughtlin, Edinburgh</p>
            <p>Planned By: Judy Bell</p>
            <router-link to="/play/Bughtlin" class="button-secondary mt-3"
              >Play</router-link
            >
          </div>
        </div>
      </div>
      <router-link to="/events" class="button-secondary mb-4 mt-2"
        >View All Events</router-link
      >
    </div>
    <footer>
      <p
        class="border-t w-full border-dark-200 p-3 text-center dark:text-white dark:bg-dark-900"
      >
        Created By
        <a
          href="https://brownben.github.io"
          class="font-heading font-semibold text-purple-darkest dark:text-white"
          >Ben Brown</a
        >
      </p>
    </footer>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader,
  },
}
</script>
<style lang="postcss" scoped>
.h-28 {
  height: 7rem;
}

#main {
  background-image: radial-gradient(
    70% 70% at 50% 100%,
    #e8e8e8 0,
    #fafafa 100%
  );
}
@media (prefers-color-scheme: dark) {
  #main {
    background-image: radial-gradient(
      70% 70% at 50% 100%,
      #444444 0,
      #212121 100%
    );
  }
}

@media (max-width: 768px) {
  #main img {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
}
@media (min-width: 768px) {
  #main img {
    max-width: 50%;
  }

  .md\:mx-1\/12 {
    margin-left: 8.33%;
    margin-right: 8.33%;
  }
}

@media (min-width: 1024px) {
  #main img {
    margin-right: 7.5%;
  }
}

@media (min-width: 1280px) {
  #main img {
    margin-right: 10%;
  }

  .xl\:mx-2\/12 {
    margin-left: 16.67%;
    margin-right: 16.67%;
  }
}

.first\:mt-0:first-child {
  margin-top: 0;
}
</style>
