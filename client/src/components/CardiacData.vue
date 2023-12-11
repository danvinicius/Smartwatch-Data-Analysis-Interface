<template>
  <section class="container animeLeft first">
    <TheTitle>Dados cardíacos</TheTitle>
    <Loading v-if="loading"></Loading>
    <div v-else class="flex margin-bottom-1">
      <div class="flex align-center gap-5">
        <Heart class="icon"></Heart>
        <span class="data">
          {{ mostRecentHeartRate }} bpm
        </span>
      </div>
    </div>

    <div class="info margin-bottom-1" v-if="heartRate">
      <p v-if="mostRecentHeartRate >= 50 && mostRecentHeartRate <= 100">Seu batimento cardíaco está <span class="normal">saudável.</span></p>
      <p v-else-if="mostRecentHeartRate < 50">Seu batimento cardíaco está <span class="not-normal">abaixo do normal.</span> Procure
        um profissional de saúde.</p>
      <p v-else-if="mostRecentHeartRate > 100">Seu batimento cardíaco está <span class="not-normal">acima do normal.</span> Procure
        um profissional de saúde.</p>
    </div>

    <VaCollapse v-model="value" class="min-w-96" header="Ver histórico cardíaco">
      <div id="wrapper">
        <div id="chart-line2">
          <apexchart type="line" height="230" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </VaCollapse>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import Heart from '../assets/icons/heart.svg';
import { useApi } from '../composables/useApi';
import Loading from './layout/Loading.vue';

const { fetchHeartRate } = useApi()
const value = ref(false)
const heartRate = ref()
const mostRecentHeartRate = ref(0)
const loading = ref(false);

const series = ref<any>([{data: [], name: "batimentos cardíacos",}])

onMounted(async () => {
  loading.value = true;
  const heartRateResponseData = await fetchHeartRate()
  loading.value = false;

  heartRate.value = heartRateResponseData.data
  heartRateResponseData.data.forEach((entry: any) => {
    const dataPoint = [new Date(+(entry.time.toString().slice(0, 13))).getTime(), entry.value];
    series.value[0].data.push(dataPoint);
  });

  mostRecentHeartRate.value = heartRate.value[heartRate.value.length - 1].value
})

const chartOptions = ({
  chart: {
    id: "chart2",
    type: "line",
    height: 230,
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
  },
  colors: ["#546E7A"],
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: "datetime",
  },
});

</script>

<style scoped></style>