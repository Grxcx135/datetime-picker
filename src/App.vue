<template>
  <v-app>
    <v-container :fluid="true" width="200px" class="pa-0">
      <DatePicker
        v-model:date-value="dateTimePick"
        v-model:menuOpen="isOpenDatePicker"
      />
      <v-text-field append-inner-icon="calendarMonthOutline" clearable />
      <!-- <v-date-picker elevation="24"></v-date-picker> -->
    </v-container>
  </v-app>
</template>
s
<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from './components/DatePicker.vue';

const isOpenDatePicker = ref(false);
const dateTimePick = ref('');
</script>

<style></style>
