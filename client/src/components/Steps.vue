<template>
    <section class="container animeLeft second">
        <TheTitle>Passos e corrida</TheTitle>
        <div class="flex align-start gap-1 flex-column margin-bottom-1">
            <div class="flex align-center gap-5">
                <PersonRunning></PersonRunning>
                <span class="data">
                    {{ 19 }} km
                </span>
            </div>
            <div class="flex align-center gap-5">
                <Steps></Steps>
                <span class="data">
                    {{ 2509 }} passos
                </span>
            </div>
            <div class="flex align-center gap-5">
                <Speed></Speed>
                <span class="data">
                    {{ 24 }} km/h
                </span>
            </div>
        </div>
        <VaCollapse v-model="value" class="min-w-96" header="Ver histórico de passos">
            <div id="chart">
                <apexchart type="bar" height="380" :options="chartOptions" :series="series"></apexchart>
            </div>
        </VaCollapse>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import PersonRunning from '../assets/icons/person-running.svg'
import Steps from '../assets/icons/steps.svg'
import Speed from '../assets/icons/speed.svg'

const value = ref(false)
const series = ([
    {
        name: 'passos',
        data: [
            { x: '01/01/2019', y: 400 },
            { x: '04/01/2019', y: 430 },
            { x: '07/01/2019', y: 448 },
            { x: '10/01/2019', y: 470 },
            { x: '01/01/2020', y: 540 },
            { x: '04/01/2020', y: 580 },
            { x: '07/01/2020', y: 690 },
            { x: '10/01/2020', y: 690 },
        ],
    },
]);

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
                { title: '2019', cols: 4 },
                { title: '2020', cols: 4 },
            ],
        },
    },
    title: {
        text: '',
    }
});
</script>

<style scoped></style>