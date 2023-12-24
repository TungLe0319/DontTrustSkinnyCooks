<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/recipe-home/RecipeCard.vue'
const toast = useToast()
const route = useRoute()
const {data} = useFetch(`/api/account/collections/${route.params.id}`)
</script>

<style>

</style>