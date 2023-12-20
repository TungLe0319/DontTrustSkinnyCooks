<template>
  <div class="">
          <h2 class="text-3xl font-extrabold text-orange-400">Extra Notes</h2>
          <ul class="">
            <li class="flex flex-col my-3" v-for="(note, index) in JSON.parse(notes)">
              <span class="font-extrabold">Note {{ index + 1 }} </span>
              <span>
                {{ note }}
              </span>
            </li>
          </ul>
        </div>
</template>

<script lang="ts" setup>
defineProps(['notes'])
</script>

<style>

</style>