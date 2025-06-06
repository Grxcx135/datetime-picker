<template>
  <v-menu
    v-model="isOpenDatePicker"
    :close-on-content-click="props.closeOnContentClick"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-text-field
        v-model="selectedDate"
        readonly
        v-bind="{ ...activatorProps, ...props }"
        append-inner-icon="calendarMonthOutline"
        hide-details
        clearable
        @click:clear="selectedDate = ''"
      ></v-text-field>
    </template>
    <v-card class="w-100">
      <v-row class="pa-0">
        <v-col class="pa-0 d-flex align-center justify-center"
          ><v-date-picker
            v-model="selectedDate"
            @update:modelValue="convertTime"
            label=""
            width="100%"
            hide-header
            elevation="5"
            color="primary"
          ></v-date-picker
        ></v-col>
        <v-col class="pa-0">
          <span>Select Time</span>
          <div class="pa-0 d-flex align-center justify-center">
            <v-time-picker
              v-model="selectedTime"
              hide-header
              scrollable
              elevation="5"
              class="clock-size pa-0"
            ></v-time-picker>
          </div>
        </v-col>
      </v-row>
      <v-row width="100%" class="justify-end">
        <v-btn @click="selectedDate = ''" color="red">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="handleOnClose" color="primary">Close</v-btn>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import dayjs from 'dayjs';

type dateTime = string | Date | dayjs.Dayjs;

const props = defineProps({
  closeOnContentClick: Boolean
});
const isOpenDatePicker = ref(false);
const selectedDate = ref<dateTime>('');
const selectedTime = ref<dateTime>('');

watch(selectedDate, (val) => {
  console.log('selectedDate : ', val);
});

watch(selectedTime, (val) => {
  console.log('selectedTime : ', val);
});

function convertTime() {
  selectedDate.value = dayjs(selectedDate.value).format('DD/MM/YYYY');
}

// const convertTime = computed(() => {
//   return dayjs(selectedDate.value).format('DD/MM/YYYY');
// });

function handleOnClose() {
  isOpenDatePicker.value = false;
}
</script>

<style scoped>
.clock-size.v-time-picker-clock {
  height: 200px;
  width: 200px;
  margin: 0px;
}
</style>
