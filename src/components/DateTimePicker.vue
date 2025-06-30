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
      :fullWidth="props.fullWidth"
      @update:dateInput="handleEmitData($event)"
      @update:click-clearable="emit('clickClearable', $event)"
    />
    <DatePickerMilitaryTime
      v-else-if="props.timeType === 'militaryTime'"
      :variantType="props.variantType"
      :width="props.width"
      :defaultDate="props.defaultDate"
      :defaultTime="props.defaultTime"
      :clearable="props.clearable"
      :color="props.color"
      :disabled="props.disabled"
      :height="props.height"
      :position="props.position"
      :dateForm="props.dateForm"
      :space="props.space"
      :minDate="props.minDate"
      :maxDate="props.maxDate"
      :maxTime="props.maxTime"
      :minTime="props.minTime"
      :readonly="props.readonly"
      :borderRadius="props.borderRadius"
      :elevationNumber="props.elevationNumber"
      :fullWidth="props.fullWidth"
      @update:militaryInput="handleEmitData($event)"
      @update:click-clearable="emit('clickClearable', $event)"
    />
    <DatePickerTwelveHourClock
      v-else-if="props.timeType === 'twelveHour'"
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
      @update:twelveHourInput="handleEmitData($event)"
    />
  </v-container>
</template>

<script setup lang="ts">
import DatePickerMilitaryTime from './DatePickerMilitaryTime.vue';
import DatePickerTwelveHourClock from './DatePickerTwelveHourClock.vue';
import DatePicker from './DatePicker.vue';
import type { positionType } from './DateTimeProps';
import type { variantType as variant } from './DateTimeProps';
import type { roundedType } from './DateTimeProps';

const emit = defineEmits(['update:dateInput', 'clickClearable', 'updateValue']);

const props = defineProps<{
  timeType: 'None' | 'militaryTime' | 'twelveHour';
  variantType?: variant;
  position?: positionType;
  width?: string;
  defaultDate?: string;
  defaultTime?: string;
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
  fullWidth?: true;
  maxTime?: string;
  minTime?: string;
}>();

function handleEmitData(event: InputEvent) {
  emit('update:dateInput', event);
  emit('updateValue', true);
}
</script>

<style scoped></style>
