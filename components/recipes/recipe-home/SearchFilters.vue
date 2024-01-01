<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

defineProps(['data', 'categories'])
const accordionItems = [{
  label: 'Search Filters',
  icon: 'i-heroicons-funnel-20-solid',
  defaultOpen: true,
  slot: 'search',
}]
const filterCategories = useFilterCategories()
const { data: Categories } = await useFetch<Prisma.CategoryGetPayload<any>[]>('/api/categories')
const mouseEntered = ref(false)

const mappedSelectionCategories = Categories.value?.map(category => ({
  name: category.name,
  label: category.name,
  icon: 'i-heroicons-minus-small-20-solid',
}))
</script>

<template>
  <div class="my-5">


    <UAccordion :items="accordionItems" :ui="{ item: { color: '' } }">
      <template #default="{ item, index, open }">
        <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
          <template #leading>
            <div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
            </div>
          </template>

          <span class="truncate">{{ item.label }}</span>

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
          </template>
        </UButton>
      </template>

      <template #search>
        <div class=" my-4 space-y-4">
          <div v-auto-animate class="mb-4 flex flex-wrap gap-2">
            <span v-for="(category, index) in filterCategories" :key="index">

              <UBadge
                size="lg" class="shadow-md hover:scale-[1.01] hover:shadow-xl hover:bg-orange-300 transition-all duration-300 hover:cursor-pointer"

                @click=" useFilterCategories().value = useFilterCategories().value.filter((_: any, i: any) => i !== index)"
              >
                {{ category }}
              </UBadge>
            </span>
          </div>

          <USelectMenu
            v-model="filterCategories" :options="mappedSelectionCategories" multiple placeholder="Select Categories"
            searchable searchable-placeholder="Search a Category..." size="xl" value-attribute="name"
            option-attribute="name"
            :ui-menu="{ base: 'space-y-2', option: { container: 'w-full', selected: 'bg-orange-400/50' } }"
          >
            <template #option-empty="{ query }">
              <q>{{ query }}</q> not found
            </template>
          </USelectMenu>

          <USelectMenu
            v-if="data" :options="data" placeholder="Search Recipes..." searchable
            searchable-placeholder="Search by title or description" option-attribute="title" by="id" size="xl"
            :search-attributes="['title', 'description']"
            :ui-menu="{ height: 'max-h-96', option: { size: 'text-xl', container: 'w-full' } }"
          >
            <template #option="{ option: data }">
              <div class="relative" @mouseenter="mouseEntered = true">
                <NuxtLink :to="`recipes/${data.id}`" class="flex gap-5 w-full  items-center ">
                  <img :src="data.image" alt="" class="w-1/12 h-14 shadow-md rounded object-cover">
                  <div class=" flex flex-col w-11/12">
                    <div class="flex gap-5 items-center">
                      <span class="truncate font-extrabold">{{ data.title }}</span>
                      <span class="text-xs flex items-center gap-2">
                        <UAvatar size="3xs" :src="data.user.image" class="shadow-md shadow-black/20" />
                        <span class="underline">   {{ data.user.name }}</span>
                      </span>
                    </div>
                    <span class="truncate text-sm text-gray-500">{{ data.description }}</span>
                  </div>
                </NuxtLink>
              </div>
            </template>
          </USelectMenu>

          <div class="flex gap-5">
            <div class="w-1/12">
              <UFormGroup label="Prep Time">
                <UInput v-model="useFilterPrepTime().value" size="xl" type="number" variant="outline" placeholder="Search..." />
              </UFormGroup>
            </div>

            <div class="w-1/12">
              <UFormGroup label="Serving Size">
                <UInput v-model="useFilterServingSize().value" size="xl" type="number" variant="outline" placeholder="Search..." />
              </UFormGroup>
            </div>
          </div>

          <!-- POSSIBLE EXTRA FEATURE -->
          <!-- <div class="">
    <UInput color="primary" variant="outline" placeholder="Search..."  @input="search" />

            <div v-if="searchResults" v-auto-animate class="grid grid-cols-4  gap-6   pb-20 ">
              <RecipeCard v-for="(recipe, index) in searchResults" :key="index" :recipe="recipe" />
            </div>
            <div v-else>
              <h1 class="text-8xl font-extrabold text-center">
                No Recipes
              </h1>
            </div>
</div> -->
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<style>

</style>
