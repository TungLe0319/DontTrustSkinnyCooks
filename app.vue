<script setup lang="ts">
import AdPopUpModal from './components/globals/AdPopUpModal.vue'
import Footer from './components/globals/Footer.vue'
import NavBar from './components/globals/NavBar.vue'

// const io = useIo()
// io.emit('joinRoom', (room) => {
//   console.log('joined room', room)
// })
</script>

<template>
  <div>
    <NavBar />

    <UContainer>
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

    <AdPopUpModal />
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
