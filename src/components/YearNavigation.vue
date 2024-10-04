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
    <app-button
      class="btn_year"
      severity="secondary"
      rounded
      v-for="year in years"
      :key="year"
      :class="{ selected: year === selectedYear }"
      @click="handleYearChange(year)"
    >
      {{ year }}
    </app-button>
  </div>
</template>

<style scoped>
.selected {
  font-weight: bold;
  color: bisque;
}

.btn_year {
  margin-right: 10px;
}
</style>
