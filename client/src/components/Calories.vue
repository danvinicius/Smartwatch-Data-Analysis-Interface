<template>
    <section class="container animeLeft third">
        <TheTitle>Calorias</TheTitle>
        <div class="flex margin-bottom-1">
            <div class="flex align-center gap-5">
                <Fire></Fire>
                <span class="data">
                    {{ 1200 }} kcal
                </span>
            </div>
        </div>
        <VaCollapse v-model="value" class="min-w-96" header="Ver histórico de calorias">
            <div id="chart">
                <apexchart type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
            </div>
        </VaCollapse>

    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import Fire from '../assets/icons/fire.svg'

const value = ref(false)
const series = ([
    {
        data: [
            {
                x: 'Domingo',
                y: [
                    new Date('2019-03-02').getTime(),
                    new Date('2019-03-04').getTime()
                ]
            },
            {
                x: 'Segunda',
                y: [
                    new Date('2019-03-04').getTime(),
                    new Date('2019-03-08').getTime()
                ]
            },
            {
                x: 'Terça',
                y: [
                    new Date('2019-03-08').getTime(),
                    new Date('2019-03-12').getTime()
                ]
            },
            {
                x: 'Quarta',
                y: [
                    new Date('2019-03-12').getTime(),
                    new Date('2019-03-18').getTime()
                ]
            }
        ]
    },
]);

const chartOptions = ({
    chart: {
        height: 350,
        type: 'rangeBar'
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    xaxis: {
        type: 'datetime'
    }
});
</script>

<style scoped></style>