<template>
  <v-container :fluid="true" class="pa-0">
    <DatePicker
      v-if="props.timeType === 'None'"
      :variantType="props.variantType"
      :width="props.width"
      :defaultDate="props.defaultDate"
      :clearable="props.clearable"
      :color="props.color"
      :disabled="props.disabled"
      :height="props.height"
      :position="props.position"
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
  position?:
    | 'fixed'
    | 'relative'
    | 'static'
    | 'absolute'
    | 'sticky';
  width?: string;
  defaultDate?: string;
  clearable?: true;
  color?: string;
  disabled?: true;
  height?: string | number;
}>();
</script>

<style scoped></style>
