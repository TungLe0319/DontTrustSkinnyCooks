<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

const toast = useToast()
const isOpen = ref(false)

const newCollection = ref<Prisma.CollectionCreateInput>({
  title: '',
})

async function createCollection() {
  try {
    const response = await useFetch('/api/account/collections', {
      method: 'POST',
      body: newCollection.value,
    })

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
    <UButton label="Open" @click="isOpen = true" />

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
</template>

<style>

</style>
