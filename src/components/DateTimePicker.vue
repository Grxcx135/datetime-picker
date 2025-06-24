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
      :dateForm="props.dateForm"
      :space="props.space"
      :minDate="props.minDate"
      :maxDate="props.maxDate"
      :readonly="props.readonly"
      :borderRadius="props.borderRadius"
      :elevationNumber="props.elevationNumber"
      @update:dateInput="handleEmit($event)"
    />
    <DatePickerMilitaryTime
      v-else-if="props.timeType === 'militaryTime'"
      :variantType="props.variantType"
      :width="props.width"
      :defaultDate="props.defaultDate"
      :clearable="props.clearable"
      :color="props.color"
      :disabled="props.disabled"
      :height="props.height"
      :position="props.position"
      :dateForm="props.dateForm"
      :space="props.space"
      :minDate="props.minDate"
      :maxDate="props.maxDate"
      :readonly="props.readonly"
      :borderRadius="props.borderRadius"
      :elevationNumber="props.elevationNumber"
      @update:militaryInput="handleEmit($event)"
    />
    <DatePickerTwelveHourClock
      v-else-if="props.timeType === 'twelveHour'"
      :variantType="props.variantType"
      :width="props.width"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DatePickerMilitaryTime from './DatePickerMilitaryTime.vue';
import DatePickerTwelveHourClock from './DatePickerTwelveHourClock.vue';
import DatePicker from './DatePicker.vue';
import type { positionType } from './DateTimeProps';
import type { variantType as variant } from './DateTimeProps';
import type { roundedType } from './DateTimeProps';

const emit = defineEmits(['update:dateInput']);

const props = defineProps<{
  timeType: 'None' | 'militaryTime' | 'twelveHour';
  variantType?: variant;
  position?: positionType;
  width?: string;
  defaultDate?: string;
  clearable?: true;
  color?: string;
  disabled?: true;
  height?: string | number;
  dateForm?: string;
  space?: number;
  minDate?: string;
  maxDate?: string;
  readonly?: true;
  borderRadius?: roundedType;
  elevationNumber?: number | string;
}>();

function handleEmit(event: InputEvent) {
  emit('update:dateInput', event);
}
</script>

<style scoped></style>
