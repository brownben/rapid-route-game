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
      <HomeFeatureOverview heading="Simple to Use" text="Just Click Your Route."
        ><img
          src="@/assets/Simple.svg"
          alt="Route and Cursor"
          class="h-28 mb-2"
        />
      </HomeFeatureOverview>
      <HomeFeatureOverview
        heading="Auto Marking"
        text="Instantly Told If Your Route Is Correct."
      >
        <img
          src="@/assets/Automatic.svg"
          alt="Marking 'Dots' and Tick"
          class="h-28 mb-2"
        />
      </HomeFeatureOverview>
      <HomeFeatureOverview
        heading="Challenging"
        text="Puzzles to Challenge All."
      >
        <img
          src="@/assets/Challenging.svg"
          alt="Complex Maze"
          class="h-28 mb-2"
        />
      </HomeFeatureOverview>
      <HomeFeatureOverview
        heading="Benificial"
        text=" Improve Your Orienteering. Become a Champion."
      >
        <img
          src="@/assets/Trophy.svg"
          alt="Trophy and Fireworks"
          class="h-28 mb-2"
        />
      </HomeFeatureOverview>
    </div>

    <div class="bg-dark-100 text-center dark:bg-dark-800">
      <h2 class="font-main font-semibold text-4xl py-3 font-heading">Events</h2>
      <div class="align-top md:w-10/12 md:mx-1/12 xl:w-8/12 xl:mx-2/12">
        <EventSummary
          name="Denny"
          description="22 Legs Around Denny, Falkirk - Used for the Lockdown Easter Championships \ Planned By: Jon Cross"
          location="/play/Denny"
        />
        <EventSummary
          name="Bughtlin"
          description="8 Legs Around Bughtlin, Edinburgh \ Planned By: Judy Bell"
          location="/play/Bughtlin"
        />
      </div>
      <router-link to="/events" class="button-secondary mb-4 mt-2"
        >View All Events</router-link
      >
    </div>

    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import HomeFeatureOverview from '@/components/HomeFeatureOverview'
import EventSummary from '@/components/EventSummary'

export default {
  components: {
    AppHeader,
    AppFooter,
    HomeFeatureOverview,
    EventSummary,
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
