<!-- components/Search.vue -->

<script lang="ts" setup>
import { ref } from 'vue'

const query = ref('')

const { data: recipes, loading, error, fetch } = await useFetch('/api/recipes/[query]')

async function search() {
  await fetch({ query })
}
</script>

<template>
  <div>
    <input v-model="query" placeholder="Search recipes...">
    <button @click="search">
      Search
    </button>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="recipes.length > 0">
      <h2>Search Results:</h2>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
          {{ recipe.title }}
        </li>
      </ul>
    </div>
    <div v-if="error">
      Error loading recipes
    </div>
  </div>
</template>
