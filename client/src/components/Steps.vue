<template>
    <section class="container animeLeft second">
        <TheTitle>Passos</TheTitle>
        <Loading v-if="loading"></Loading>
        <div v-else class="flex align-start gap-1 flex-column margin-bottom-1">
            <div class="flex align-center gap-5">
                <Steps class="icon"></Steps>
                <span class="data">
                    {{ mostRecentStepCountSumValue.toFixed(0) }} passos
                </span>
            </div>
            <div class="flex align-center gap-5">
                <PersonRunning class="icon"></PersonRunning>
                <span class="data">
                    {{ mostRecentDistanceSumValue.toFixed(2) }} m
                </span>
            </div>
        </div>
        <VaCollapse v-model="isActive" class="min-w-96" header="Ver histórico de passos">
            <div id="chart">
                <apexchart type="bar" height="380" :options="chartOptions" :series="series"></apexchart>
            </div>
        </VaCollapse>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import PersonRunning from '../assets/icons/person-running.svg'
import Steps from '../assets/icons/steps.svg'
import { useApi } from '../composables/useApi';
const { fetchStepCountRate, fetchDistanceRate } = useApi()
import Loading from './layout/Loading.vue';

import { useData } from '../composables/useData';
const { groupDataByDay, useChartData } = useData()

const stepCountRate = ref<any>();
const distanceRate = ref<any>();

const series = ref<any[]>([]);

const mostRecentStepCount = ref()
const mostRecentStepCountSumValue = ref(0)
const mostRecentDistance = ref()
const mostRecentDistanceSumValue = ref(0)
const loading = ref(false);

onMounted(async () => {
    loading.value = true;
    const [stepCountResponseDataPromise, distanceResponseDataPromise] = [fetchStepCountRate, fetchDistanceRate]
    const [stepCountResponseData, distanceResponseData] = await Promise.all([stepCountResponseDataPromise(), distanceResponseDataPromise()])
    loading.value = false;

    const stepCountGroupedData = groupDataByDay(stepCountResponseData.data);
    const stepCountChartData = useChartData(stepCountGroupedData)

    const distanceGroupedData = groupDataByDay(distanceResponseData.data);
    const distanceChartData = useChartData(distanceGroupedData)

    stepCountRate.value = stepCountGroupedData;
    distanceRate.value = distanceGroupedData;


    series.value.push({
        name: 'passos',
        data: stepCountChartData,
    }, {
        name: 'distância',
        data: distanceChartData,
    });

    mostRecentStepCount.value = Object.entries(stepCountRate.value)[Object.entries(stepCountRate.value).length - 1][1]
    mostRecentStepCount.value.forEach((sc: any) => {
        mostRecentStepCountSumValue.value += sc.value
    })
    mostRecentDistance.value = Object.entries(distanceRate.value)[Object.entries(distanceRate.value).length - 1][1]
    mostRecentDistance.value.forEach((sc: any) => {
        mostRecentDistanceSumValue.value += sc.value
    })
});

const isActive = ref(false)

const chartOptions = ({
    dataLabels: {
        enabled: false,
    },
    chart: {
        type: 'bar',
        height: 380,
    },
    xaxis: {
        type: 'category',
        group: {
            style: {
                fontSize: '10px',
                fontWeight: 700,
            },
            groups: [
            ],
        },
    },
    title: {
        text: '',
    }
});
</script>

<style scoped></style>