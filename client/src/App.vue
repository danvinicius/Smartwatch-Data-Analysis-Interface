<template>
  <TheHeader></TheHeader>
  <div class="periodSelectorContainer">
    <PeriodSelector></PeriodSelector>
  </div>
  <main>
    <CardiacData></CardiacData>
    <Steps></Steps>
    <SleepQuality></SleepQuality>
    <Bioimpedance></Bioimpedance>
  </main>
  <TheFooter></TheFooter>
</template>

<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import PeriodSelector from './components/PeriodSelector.vue';
import CardiacData from './components/CardiacData.vue';
import Steps from './components/Steps.vue';
import SleepQuality from './components/SleepQuality.vue';
import Bioimpedance from './components/Bioimpedance.vue';
</script>

<style scoped>
.periodSelectorContainer {
  padding: 1rem;
}
</style>
