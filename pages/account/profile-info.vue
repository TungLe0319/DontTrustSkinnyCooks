<script lang="ts" setup>
const { session, status } = useAuth()
</script>

<template>
  <div>
    <UContainer>
      <div class="bg-white p-3 border-t-4 rounded border-green-400 shadow-xl">
        <div class="image overflow-hidden">
          <img
            class="h-auto w-full mx-auto"
            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
            alt=""
          >
        </div>
        <div class="flex flex-col items-center justify-center gap-4">
          <img :src="session?.user?.image || ''" alt="profile picture" class="rounded-full shadow-xl">
        </div>
        <ul
          class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
        >
          <li class="flex items-center py-3">
            <span>Display Name</span>
            <span class="ml-auto">{{ session.user?.name }} </span>
          </li>
          <li class="flex items-center py-3">
            <span>Email</span>
            <span class="ml-auto">{{ session.user?.email }} </span>
          </li>
          <li class="flex items-center py-3">
            <span>Status</span>
            <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
              {{ status }}
            </span></span>
          </li>
          <li class="flex items-center py-3">
            <span>Member since</span>
            <span class="ml-auto">Nov 07, 2016</span>
          </li>
        </ul>
      </div>
    </UContainer>
  </div>
</template>

<style>

</style>
