<template>
  <main>
    <v-row>
      <v-col>
        <DateTimePicker
          timeType="None"
          variantType="outlined"
          color="stageDark4"
          dateForm="/"
          minDate="2/3/2532"
          maxDate="2/3/2533"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DateTimePicker
          timeType="militaryTime"
          variantType="tonal"
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
import DateTimePicker from '@/components/DateTimePicker.vue';
</script>
