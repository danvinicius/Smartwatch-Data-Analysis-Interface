<template>
    <section class="container animeLeft second">
        <TheTitle>Passos e corrida</TheTitle>
        <VaCollapse
            v-model="value"
            class="min-w-96"
            header="Dados numéricos"
        >
            <div id="chart">
                <apexchart type="bar" height="380" :options="chartOptions" :series="series"></apexchart>
            </div>
        </VaCollapse>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
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

<style scoped>

</style>