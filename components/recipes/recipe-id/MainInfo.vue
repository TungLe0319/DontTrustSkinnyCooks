<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import ProfileCard from '~/components/globals/ProfileCard.vue'
import SaveToCollectionModal from '~/components/globals/SaveToCollectionModal.vue';

const { recipe, averageRating } = defineProps<{
  recipe: Prisma.RecipeGetPayload<{
    include: {
      user: true
      categories: true
      _count: {
        select: {
          reviews: true
        }
      }
      reviews: {
        select: {
          id: true
          rating: true
        }
      }
    }
  }>
  averageRating: number

}>()

const { session } = useAuth()
const route = useRoute()
const router = useRouter()
const toast = useToast()

function editRecipe() {
  router.push(`/recipes/${recipe.id}/edit`)
}
const confirmYes = ref(false)
async function deleteRecipe() {
  toast.add({
    id: `delete_recipe ${recipe.id}`,
    title: 'Delete Recipe?',
    description: 'Are you sure you want to delete this recipe?',
    icon: 'i-heroicons-question-mark-circle',
    timeout: 80000,
    color: 'amber',

    actions: [{
      label: 'Confirm',
      click: async () => {
        confirmYes.value = true

        if (confirmYes.value === true) {
          if (session.value?.user?.id !== recipe.userId) {
            toast.add({
              id: `delete_recipe_error ${recipe.id}`,
              title: 'Error',
              description: 'You are not authorized to delete this recipe',
              icon: 'i-heroicons-exclamation-circle',
              timeout: 2000,
              color: 'red',
            })
          }

          const res = await fetch(`/api/recipes/${recipe.id}`, {
            method: 'DELETE',

          })
          if (res.ok) {
            router.push('/recipes')

            toast.add({
              id: `delete_recipe_success ${recipe.id}`,
              title: `Success`,
              description: `Successfully Deleted ${recipe.title}`,
              icon: 'i-heroicons-exclamation-circle',
              timeout: 2000,
              color: 'green',

            })
          }
        }
      },
    }],

  })
}

function scrollToReviews() {
  const reviewsElement = document.getElementById('recipeReviews')

  if (reviewsElement) {
    reviewsElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',

    })
  }
}

const shareItems = [
  [
    {
      label: 'Facebook',
      icon: 'brandico:facebook-rect',
      click: () => {
        // Implement Facebook sharing logic
        console.log('Share on Facebook')
      },
    },
    {
      label: 'Twitter',
      icon: 'brandico:twitter-bird',
      click: () => {
        // Implement Twitter sharing logic
        console.log('Share on Twitter')
      },
    },
    {
      label: 'LinkedIn',
      icon: 'brandico:linkedin-rect',
      click: () => {
        // Implement LinkedIn sharing logic
        console.log('Share on LinkedIn')
      },
    },
    {
      label: 'Instagram',
      icon: 'brandico:instagram',
      click: () => {
        // Implement Instagram sharing logic
        console.log('Share on Instagram')
      },
    },
    {
      label: 'Pinterest',
      icon: 'fa6-brands:pinterest',
      click: () => {
        // Implement Pinterest sharing logic
        console.log('Share on Pinterest')
      },
    },
    {
      label: 'Email',
      icon: 'mdi:email',
      click: () => {
        // Implement Email sharing logic
        console.log('Share via Email')
      },
    },
  ],

]
</script>

<template>
  <div class=" space-y-4">
    <div class="flex   items-start gap-4">
      <h1 class="text-5xl font-extrabold mb-5">
        {{ recipe.title }}
      </h1>
      <div v-if="session?.user?.id === recipe.userId" class="flex gap-3 items-center justify-center mt-1">
        <UButton
          size="xl"
          class="bg-orange-400  transition-all duration-150 hover:brightness-75 hover:bg-orange-400 hover:scale-95"
          @click="editRecipe"
        >
          Edit
        </UButton>
        <UButton
          size="xl"
          class="bg-red-400 transition-all duration-150 hover:brightness-75 hover:bg-red-400 hover:scale-95"
          @click="deleteRecipe"
        >
          Delete
        </UButton>
      </div>
    </div>
    <div v-if="averageRating > 0" class="flex gap-3  text-orange-400">
      <div class="flex gap-1">
        <Icon v-for="rating in averageRating" :key="rating" name="game-icons:fat" class="text-2xl" />
      </div>
      <div class="dark:text-white text-gray-900 space-x-1 font-semibold">
        <span class="border-b border-spacing-2 border-orange-400 ">
          {{ averageRating }}
        </span>
        <span class="text-gray-500">
          ({{ recipe.reviews.length }})
        </span>
      </div>
    </div>
    <div v-else class=" text-gray-600 underline-offset-4 underline">
      Not Yet Rated
    </div>

    <UButton variant="link" class=" text-gray-900 uppercase text-xs font-bold  underline underline-offset-4" @click="scrollToReviews">
      <span> Read Reviews</span>
      <Icon name="material-symbols:arrow-drop-down-rounded" class="text-xl" />
    </UButton>
    <p class=" my-5">
      {{ recipe.description }}
    </p>
    <div class="font-bold text-sm">
      Recipe By
    </div>
    <div class=" w-fit flex items-center gap-4">
      <ProfileCard :user="recipe.user" />
      <hr class="h-14 w-0.5   bg-gray-300">
      <div class=" text-sm my-4 font-semibold  flex flex-col gap-2 ">
        <span>
          Created {{ formateDate(recipe.createdAt).value }}
        </span>
        <span v-if="recipe.createdAt !== recipe.updatedAt" class="text-gray-500 text-xs">
          Updated {{ formateDate(recipe.updatedAt).value }}
        </span>
      </div>
    </div>
<SaveToCollectionModal :recipe="recipe">

    <UButton
      size="xl"
      class="bg-orange-400  transition-all duration-150 hover:brightness-75 hover:bg-orange-400 hover:scale-95"
  
    >
      Save
    </UButton>
 
</SaveToCollectionModal>
    <UDropdown :items="shareItems" :ui="{ width: 'w-fit' }" :popper="{ placement: 'bottom' }">
      <Icon name="material-symbols:share" class="flex-shrink-0  text-2xl text-gray-900 dark:text-gray-500 ms-auto" />

      <template #item="{ item }">
        <!-- <span class="truncate">{{ item.label }}</span> -->

        <Icon :name="item.icon" class="flex-shrink-0  text-2xl text-gray-900 dark:text-gray-500 ms-auto" />
      </template>
    </UDropdown>

    <div class="my-3  gap-3 flex flex-wrap">
      <UBadge size="lg" v-for="category in recipe.categories">
       
         {{ category.name }}
      </UBadge>
    </div>
  </div>
</template>

<style></style>
