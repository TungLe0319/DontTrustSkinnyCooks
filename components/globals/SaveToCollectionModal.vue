<template>
  <div>
    <div @click="isOpen = true" class="flex items-center justify-center">
      <slot/>
    </div>
       <UModal v-model="isOpen">
        <UCard>
          <template #header>
            <h1 class="text-2xl font-bold">
              Add to Collection
            </h1>
            <p class="text-gray-500">
              Save a recipe to your selected collection
            </p>
          </template>
          <div class="p-4">

 <div class="space-y-4 space-x-4">
  
                <UFormGroup label="Title">
                  <UInput v-model="newCollection.title" placeholder="favorites" icon="i-heroicons-star" />
                </UFormGroup>
                <UButton @click="createCollection">
                  Create Collection
                </UButton>
                <UButton @click="modifyCollections">
                   Modify Collections
                </UButton>
 </div>
    <hr class="my-4">
            <ul class="">
              <li
                v-for="collection in collections" :key="collection.id"
                class=" border-b border-b-gray-200 p-1.5 hover:cursor-pointer hover:bg-gray-100 transition-all duration-200 flex gap-3"
              >
                <span>
                  {{ collection.title }}
                </span>
                <UButton class="ml-auto" @click="saveRecipe(collection.id)">
                  Save
                </UButton>
                <UButton v-if="modifyingCollections" @click="deleteCollection(collection.id)">
                  Delete
                </UButton>
              </li>
            </ul>
          </div>
        </UCard>
      </UModal>
  </div>
</template>

<script lang="ts" setup>
import ProfileCard from '~/components/globals/ProfileCard.vue'
import type { Collection, RecipeWithUserAndCategories } from '~/types/types'
const modifyingCollections = ref(false)
const modifyCollections = () => {
modifyingCollections.value = !modifyingCollections.value
}

const { recipe } = defineProps<{
  recipe: RecipeWithUserAndCategories

}>()
const { data: Collections,refresh } = useFetch<Collection[]>('/api/account/collections')
const collections = ref(Collections.value)
const { user } = useAuth()

const toast = useToast()
const isOpen = ref(false)


async function saveRecipe(collectionId: number) {
  try {
    await useFetch(`/api/account/collections/${collectionId}`, {
      method: 'PUT',
      body: {
        recipeId: recipe.id,
      },
    })

    toast.add({
      title: 'Recipe Saved',
      timeout: 3000,
      description: 'You can view your saved recipes in your profile.',
      icon: 'i-heroicons-bookmark-20-solid',
    })
  }
  catch (error) {

  }
}
const newCollection = ref({
  title: '',
})
async function createCollection() {
  try {
    await useFetch('/api/account/collections', {
      method: 'POST',
      body: newCollection.value,
    })

    const createdCollectionTitle = newCollection.value.title
    toast.add({
      id: `Created_Collection`,
      title: `Collection Created: ${createdCollectionTitle}`,
      icon: 'i-heroicons-check-circle',
      timeout: 2000,
    })
    refresh()
    // isOpen.value = false
  }

  catch (error) {
    console.error('Error creating collection:', error)
    throw createError({
      statusMessage: 'Error creating collection',
    })
  }
}


 async function deleteCollection(collectionId: number) {
  try {
    await useFetch(`/api/account/collections/${collectionId}`, {
      method: 'DELETE',
    })

    toast.add({
      id: `Deleted_Collection`,
      title: `Collection Deleted`,
      icon: 'i-heroicons-check-circle',
      timeout: 2000,
    })
    refresh()
  }

  catch (error) {
    console.error('Error deleting collection:', error)
    throw createError({
      statusMessage: 'Error deleting collection',
    })
  }
}
</script>

<style>

</style>