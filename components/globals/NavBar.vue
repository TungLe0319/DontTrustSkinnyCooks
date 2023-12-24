<script  setup>
import { onMounted, ref } from 'vue'

const { signIn, signOut, session } = useAuth()
const toast = useToast()
const router = useRouter()
const colorMode = useColorMode()


const drawerIsOpen = ref(false)

const showAlert = ref(true)

function handleAlertClose() {
  showAlert.value = false
}

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
const items = ref([
  { name: 'Home', label: 'Home', icon: 'i-heroicons-home', href: '/', to: '/' },

  { name: 'Recipes', label: 'recipes', icon: 'i-heroicons-home', href: '/recipes' },
  { name: 'Add Recipe', label: 'add-recipe', icon: 'i-heroicons-home', href: '/account/add-recipe' },

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
      icon: 'i-heroicons-user-20-solid',
    
       click: () => {
        router.push(`/account/profile-info`)
      }
    },
       {
      label: 'Password',
      icon: 'solar:lock-password-bold',
 
        click: () => {
        router.push(`/account/manage-password`)
      }
    },
  ],
 
  [
    {
      label: 'Collections',
      icon: 'material-symbols:collections-bookmark-rounded',
  
         click: () => {
        router.push(`/account/collections`)
      }
    },
       {
      label: 'My Recipes',
      icon: 'solar:whisk-bold',
   
          click: () => {
          router.push(`/account/my-recipes`)
        }

    },
  ],

  [
    {
      label: 'Sign Out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: signOut,
    },
  ],
]



onMounted(() => {

  welcomeBackUser()
})

 const welcomeBackUser =()=>{
  if (session.value?.user) {
   toast.add({
    id:`welcome-back-${session.value.user.id}`,
    title:`Welcome back ${session.value.user.name}!`,
    description:`We're glad to see you again!`,
    duration:5000,
    icon:'i-heroicons-user',
    color:'green',
    })
  }
 
 }





</script>

<template>
  <UAlert
    v-if="showAlert && !session?.user"
    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
    class="bg-gradient-to-r from-orange-500 via-rose-300 to-indigo-600 rounded-none " @close="handleAlertClose"
  >
    <template #description>
      <span class="drop-shadow-md  ">
        Unlock Gourmet Recipes! <strong class="border-b  border-spacing-6 border-white pb-0.5"> Sign up</strong> now to explore our savory display ads and create a personalized collection of
        culinary wonders.
      </span>
    </template>
  </UAlert>
  <div class="w-full h-16 flex items-center justify-center shadow-md dark:bg-gray-800 dark:text-white  py-0 px-5 ">
    <div class="flex w-full h-full space-x-4 justify-between">
      <div class="px-5 flex space-x-4 items-center justify-center">
        <Icon name="game-icons:fat" class="text-5xl" />
        <span class="font-extrabold lg:text-2xl">
          Don't Trust Skinny Cooks
        </span>
      </div>
      <div class="lg:flex space-x-4  items-center relative hidden  ">
        <NuxtLink
          v-for="item in items" :key="item.name" :to="item.href" class="text-lg" active-class="active"
       
        >
          {{ item.name }}
        </NuxtLink>
      </div>
      <div class=" hidden lg:flex items-center justify-center space-x-4">
        <div class="flex gap-5">
          <a v-if="!session?.user" href="/api/auth/signin" class="buttonPrimary">Sign in</a>
      
        </div>
        <UDropdown
          v-if="session?.user" :items="profileDropdownItems"
          :ui="{ width:'w-fit',item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar size="md" :src="session.user?.image || 'https://i.pravatar.cc/150?img=69'" class="shadow-md" />
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
            <div  class="flex items-center justify-between w-full">
              <span class="truncate">{{ item.label }}</span>
              <Icon
                v-if="item.icon" :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
              />
            </div>
         
          </template>
        </UDropdown>
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
            aria-label="Theme" @click="isDark = !isDark"
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
              <NuxtLink
                v-for="item in items" :key="item.name" :to="item.href" class="text-5xl" active-class="active"
                @click="updateIndicatorPosition"
              >
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
  <!-- <div class="w-full p-2 px-20">
   <UBreadcrumb :links="breadCrumbItems" >
    <template #divider>
        <span class="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
      </template>
   </UBreadcrumb>
 </div> -->
</template>

<style>
.link {
  @apply cursor-pointer;
}

.active {
  @apply text-orange-400 transition-all duration-300;
}

.indicator {
  @apply w-12 h-2 absolute -bottom-5 bg-gray-100 rounded-t transition-transform duration-300;
}
</style>
