
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


<style scoped></style>