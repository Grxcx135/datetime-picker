<template>
  <main>
    <v-row>
      <v-col>
        <DateTimePicker timeType="militaryTime" />
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
