<script lang="ts" setup>
const users = [
  {
    email: 'user1@example.com',
    name: 'John Doe',
    bio: 'Passionate about technology and coding. Enthusiastic learner always seeking new challenges.',
    uuid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    picture: 'https://i.pravatar.cc/150?img=3',
  },
  {
    email: 'user2@example.com',
    name: 'Jane Smith',
    bio: 'Creative thinker with a love for design and user experience. Turning ideas into beautiful interfaces.',
    uuid: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6',
    picture: 'https://i.pravatar.cc/150?img=5',
  },
  {
    email: 'user3@example.com',
    name: 'Alex Johnson',
    bio: 'Sports enthusiast and fitness geek. Believes in a healthy body and mind for a productive life.',
    uuid: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7',

    picture: 'https://i.pravatar.cc/150?img=12',
  },
]
</script>

<template>
  <main class="min-h-screen">
    <div class="flex items-center justify-center p-24 gap-10">
      <NuxtLink v-for="u in users" :key="u.email" :to="`profile/${u.uuid}`" class="p-5 shadow-xl rounded-md hover:shadow-2xl hover:bg-zinc-800 transition-all duration-300  hover:text-white">
        <div class="flex items-center justify-center">
          <div class="flex-shrink-0">
            <img class="h-12 w-12 rounded-full" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="">
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium ">
              {{ u.name }}
            </div>
            <div class="text-sm ">
              {{ u.email }}
            </div>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm ">
            {{ u.bio }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<style>

</style>
