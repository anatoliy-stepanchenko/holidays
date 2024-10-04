import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { Country, Holiday } from '../interfaces'

export function useCountry(countryCode: string) {
  const countryName = ref<string>('')
  const holidays = ref<Holiday[]>([])
  const isLoading = ref<boolean>(true)
  const selectedYear = ref<number>(new Date().getFullYear())

  async function fetchCountryName() {
    try {
      const response = await axios.get<Country[]>('https://date.nager.at/api/v3/AvailableCountries')
      const country = response.data.find((c) => c.countryCode === countryCode)
      if (country) {
        countryName.value = country.name
      }
    } catch (error) {
      console.error('Error fetching country name:', error)
    }
  }

  async function fetchHolidays(year: number) {
    try {
      isLoading.value = true
      const response = await axios.get<Holiday[]>(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
      )
      holidays.value = response.data
    } catch (error) {
      console.error('Error fetching holidays:', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchCountryName()
    fetchHolidays(selectedYear.value)
  })

  return {
    countryName,
    holidays,
    isLoading,
    selectedYear,
    fetchHolidays
  }
}
