<template>
  <div class="">
               <div class="flex gap-3">
       <Icon name="material-symbols:speaker-notes-rounded" class="text-4xl text-orange-400" />
                <h2 class="text-3xl font-extrabold text-orange-400">Extra Notes</h2>
     </div>
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