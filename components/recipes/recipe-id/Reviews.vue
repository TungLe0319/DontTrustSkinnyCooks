<script lang="ts" setup>
import ReviewCard from '~/components/recipes/recipe-id/ReviewCard.vue'

const { recipe, rating } = defineProps(['recipe', 'rating'])

const { data: reviews, refresh } = await useFetch(`/api/recipes/${recipe.id}/reviews`, {
  method: 'GET',
})
// const reviews = Reviews.value
const { session } = useAuth()
const toast = useToast()
const selectedRating = ref(0)
const hoverRating = ref(0)
const hovering = ref(false)
const comment = ref('')
const selectedRatingLabel = ref('')
// const {data:reviews} = await useReviews(recipe.id)
// console.log('reviews', reviews);

const { signIn } = useAuth()
const io = useIo()

onMounted(() => {
  io.emit('joinRoom', `recipes-${recipe.id}`)
  io.on(('newReview'), (review) => {
    // console.log('new review', review)
    reviews?.value?.unshift(review)
  })
  // io.onAny((event, ...args) => {
  //   console.log('any', event, args)
  // })
})

onBeforeUnmount(() => {
  io.emit('leaveRoom', `recipes-${recipe.id}`)
})
async function createReview() {
  const body = {
    rating: selectedRating.value,
    comment: comment.value,
  }

  try {
    await useFetch(`/api/recipes/${recipe.id}/reviews`, {
      method: 'POST',
      body,
    })
    selectedRating.value = 0
    comment.value = ''
    toast.add({
      id: `create review ${recipe.id}`,
      title: 'Review Created',
      description: 'Your review has been created.',
      color: 'green',
      timeout: 5000,
    })
  }
  catch (error) {

  }
}

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
  toast.add({
    id: `rating ${value}`,
    title: 'Rating',
    description: `You rated this recipe ${value} stars.`,
    color: 'green',
    timeout: 5000,
  })
}

function starIcon(index: number) {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'game-icons:fat' : 'material-symbols:emoji-people-rounded'
}

function starColor(index: number) {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'text-orange-400' : 'text-orange-400/50'
}

watch(() => rating, (newValue) => {
  selectedRating.value = newValue
})

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
  <div id="recipeReviews" class="flex flex-col  space-y-10 ">
    <div class=" flex flex-col  space-y-3">
      <div class="flex gap-3 items-center">
        <Icon name="ic:baseline-rate-review" class="text-4xl text-orange-400" />
        <span class="text-4xl font-extrabold">Review this Recipe</span>
      </div>
      <span class=" text-gray-500">Please be respectful when writing a review.</span>
    </div>

    <div v-if="session?.user" class=" space-y-10">
      <div class=" space-y-3">
        <span class="font-semibold">Your Rating (required)</span>
        <div class="flex items-center">
          <div
            v-for="(star, index) in 5" :key="star" class="hover:cursor-pointer" @mouseenter="hover(index)" @mouseleave="resetHover"
            @click="click(index + 1)"
          >
            <Icon :name="starIcon(index)" class="text-5xl  hover:text-orange-300 duration-150 transition-colors" :class="starColor(index)" />
          </div>

          <hr class="h-10 w-0.5 bg-gray-300 mx-3">

          <span class="text-xl font-semibold">
            {{ hovering ? getRatingLabel(hoverRating) : getRatingLabel(selectedRating) }}
          </span>
        </div>
      </div>

      <div class=" space-y-3">
        <span class="font-semibold">Your Review (required)</span>

        <UTextarea v-model="comment" variant="outline" placeholder="Review..." />
      </div>

      <UButton size="xl" class="bg-orange-400 hover:bg-orange-300 hover:scale-[1.01] transition-all duration-150" @click="createReview">
        Submit
      </UButton>
    </div>

    <div v-else class="space-y-5">
      <div>Please sign in to write a review for this recipe! </div>

      <UButton size="xl" class="bg-orange-400 hover:bg-orange-300 transition-all duration-150 hover:scale-[1.01]" @click="signIn">
        Sign In
      </UButton>
    </div>

    <hr class="my-3">

    <div class=" space-y-5">
      <div class="text-center font-extrabold text-4xl">
        Reviews
      </div>

      <div class="  space-y-5">
        <ReviewCard v-for="i in reviews" :key="i.id" :review="i" />
      </div>
    </div>
  </div>
</template>
