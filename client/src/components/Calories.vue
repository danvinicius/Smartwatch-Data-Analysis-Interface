<template>
    <section class="container animeLeft third">
        <TheTitle>Calorias</TheTitle>
        <Loading v-if="loading"></Loading>
        <div v-else class="flex margin-bottom-1">
            <div class="flex align-center gap-5">
                <Fire class="icon"></Fire>
                <span class="data">
                    {{ mostRecentCaloriesRateSumValue.toFixed(2) }} kcal
                </span>
            </div>
        </div>
        <VaCollapse v-model="value" class="min-w-96" header="Ver histórico de calorias">
            <div id="chart">
                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
            </div>
        </VaCollapse>

    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import Fire from '../assets/icons/fire.svg'
import { useApi } from '../composables/useApi';
import Loading from './layout/Loading.vue';
const { fetchCaloriesRate } = useApi()

import { useData } from '../composables/useData';
const { groupDataByDay } = useData()

const caloriesRate = ref<any>();
const mostRecentCaloriesRate = ref()
const mostRecentCaloriesRateSumValue = ref(0)
const loading = ref(false);

const series = ref<any[]>([]);

onMounted(async () => {
    loading.value = true;
    const responseData = await fetchCaloriesRate();
    loading.value = false;

    if (responseData && responseData?.data) {
        const groupedData = groupDataByDay(responseData.data);
        caloriesRate.value = groupedData;

        const chartData = Object.keys(groupedData).map((date: any) => {
            const sum = groupedData[date].reduce((acc, point) => acc + point.value, 0);
            return { x: date, y: sum.toFixed(2) };
        });

        series.value.push({
            name: 'calorias',
            data: chartData,
        });
    }
    mostRecentCaloriesRate.value = Object.entries(caloriesRate.value)[Object.entries(caloriesRate.value).length - 1][1]
    mostRecentCaloriesRate.value.forEach((sc: any) => {
        mostRecentCaloriesRateSumValue.value += sc.value
    })
});

const value = ref(false)

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