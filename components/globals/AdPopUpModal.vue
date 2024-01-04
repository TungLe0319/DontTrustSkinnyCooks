<script setup>

import AdBannerTwo from "./AdBannerTwo.vue";


const { session,signIn } = useAuth(); // replace with your actual auth package

const isOpen = ref(false);

watchEffect(() => {
  if ( userRecipeInteractionCount().value > 5) {
    userRecipeInteractionCount().value = 0; // Reset count to 0
    isOpen.value = true;
  }
});
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />
    <UModal v-model="isOpen" prevent-close>
      <div class="p-4">
        <div class="flex items-center justify-center p-1 m-2 relative">
          <img src="../../assets/images/undraw_signup.svg" alt="">
            <!-- <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class=" absolute top-3 right-0" @click="isOpen = false" /> -->
        </div>
       <div class="text-center">
      <h2 class="text-2xl font-bold mb-2">Unlock Exclusive Content!</h2>
      <p class="text-gray-600 mb-4">Sign up now to access premium recipes and cooking tips.</p>
      <UButton size="xl" class="" @click="signIn"> Sign Up</UButton>
    </div>
      </div>
    </UModal>
  </div>
</template>
