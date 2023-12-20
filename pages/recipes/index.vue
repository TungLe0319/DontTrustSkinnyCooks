
<template>
  <main class="min-h-screen  ">
    <h1 class="text-8xl font-extrabold  text-center  mt-16">Recipes</h1>
    <div class="my-5">
      <UAccordion :items="items" :ui="{item:{color:''},}">
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
          <div class=" my-4">
            <div class="mb-4 flex gap-4" v-auto-animate>
              <span v-for="(category, index) in selectedCategories">
                <UBadge @click="selectedCategories = selectedCategories.filter((_, i) => i !== index)" size="lg"
                  class="shadow-md hover:scale-[1.01] hover:shadow-xl hover:bg-emerald-500 transition-all duration-300 hover:cursor-pointer">
                  {{ category }}
                </UBadge>
              </span>
            </div>
            
            <USelectMenu v-model="selectedCategories" :options="Categories" multiple placeholder="Select Categories"
              searchable searchable-placeholder="Search a Category..." size="xl" value-attribute="name"
              option-attribute="name"
              :ui-menu="{ base: 'space-y-2', option: { size: 'text-xl', container: 'w-full', selected: 'bg-green-400/50' }, }">
              <template #option="{ option: Categories }">
                <span> {{ Categories.name }} </span>
              </template>
              <template #option-empty="{ query }">
                <q>{{ query }}</q> not found
              </template>
            </USelectMenu>
            <div class="my-4">
              <USelectMenu v-if="data"  :options="data" placeholder="Search Recipes..." searchable
                searchable-placeholder="Search by title or description" option-attribute="title" by="id" size="xl"
                :search-attributes="['title', 'description']"
                :ui-menu="{ height:'max-h-96',option: { size: 'text-xl', container: 'w-full' }, }">
                <template #option="{ option: data }">
                <div class="relative" @mouseenter="mouseEntered = true">
                    <NuxtLink :to="`recipes/${data.id}`" class="flex gap-5 w-full  items-center " >
                      <img :src="data.image" alt="" class="w-1/12 h-14 shadow-md rounded object-cover">
                      <div class=" flex flex-col w-11/12">
                        <div class="flex gap-5 items-center">
                          <span class="truncate font-extrabold">{{ data.title }}</span>
                          <span class="text-xs flex items-center gap-2">
                            <UAvatar size="3xs" :src="data.user.image" class="shadow-md shadow-black/20"/>
                         <span class="underline">   {{ data.user.name }}</span>
                          </span>
                        </div>
                        <span class="truncate text-sm text-gray-500">{{ data.description }}</span>
                      </div>
                    </NuxtLink>



                </div>
                </template>
              </USelectMenu>
            </div>
          </div>
        </template>
      </UAccordion>
    </div>
    <div class="grid grid-cols-4  gap-6   pb-20 " v-auto-animate>
      <RecipeCard v-for="(recipe, index) in filteredRecipes" :key="index" :recipe="recipe" />
      <!-- <RecipeCard v-for="(recipe, index) in data" :key="index" :recipe="recipe" /> -->
    </div>
    <!-- <div >
    <h1 class="text-8xl font-extrabold text-center"> No Recipes</h1>
   </div> -->
  </main>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/RecipeCard.vue';
const mouseEntered = ref(false);
const { data } = await useFetch<RecipeWithUser[]>("/api/recipes/get");
const { data: Categories } = await useFetch<String[]>("/api/categories/get");



const selectedCategories = useSelectedCategory();


const filteredRecipes = computed(() => {
  if (selectedCategories.value.length === 0) return data.value;

  return data.value?.filter((recipe) => {
   //@ts-ignore
    return recipe.categories?.some((category:any) =>
      selectedCategories.value.includes(category.name)
    );
  });
});



const items = [{
  label: 'Search Filters',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  slot: 'search'
}]

</script>

<style></style>