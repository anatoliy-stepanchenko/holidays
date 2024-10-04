<template>
  <div>
    <h2>Random Countries and Their Next Holidays</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="country in randomCountries" :key="country.countryCode">
          <strong>{{ country.name }}</strong
          >: {{ country.nextHoliday }}
        </li>
      </ul>
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

<style scoped></style>
