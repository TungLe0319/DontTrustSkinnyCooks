<!-- <template>
  <div>
       <div class="container mx-auto my-5 p-5">
              <div class="md:flex no-wrap md:-mx-2 ">
                  <!-- Left Side -->
                  <div class="w-full md:w-3/12 md:mx-2">
                      <!-- Profile Card -->
                      <div class="bg-white p-3 border-t-4 border-green-400 shadow-xl">
                          <div class="image overflow-hidden">
                              <img class="h-auto w-full mx-auto"
                                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                  alt="">
                          </div>

                          <div class="flex flex-col items-center justify-center gap-4">
                              <img :src="session?.user?.image || ''" alt="profile picture" class="rounded-full shadow-xl">
                              <h1 class="text-gray-900 font-extrabold text-4xl leading-8 my-1">
                                  {{ session?.user?.name }}
                              </h1>
                          </div>

                          <ul
                              class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
>
                              <li class="flex items-center py-3">
                                  <span>Status</span>
                                  <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                          {{ status }}
                                      </span></span>
                              </li>
                              <li class="flex items-center py-3">
                                  <span>Member since</span>
                                  <span class="ml-auto">Nov 07, 2016</span>
                              </li>
                          </ul>

                      </div>
                      <!-- End of profile card -->
                      <div class="my-4">
                          <AdOne />
                      </div>

                  </div>
                  <!-- Right Side -->
                  <div class="w-full md:w-9/12 mx-2 h-64">
                      <!-- Profile tab -->
                      <!-- About Section -->
                      <div class="bg-white p-3 shadow-sm rounded-sm">
                          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                              <Icon name="uil:user" class="text-3xl" />
                              <span class="tracking-wide">About</span>
                          </div>

                      </div>
                      <!-- End of about section -->
                      <div class="my-4"></div>

                      <!-- Experience and education -->
                      <div class="bg-white p-3 shadow-sm rounded-sm">
                          <div class="grid grid-cols-2">
                              <div>
                                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                      <Icon name="arcticons:recipe-keeper" class="text-3xl" />
                                      <span class="tracking-wide"> My Recipes</span>
                                  </div>

                              </div>
                          </div>
                          <div class="grid  grid-cols-3 gap-2  ">
                              <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" class="" />
                          </div>
                          <!-- End of Experience and education grid -->
                      </div>
                      <!-- End of profile tab -->
                  </div>
              </div>
          </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style> -->
