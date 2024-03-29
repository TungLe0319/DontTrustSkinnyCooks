<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import type { RecipeWithUserAndCategories } from '~/types/types'

const { recipe } = defineProps<{
  recipe: RecipeWithUserAndCategories

}>()
const modifyingCollections = ref(false)
function modifyCollections() {
  modifyingCollections.value = !modifyingCollections.value
}

const { data: Collections, refresh } = useFetch<Prisma.CollectionGetPayload<{
  include: {
    _count: {
      select: {
        recipes: true
      }

    }
    recipes: true
  }

}>[]>('/api/account/collections')
const collections = computed(() => Collections.value)
const { user } = useAuth()

const toast = useToast()
const isOpen = ref(false)
const confirmYes = ref(false)

const recipeExistsInCollections = computed(() => {
  // Check if the recipe exists in any of the collections
  return collections?.value?.some(collection => collection.recipes.some(rec => rec.id === recipe.id))
})

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
      color: 'green',
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
      color: 'green',
    })
    refresh()
    // isOpen.value = false
    newCollection.value.title = ''
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
    toast.add({
      id: `delete_collection ${collectionId}`,
      title: 'Delete Collection?',
      description: 'Are you sure you want to delete this collection?',
      icon: 'i-heroicons-question-mark-circle',
      timeout: 80000,
      color: 'amber',
      actions: [{
        label: 'Confirm',
        click: async () => {
          confirmYes.value = true
          if (confirmYes.value === true) {
            const res = await useFetch(`/api/account/collections/${collectionId}`, {
              method: 'DELETE',

            })
            if (res) {
              refresh()

              toast.add({
                id: `delete_collection_success ${collectionId}`,
                title: `Success`,
                description: `Successfully Deleted ${collectionId}`,
                icon: 'i-heroicons-exclamation-circle',
                timeout: 2000,
                color: 'green',

              })
            }
          }
        },
      }],
    })
  }

  catch (error) {
    console.error('Error deleting collection:', error)
    throw createError({
      statusMessage: 'Error deleting collection',
    })
  }
}
</script>

<template>
  <div>
    <div class="" @click="isOpen = true">
      <slot />
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
          <div class="space-y-4  ">
            <UFormGroup label="Title">
              <UInput v-model="newCollection.title" placeholder="favorites" icon="i-heroicons-star" />
            </UFormGroup>
            <div class="flex gap-4">
              <UButton @click="createCollection">
                Create Collection
              </UButton>
              <UButton @click="modifyCollections">
                Modify Collections
              </UButton>
              <NuxtLink to="/account/collections" @click="isOpen = false">
                <UButton>
                  View Collections
                </UButton>
              </NuxtLink>
            </div>
          </div>
          <hr class="my-4">
          <ul class="">
            <li
              v-for="collection in collections" :key="collection.id" v-auto-animate
              class=" border-b border-b-gray-200 p-1.5 hover:cursor-pointer hover:bg-gray-100 transition-all duration-200 flex gap-3"
            >
              <span>
                {{ collection.title }}
              </span>
              <UButton v-if="!recipeExistsInCollections" class="ml-auto" @click="saveRecipe(collection.id)">
                Save
              </UButton>
              <UButton v-if="modifyingCollections" variant="outline" @click="deleteCollection(collection.id)">
                Delete
              </UButton>
            </li>
          </ul>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<style>

</style>
