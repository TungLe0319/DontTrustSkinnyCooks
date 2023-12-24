<script setup lang="ts">
import Footer from './components/globals/Footer.vue'
import NavBar from './components/globals/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
 
  <UContainer class="py-16">
        <NuxtPage />
  </UContainer>
  
    <Footer />
    <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>

      <template #description="{ description }">
        <span v-html="description" />
      </template>
    </UNotifications>
    <NuxtLoadingIndicator :height="6" />
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
