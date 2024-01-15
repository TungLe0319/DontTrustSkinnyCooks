<script lang="ts" setup>
import { ref } from 'vue'
import type { Prisma } from '@prisma/client'
import SectionHeader from '../globals/SectionHeader.vue'

const { data: Reviews } = await useFetch<Prisma.ReviewGetPayload<{
  include: {
    recipe: true
    user: true
  }
}>[]>('/api/reviews')
const reviews = ref(Reviews.value)
</script>

<template>
  <div class="bg-gray-100">
    <SectionHeader title="What people had to say about recipes " />

    <Swiper
      :modules="[SwiperAutoplay]" :slides-per-view="1" :loop="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }" class="w-full h-[500px]  "
    >
      <SwiperSlide v-for="review in reviews" :key="review.id" v-auto-animate class="">
        <div class="space-y-3 flex items-center justify-center h-full">
          <div class="space-y-6 flex flex-col items-center justify-center">
            <NuxtLink :to="`recipes/${review.recipe.id}`" class="flex flex-col items-center justify-center group space-y-6">
              <img :src="review.recipe.image || ''" alt="" class="w-52 h-52 shadow-lg rounded-full object-cover object-center group-hover:brightness-75 transition-all duration-200">

              <div class=" text-xl group-hover:underline group-hover:underline-offset-4 font-extrabold">
                {{ review.recipe.title }}
              </div>
            </NuxtLink>
            <div class="flex gap-1">
              <Icon name="gravity-ui:quote-close" class="text-3xl" />

              <div class="text-2xl font-bold">
                {{ review.comment }}
              </div>
            <!-- <Icon name="gravity-ui:quote-close" class="text-3xl" /> -->
            </div>
            <UAvatar v-if="review.user.image" size="xl" :src="review.user.image" class="shadow-lg" />
            <UAvatar v-else size="xl" icon="i-heroicons-photo" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style></style>
