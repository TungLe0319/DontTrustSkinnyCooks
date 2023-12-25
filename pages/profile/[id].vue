<template>
  <div>
    hello profile {{ id }}
  </div>
</template>

<script lang="ts" setup>
const id = useRoute().params.id
</script>

<style>

</style>

