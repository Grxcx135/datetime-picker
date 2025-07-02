<template>
  <v-container :fluid="true" class="pa-0">
    <v-card
      :variant="props.variantType"
      :width="props.fullWidth ? '100%' : props.width"
      :color="props.color"
      :height="props.height"
      :position="props.position"
      :rounded="props.borderRadius"
      :elevation="props.elevationNumber"
      style="display: flex; align-items: center"
      class="pa-2 pb-0"
    >
      <v-row>
        <v-col
          :cols="props.fullWidth ? 'auto' : '7'"
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
        <v-col
          :cols="props.fullWidth ? 'auto' : '4'"
          class="pa-0 d-flex flex-row"
        >
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
      <div>
        <v-icon
          v-if="props.clearable && !disabled && !readonly"
          icon="$clearable"
          class="pt-0 pb-2 px-1"
          @click="handleClickClearable()"
        ></v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { isNaN } from 'lodash';
import { formatDateWithTime } from '@/utils/formatDate';
import dateTime from '@/dto/dateTime.dto';
import {
  isMoreThanMaximumMonthAndYear,
  isMoreThanMaximumDays,
  isLessThanTen,
  setDefaultByDateUnit,
  inputDateByProp,
  isLessThanMinOrIsMoreThanMax
} from '@/utils/dateFunction';
import {
  isMoreThanMaximumTime,
  setDefaultByTimeUnit,
  inputTimeByProp,
  isLessThanMinTimeOrMoreThanMaxTime
} from '@/utils/timeFunction';
import type { dateTimeProps } from './DateTimeProps';
import { defaultDateTimeProps } from './DateTimeProps';

const props = withDefaults(defineProps<dateTimeProps>(), {
  ...defaultDateTimeProps
});
const dateTypeDate = ref<Date | undefined>();
const dateFormatted = ref<string | undefined>();
const emit = defineEmits([
  'update:militaryInput',
  'update:clickClearable'
]);

const dateTimeInput = reactive(
  new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  })
);

onMounted(() => {
  if (props.defaultDate) {
    const dateFromInput = props.defaultDate.split('/');
    const defaultDateFromProps = new Date(
      Number(dateFromInput[2]),
      Number(dateFromInput[1]) - 1,
      Number(dateFromInput[0])
    );
    if (
      !isMoreThanMaximumMonthAndYear(
        dateFromInput[1],
        dateFromInput[2]
      ) &&
      !isMoreThanMaximumDays(
        dateFromInput[0],
        dateFromInput[1],
        defaultDateFromProps
      )
    ) {
      Object.keys(dateTimeInput.date).forEach(
        (key, index) => {
          dateTimeInput.date[key] = inputDateByProp(
            dateFromInput,
            index,
            key
          );
        }
      );
    }
  }
  if (props.defaultTime) {
    const timeFromInput = props.defaultTime.split('.');
    if (
      !isMoreThanMaximumTime(
        timeFromInput[0],
        timeFromInput[1]
      ) &&
      !isLessThanMinTimeOrMoreThanMaxTime(
        timeFromInput[0],
        timeFromInput[1],
        props.minTime,
        props.maxTime
      )
    ) {
      Object.keys(dateTimeInput.time).forEach(
        (key, index) => {
          dateTimeInput.time[key] = inputTimeByProp(
            timeFromInput,
            index
          );
        }
      );
    }
  }
  convertToDate();
});

function handleClickClearable() {
  setDefaultDate();
  emit('update:clickClearable', true);
}

//TODO : separate check max min date to another function
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
  dateFormatted.value = formatDateWithTime(
    dateTypeDate.value,
    props.dateForm,
    props.space
  );
  if (dateFormatted.value !== 'Invalid Date') {
    if (
      isLessThanMinOrIsMoreThanMax(
        dateTypeDate.value,
        props.minDate,
        props.maxDate
      )
    ) {
      setDefaultDate();
    }
  }
  emit('update:militaryInput', dateFormatted.value);
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
    //maybe move check max min date in under convertToDate
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
        isMoreThanMaximumTime(
          dateTimeInput.time.hour,
          dateTimeInput.time.minute
        )
      ) {
        if (dateTimeInput.time[timeUnit]) {
          dateTimeInput.time[timeUnit] =
            setDefaultByTimeUnit(timeUnit);
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
  if (
    isLessThanMinTimeOrMoreThanMaxTime(
      dateTimeInput.time.hour,
      dateTimeInput.time.minute,
      props.minTime,
      props.maxTime
    )
  ) {
    dateTimeInput.time.hour = 'HH';
    dateTimeInput.time.minute = 'mm';
  }
  convertToDate();
}

function setDefaultDate() {
  const defaultDateTime = new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  });
  Object.assign(dateTimeInput, defaultDateTime);
  dateFormatted.value = undefined;
  dateTypeDate.value = undefined;
  emit('update:militaryInput', dateFormatted.value);
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
</script>

<style scoped>
.size-text {
  font-size: 25px;
}
</style>
