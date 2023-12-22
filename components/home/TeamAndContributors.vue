<template>
  <div
    class="space-y-5 relative p-4 w-full shadow-lg  rounded h-[90vh] bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-500 ">
    <div class="m-4 p-10 rounded absolute inset-0  bg-white ">
     <div class="relative overflow-hidden space-y-5">
       <h2 class="text-5xl font-extrabold underline underline-offset-4">
          Our Team
        </h2>
        <p>We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best
          results for our clients.</p>
        <div class="space-y-3">
          <h3 class="text-xl font-bold">Development</h3>
          <div class="flex flex-wrap gap-10">
          <TeamUserCard v-for="user in teamUsers" :user="user"/>
          </div>
        </div>
        
        <div class="space-y-3">
          <h3 class="text-xl font-bold">Top Contributors</h3>
          <div class="flex flex-wrap gap-10">
         <div  v-for="contributor in contributors" :key="contributor.user.id" class="flex flex-col items-center justify-center text-center space-y-1">

      
        <img v-if="contributor?.user.image" :src="contributor?.user?.image" alt="" class="rounded-full w-20 h-20 shadow-lg border-4 border-orange-400/50">
        <UAvatar v-else icon="i-heroicons-photo" size="3xl" />
       <span class="font-extrabold text-lg ">{{ contributor.user.name }} </span>
<div class="  flex gap-3">
<span class="text-3xl font-extrabold underline underline-offset-4"> {{ contributor._count.userId }} </span>
<span class="text-sm">Recipes</span>


</div>
         </div>
          </div>
        </div>
        
     </div>
  </div>
</div></template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client';
import TeamUserCard from '../globals/TeamUserCard.vue';
const {data:contributors} = await useFetch<Contributor[]>('/api/users/topcontributors')


interface Contributor{
  userId:String,
  _count: {
userId:Number
  }
user: Prisma.UserGetPayload<{

}>
}

interface TeamUser{
  name:String,
  title:String,
  image:String,
  linkedIn:String,
  facebook:String,
  instagram:String
}



const teamUsers = <TeamUser[]>[
  {
    name:'Tung Le',
    title:'Full Stack Developer',
    image:'https://avatars.githubusercontent.com/u/107594367?v=4',
    linkedIn:'',
    facebook:'',
    instagram:''
  },
  {
    name:'Daniel Le',
    title:'Full Stack Developer',
    image:'https://avatars.githubusercontent.com/u/107774403?v=4',
    linkedIn:'',
    facebook:'',
    instagram:''
  },
]

</script>