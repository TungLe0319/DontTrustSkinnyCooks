<template>
 <div class="">
 <div class="flex gap-3">
   <Icon name="arcticons:recipe-keeper" class="text-4xl text-orange-400" />
            <h2 class="text-3xl font-extrabold text-orange-400">Ingredients</h2>
 </div>
          <ul class=" p-5 list-disc ">
            <li class="my-3" v-for="ingredient in JSON.parse(ingredients)">
              {{ ingredient }}
            </li>
          </ul>
        </div>
</template>

<script lang="ts" setup>
defineProps(['ingredients'])
</script>

<style>

</style>