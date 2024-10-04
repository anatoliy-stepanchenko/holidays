<script setup lang="ts">
import { defineProps } from 'vue'
import type { Holiday } from '../interfaces'

const props = defineProps<{
  holidays: Holiday[]
}>()
</script>

<template>
  <div>
    <ul>
      <li v-for="holiday in holidays" :key="holiday.date">
        {{ holiday.localName }} - {{ holiday.date }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>
