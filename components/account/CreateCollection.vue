<template>
  <div>
      <UButton label="Open" @click="isOpen = true" />

      <UModal v-model="isOpen">
        <div class="p-4 space-y-5">
          <h1 class="text-2xl font-bold">Create Collection</h1>
          <p class="text-gray-500">Create a collection to save your favorite recipes</p>
          <hr class="my-4" />
         
       <UFormGroup label="Title">
    <UInput placeholder="favorites" icon="i-heroicons-star" v-model="newCollection.title" />
  </UFormGroup>

  <UButton @click="createCollection">
    Create Collection
  </UButton>
        </div>
      </UModal>
    </div>
</template>

<script lang="ts" setup>
import {Prisma} from '@prisma/client'

const toast = useToast()
const isOpen = ref(false)

const newCollection = ref<Prisma.CollectionCreateInput>({
  title:''
})

const createCollection = async () => {
  try {



    const response = await useFetch('/api/account/collections/post', {
      method: 'POST',
      body: newCollection.value
    })

    toast.add({
      id: `Created_Collection`,
      title: `Created_Collection ${newCollection.value.title}`,

      icon: 'i-heroicons-check-circle',
      timeout: 2000,

    })
  } catch (error) {
    throw createError({
      statusMessage: "Error creating collection",
    })
  }
}
</script>

<style>

</style>