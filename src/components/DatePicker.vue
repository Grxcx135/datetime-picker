<template>
  <v-container :fluid="true" class="pa-0">
    <v-card
      elevation="0"
      variant="outlined"
      style="display: flex; align-items: center"
      width="200px"
      class="pa-2 pb-0"
    >
      <v-row class="">
        <v-col cols="8" class="pa-2 d-flex flex-row pt-0 pr-0">
          <v-col cols="3" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.date.day"
              label=""
              variant="plain"
              hide-details
              @input="setDate($event, 'day')"
            >
            </v-text-field></v-col
          ><span class="size-text">/</span>
          <v-col cols="3" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.date.month"
              label=""
              variant="plain"
              hide-details
              @input="setDate($event, 'month')"
            ></v-text-field></v-col
          ><span class="size-text">/</span>
          <v-col cols="" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.date.year"
              label=""
              variant="plain"
              hide-details
              @input="setDate($event, 'year')"
            ></v-text-field
          ></v-col>
        </v-col>
        <v-col class="pa-0 d-flex flex-row">
          <v-text-field
            v-model="dateTimeInput.time.hour"
            label=""
            variant="plain"
            hide-details
            @input="setTime($event, 'hour')"
          ></v-text-field>
          <span class="size-text">:</span>
          <v-text-field
            v-model="dateTimeInput.time.minute"
            label=""
            variant="plain"
            hide-details
            @input="setTime($event, 'minute')"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <p>Date is {{ convertToDate() }}</p>
    <p>Date Time is {{ dateFormattedWithTime }}</p>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue';
import dayjs from 'dayjs';
import { isNaN } from 'lodash';
import { formatDateWithSlash, formatDateWithTime } from '@/utils/formatDate';
import dateTime from '@/dto/dateTime.dto';
const dateFormatted = ref<string | undefined>();
const dateFormattedWithTime = ref<string | undefined>();

const dateTimeInput = reactive(
  new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  })
);

function convertToDate() {
  const dateStringConvertToDate = new Date(
    Number(dateTimeInput.date.year),
    Number(dateTimeInput.date.month) - 1,
    Number(dateTimeInput.date.day),
    !isNaN(Number(dateTimeInput.time.hour))
      ? Number(dateTimeInput.time.hour)
      : 0,
    !isNaN(Number(dateTimeInput.time.minute))
      ? Number(dateTimeInput.time.minute)
      : 0
  );
  dateFormatted.value = formatDateWithSlash(dateStringConvertToDate);
  dateFormattedWithTime.value = formatDateWithTime(dateStringConvertToDate);
  return dateFormatted.value;
}

// const days = dateStringConvertToDate.getDate();
// if (checkCorrectDays(days)) {
//   dateTimeInput.date.day = '';
// }

// function checkCorrectDays(daysCount: number) {
//   console.log('check', daysCount);
//   if (!isNaN(dayjs(dateFormatted.value).daysInMonth())) {
//     return Number(dateTimeInput.date.day) > daysCount;
//   }
// }

function setDate(event: InputEvent, dateUnit: keyof typeof dateTimeInput.date) {
  if (!event.target) {
    return;
  }
  if (event.inputType === 'insertText') {
    if (isNaN(Number(event.data))) {
      dateTimeInput.date[dateUnit] = event.target._value.slice(
        0,
        event.target._value.length - 1
      );
    } else {
      if (checkMoreThanMaximumDate()) {
        dateTimeInput.date[dateUnit] = dateTimeInput.date[dateUnit].slice(
          0,
          dateTimeInput.date[dateUnit].length - 1
        );
      } else if (checkLessThanTenOfDate(dateUnit)) {
        dateTimeInput.date[dateUnit] = dateTimeInput.isDateUnitYear(dateUnit)
          ? '000' + event.data
          : '0' + event.data;
      } else {
        dateTimeInput.date[dateUnit] = dateTimeInput.isDateUnitYear(dateUnit)
          ? dateTimeInput.date.year.slice(1, 4) + event.data
          : dateTimeInput.date[dateUnit][1] + event.data;
      }
    }
  } else {
    if (!isNaN(Number(event.data))) {
      dateTimeInput.date[dateUnit] =
        dateUnit === 'day' ? 'DD' : dateUnit === 'month' ? 'MM' : 'YYYY';
    }
  }
}

function setTime(event: InputEvent, timeUnit: keyof typeof dateTimeInput.time) {
  if (!event.target) {
    return;
  }
  if (event.inputType === 'insertText') {
    if (isNaN(Number(event.data))) {
      dateTimeInput.time[timeUnit] = event.target._value.slice(
        0,
        event.target._value.length - 1
      );
    } else {
      if (checkMoreThanMaximumTime()) {
        dateTimeInput.time[timeUnit] = dateTimeInput.time[timeUnit].slice(0, 2);
      } else if (checkLessThanTenOfTime(timeUnit)) {
        dateTimeInput.time[timeUnit] = '0' + event.data;
      } else {
        dateTimeInput.time[timeUnit] =
          dateTimeInput.time[timeUnit][1] + event.data;
      }
    }
  } else {
    if (!isNaN(Number(event.data))) {
      dateTimeInput.time[timeUnit] = timeUnit === 'hour' ? 'HH' : 'mm';
    }
  }
}

function checkMoreThanMaximumDate(): boolean {
  return (
    Number(dateTimeInput.date.day) > 31 ||
    Number(dateTimeInput.date.month) > 12 ||
    String(Number(dateTimeInput.date.year)).length > 4
  );
}

function checkLessThanTenOfDate(
  dateUnit: keyof typeof dateTimeInput.date
): boolean {
  return (
    Number(dateTimeInput.date[dateUnit]) < 10 ||
    isNaN(Number(dateTimeInput.date[dateUnit]))
  );
}

function checkMoreThanMaximumTime(): boolean {
  return (
    Number(dateTimeInput.time.hour) > 24 ||
    Number(dateTimeInput.time.minute) > 60
  );
}

function checkLessThanTenOfTime(
  timeUnit: keyof typeof dateTimeInput.time
): boolean {
  return (
    Number(dateTimeInput.time[timeUnit]) < 10 ||
    isNaN(Number(dateTimeInput.time[timeUnit]))
  );
}
</script>

<style scoped>
.size-text {
  font-size: 25px;
}
</style>
