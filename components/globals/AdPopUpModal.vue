<script setup>
const { session, signIn } = useAuth() // replace with your actual auth package

const isOpen = ref(false)

watchEffect(() => {
  if (userRecipeInteractionCount().value > 5) {
    userRecipeInteractionCount().value = 0 // Reset count to 0
    isOpen.value = true
  }
})
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
          <h2 class="text-2xl font-bold mb-2">
            Free Recipe Limit Hit...
          </h2>
          <p class="text-gray-600 mb-4">
            You've explored some recipes. Now it's time for a more personalized experience, sign in or sign up to save your favorite recipes and contribute your own!
          </p>
          <div class="flex items-center justify-center gap-4">
            <UButton size="xl" class="" @click="signIn">
              Sign Up
            </UButton>
            <UButton size="xl" variant="outline" @click="signIn">
              Sign In
            </UButton>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
