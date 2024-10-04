<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import type { Country as BaseCountry } from '../interfaces'
import RandomCountriesWidget from '../components/RandomCountriesWidget.vue'

interface Country extends BaseCountry {
  nextHoliday: string | null
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const searchTerm = ref('')
const allCountries = ref<Country[]>([])
const filteredCountries = computed(() =>
  allCountries.value.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

const randomCountries = ref<Country[]>([])
const isLoading = ref(true)

async function fetchAllCountries() {
  try {
    const response = await axios.get(`${apiBaseUrl}/AvailableCountries`)
    allCountries.value = response.data.map((country: BaseCountry) => ({
      ...country,
      nextHoliday: null
    }))
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

async function fetchRandomCountries() {
  try {
    const selectedCountries: Country[] = []
    while (selectedCountries.length < 3) {
      const randomIndex = Math.floor(Math.random() * allCountries.value.length)
      const randomCountry = allCountries.value[randomIndex]
      if (!selectedCountries.includes(randomCountry)) {
        selectedCountries.push(randomCountry)
      }
    }
    for (const country of selectedCountries) {
      const nextHolidayResponse = await axios.get(
        `${apiBaseUrl}/NextPublicHolidays/${country.countryCode}`
      )

      const nextHoliday = nextHolidayResponse.data.length > 0 ? nextHolidayResponse.data[0] : null

      randomCountries.value.push({
        ...country,
        nextHoliday: nextHoliday
          ? `${nextHoliday.localName} on ${nextHoliday.date}`
          : 'No upcoming holidays'
      })
    }
  } catch (error) {
    console.error('Error fetching holiday data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchAllCountries()
  await fetchRandomCountries()
})
</script>

<template>
  <div class="container">
    <div class="country_search_list">
      <app-input-text v-model="searchTerm" placeholder="Search for a country..." />
      <ul>
        Countries List
        <li v-for="country in filteredCountries" :key="country.countryCode">
          <router-link :to="{ name: 'Country', params: { id: country.countryCode } }">
            {{ country.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <RandomCountriesWidget
      class="countries_widget"
      :randomCountries="randomCountries"
      :isLoading="isLoading"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.country_search_list {
  flex: 1;
  max-width: 33%;
  padding: 1rem;
}

.countries_widget {
  flex: 2;
  max-width: 66%;
  padding: 1rem;
}
</style>
