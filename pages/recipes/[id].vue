<template>
  <main v-if="recipe" class="flex   justify-center gap-3">
    <div class="w-1/2  p-5 space-y-5">
      <div class=" space-y-4">
        <div class="flex   items-start gap-4">
          <h1 class="text-5xl font-extrabold mb-5">
            {{ recipe?.title }}
          </h1>
          <div v-if="session?.user?.name === recipe.user.name" class="flex gap-3 items-center justify-center mt-1">
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
          {{ recipe?.description }}
        </p>
        <div class="flex gap-4">
          <p>
            by
          </p>
          <NuxtLink :to="`/profiles/${recipe.user?.id}`"
            class=" font-extrabold border-b  border-spacing-3 border-orange-400">
            {{ recipe.user?.name }}
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
      <hr>
      <div class="">
        <img :src="recipe.image || ''" :alt="recipe.title" class="object-cover w-full   h-full shadow-xl">
      </div>
      <hr>
      <div class="shadow-xl p-2 rounded bg-slate-200 dark:bg-gray-800 grid grid-cols-2 gap-5 w-1/2">
        <div class="flex gap-3">
          <div class="">
            <p class="font-extrabold">Prep Time:</p>
            <p> {{ recipe.prepTime }} </p>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="">
            <p class="font-extrabold">Cook Time:</p>
            <p> {{ recipe.cookTime }} </p>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="">
            <p class="font-extrabold">Serving Size:</p>
            <p> {{ recipe.servingSize }} </p>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="">
            <p class="font-extrabold">Yield Size:</p>
            <p> {{ recipe.yieldAmount }} </p>
          </div>
        </div>
      </div>
      <hr>
      <div class="">
        <h2 class="text-3xl font-extrabold">Ingredients</h2>
        <ul class="">
          <li class="my-3" v-for="ingredient in JSON.parse(recipe.ingredients)">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <hr class="">
      <div class="">
        <h2 class="text-3xl font-extrabold">Directions</h2>
        <ul class="">
          <li class="flex flex-col my-3" v-for="(direction, index) in JSON.parse(recipe.directions)">
            <span class="font-extrabold">Step {{ index + 1 }} </span>
            <span>
              {{ direction }}
            </span>
          </li>
        </ul>
        <span>
        </span>
      </div>
      <hr>
      <div class="">
        <h2 class="text-3xl font-extrabold">Extra Notes</h2>
        <ul class="">
          <li class="flex flex-col my-3" v-for="(note, index) in JSON.parse(recipe.notes)">
            <span class="font-extrabold">Note {{ index + 1 }} </span>
            <span>
              {{ note }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-1/3 ">
      <div class="p-2 bg-gray-100 dark:bg-gray-800 shadow-xl sticky top-5 rounded ">
        <span class="text-3xl font-extrabold">Advertisement Two</span>
        <img
          src="https://images.unsplash.com/photo-1557858310-9052820906f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="advertisement building" class=" rounded object-cover">
      </div>
    </div>

    
  </main>
</template>

<script lang="ts" setup>
const { session } = useAuth()
const route = useRoute()
const router = useRouter()
const { data } = await useFetch<RecipeWithUser>(`/api/recipes/${route.params.id}`)
const recipe = data.value
const toast = useToast()
const editRecipe = () => {
  router.push(`/recipes/${recipe?.id}/edit`)
}
const confirmYes = ref(false)
const deleteRecipe = async () => {
  toast.add({
    id: `delete_recipe ${recipe?.id}`,
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
          const res = await fetch(`/api/recipes/${recipe?.id}`, {
            method: 'DELETE',
          })
          if (res.ok) {
            router.push('/recipes')

            toast.add({
              id: `delete_recipe_success ${recipe?.id}`,
              title: `Success`,
              description: `Successfully Deleted ${recipe?.title}`,
              icon: 'i-heroicons-exclamation-circle',
              timeout: 2000,
              color: 'green',


            })
          }

        }

      }
    }],

  })


}



</script>

<style></style>