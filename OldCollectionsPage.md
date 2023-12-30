<script setup lang="ts">
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue';
import type { Collection, RecipeWithUserAndCategories } from '~/types/types';

const toast = useToast();
const { data: recipesData } = useFetch<RecipeWithUserAndCategories[]>('/api/recipe');
const { session, status } = useAuth();

const { data: collectionsData, refresh, pending: collectionsPending, error: collectionsError } = await useFetch<Collection[]>('/api/account/collections');
const collections = ref(collectionsData.value);

const isOpen = ref(false);
const newCollection = ref({
  title: '',
});

async function createCollection() {
  try {
    await useFetch('/api/account/collections', {
      method: 'POST',
      body: newCollection.value,
    });

    refresh();
    const createdCollectionTitle = newCollection.value.title;
    toast.add({
      id: `Created_Collection`,
      title: `Collection Created: ${createdCollectionTitle}`,
      icon: 'i-heroicons-check-circle',
      timeout: 2000,
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    throw createError({
      statusMessage: 'Error creating collection',
    });
  }
}

// Add more functions if needed for better modularity
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
            <h1 class="text-2xl font-bold">Create Collection</h1>
            <p class="text-gray-500">Create a collection to save your favorite recipes</p>
            <hr class="my-4">
            <UFormGroup label="Title">
              <UInput v-model="newCollection.title" placeholder="favorites" icon="i-heroicons-star" />
            </UFormGroup>
            <UButton @click="createCollection">Create Collection</UButton>
          </div>
        </UModal>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-5">
        <NuxtLink v-for="collection in collections" :key="collection.id" :to="`/account/collections/${collection.id}`"
          class="space-y-3">
          <UCard class="hover:shadow-lg transition-all duration-200">
            <h4 class="font-extrabold text-lg">{{ collection?.title }}</h4>
            <p class="text-sm">Created: {{ formateDate(collection?.createdAt!).value }}</p>
            <p class="text-sm text-gray-500">Recipes: {{ collection?._count.recipes }}</p>
          </UCard>
        </NuxtLink>
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
