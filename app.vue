
<script setup lang="ts">
import NavBar from './components/globals/NavBar.vue';
</script>
<template>
  <div>
    <NavBar />
    <UContainer>

      <NuxtPage />
    </UContainer>
    <UNotifications />
    <NuxtLoadingIndicator :height="6"/>
  </div>
</template>


<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>