<template>
  <v-container :fluid="true" class="pa-0">
    <DatePickerMilitaryTime v-if="props.timeType === 'militaryTime'" />
    <DatePickerTwelveHourClock v-else-if="props.timeType === 'twelveHour'" />
  </v-container>
</template>

<script setup lang="ts">
import DatePickerMilitaryTime from './DatePickerMilitaryTime.vue';
import DatePickerTwelveHourClock from './DatePickerTwelveHourClock.vue';

const props = defineProps({
  timeType: String
});
</script>

<style scoped></style>
