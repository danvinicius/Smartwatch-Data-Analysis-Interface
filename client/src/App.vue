<template>
  <TheHeader></TheHeader>
  <main>
    <CardiacData></CardiacData>
    <Steps></Steps>
    <Calories></Calories>
    <Bioimpedance></Bioimpedance>
  </main>
  <TheFooter></TheFooter>
</template>

<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import CardiacData from './components/CardiacData.vue';
import Steps from './components/Steps.vue';
import Calories from './components/Calories.vue';
import Bioimpedance from './components/Bioimpedance.vue';
</script>

<style scoped>
</style>
