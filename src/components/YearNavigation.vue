<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  years: number[]
  selectedYear: number
}>()

const emits = defineEmits<{
  (e: 'onYearChange', year: number): void
}>()

function handleYearChange(year: number) {
  emits('onYearChange', year)
}
</script>

<template>
  <div>
    <button
      v-for="year in years"
      :key="year"
      :class="{ selected: year === selectedYear }"
      @click="handleYearChange(year)"
    >
      {{ year }}
    </button>
  </div>
</template>

<style scoped>
.selected {
  font-weight: bold;
  color: bisque;
}

button {
  margin-right: 10px;
}
</style>
