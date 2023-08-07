<template>
  <RouterView :key="$route.fullPath" />

  <Loader />
</template>

<script setup lang="ts">
import Loader from '@/components/utils/Loader.vue'
</script>
