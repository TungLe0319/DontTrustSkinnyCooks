<script lang="ts" setup>
const emit = defineEmits(['refreshCollections'])
const toast = useToast()
const isOpen = ref(false)
const { refresh } = await useCollections()

const newCollection = ref({
  title: '',
})

async function createCollection() {
  try {
    await useFetch('/api/account/collections', {
      method: 'POST',
      body: newCollection.value,
    })

    refresh()
    const createdCollectionTitle = newCollection.value.title
    toast.add({
      id: `Created_Collection`,
      title: `Successfully Created Collection ${createdCollectionTitle}!`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 2000,
    })
  }
  catch (error) {
    console.error('Error creating collection:', error)
    throw createError({
      statusMessage: 'Error creating collection',
    })
  }
}
</script>

<template>
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
</template>

<style>

</style>
