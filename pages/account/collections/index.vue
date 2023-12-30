<script setup lang="ts">
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue';
import type { Collection } from '~/types/types';
import CreateCollection from '~/components/account/CreateCollection.vue';
import CollectionCard from '~/components/account/collection-home/CollectionCard.vue';


const { data: collectionsData, refresh, pending: collectionsPending, error: collectionsError } = await useFetch<Collection[]>('/api/account/collections');
const collections = ref(collectionsData.value);


const {data:collectionsTest} = await useCollections()

const testEmit = () => {
  console.log('testEmit');

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
        <!-- <UButton label="Create Collection" @click="isOpen = true" />
        <UModal v-model="isOpen">
          <div class="p-4 space-y-5">
            <h1 class="text-2xl font-bold">Create Collection</h1>
            <p class="text-gray-500">Create a collection to save your favorite recipes</p>
            <hr class="my-4">
            <UFormGroup label="Title">
              <UInput v-model="newCollection.title" placeholder="favorites" icon="i-heroicons-star" />
            </UFormGroup>
            <UButton @click="createCollection">Create Collection</UButton>
          </div>
        </UModal> -->
        <CreateCollection  @refreshCollections="refresh()"/>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-5">
   
        <CollectionCard v-for="collection in collectionsTest" :key="collection?.id!"  :collection="collection" />
      </div>
    </div>
    <div v-else-if="collectionsError">
      <p class="text-5xl font-bold text-center">Error loading collections</p>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </main>
</template>


<style>

</style>
