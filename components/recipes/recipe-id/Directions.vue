<template>
   <div class="">
          <h2 class="text-3xl font-extrabold text-orange-400">Directions</h2>
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