<script lang="ts" setup>
import { ref } from 'vue';
import SectionHeader from '../globals/SectionHeader.vue';
import RecipeCard from '~/components/globals/RecipeCard.vue';
import type { Category, Prisma } from '@prisma/client';

const {data:Reviews} = await useFetch<Prisma.ReviewGetPayload<{
  include: {
    recipe: true,
    user: true
  }
}>[]>('/api/reviews')
const reviews = ref(Reviews.value)
</script>


<template>
  <div class="">
    <SectionHeader title="What people had to say about recipes" />
  
    <Swiper :modules="[SwiperAutoplay]" :slides-per-view="1" :loop="true" 
    :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }" class="w-full h-[500px] ">
      <SwiperSlide v-auto-animate v-for="review in  reviews" :key="review.id" >
       <div class="space-y-3 flex items-center justify-center bg-blue-100 h-full">


        <div class="space-y-6 flex flex-col items-center justify-center">
       <div class="flex gap-1">
           <Icon name="gravity-ui:quote-close" class="text-3xl" />
        
          <div class="text-4xl font-bold">
              {{ review.comment }}
          </div>
            <Icon name="gravity-ui:quote-close" class="text-3xl" />
       </div>
          <UAvatar  size="xl" v-if="review.user.image" :src="review.user.image" />
       <UAvatar size="xl" v-else icon="i-heroicons-photo"  />
        </div>
    
       </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style></style>
