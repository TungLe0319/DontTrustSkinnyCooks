<template>
   <div class="shadow-xl p-2 rounded bg-slate-200 dark:bg-gray-800 grid grid-cols-2 gap-5 w-1/2">
          <div class="flex gap-3">
            <div class="">
              <p class="font-extrabold">Prep Time:</p>
              <p> {{ prepTime }} </p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="">
              <p class="font-extrabold">Cook Time:</p>
              <p> {{ cookTime }} </p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="">
              <p class="font-extrabold">Serving Size:</p>
              <p> {{ servingSize }} </p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="">
              <p class="font-extrabold">Yield Size:</p>
              <p> {{ yieldAmount }} </p>
            </div>
          </div>
        </div>
</template>

<script lang="ts" setup>
 defineProps(['prepTime','cookTime','servingSize','yieldAmount'])
</script>

<style>

</style>