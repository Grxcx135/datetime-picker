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
          maxDate="2/3/2533"
        />
        <span>date is {{ datePicker }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DateTimePicker
          timeType="militaryTime"
          width="230px"
          variantType="tonal"
          clearable
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DateTimePicker timeType="twelveHour" />
      </v-col>
    </v-row>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
const datePicker = ref<string | undefined>();
</script>
