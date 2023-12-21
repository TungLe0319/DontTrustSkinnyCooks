<template>
   <div class="">
        
           <div class="flex gap-3">
     <Icon name="material-symbols:directions-alt-rounded" class="text-4xl text-orange-400" />
              <h2 class="text-3xl font-extrabold text-orange-400">Directions</h2>
   </div>
          <ul class="">
            <li class="flex flex-col my-3" v-for="(direction, index) in JSON.parse(directions)">
              <span class="font-extrabold">Step {{ index + 1 }} </span>
              <span>
                {{ direction }}
              </span>
            </li>
          </ul>
          <span>
          </span>
        </div>
</template>

<script lang="ts" setup>
defineProps(['directions'])
</script>

<style>

</style>