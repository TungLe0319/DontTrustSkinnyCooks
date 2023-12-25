<script lang="ts" setup>
import ProfileCard from '~/components/globals/ProfileCard.vue'

const { id, title, user, description, createdAt, updatedAt } = defineProps(['title', 'user', 'description', 'id', 'createdAt', 'updatedAt'])
const { session } = useAuth()
const route = useRoute()
const router = useRouter()
const toast = useToast()

function editRecipe() {
  router.push(`/recipes/${id}/edit`)
}
const confirmYes = ref(false)
async function deleteRecipe() {
  toast.add({
    id: `delete_recipe ${id}`,
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
          if (session.value?.user?.id !== user.id) {
            toast.add({
              id: `delete_recipe_error ${id}`,
              title: 'Error',
              description: 'You are not authorized to delete this recipe',
              icon: 'i-heroicons-exclamation-circle',
              timeout: 2000,
              color: 'red',
            })
          }

          const res = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
          })
          if (res.ok) {
            router.push('/recipes')

            toast.add({
              id: `delete_recipe_success ${id}`,
              title: `Success`,
              description: `Successfully Deleted ${title}`,
              icon: 'i-heroicons-exclamation-circle',
              timeout: 2000,
              color: 'green',

            })
          }
        }
      },
    }],

  })

  const userRating = ref(0)

  const hoverRating = (rating: number) => {
    userRating.value = rating
  }

  const clickRating = (rating: number) => {
    // Handle the rating click event, e.g., send it to the server
    console.log(`Clicked rating: ${rating}`)
  }
}
</script>

<template>
  <div class=" space-y-4">
    <div class="flex   items-start gap-4">
      <h1 class="text-5xl font-extrabold mb-5">
        {{ title }}
      </h1>
      <div v-if="session?.user?.id === user.id" class="flex gap-3 items-center justify-center mt-1">
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
    <div class="flex gap-3  text-orange-400">
      <div class="flex gap-1">
        <Icon v-for="(rating, index) in 5" :key="rating" name="game-icons:fat" class="text-2xl" />
      </div>
      <div class="dark:text-white text-gray-900 space-x-1 font-semibold">
        <span class="border-b border-spacing-2 border-orange-400 ">
          4.5
        </span>
        <span class="text-gray-500">
          (24)
        </span>
      </div>
    </div>
    <p class=" my-5">
      {{ description }}
    </p>
    <div class="font-bold text-sm">
      Recipe By
    </div>
    <div class=" w-fit flex items-center gap-4">
      <ProfileCard :user="user" />
      <hr class="h-14 w-0.5   bg-gray-300">
      <div class=" text-sm my-4 font-semibold  flex flex-col gap-2 ">
        <span>
          Created {{ formateDate(createdAt).value }}
        </span>
        <span v-if="createdAt !== updatedAt" class="text-gray-500 text-xs">
          Updated {{ formateDate(updatedAt).value }}
        </span>
      </div>
    </div>
    <div
      class="flex   bg-gradient-to-r from-orange-500 via-rose-300 to-indigo-600 dark:bg-gradient-to-r dark:from-orange-500 dark:via-rose-300 dark:to-indigo-600  w-fit shadow-xl "
    >
      <UButton
        :ui="{ rounded: 'rounded-none' }" size="xl" icon="i-heroicons-heart" :trailing="true"
        class="bg-transparent hover:bg-black/20 transition-all duration-150"
      >
        Save
      </UButton>
      <UButton
        :ui="{ rounded: 'rounded-none' }" size="xl" icon="i-heroicons-star" :trailing="true"
        class="bg-transparent hover:bg-black/20 transition-all duration-150"
      >
        Rate
      </UButton>
      <UButton
        :ui="{ rounded: 'rounded-none' }" size="xl" icon="i-heroicons-share" :trailing="true"
        class="bg-transparent hover:bg-black/20 transition-all duration-150"
      >
        Share
      </UButton>
    </div>
  </div>
</template>

<style></style>
