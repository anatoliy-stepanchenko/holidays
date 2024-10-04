<template>
  <div class="random-countries-widget">
    <h2>Random Countries and Their Next Holidays</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="countries-list">
      <div v-for="country in randomCountries" :key="country.countryCode" class="country-card">
        <h3>{{ country.name }}</h3>
        <p class="holiday">{{ country.nextHoliday }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Country } from '../interfaces'

const props = defineProps<{
  randomCountries: Country[]
  isLoading: boolean
}>()
</script>

<style scoped>
.random-countries-widget {
  padding: 1rem;
  border-radius: 8px;
  background-color: #000000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 1rem; /* Відступ від верхньої частини */
}

.countries-list {
  display: flex;
  flex-direction: column;
}

.country-card {
  background-color: gray;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.country-card:hover {
  transform: translateY(-3px);
}
</style>
