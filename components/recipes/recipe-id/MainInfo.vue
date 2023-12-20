<template>
   <div class=" space-y-4">
          <div class="flex   items-start gap-4">
            <h1 class="text-5xl font-extrabold mb-5">
              {{ title }}
            </h1>
            <div v-if="session?.user?.name === user.name" class="flex gap-3 items-center justify-center mt-1">
              <UButton @click="editRecipe" size="xl"
                class="bg-orange-400  transition-all duration-150 hover:brightness-75 hover:bg-orange-400 hover:scale-95">
                Edit</UButton>
              <UButton @click="deleteRecipe" size="xl"
                class="bg-red-400 transition-all duration-150 hover:brightness-75 hover:bg-red-400 hover:scale-95">Delete
              </UButton>
            </div>
          </div>
          <div class="flex gap-0.5 ">
            <Icon v-for="(rating, index) in 5" :key="rating" name="game-icons:fat" class="text-xl" />
          </div>
          <p class=" my-5">
            {{ description }}
          </p>
          <div class="flex gap-4">
            <p>
              by
            </p>
            <NuxtLink :to="`/profiles/${user?.id}`"
              class=" font-extrabold border-b  border-spacing-3 border-orange-400">
              {{user?.name }}
            </NuxtLink>
            <span> |</span>
            <p class="text-gray-500">Created 12/24/2023 </p>
          </div>
          <div
            class="flex   bg-gradient-to-r from-orange-500 via-rose-300 to-indigo-600 dark:bg-gradient-to-r dark:from-orange-500 dark:via-rose-300 dark:to-indigo-600  w-fit shadow-xl ">
            <UButton :ui="{ rounded: 'rounded-none' }" size="xl" icon="i-heroicons-heart" :trailing="true"
              class="bg-transparent hover:bg-black/20 transition-all duration-150">Save</UButton>
            <UButton :ui="{ rounded: 'rounded-none' }" size="xl" icon="i-heroicons-star" :trailing="true"
              class="bg-transparent hover:bg-black/20 transition-all duration-150">Rate</UButton>
            <UButton :ui="{ rounded: 'rounded-none' }" size="xl" icon="i-heroicons-share" :trailing="true"
              class="bg-transparent hover:bg-black/20 transition-all duration-150">Share</UButton>
          </div>
        </div>
</template>

<script lang="ts" setup>
const {session} = useAuth()
const {id,title,user,description} = defineProps(['title','user','description','id'])
const route = useRoute()
const router = useRouter()
const toast = useToast()

const editRecipe = () => {
  router.push(`/recipes/${id}/edit`)
}
const confirmYes = ref(false)
const deleteRecipe = async () => {
  toast.add({
    id: `delete_recipe ${id}`,
    title: 'Delete Recipe?',
    description: 'Are you sure you want to delete this recipe?',
    icon: 'i-heroicons-question-mark-circle',
    timeout: 80000,
    color: 'amber',


    actions: [{
      label: 'Confirm',
      click: async () => {
        confirmYes.value = true

        if (confirmYes.value === true) {
          const res = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
          })
          if (res.ok) {
            router.push('/recipes')

            toast.add({
              id: `delete_recipe_success ${id}`,
              title: `Success`,
              description: `Successfully Deleted ${title}`,
              icon: 'i-heroicons-exclamation-circle',
              timeout: 2000,
              color: 'green',


            })
          }

        }

      }
    }],

  })



  const userRating = ref(0);

  const hoverRating = (rating: number) => {
    userRating.value = rating;
  };

  const clickRating = (rating: number) => {
    // Handle the rating click event, e.g., send it to the server
    console.log(`Clicked rating: ${rating}`);
  };







}

</script>

<style>

</style>