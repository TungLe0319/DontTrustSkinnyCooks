<script lang="ts" setup>
import RecipeCard from '~/components/globals/RecipeCard.vue'

import type { RecipeWithUserAndCategories } from '~/types/types'

const toast = useToast()
const { data: Recipes } = useFetch<RecipeWithUserAndCategories[]>('/api/recipes')
const { session, status } = useAuth()
const recipes = Recipes.value?.filter(recipe => recipe.user.name === session?.value?.user?.name && recipe.user.email === session?.value?.user?.email)

const tabItems = [
  {
    slot: 'welcome',
    label: `Hi, ${session?.value?.user?.email} `,
    icon: 'mdi:hand-wave',
    disabled: true,
  },
  {
    slot: 'about',
    label: 'About',
    icon: 'uil:user',
  },
  {
    slot: 'password',
    label: 'Password',
    icon: 'uil:lock',
  },
  {
    slot: 'saved-recipes',
    label: 'Saved Recipes',
    icon: 'uil:bookmark',
  },
  {
    slot: 'personal-recipes',
    label: 'Personal Recipes',
    icon: 'arcticons:recipe-keeper',
  },

]

const { data: collections, refresh } = await useFetch('/api/account/collections')

const isOpen = ref(false)

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
  <main v-if="session?.user" class="profile-page min-h-screen flex items-center justify-center px-20 py-10 ">
    <UTabs
      :items="tabItems" orientation="vertical"
      :ui="{ wrapper: 'flex  justify-between   w-full  min-h-screen', list: { width: 'w-3/12', base: 'sticky top-4', background: 'bg-white', marker: { background: 'bg-green-300' }, tab: { height: 'h-12', base: 'disabled:cursor-default' } } }"
    >
      <template #default="{ item, index, selected }">
        <div
          class="flex items-center justify-between w-full gap-2 relative truncate text-black  dark:text-white"
          :class="selected ? '' : ''"
        >
          <Icon :name="item.icon" class="text-3xl flex-shrink-0" :class="selected ? '' : ''" />
          <span class="truncate text-lg ">{{ item.label }}</span>
        </div>
      </template>
      <template #about="{ item }">
        <UContainer>
          <div class="bg-white p-3 border-t-4 rounded border-green-400 shadow-xl">
            <div class="image overflow-hidden">
              <img
                class="h-auto w-full mx-auto"
                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                alt=""
              >
            </div>
            <div class="flex flex-col items-center justify-center gap-4">
              <img :src="session?.user?.image || ''" alt="profile picture" class="rounded-full shadow-xl">
            </div>
            <ul
              class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
            >
              <li class="flex items-center py-3">
                <span>Display Name</span>
                <span class="ml-auto">{{ session.user?.name }} </span>
              </li>
              <li class="flex items-center py-3">
                <span>Email</span>
                <span class="ml-auto">{{ session.user?.email }} </span>
              </li>
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                  {{ status }}
                </span></span>
              </li>
              <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">Nov 07, 2016</span>
              </li>
            </ul>
          </div>
        </UContainer>
      </template>
      <template #password="{ item }">
        <UContainer>
          <div class="bg-white shadow-xl rounded p-5 flex flex-col space-y-4">
            <span class="text-5xl font-extrabold"> Change Password</span>
            <span>
              If you want to change your password, click the button below, and we will send password reset
              instructions to your email address.
            </span>
            <span class="text-xs flex items-center gap-2 italic text-gray-500">
              <Icon name="teenyicons:password-solid" class="text-xl" />
              <span> Your password will always remain private.</span>
            </span>
            <hr>
            <div class="flex items-center justify-center">
              <UButton>Reset Password</UButton>
            </div>
          </div>
        </UContainer>
      </template>
      <template #saved-recipes="{ item }">
        <UContainer class=" w-full h-full">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <Icon name="uil:bookmark" class="text-3xl" />
            <span class="tracking-wide"> My Saved Recipes</span>
          </div>

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

          <!-- <div class="grid  grid-cols-3 gap-2  mt-5 ">
            <UCard v-for="collection in collections" :key="collection.id" class=" ">
              <div class="">
                {{ collection.title }}
              </div>

              <div class="">
                {{ collection }}
              </div>
            </UCard>
          </div> -->

          <!-- <div class="grid  grid-cols-3 gap-2  ">

            <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" class="" />
          </div> -->
          <!-- End of Experience and education grid -->
        </UContainer>
      </template>
      <template #personal-recipes="{ item }">
        <UContainer class="">
          <div class="flex flex-col shadow-xl space-y-5 p-5">
            <div class="flex items-center gap-2 ">
              <Icon name="arcticons:recipe-keeper" class="text-5xl" />
              <span class=" text-5xl font-extrabold"> My Recipes I've Added</span>
            </div>
            <span>Recipes you have created on Don't Trust Skinny
              Cooks
            </span>
            <span class="text-xs flex items-center italic gap-2 text-gray-500">
              <Icon name="fluent:people-audience-20-filled" class="text-xl" />
              <span> Other users will see the recipes you've made public.</span>
            </span>
            <hr>
            <div class="grid  grid-cols-3 gap-2  ">
              <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" class="" />
            </div>
          </div>
          <!-- End of Experience and education grid -->
        </UContainer>
      </template>
    </UTabs>
  </main>
</template>

<style scoped></style>
