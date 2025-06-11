<template>
  <v-container :fluid="true" class="pa-0">
    <v-card
      elevation="0"
      variant="outlined"
      style="display: flex; align-items: center"
      width="200px"
      class="pa-2 pb-0"
    >
      <v-row>
        <v-col class="pa-2 d-flex flex-row pt-0">
          <v-col class="pa-0"
            ><v-text-field
              v-model="date.day"
              label=""
              variant="plain"
              hide-details
              placeholder="DD"
              @input="setDate($event, 'day')"
            >
            </v-text-field></v-col
          ><span class="size-text">/</span>
          <v-col class="pa-0"
            ><v-text-field
              v-model="date.month"
              label=""
              :maxlength="2"
              variant="plain"
              hide-details
              placeholder="MM"
              @input="setDate($event, 'month')"
            ></v-text-field></v-col
          ><span class="size-text">/</span>
          <v-col class="pa-0"
            ><v-text-field
              v-model="date.year"
              label=""
              :maxlength="4"
              variant="plain"
              hide-details
              placeholder="YYYY"
              @input="setDate($event, 'year')"
            ></v-text-field
          ></v-col>
        </v-col>
        <!-- <v-col class="pa-0 d-flex flex-row">
          <v-col class="pa-0"
            ><v-text-field
              v-model="time.hour"
              label=""
              :maxlength="2"
              variant="plain"
              hide-details
              @input="setTime"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0"
            ><v-text-field
              v-model="time.minute"
              label=""
              :maxlength="2"
              variant="plain"
              hide-details
              @input="setTime"
            ></v-text-field
          ></v-col>
        </v-col> -->
      </v-row>
    </v-card>
    <span>date is {{ convertToDate }}</span>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import dayjs from 'dayjs';
import { isNaN } from 'lodash';

type selectDate = '' | number;

const isOpenDatePicker = ref(false);
const selectedDate = ref<selectDate>('');
const selectedTime = ref<string>('');
const date = ref({ day: 'DD', month: 'MM', year: 'YYYY' });
const time = ref({ hour: '', minute: '' });

// watch(date.value, (val) => {
//   console.log('date : ', val);
// });

// function convertTime() {
//   selectedDate.value = dayjs(selectedDate.value).format('DD/MM/YYYY');
// }

// TODO: add function for group date and time -> utils
// TODO: add condition if not select time,use default at now/undefined -> utils

const convertToDate = computed(() => {
  const dateTypeString = new Date(
    Number(date.value.year),
    Number(date.value.month) - 1,
    Number(date.value.day)
  );
  return dayjs(dateTypeString).format('DD/MM/YYYY');
});

// function handleOnClose() {
//   isOpenDatePicker.value = false;
// }
function setDate(event, dateType: string) {
  if (event.inputType === 'insertText') {
    if (isNaN(Number(event.data))) {
      date.value[dateType] = event.target._value.slice(
        0,
        event.target._value.length - 1
      );
    } else {
      if (dateType === 'day') {
        if (Number(date.value.day) > 31) {
          date.value.day = date.value.day.slice(0, date.value.day.length - 1);
        } else if (
          Number(date.value.day) < 10 ||
          isNaN(Number(date.value.day))
        ) {
          date.value.day = '0' + event.data;
        } else {
          date.value.day = date.value.day[1] + event.data;
        }
      } else if (dateType === 'month') {
        if (Number(date.value.month) > 12) {
          date.value.month = date.value.month.slice(
            0,
            date.value.month.length - 1
          );
        }
      }
    }
  }
}

function setTime() {}
</script>

<style scoped>
.size-text {
  font-size: 25px;
}
</style>
