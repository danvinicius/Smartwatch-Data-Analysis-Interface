<template>
    <section class="container animeLeft third">
        <TheTitle>Calorias</TheTitle>
        <div class="flex margin-bottom-1">
            <div class="flex align-center gap-5">
                <Fire class="icon"></Fire>
                <span class="data">
                    {{ 1200 }} kcal
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

import { useData } from '../composables/useData';
const { groupDataByDay } = useData()

const caloriesRate = ref<any>();

const series = ref<any[]>([]);

onMounted(async () => {
    const response = await fetch('src/api/calories.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const responseData = await response.json();
    if (responseData && responseData?.data) {
        const groupedData = groupDataByDay(responseData.data);
        
        caloriesRate.value = groupedData;
        
        // Criar o array de objetos {x, y} para o gráfico
        const chartData = Object.keys(groupedData).map((date: any) => {
            const sum = groupedData[date].reduce((acc, point) => acc + point.value, 0);
            return { x: date, y: sum.toFixed(2) };
        });
        
        series.value.push({
            name: 'calorias',
            data: chartData,
        });
    }
});

const value = ref(false)

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