<template>
  <div class="flex flex-col p-2 px-5  dark:border-2 dark:border-gray-300/30 space-y-4 dark:bg-gray-800 border-b-2 border-orange-400/60">
     <div class="flex items-center gap-3">
      <UAvatar size="xl" class="shadow-md" />
      <span class=" border-b border-spacing-3 border-orange-400">username  </span>
     </div>
    
   <div class="flex items-center gap-2">
      <div class="flex items-center gap-1">
        <Icon v-for="i in 5" name="game-icons:fat" class="text-orange-400 hover:text-orange-300 duration-150 transition-colors" />
       </div>
       <span class="text-xs">12/18/23 </span>
   </div>


   
    <div class="p-3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad qui consectetur eos soluta? Illum neque officiis iusto earum sunt aliquid? Atque, error ipsum. Blanditiis, in!
    </div>
   
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>