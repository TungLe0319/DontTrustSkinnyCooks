<script lang="ts" setup>
import type { Prisma } from '@prisma/client';
import RecipeCard from '~/components/globals/RecipeCard.vue';

const id = useRoute().params.id

const {data:User} = await useFetch<Prisma.UserGetPayload<{
  include:{
    reviews:{
      include:{
        recipe:true
      }
    }
  }
}>>(`/api/users/${id}`, {method: 'GET'})
const user = ref(User.value)
</script>

<template>
 <main class="min-h-screen">


  <div class="flex justify-center items-center py-4">
     <div class=" p-3 border-t-4 rounded border-green-400 shadow-xl w-2/3">
       
            <div class="flex flex-col items-center justify-center gap-4">
              <UAvatar :src="user?.image || ''" size="xl" class="shadow-md" />
            </div>
            <ul
              class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
            >
              <li class="flex items-center py-3">
                <span>Display Name</span>
                <span class="ml-auto">{{ user?.name }} </span>
              </li>
              <li class="flex items-center py-3">
                <span>Email</span>
                <span class="ml-auto">{{ user?.email }} </span>
              </li>
              <li class="flex items-center py-3">
                <span>Status</span>
             
              </li>
              <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">Nov 07, 2016</span>
              </li>
            </ul>
          </div>
  </div>

  <div class=" text-center my-4">
    <h2 class="text-5xl font-extrabold">Reviews</h2>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="review in user?.reviews">
     


       <RecipeCard :recipe="review.recipe"/>
     

       <div class=" flex flex-col  ">

      <span>
       Rated: {{review.rating}}
      </span>
      <span>
       Reviewed on: {{ formateDate(review.createdAt).value}}
      </span>
       </div>
    
   
      </div>
    </div>
  </div>
 </main>
</template>

<style>

</style>
