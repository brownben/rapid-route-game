<template functional>
  <div class="text-left px-8 md:px-10 pb-4 md:pb-6">
    <slot />
    <h3 class="text-2xl font-semibold font-heading">{{ props.heading }}</h3>
    <p class="font-main w-48">{{ props.text }}</p>
  </div>
</template>
