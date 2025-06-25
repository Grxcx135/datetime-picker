<template>
  <main>
    <v-row>
      <v-col>
        <DateTimePicker
          v-model:date-input="datePicker"
          timeType="None"
          variantType="outlined"
          color="stageDark4"
          dateForm="/"
          minDate="2/3/2532"
          maxDate="2/3/2532"
          clearable
        />
        <span>Date is {{ datePicker }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DateTimePicker
          v-model:date-input="dateTimeMilitaryPicker"
          timeType="militaryTime"
          variantType="tonal"
          color="red"
          minDate="2/3/2532"
          maxDate="2/3/2533"
          default-time="7:3"
          clearable
        />
        <span>Date is {{ dateTimeMilitaryPicker }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DateTimePicker
          v-model:date-input="dateTimeTwelvePicker"
          timeType="twelveHour"
          clearable
        />
        <span>Date is {{ dateTimeTwelvePicker }}</span>
      </v-col>
    </v-row>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
const datePicker = ref<string | undefined>();
const dateTimeMilitaryPicker = ref<string | undefined>();
const dateTimeTwelvePicker = ref<string | undefined>();

function handleClickClear(event: InputEvent) {
  console.log(event);
}
function handleUpdateValueDate(event: InputEvent) {
  console.log('date', event);
}
function handleUpdateValueMilitary(event: InputEvent) {
  console.log('military', event);
}
function handleUpdateValueTwelve(event: InputEvent) {
  console.log('twelve', event);
}
</script>
