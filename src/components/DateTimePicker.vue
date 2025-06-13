<template>
  <v-container :fluid="true" class="pa-0">
    <DatePickerMilitaryTime v-if="props.timeType === 'militaryTime'" />
  </v-container>
</template>

<script setup lang="ts">
import DatePickerMilitaryTime from './DatePickerMilitaryTime.vue';

const props = defineProps({
  timeType: String
});
</script>

<style scoped></style>
