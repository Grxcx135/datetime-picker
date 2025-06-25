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
          cols="auto"
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
      </v-row>
      <div>
        <v-icon
          v-if="props.clearable && !disabled && !readonly"
          icon="$clearable"
          class="pt-0 pb-2 pr-2"
          @click="handleClickClearable()"
        ></v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { isNaN, isNil } from 'lodash';
import { formatDate } from '@/utils/formatDate';
import dateTime from '@/dto/dateTime.dto';
import {
  isMoreThanMaximumMonthAndYear,
  isMoreThanMaximumDays,
  isLessThanTen,
  setDefaultByDateUnit,
  inputDateByProp,
  isLessThanMinOrIsMoreThanMax
} from '@/utils/dateFunction';
import type { dateTimeProps } from './DateTimeProps';
import { defaultDateTimeProps } from './DateTimeProps';
const emit = defineEmits([
  'update:dateInput',
  'update:clickClearable'
]);

const props = withDefaults(
  defineProps<dateTimeProps>(),
  defaultDateTimeProps
);
const dateTypeDate = ref<Date | undefined>();
const dateFormatted = ref<string | undefined>();

const dateTimeInput = reactive(
  new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  })
);

function handleClickClearable() {
  setDefaultDate();
  emit('update:clickClearable', true);
}

function setDefaultDate() {
  const defaultDateTime = new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  });
  Object.assign(dateTimeInput, defaultDateTime);
  dateFormatted.value = undefined;
  dateTypeDate.value = undefined;
  convertToDate();
}

onMounted(() => {
  if (props.defaultDate) {
    const dateFromInput = props.defaultDate.split('/');
    Object.keys(dateTimeInput.date).forEach(
      (key, index) => {
        dateTimeInput.date[key] = inputDateByProp(
          dateFromInput,
          index,
          key
        );
      }
    );
    convertToDate();
  }
});

function convertToDate() {
  const dateStringConvertToDate = new Date(
    Number(dateTimeInput.date.year),
    Number(dateTimeInput.date.month) - 1,
    Number(dateTimeInput.date.day)
  );
  dateTypeDate.value = dateStringConvertToDate;
  dateFormatted.value = formatDate(
    dateStringConvertToDate,
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
  emit('update:dateInput', dateFormatted.value);
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
