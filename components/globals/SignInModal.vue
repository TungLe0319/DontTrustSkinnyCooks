<script setup lang="ts">
import {ref} from 'vue'
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton label="Sign In" @click="isOpen = true" class="!bg-emerald-500"   />
    <UModal v-model="isOpen" :ui="{base:'overflow-visible',overlay:{background:'bg-black/80 backdrop-blur-sm '}, }">
      <UCard :ui="{  divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" >
        <template #header>
         <div class="text-2xl font-extrabold">
          Sign In
         </div>
        </template>
    <div class="space-y-5">
          <UFormGroup label="Email" required>
    <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
  </UFormGroup>
          <UFormGroup label="Password" required>
      <UInput placeholder="*******" icon="i-heroicons-lock-closed" />
    </UFormGroup>
     <UFormGroup label="Confirm Password" required>
        <UInput placeholder="*******" icon="i-heroicons-lock-closed" />
      </UFormGroup>
      <UButton>Sign in</UButton>
    </div>
        <!-- <template #footer>
          <Placeholder class="h-8" />
        </template> -->
      </UCard>

      <div class="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-900 rotate-[12deg] border-4 border-emerald-300/20 -z-10"></div>
    </UModal>
  </div>
</template>