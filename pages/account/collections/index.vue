<script setup lang="ts">
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue'
import type { Collection } from '~/types/types'

const toast = useToast()

const { data: collectionsData, refresh, pending: collectionsPending, error: collectionsError } = await useFetch<Collection[]>('/api/account/collections')
const collections = computed(() => collectionsData.value)
const confirmYes = ref(false)
const { session } = useAuth()
const isOpen = ref(false)
const newCollection = ref({
  title: '',
})

async function createCollection() {
  try {


    
    if (newCollection.value.title === '') {
   toast.add({
        id: `create_collection_error`,
        title: 'Error',
        description: 'You must enter a title for your collection',
        icon: 'i-heroicons-exclamation-circle',
        timeout: 2000,
        color: 'red',
      })
      return
    }
  const res =  await useFetch('/api/account/collections', {
      method: 'POST',
      body: newCollection.value,
    })

    if (res.data) {
          const createdCollectionTitle = newCollection.value.title
      toast.add({
        id: `Created_Collection`,
        title: `Collection Created: ${createdCollectionTitle}`,
        icon: 'i-heroicons-check-circle',
        timeout: 2000,
      })
      refresh()
      isOpen.value = false
      newCollection.value.title = ''
    }


  }

  catch (error) {
    console.error('Error creating collection:', error)
    throw createError({
      statusMessage: 'Error creating collection',
    })
  }
}

async function deleteCollection(collection: Collection) {
  try {


    toast.add({
      id: `delete_Collection ${collection?.id}`,
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
            if (session.value?.user?.id !== collection.userId) {
              toast.add({
                id: `delete_collection_error ${collection?.id}`,
                title: 'Error',
                description: 'You are not authorized to delete this recipe',
                icon: 'i-heroicons-exclamation-circle',
                timeout: 2000,
                color: 'red',
              })
            }

            const res = await useFetch(`/api/account/collections/${collection.id}`, {
              method: 'DELETE',
            })

            if (res) {
              refresh()

              toast.add({
                id: `delete_collection_success ${collection.id}`,
                title: `Success`,
                description: `Successfully Deleted ${collection.title} from collections`,
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
  <main class="py-5 min-h-screen">
    <div v-if="!collectionsPending">
      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
        <Icon name="uil:bookmark" class="text-3xl" />
        <span class="tracking-wide">My Saved Recipes</span>
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
            <UFormGroup label="Title" required>
              <UInput v-model="newCollection.title" placeholder="favorites" icon="i-heroicons-star" />
            </UFormGroup>
            <UButton @click="createCollection">
              Create Collection
            </UButton>
          </div>
        </UModal>
      </div>
      <div v-auto-animate class="grid grid-cols-4 gap-2 mt-5">
        <UCard v-for="collection in collections" :key="collection.id" class="hover:shadow-lg transition-all duration-200 relative">
          <NuxtLink
            :to="`/account/collections/${collection.id}`"
            class="space-y-3 relative"
          >
            <h4 class="font-extrabold text-lg">
              {{ collection?.title }}
            </h4>
            <p class="text-sm">
              Created: {{ formateDate(collection?.createdAt!).value }}
            </p>
            <p class="text-sm text-gray-500">
              Recipes: {{ collection?._count.recipes }}
            </p>
          </NuxtLink>
          <div class=" absolute top-6 right-6  ">
            <UIcon name="i-heroicons-trash-20-solid" class="text-xl hover:cursor-pointer hover:text-primary hover:shadow transition-all duration-200 " @click="deleteCollection(collection)" />
          </div>
        </UCard>
      </div>
    </div>
    <div v-else-if="collectionsError">
      <p class="text-5xl font-bold text-center">
        Error loading collections
      </p>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </main>
</template>

<style></style>
