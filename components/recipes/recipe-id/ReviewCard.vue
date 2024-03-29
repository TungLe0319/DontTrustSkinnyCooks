<script lang="ts" setup>
const { review: reviewProp } = defineProps(['review'])
const review = ref<ReviewWithUser>(reviewProp)
const { session } = useAuth()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const { user } = useAuth()
const editing = ref(false)
const hovering = ref(false)
const confirmYes = ref(false)
const timeAgo = useTimeAgo(review.value.updatedAt!)
const items = [
  [{
    label: editing.value ? 'Save' : 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',

    click: async () => {
      editing.value = !editing.value
    },
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',

    click: async () => {
      toast.add({
        id: ` delete review ${review.value.id}`,
        title: 'Delete Review?',
        description: 'Are you sure you want to delete this review?',
        color: 'orange',
        timeout: 5000,
        actions: [{
          label: 'Confirm',
          click: async () => {
confirmYes.value= true

if (confirmYes.value = true) {
  
  if (session.value?.user?.id !== review.value.userId) {
    toast.add({
      id: `delete review error ${review.value.id}`,
      title: 'Error',
      description: 'You are not authorized to delete this review',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 2000,
      color: 'red',
    })
  }

  const res = await useFetch(`/api/recipes/${route.params.id}/reviews/${review.value.id}`, {
    method: 'DELETE',
  })

  if (res) {
       toast.add({
                  id: `delete review ${review.value.id}`,
                  title: 'Review Deleted',
                  description: 'Your review has been deleted.',
                  color: 'green',
                  timeout: 5000,
                })
  }
}


         
          },
        }],

      })
    },
  }],
]

const selectedRating = ref(0)
const hoverRating = ref(0)

function hover(index: number) {
  hoverRating.value = index + 1
  hovering.value = true
}

function resetHover() {
  hoverRating.value = 0
  hovering.value = false
}

function click(value: number) {
  hoverRating.value = value
  selectedRating.value = value
}

function starIcon(index: number) {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'game-icons:fat' : 'material-symbols:emoji-people-rounded'
}

function starColor(index: number) {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'text-orange-400' : 'text-orange-400/50'
}
watch(() => review.value, (newValue) => {
  selectedRating.value = newValue.rating
})

const selectedRatingLabel = ref('')

watch(() => selectedRating.value, (newValue) => {
  selectedRatingLabel.value = getRatingLabel(newValue)
})

function getRatingLabel(rating: number) {
  switch (rating) {
    case 0:
      return ''
    case 1:
      return 'Not a Fan'
    case 2:
      return 'Not Bad'
    case 3:
      return 'Good'
    case 4:
      return 'Great'
    case 5:
      return 'Amazing!'
    default:
      return ''
  }
}
</script>

<template>
  <div class="flex flex-col p-2 px-5  dark:border-2 dark:border-gray-300/30 space-y-4 dark:bg-gray-800 border-b-2 border-orange-400/60">
    <div class="flex items-center justify-between ">
      <div class="flex items-center gap-3">
        <UAvatar size="xl" class="shadow-md" alt="Harry Ashford" :src="review.user.image!" />
        <span class=" border-b border-spacing-3 border-orange-400">{{ review.user.name }}</span>
      </div>
      <UDropdown v-if="review.userId === user?.id" :items="items" :popper="{ placement: 'bottom-start' }">
        <Icon name="mi:options-horizontal" class=" text-2xl  " />

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-orange-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdown>
    </div>

    <div v-if="!editing" class="flex items-center gap-2">
      <div class="flex items-center gap-1">
        <Icon v-for="i in review.rating" :key="i" name="game-icons:fat" class="text-orange-400 " />
      </div>
      <span class="text-xs">{{ timeAgo }}</span>
    </div>

    <div v-if="!editing" class="p-3">
      {{ review.comment }}
    </div>

    <div v-else class="space-y-4">
      <div class="flex items-center">
        <div
          v-for="(star, index) in review.rating" :key="star" class="hover:cursor-pointer" @mouseenter="hover(index)" @mouseleave="resetHover"
          @click="click(index + 1)"
        >
          <Icon :name="starIcon(index)" class="text-xl hover:text-orange-300 duration-150 transition-colors" :class="starColor(index)" />
        </div>

        <hr class="h-10 w-0.5 bg-gray-300 mx-3">

        <span class="text-xl font-semibold">
          {{ hovering ? getRatingLabel(hoverRating) : getRatingLabel(selectedRating) }}
        </span>
      </div>

      <UTextarea v-if="review.comment" v-model="review.comment" variant="outline" />
    </div>
  </div>
</template>

<style>

</style>
