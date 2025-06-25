<template>
  <v-container :fluid="true" class="pa-0">
    <v-card
      :variant="props.variantType"
      :width="props.width"
      :color="props.color"
      :height="props.height"
      :position="props.position"
      :rounded="props.borderRadius"
      :elevation="props.elevationNumber"
      style="display: flex; align-items: center"
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
              :disabled="props.disabled"
              :readonly="props.readonly"
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
              :disabled="props.disabled"
              :readonly="props.readonly"
              @input="setDate($event, 'month')"
            ></v-text-field></v-col
          ><span class="size-text">/</span>
          <v-col cols="" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.date.year"
              label=""
              variant="plain"
              hide-details
              :disabled="props.disabled"
              :readonly="props.readonly"
              @input="setDate($event, 'year')"
            ></v-text-field
          ></v-col>
        </v-col>
        <v-col cols="" class="pa-0 d-flex flex-row">
          <v-col cols="3" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.time.hour"
              label=""
              variant="plain"
              hide-details
              @input="setTime($event, 'hour')"
            ></v-text-field
          ></v-col>
          <span class="size-text">:</span>
          <v-col cols="4" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.time.minute"
              label=""
              variant="plain"
              hide-details
              @input="setTime($event, 'minute')"
            ></v-text-field
          ></v-col>
          <v-col cols="4" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.time.meridiemType"
              label=""
              variant="plain"
              hide-details
              @input="setMeridiemType($event)"
            ></v-text-field
          ></v-col>
        </v-col>
      </v-row>
      <div>
        <v-icon
          v-if="props.clearable && !disabled && !readonly"
          icon="$clearable"
          class="pt-0 pb-2 px-1"
          @click="setDefaultDateTime()"
        ></v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { isNaN } from 'lodash';
import { formatDateWithMeridiemTime } from '@/utils/formatDate';
import dateTime from '@/dto/dateTime.dto';
import type { dateTimeProps } from './DateTimeProps';
import { defaultDateTimeProps } from './DateTimeProps';
import {
  isMoreThanMaximumMonthAndYear,
  isMoreThanMaximumDays,
  isLessThanTen,
  setDefaultByDateUnit
} from '@/utils/dateFunction';
import {
  isMoreThanMaximumTwelveTime,
  setMeridiemType as selectMeridiemType,
  setDefaultByTimeUnit,
  calculateHour
} from '@/utils/timeFunction';

const emit = defineEmits(['update:twelveHourInput']);
const props = withDefaults(defineProps<dateTimeProps>(), {
  ...defaultDateTimeProps,
  width: '250px'
});

dayjs.extend(isLeapYear);
const dateTypeDate = ref<Date | undefined>();
const dateFormattedWithTime = ref<string | undefined>();

const dateTimeInput = reactive(
  new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm', meridiemType: 'aa' }
  })
);

function convertToDate() {
  const dateStringConvertToDate = new Date(
    Number(dateTimeInput.date.year),
    Number(dateTimeInput.date.month) - 1,
    Number(dateTimeInput.date.day),
    !isNaN(Number(dateTimeInput.time.hour))
      ? calculateHour(
          dateTimeInput.time.meridiemType ?? 'a',
          dateTimeInput.time.hour
        )
      : 0,
    !isNaN(Number(dateTimeInput.time.minute))
      ? Number(dateTimeInput.time.minute)
      : 0
  );
  dateTypeDate.value = dateStringConvertToDate;
  dateFormattedWithTime.value = formatDateWithMeridiemTime(
    dateStringConvertToDate,
    props.dateForm,
    props.space
  );
  if (dateFormattedWithTime.value !== 'Invalid Date') {
    const minDateTypeDate = new Date(props.minDate ?? '');
    const maxDateTypeDate = new Date(props.maxDate ?? '');
    if (
      dateStringConvertToDate < minDateTypeDate ||
      dateStringConvertToDate > maxDateTypeDate
    ) {
      setDefaultDateTime();
    } else {
      emit(
        'update:twelveHourInput',
        dateFormattedWithTime.value
      );
    }
  }
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
        setDefaultByDateUnit(dateUnit);
    } else {
      addDateInDateTimeInput(event, dateUnit);
      moreThanMaximumDate(dateUnit);
    }
  } else {
    if (!isNaN(Number(event.data))) {
      dateTimeInput.date[dateUnit] =
        setDefaultByDateUnit(dateUnit);
    }
  }
  if (
    String(Number(dateTimeInput.date.year)).length === 4
  ) {
    convertToDate();
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
        setDefaultByTimeUnit(timeUnit);
    } else {
      if (
        isMoreThanMaximumTwelveTime(
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
        isLessThanTen(dateTimeInput.time[timeUnit])
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
        setDefaultByTimeUnit(timeUnit);
    }
  }
  convertToDate();
}

function addDateInDateTimeInput(
  event: InputEvent,
  dateUnit: keyof typeof dateTimeInput.date
) {
  if (isLessThanTen(dateTimeInput.date[dateUnit])) {
    dateTimeInput.date[dateUnit] =
      dateTimeInput.isDateUnitYear(dateUnit)
        ? '000' + event.data
        : '0' + event.data;
  } else {
    dateTimeInput.date[dateUnit] =
      dateTimeInput.isDateUnitYear(dateUnit)
        ? dateTimeInput.date.year.slice(1, 4) + event.data
        : dateTimeInput.date[dateUnit][1] + event.data;
  }
}

function moreThanMaximumDate(
  dateUnit: keyof typeof dateTimeInput.date
) {
  if (
    isMoreThanMaximumMonthAndYear(
      dateTimeInput.date.month,
      dateTimeInput.date.year
    )
  ) {
    dateTimeInput.date[dateUnit] =
      dateTimeInput.isDateUnitYear(dateUnit)
        ? 'YYYY'
        : 'MM';
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
  }
}

function setDefaultDateTime() {
  const defaultDateTime = new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm', meridiemType: 'aa' }
  });
  Object.assign(dateTimeInput, defaultDateTime);
  dateFormattedWithTime.value = undefined;
  dateTypeDate.value = undefined;
  emit(
    'update:twelveHourInput',
    dateFormattedWithTime.value
  );
}

function setMeridiemType(event: InputEvent) {
  if (event.inputType === 'insertText') {
    dateTimeInput.time.meridiemType = selectMeridiemType(
      event.data ?? 'aa'
    );
  } else {
    dateTimeInput.time.meridiemType = 'aa';
  }
  if (
    isMoreThanMaximumTwelveTime(
      dateTimeInput.time.hour,
      dateTimeInput.time.minute
    )
  ) {
    dateTimeInput.time.hour = 'HH';
  }
  convertToDate();
}
</script>

<style scoped>
.size-text {
  font-size: 25px;
}
</style>
