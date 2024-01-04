<template>
  <div class="border rounded shadow-sm ">
  
    <div class="  flex justify-between gap-5">
      <div class=" w-1/2 p-5   h-full space-y-10">
        <h2 class="text-5xl font-extrabold underline underline-offset-4">
          Elevate Your Cooking Experience!
        </h2>
        <p class="text-xl">
          What happens next: Join us, contribute your recipes, and savor the joy of sharing culinary delights.
        </p>
      </div>
      <div class="w-1/2">
      <img src="../../assets/images/undraw_ingredients.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';


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
