<script  setup>
import { onMounted, ref } from 'vue';
import SignInModal from './SignInModal.vue';
const { signIn, signOut, session, status, cookies, getProviders } = useAuth()
// generate a list of links that has to an id, to which will be home,tournaments,leagues,clubs,courses,series,videos,trading post,contact
const items = ref([
  { name: 'Home', href: '/' },
  { name: 'Users', href: '/profile' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Add Recipe', href: '/account/add-recipe' },

])


const profileDropdownItems = [
  [
    {
      label: session.value?.user ? session.value.user.email : '',
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user',
      link: `/profile/${session.value?.user ? session.value.user._id : ''}`
    },
  ],
  [
    {
      label: 'Sign Out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: signOut,
    },
  ],
];

const indicatorPosition = ref(0)

onMounted(() => {
  updateIndicatorPosition()
})

// Function to update the indicator position based on the active link
function updateIndicatorPosition() {
  const activeLink = document.querySelector('.active')
  if (activeLink)
    indicatorPosition.value = activeLink.offsetLeft
}


const drawerIsOpen = ref(false)

const showAlert = ref(true);

const handleAlertClose = () => {
  showAlert.value = false;
};









const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
 
  <UAlert
      v-if="showAlert && ! session.user"
      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
    
      @close="handleAlertClose"
      class="bg-gradient-to-r from-orange-500 via-rose-300 to-indigo-600 rounded-none "
    >
 

      <template #description>
      <span class="text-xl  ">
         Unlock Gourmet Recipes! Sign up now to explore our savory display ads and create a personalized collection of culinary wonders.
      </span>
      </template>
    </UAlert>
  <div class="w-full h-16 flex items-center justify-center shadow-md dark:bg-zinc-800 dark:text-white  py-0 px-5 ">
  

    <div class="flex w-full h-full space-x-4 justify-between">
      <div class="px-5 flex space-x-4 items-center justify-center">
        <Icon name="game-icons:fat" class="text-5xl" />
        <span class="font-extrabold lg:text-2xl">
          Don't Trust Skinny Cooks
        </span>
      </div>
      <div class="lg:flex space-x-4  items-center relative hidden  ">
        <NuxtLink v-for="item in items" :key="item.name" :to="item.href" class="text-lg" active-class="active"
          @click="updateIndicatorPosition">
          {{ item.name }}
        </NuxtLink>
    
      </div>
      <div class=" hidden lg:flex items-center justify-center space-x-4">
        <div class="flex gap-5">
          <a v-if="!session?.user" href="/api/auth/signin" class="buttonPrimary">Sign in</a>
       
        </div>
        <UDropdown v-if="session?.user" :items="profileDropdownItems"
          :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
          <UAvatar  size="md" :src="session.user?.image || 'https://i.pravatar.cc/150?img=69'" />
          <template #account="{ item }">
            <div class="text-left">
              <p>
                Signed in as
              </p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>
      <template #item="{ item }">
        <NuxtLink v-if="item.link" :to="item.link" class="flex items-center justify-between w-full">
          <span class="truncate">{{ item.label }}</span>
          <UIcon v-if="item.icon" :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </NuxtLink>
        <a v-else-if="item.click" @click="item.click" class="flex items-center justify-between w-full cursor-pointer">
          <span class="truncate">{{ item.label }}</span>
          <UIcon v-if="item.icon" :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </a>
      </template>
        </UDropdown>


    <ClientOnly>
      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />

      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>
        
      </div>
      <!-- MOBIlE MENU -->
      <div class="flex items-center lg:hidden ">
        <Icon name="solar:hamburger-menu-broken" class="text-5xl" @click="drawerIsOpen = true" />
        <USlideover v-model="drawerIsOpen">
          <div class="p-4 flex-1">
            <Icon name="solar:close-square-bold" class="text-5xl" @click="drawerIsOpen = false" />
            <div class="flex flex-col space-x-4  items-center relative space-y-5   ">
              <NuxtLink v-for="item in items" :key="item.name" :to="item.href" class="text-5xl" active-class="active"
                @click="updateIndicatorPosition">
                {{ item.name }}
              </NuxtLink>
              <!-- <span class="indicator" :style="{ transform: 'translateX(' + indicatorPosition + 'px)' }"></span> -->
            </div>
          </div>
        </USlideover>
      </div>
      <!-- !MOBIlE MENU -->
    </div>
  </div>
</template>

<style>
.link {
  @apply cursor-pointer;
}

.active {
  @apply text-emerald-500 transition-all duration-300;
}

.indicator {
  @apply w-12 h-2 absolute -bottom-5 bg-gray-100 rounded-t transition-transform duration-300;
}
</style>
