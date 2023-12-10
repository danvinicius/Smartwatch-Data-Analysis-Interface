<template>
    <section class="container animeLeft third">
        <TheTitle>Qualidade do sono</TheTitle>
        <VaCollapse
            v-model="value"
            class="min-w-96"
            header="Dados numéricos"
        >
            <div id="chart">
                <apexchart type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
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

<style scoped>

</style>