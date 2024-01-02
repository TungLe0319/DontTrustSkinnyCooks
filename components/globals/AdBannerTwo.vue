<template>
  <div class="ad-banner shadow-xl ">
  
    <div class="  flex items-center justify-between">
      <div class=" p-5 w-1/3">
        <h2 class="text-5xl font-extrabold">{{ title }}</h2>
        <p class="text-xl">{{ subtitle }}</p>
      </div>
      <div class="w-1/2">
      <img src="../../assets/images/undraw_ingredients.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps(['title', 'subtitle']);
</script>

<style scoped>
.ad-banner {
  position: relative;
  border-radius: 15px;
  overflow: hidden;

}

.blob {
  position: absolute;
background: orange
}


.text {
  flex: 1;

}

.svg-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
