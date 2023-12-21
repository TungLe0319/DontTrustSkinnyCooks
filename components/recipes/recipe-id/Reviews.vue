<template>
  <div class="flex flex-col  space-y-10 ">
   <div class=" flex flex-col  space-y-3">
    <div class="flex gap-3">
      <Icon name="ic:baseline-rate-review" class="text-4xl text-orange-400" />
      <span class="text-4xl font-extrabold">Review this Recipe</span>
    </div>
      <span class=" text-gray-500">Please be respectful when writing a review.</span>
    
   </div>

 <div v-if="session?.user" class=" space-y-10">
   <div class=" space-y-3">
      <span class="font-semibold">Your Rating (required)</span>
        <div class="flex items-center">
          <div v-for="(star, index) in 5" class="hover:cursor-pointer" @mouseenter="hover(index)" @mouseleave="resetHover"
            @click="click(index + 1)">
            <Icon :name="starIcon(index)" class="text-5xl  hover:text-orange-300 duration-150 transition-colors" :class="starColor(index)" />
          </div>

           <hr class="h-10 w-0.5 bg-gray-300 mx-3">

        
          <span class="text-xl font-semibold" >
             {{ hovering ? getRatingLabel(hoverRating) : getRatingLabel(selectedRating) }}
          </span>

     
          
        </div>

   
    </div>
    


     <div class=" space-y-3">
        <span class="font-semibold">Your Review (required)</span>
       
        <UTextarea  variant="outline" placeholder="Review..." />
     
      </div>
    
    <UButton @click="createReview" size="xl" class="bg-orange-400 hover:bg-orange-300 hover:scale-[1.01] transition-all duration-150">Submit</UButton>
 </div>

 <div  v-else class="space-y-5">
  <div>Please sign in to write a review for this recipe! </div>

  <UButton size="xl">Sign In</UButton>
 </div>

    <hr class="my-3">




<div class=" space-y-5">
  <div class="text-center font-extrabold text-4xl">Reviews</div>

  <div class=" px-10 space-y-5">
    <ReviewCard v-for="i in 5" :recipe="recipe" :rating="rating"  />

    
  </div>
</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import ReviewCard from '~/components/recipes/recipe-id/ReviewCard.vue';
const {recipe,rating} = defineProps(['recipe','rating']);
const {session } = useAuth()
const toast = useToast()
const selectedRating = ref(0);
const hoverRating = ref(0);
const hovering = ref(false);
const selectedRatingLabel = ref('');


const createReview  = async() => {
  try {
    toast.add({
      id: `create review ${recipe.id}`,
      title: 'Review Created',
      description: 'Your review has been created.',
      color:'green',
      timeout: 5000,
    })
    
  } catch (error) {
    
  }
}














const hover = (index: number) => {
  hoverRating.value = index + 1;
hovering.value = true;


};

const resetHover = () => {
  hoverRating.value = 0;
  hovering.value = false;
};

const click = (value: number) => {
  hoverRating.value = value;
  selectedRating.value = value;
toast.add({
  id: `rating ${value}`,
  title: 'Rating',
  description: `You rated this recipe ${value} stars.`,
  color:'green',
  timeout: 5000,
})
};



const starIcon = (index: number) => {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'game-icons:fat' : 'material-symbols:emoji-people-rounded';
};

const starColor = (index: number) => {
  return index + 1 <= (hoverRating.value || selectedRating.value) ? 'text-orange-400' : 'text-orange-400/50';
};

watch(() => rating, (newValue) => {
  selectedRating.value = newValue;
});







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
