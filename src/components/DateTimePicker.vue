<template>
  <v-container :fluid="true" class="pa-0">
    <DatePicker
      v-if="props.timeType === 'None'"
      :variantType="props.variantType"
      :width="props.width"
    />
    <DatePickerMilitaryTime
      v-else-if="props.timeType === 'militaryTime'"
      :variantType="props.variantType"
      :width="props.width"
    />
    <DatePickerTwelveHourClock
      v-else-if="props.timeType === 'twelveHour'"
      :variantType="props.variantType"
      :width="props.width"
    />
  </v-container>
</template>

<script setup lang="ts">
import DatePickerMilitaryTime from './DatePickerMilitaryTime.vue';
import DatePickerTwelveHourClock from './DatePickerTwelveHourClock.vue';
import DatePicker from './DatePicker.vue';

const props = defineProps<{
  timeType: 'None' | 'militaryTime' | 'twelveHour';
  variantType?:
    | 'flat'
    | 'text'
    | 'elevated'
    | 'tonal'
    | 'outlined'
    | 'plain';
  width?: string;
}>();
</script>

<style scoped></style>
