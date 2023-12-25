<script lang="ts" setup>
defineProps(['directions'])
</script>

<template>
  <div class="">
    <div class="flex gap-3">
      <Icon name="material-symbols:directions-alt-rounded" class="text-4xl text-orange-400" />
      <h2 class="text-3xl font-extrabold text-orange-400">
        Directions
      </h2>
    </div>
    <ul class="">
      <li v-for="(direction, index) in JSON.parse(directions)" class="flex flex-col my-5">
        <span class="font-extrabold text-xl">Step {{ index + 1 }} </span>
        <span class="text-lg">
          {{ direction }}
        </span>
      </li>
    </ul>
    <span />
  </div>
</template>

<style></style>
