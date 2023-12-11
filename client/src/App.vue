<template>
  <TheHeader></TheHeader>
  <main>
    <CardiacData></CardiacData>
    <Steps></Steps>
    <Calories></Calories>
    <BMI></BMI>
  </main>
  <TheFooter></TheFooter>
</template>

<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import CardiacData from './components/CardiacData.vue';
import Steps from './components/Steps.vue';
import Calories from './components/Calories.vue';
import BMI from './components/BMI.vue';
</script>

<style scoped>
</style>
