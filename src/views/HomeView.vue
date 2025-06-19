<template>
  <main>
    <v-row>
      <v-col>
        <DateTimePicker
          timeType="None"
          variantType="tonal"
          color="stageDark4"
          clearable
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
