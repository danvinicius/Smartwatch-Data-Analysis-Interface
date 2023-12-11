<template>
    <section class="container animeLeft second">
        <TheTitle>Passos</TheTitle>
        <div class="flex align-start gap-1 flex-column margin-bottom-1">
            <div class="flex align-center gap-5">
                <Steps class="icon"></Steps>
                <span class="data">
                    {{ mostRecentStepCountSumValue }} passos
                </span>
            </div>
            <div class="flex align-center gap-5">
                <PersonRunning class="icon"></PersonRunning>
                <span class="data">
                    {{ 19 }} km
                </span>
            </div>
            <div class="flex align-center gap-5">
                <Speed class="icon"></Speed>
                <span class="data">
                    {{ 24 }} km/h
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
const { groupDataByDay } = useData()

const stepCountRate = ref<any>();

const series = ref<any[]>([]);

const mostRecentStepCount = ref()
const mostRecentStepCountSumValue = ref(0)

onMounted(async () => {
    const response = await fetch('src/api/step-count.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const responseData = await response.json();
    if (responseData && responseData?.data) {
        const groupedData = groupDataByDay(responseData.data);

        stepCountRate.value = groupedData;

        const chartData = Object.keys(groupedData).map((date) => {
            const sum = groupedData[date].reduce((acc, point) => acc + point.value, 0);
            return { x: date, y: sum };
        });

        series.value.push({
            name: 'passos',
            data: chartData,
        });

        mostRecentStepCount.value = Object.entries(stepCountRate.value)[Object.entries(stepCountRate.value).length - 1][1]
        mostRecentStepCount.value.forEach((sc: any) => {
            mostRecentStepCountSumValue.value += sc.value
        })
    }
});

const isActive = ref(false)

const chartOptions = ({
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