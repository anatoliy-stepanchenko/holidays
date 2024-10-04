<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useCountry } from '../composables/useCountry'
import YearNavigation from '../components/YearNavigation.vue'
import HolidayList from '../components/HolidayList.vue'

const route = useRoute()
const router = useRouter()
const countryCode = route.params.id as string
const years = Array.from({ length: 11 }, (_, index) => 2020 + index)

const { countryName, holidays, isLoading, selectedYear, fetchHolidays } = useCountry(countryCode)

function goToHome() {
  router.push('/')
}

function changeYear(year: number) {
  selectedYear.value = year
  fetchHolidays(year)
}
</script>

<template>
  <div class="country-view">
    <h1>{{ countryName }}</h1>
    <button @click="goToHome">На головну</button>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <HolidayList :holidays="holidays" />
    </div>
    <YearNavigation :years="years" :selectedYear="selectedYear" @onYearChange="changeYear" />
  </div>
</template>

<style scoped>
.country-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

button {
  margin: 10px;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
