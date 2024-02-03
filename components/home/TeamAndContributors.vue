<template>
  <div class="  rounded inset-0  bg-gray-100 ">
    <SectionHeader title="Our Team"/>
    <div class="relative overflow-hidden space-y-5 p-10 m">
     
      <p>We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best
        results for our clients.</p>
   <div class="flex justify-between">
       <div class="space-y-3">
          <h3 class="text-xl font-bold">Development</h3>
          <div class="flex flex-wrap gap-4">
        

                 <div v-for="user in teamUsers" :key="user.name"
                class="flex flex-col items-center justify-center text-center space-y-2.5">


      <img v-if="user.image" :src="user.image" alt=""
                      class="rounded-full w-20 h-20 shadow-lg border-4 border-orange-400/50">
                    <UAvatar v-else icon="i-heroicons-photo" size="3xl" />
          


        
              
              </div>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-xl font-bold">Top Contributors</h3>
          <div class="flex flex-wrap gap-4">
            <div v-for="contributor in contributors" :key="contributor?.user.id"
              class="flex flex-col items-center justify-center text-center space-y-2.5">
              <img v-if="contributor?.user.image" :src="contributor?.user?.image" alt=""
                class="rounded-full w-20 h-20 shadow-lg border-4 border-orange-400/50">
              <UAvatar v-else icon="i-heroicons-photo" size="3xl" />
          
              <!-- <div class="  flex gap-3 ">
                <span class="text-2xl font-extrabold underline underline-offset-4"> {{ contributor._count.userId }} </span>
                <span class="text-sm">Recipes</span>
              </div> -->
            </div>
          </div>
        </div>

          <div class="space-y-3">
            <h3 class="text-xl font-bold">Leadership</h3>
            <div class="flex flex-wrap gap-4">
              <div v-for="contributor in contributors" :key="contributor?.user.id"
                class="flex flex-col items-center justify-center text-center space-y-2.5">
                <img v-if="contributor?.user.image" :src="contributor?.user?.image" alt=""
                  class="rounded-full w-20 h-20 shadow-lg border-4 border-orange-400/50">
                <UAvatar v-else icon="i-heroicons-photo" size="3xl" />
          
            
              </div>
            </div>
          </div>
   </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client';
import TeamUserCard from '../globals/TeamUserCard.vue';
import SectionHeader from '../globals/SectionHeader.vue';
const { data: Contributors } = await useFetch<Contributor[]>('/api/users/topcontributors')

const contributors = Contributors.value

interface Contributor {
  userId: String,
  _count: {
    userId: Number
  }
  user: Prisma.UserGetPayload<{

  }>
}

interface TeamUser {
  name: string,
  title: string,
  image: string,
  linkedIn: string,
  facebook: string,
  instagram: string
}



const teamUsers = <TeamUser[]>[
  {
    name: 'Tung Le',
    title: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/107594367?v=4',
    linkedIn: '',
    facebook: '',
    instagram: ''
  },
  {
    name: 'Daniel Le',
    title: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/107774403?v=4',
    linkedIn: '',
    facebook: '',
    instagram: ''
  },
]

</script>