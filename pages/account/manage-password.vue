<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <UContainer>
    <div class="bg-white shadow-xl rounded p-5 flex flex-col space-y-4">
      <span class="text-5xl font-extrabold"> Change Password</span>
      <span>
        If you want to change your password, click the button below, and we will send password reset
        instructions to your email address.
      </span>
      <span class="text-xs flex items-center gap-2 italic text-gray-500">
        <Icon name="teenyicons:password-solid" class="text-xl" />
        <span> Your password will always remain private.</span>
      </span>
      <hr>
      <div class="flex items-center justify-center">
        <UButton>Reset Password</UButton>
      </div>
    </div>
  </UContainer>
</template>

<style></style>
