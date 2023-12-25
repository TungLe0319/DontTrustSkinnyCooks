<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const links = ref([
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Account',
    icon: 'i-heroicons-user',
    to: '/account'
  },
  {
    label: 'Account/Collections',
    icon: 'i-heroicons-archive',
    to: '/account/collections'
  },
  {
    label: 'Profile Info',
    icon: 'i-heroicons-archive',
    to: '/account/profile-info'
  },
  {
    label: 'Add Recipe',
    icon: 'i-heroicons-archive',
    to: '/account/add-recipe'
  },
  {
    label: 'Recipes',
    icon: 'i-heroicons-recipe',
    to: '/recipes'
  }
]);

const getFilteredLinks = () => {
  return links.value.filter(link => route.path.startsWith(link.to));
};
</script>

<template>
 <div v-if="route.path !== '/'" class=" p-2 px-4">
   <UBreadcrumb   :links="getFilteredLinks()" :currentRoute="route" :ui="{ ol: 'gap-x-3', li: 'gap-x-3' }" >
       <template #divider>
          <span class="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        </template>

         <template #icon="{ link, index, isActive }">
          <UAvatar
            :alt="(index + 1).toString()"
            :ui="{
              background: isActive ? 'bg-primary-500 dark:bg-primary-400' : undefined,
              placeholder: isActive ? 'text-white dark:text-gray-900' : !!link.to ? 'group-hover:text-gray-700 dark:group-hover:text-gray-200' : ''
            }"
            size="xs"
          />
        </template>
    </UBreadcrumb>
 </div>
</template>
