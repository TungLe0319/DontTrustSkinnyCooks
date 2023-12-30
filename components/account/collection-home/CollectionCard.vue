<template>
  <UCard class="hover:shadow-lg transition-all duration-200 relative">
      <NuxtLink :to="`/account/collections/${collection?.id}`" class="space-y-3 relative">
    
       <h4 class="font-extrabold text-lg">{{ collection?.title }}</h4>
    
   
      <p class="text-sm">Created: {{ formateDate(collection?.createdAt!).value }}</p>
      <p class="text-sm text-gray-500">Recipes: {{ collection?._count.recipes }}</p>
      <!-- <div class="flex items-center gap-2">
        <Icon name="heroicons-outline:bookmark" class="text-xl" />
        <span class="text-sm">{{ collection?._count.recipes }}</span>
      </div> -->
  
    </NuxtLink>
        <div class=" absolute top-6 right-6 z-50 ">
             <UIcon name="i-heroicons-trash-20-solid" class="text-xl hover:cursor-pointer " @click="deleteCollection"/>
          </div>
    </UCard>
  
</template>

<script lang="ts" setup>
const { collection } = defineProps(['collection'])
const emit = defineEmits(['refreshCollections'])
const {session} = useAuth()
const toast = useToast()
const confirmYes = ref(false)
const deleteCollection = async() => {
  try {


    toast.add({
      id: `delete_Collection ${collection?.id}`,
      title: 'Delete Collection?',
      description: 'Are you sure you want to delete this collection?',
      icon: 'i-heroicons-question-mark-circle',
      timeout: 80000,
      color: 'amber',

      actions: [{
        label: 'Confirm',
        click: async () => {
          confirmYes.value = true

          if (confirmYes.value === true) {
            if (session.value?.user?.id !== collection.userId) {
              toast.add({
                id: `delete_collection_error ${collection?.id}`,
                title: 'Error',
                description: 'You are not authorized to delete this recipe',
                icon: 'i-heroicons-exclamation-circle',
                timeout: 2000,
                color: 'red',
              })
            }

            const res = await useFetch(`/api/account/collections/${collection.id}`, {
              method: 'DELETE',
            })

         
            if (res) {
                emit('refreshCollections')

              toast.add({
                id: `delete_collection_success ${collection.id}`,
                title: `Success`,
                description: `Successfully Deleted ${collection.title} from collections`,
                icon: 'i-heroicons-exclamation-circle',
                timeout: 2000,
                color: 'green',

              })
            }
          }
        },
      }],

    })

  } catch (error) {
    console.error('Error deleting collection:', error);
    throw createError({
      statusMessage: 'Error deleting collection',
    });
  }
}


















</script>

<style></style>