<template>
   <div class="p-10 rounded  dark:bg-gray-800 grid grid-cols-2 gap-x-24 gap-y-14  w-fit ">
          <div class="flex gap-3">
            <Icon name="material-symbols:nest-clock-farsight-analog-rounded" class="text-3xl text-orange-400"/>
          
            <div class="">
              <p class="text-2xl font-extrabold text-orange-400">Prep Time:</p>
              <p class="text-xl"> {{ prepTime }} </p>
            </div>
          </div>
          <div class="flex gap-3">
              <Icon name="ph:cooking-pot-fill" class="text-3xl text-orange-400"/>
            <div class="">
              <p class="text-2xl font-extrabold text-orange-400">Cook Time:</p>
              <p class="text-xl"> {{ cookTime }} </p>
            </div>
          </div>
          <div class="flex gap-3">
              <Icon name="streamline:serving-dome-solid" class="text-3xl text-orange-400"/>
            <div class="">
              <p class="text-2xl font-extrabold text-orange-400">Serving Size:</p>
              <p class="text-xl"> {{ servingSize }} </p>
            </div>
          </div>
          <div class="flex gap-3">
              <Icon name="mdi:sign-yield" class="text-3xl text-orange-400"/>
            <div class="">
              <p class="text-2xl font-extrabold text-orange-400">Yield Size:</p>
              <p class="text-xl"> {{ yieldAmount }} </p>
            </div>
          </div>
        </div>
</template>

<script lang="ts" setup>
 defineProps(['prepTime','cookTime','servingSize','yieldAmount'])
</script>

<style>

</style>