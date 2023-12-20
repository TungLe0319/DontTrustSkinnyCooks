<template>
  <div class="flex flex-col  space-y-10 ">
   <div class=" flex flex-col  space-y-3">
     <span class="text-4xl font-extrabold">Review this Recipe</span>
      <span class=" text-gray-500">Please be respectful when writing a review.</span>
    
   </div>

 <div v-if="session?.user" class=" space-y-10">
   <div class=" space-y-3">
      <span>Your Rating (required)</span>
        <div class="flex items-center">
          <div v-for="(star, index) in 5" class="hover:cursor-pointer" @mouseenter="hover(index)" @mouseleave="resetHover"
            @click="click(index + 1)">
            <Icon :name="starIcon(index)" class="text-5xl text-orange-400 hover:text-orange-300 duration-150 transition-colors" />
          </div>

           <hr class="h-10 w-1 bg-gray-200 mx-3">

           <span>
           {{ getRatingLabel(hoverRating) }}
           </span>
        </div>

     
    </div>
    


     <div class=" space-y-3">
        <span>Your Review (required)</span>
       
        <UTextarea  variant="outline" placeholder="Review..." />
     
      </div>
    

 </div>

 <div  class="space-y-5">
  <div>Please sign in to write a review for this recipe! </div>

  <UButton size="xl">Sign In</UButton>
 </div>

    <hr class="my-3">

<div class="my-5">
  RATING HERE
</div>

<hr class="my-3">

<div class=" space-y-5">
  <div class="text-center">Reviews</div>

  <div class=" px-10 space-y-5">
    <ReviewCard v-for="i in 5"  />

    
  </div>
</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import ReviewCard from '~/components/recipes/recipe-id/ReviewCard.vue';
const {session } = useAuth()

const selectedRating = ref(0);
const hoverRating = ref(0);
const {recipe,rating} = defineProps(['recipe','rating']);
const hover = (index: number) => {
  hoverRating.value = index + 1;
};

const resetHover = () => {
  hoverRating.value = 0;
};

const click = (value: number) => {
  hoverRating.value = value;
  selectedRating.value = value;

};

const starIcon = (index: number) => {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'game-icons:fat' : 'material-symbols:emoji-people-rounded';
};

watch(() => rating, (newValue) => {
  selectedRating.value = newValue;
});





const selectedRatingLabel = ref('');

watch(() => selectedRating.value, (newValue) => {
  selectedRatingLabel.value = getRatingLabel(newValue);
});

const getRatingLabel = (rating: number) => {
  switch (rating) {
    case 0:
      return '';
    case 1:
      return 'Not a Fan';
    case 2:
      return 'Not Bad';
    case 3:
      return 'Good';
    case 4:
      return 'Great';
    case 5:
      return 'Amazing!';
    default:
      return '';
  }
};
</script>