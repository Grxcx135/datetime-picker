<template>
  <v-container :fluid="true" class="pa-0">
    <v-card
      elevation="0"
      :variant="props.variantType"
      :width="props.width"
      :color="props.color"
      :height="props.height"
      :position="props.position"
      style="display: flex; align-items: center"
      class="pa-2 pb-0"
    >
      <v-row>
        <v-col
          :cols="props.clearable ? '8' : '7'"
          class="pa-2 d-flex flex-row pt-0 pr-0"
        >
          <v-col cols="3" class="pa-0"
            ><v-text-field
              v-model="dateTimeInput.date.day"
              label=""
              variant="plain"
              hide-details
              :disabled="props.disabled"
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
              @input="setDate($event, 'year')"
            ></v-text-field
          ></v-col>
        </v-col>
      </v-row>
      <div>
        <v-icon
          v-if="props.clearable && !disabled"
          icon="$clearable"
          class="pt-0 pb-2 pr-2"
          @click="setDefaultDate()"
        ></v-icon>
      </div>
    </v-card>
    <p>Date is {{ convertToDate() }}</p>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { isNaN } from 'lodash';
import { formatDateWithSlash } from '@/utils/formatDate';
import dateTime from '@/dto/dateTime.dto';
import {
  checkMoreThanMaximumMonthAndYear,
  isMoreThanMaximumDays,
  checkLessThanTen,
  setDefaultByDateUnit
} from '@/utils/dateFunction';

const props = withDefaults(
  defineProps<{
    defaultDate?: string;
    variantType?:
      | 'flat'
      | 'text'
      | 'elevated'
      | 'tonal'
      | 'outlined'
      | 'plain';
    position?:
      | 'fixed'
      | 'relative'
      | 'static'
      | 'absolute'
      | 'sticky';
    width?: string | number;
    clearable?: boolean;
    color?: string;
    disabled?: boolean;
    height?: string | number;
  }>(),
  {
    variantType: 'outlined',
    width: '200px',
    height: '30px',
    clearable: false,
    disabled: false
  }
);
const dateTypeDate = ref<Date | undefined>();
const dateFormatted = ref<string | undefined>();

const dateTimeInput = reactive(
  new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  })
);

function setDefaultDate() {
  const defaultDateTime = new dateTime({
    date: { day: 'DD', month: 'MM', year: 'YYYY' },
    time: { hour: 'HH', minute: 'mm' }
  });
  Object.assign(dateTimeInput, defaultDateTime);
}

onMounted(() => {
  if (props.defaultDate) {
    const dateFormInput = props.defaultDate.split('/');
    Object.keys(dateTimeInput.date).forEach(
      (key, index) => {
        dateTimeInput.date[key] = dateFormInput[index];
      }
    );
  }
});

function convertToDate() {
  const dateStringConvertToDate = new Date(
    Number(dateTimeInput.date.year),
    Number(dateTimeInput.date.month) - 1,
    Number(dateTimeInput.date.day)
  );
  dateTypeDate.value = dateStringConvertToDate;
  dateFormatted.value = formatDateWithSlash(
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
        setDefaultByDateUnit(dateUnit);
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
        setDefaultByDateUnit(dateUnit);
    }
  }
}
</script>

<style scoped>
.size-text {
  font-size: 25px;
}
</style>
