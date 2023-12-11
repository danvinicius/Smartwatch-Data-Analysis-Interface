<template>
    <section class="container animeLeft second">
        <TheTitle>Passos</TheTitle>
        <div class="flex align-start gap-1 flex-column margin-bottom-1">
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
            <div class="flex align-center gap-5" v-if="mostRecentSpeed">
                <Speed class="icon"></Speed>
                <span class="data">
                     {{ (mostRecentSpeed * 3.6).toFixed(2) }} km/h
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
import Speed from '../assets/icons/speed.svg'

import { useData } from '../composables/useData';
const { groupDataByDay, useChartData } = useData()

const stepCountRate = ref<any>();
const distanceRate = ref<any>();

const series = ref<any[]>([]);

const mostRecentStepCount = ref()
const mostRecentStepCountSumValue = ref(0)
const mostRecentSpeed = ref()
const mostRecentDistance = ref()
const mostRecentDistanceSumValue = ref(0)

onMounted(async () => {
    const stepCountResponse = await fetch('src/api/step-count.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const stepCountResponseData = await stepCountResponse.json();
    const stepCountGroupedData = groupDataByDay(stepCountResponseData.data);
    const stepCountChartData = useChartData(stepCountGroupedData)

    const speedResponse = await fetch('src/api/speed.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const speedResponseData = await speedResponse.json();
    mostRecentSpeed.value = speedResponseData.data[speedResponseData.data.length-1].value

    const distanceResponse = await fetch('src/api/distance.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const distanceResponseData = await distanceResponse.json();
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