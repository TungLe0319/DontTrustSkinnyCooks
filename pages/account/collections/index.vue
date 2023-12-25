<script lang="ts" setup>
import type { Collection, RecipeWithUserAndCategories } from '~/types/types'

const toast = useToast()
const { data: Recipes } = useFetch<RecipeWithUserAndCategories[]>('/api/recipes/get')
const { session, status } = useAuth()

const { data: Collections, refresh } = await useFetch<Collection[]>('/api/account/collections/get')

const collections = ref(Collections.value)

const isOpen = ref(false)

const newCollection = ref({
  title: '',
})

async function createCollection() {
  try {
    await useFetch('/api/account/collections/post', {
      method: 'POST',
      body: newCollection.value,
    })

    refresh()
    toast.add({
      id: `Created_Collection`,
      title: `Created_Collection ${newCollection.value.title}`,

      icon: 'i-heroicons-check-circle',
      timeout: 2000,

    })
  }
  catch (error) {
    throw createError({
      statusMessage: 'Error creating collection',
    })
  }
}
</script>

<template>
  <div>
    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
      <Icon name="uil:bookmark" class="text-3xl" />
      <span class="tracking-wide"> My Saved Recipes</span>
    </div>

    <div>
      <UButton label="Create Collection" @click="isOpen = true" />

      <UModal v-model="isOpen">
        <div class="p-4 space-y-5">
          <h1 class="text-2xl font-bold">
            Create Collection
          </h1>
          <p class="text-gray-500">
            Create a collection to save your favorite recipes
          </p>
          <hr class="my-4">

          <UFormGroup label="Title">
            <UInput v-model="newCollection.title" placeholder="favorites" icon="i-heroicons-star" />
          </UFormGroup>

          <UButton @click="createCollection">
            Create Collection
          </UButton>
        </div>
      </UModal>
    </div>

    <div class="grid  grid-cols-3 gap-2  mt-5 ">
      <UCard v-for="collection in collections" :key="collection.id" class=" hover:shadow-lg transition-all duration-200">
        <NuxtLink :to="`/account/collections/${collection.id}`" class="space-y-3">
          <h4 class="font-extrabold text-lg">
            {{ collection?.title }}
          </h4>

          <p class="text-sm">
            created: {{ formateDate(collection?.createdAt!).value }}
          </p>

          <p class="text-sm text-gray-500">
            Recipes: {{ collection?._count.recipes }}
          </p>
        </NuxtLink>
      </UCard>
    </div>

    <!-- <div class="grid  grid-cols-3 gap-2  ">

            <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" class="" />
          </div> -->
    <!-- End of Experience and education grid -->
  </div>
</template>

<style>

</style>
