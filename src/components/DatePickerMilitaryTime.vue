<template>
  <v-container :fluid="true" class="pa-0">
    <v-card
      elevation="0"
      :variant="props.variantType"
      style="display: flex; align-items: center"
      :width="props.width"
      class="pa-2 pb-0"
    >
      <v-row class="">
        <v-col
          cols="7"
          class="pa-2 d-flex flex-row pt-0 pr-0"
        >
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
        <v-col cols="4" class="pl-2 pa-0 d-flex flex-row">
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
import { ref, reactive } from 'vue';
import { isNaN } from 'lodash';
import {
  formatDate,
  formatDateWithTime
} from '@/utils/formatDate';
import dateTime from '@/dto/dateTime.dto';
import {
  checkMoreThanMaximumMonthAndYear,
  isMoreThanMaximumDays,
  checkLessThanTen
} from '@/utils/dateFunction';
import { checkMoreThanMaximumTime } from '@/utils/timeFunction';

const props = withDefaults(
  defineProps<{
    variantType?:
      | 'flat'
      | 'text'
      | 'elevated'
      | 'tonal'
      | 'outlined'
      | 'plain';
    width?: string;
  }>(),
  {
    variantType: 'outlined',
    width: '200px'
  }
);
const dateTypeDate = ref<Date | undefined>();
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
  dateTypeDate.value = dateStringConvertToDate;
  dateFormatted.value = formatDate(
    dateStringConvertToDate,
    '/',
    0
  );
  dateFormattedWithTime.value = formatDateWithTime(
    dateStringConvertToDate
  );
  return dateFormatted.value;
}

function setDate(
  event: InputEvent,
  dateUnit: keyof typeof dateTimeInput.date
) {
  if (!event.target) {
    return;
  }
  if (event.inputType === 'insertText') {
    if (isNaN(Number(event.data))) {
      dateTimeInput.date[dateUnit] =
        event.target._value.slice(
          0,
          event.target._value.length - 1
        );
    } else {
      if (
        checkMoreThanMaximumMonthAndYear(
          dateTimeInput.date.month,
          dateTimeInput.date.year
        )
      ) {
        dateTimeInput.date[dateUnit] = dateTimeInput.date[
          dateUnit
        ].slice(0, dateTimeInput.date[dateUnit].length - 1);
      } else if (
        isMoreThanMaximumDays(
          dateTimeInput.date.day,
          dateTimeInput.date.month,
          dateTypeDate.value
        )
      ) {
        dateTimeInput.date.day = 'DD';
        dateTimeInput.date.month =
          Number(dateTimeInput.date.month) < 10
            ? '0' + Number(dateTimeInput.date.month)
            : dateTimeInput.date.month;
      } else if (
        checkLessThanTen(dateTimeInput.date[dateUnit])
      ) {
        dateTimeInput.date[dateUnit] =
          dateTimeInput.isDateUnitYear(dateUnit)
            ? '000' + event.data
            : '0' + event.data;
      } else {
        dateTimeInput.date[dateUnit] =
          dateTimeInput.isDateUnitYear(dateUnit)
            ? dateTimeInput.date.year.slice(1, 4) +
              event.data
            : dateTimeInput.date[dateUnit][1] + event.data;
      }
    }
  } else {
    if (!isNaN(Number(event.data))) {
      dateTimeInput.date[dateUnit] =
        dateUnit === 'day'
          ? 'DD'
          : dateUnit === 'month'
            ? 'MM'
            : 'YYYY';
    }
  }
}

function setTime(
  event: InputEvent,
  timeUnit: keyof typeof dateTimeInput.time
) {
  if (!event.target) {
    return;
  }
  if (event.inputType === 'insertText') {
    if (isNaN(Number(event.data))) {
      dateTimeInput.time[timeUnit] =
        event.target._value.slice(
          0,
          event.target._value.length - 1
        );
    } else {
      if (
        checkMoreThanMaximumTime(
          dateTimeInput.time.hour,
          dateTimeInput.time.minute
        )
      ) {
        if (dateTimeInput.time[timeUnit]) {
          dateTimeInput.time[timeUnit] = dateTimeInput.time[
            timeUnit
          ].slice(0, 2);
        }
      } else if (
        checkLessThanTen(dateTimeInput.time[timeUnit])
      ) {
        dateTimeInput.time[timeUnit] = '0' + event.data;
      } else {
        if (dateTimeInput.time[timeUnit]) {
          dateTimeInput.time[timeUnit] =
            dateTimeInput.time[timeUnit][1] + event.data;
        }
      }
    }
  } else {
    if (!isNaN(Number(event.data))) {
      dateTimeInput.time[timeUnit] =
        timeUnit === 'hour' ? 'HH' : 'mm';
    }
  }
}
</script>

<style scoped>
.size-text {
  font-size: 25px;
}
</style>
