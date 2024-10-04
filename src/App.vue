<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <h1>app</h1>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
