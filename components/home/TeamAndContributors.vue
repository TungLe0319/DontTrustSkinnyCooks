<template>
  <div
    class="space-y-5 relative p-4 w-full shadow-lg  rounded h-[70vh] bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-500 ">
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
        
     </div>
  </div>
</div></template>

<script lang="ts" setup>
import TeamUserCard from '../globals/TeamUserCard.vue';

const teamUsers = [
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