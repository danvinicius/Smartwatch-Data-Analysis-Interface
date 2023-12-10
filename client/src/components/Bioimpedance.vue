<template>
    <section class="container animeLeft fourth">
        <TheTitle>Bioimpedância</TheTitle>
        <ul>
            <li>Peso: {{ data?.weight }}</li>
            <li> Altura: {{ data?.height.toFixed(2) }}</li>
            <li>IMC: {{ data?.imc.toFixed(1) }}</li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';

type Bioimpedance = {
    weight: number;
    height: number;
    imc: number;
}

const fetchData = async () => {
    try {
        const response = await fetch('src/api/bioimpedance.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao capturar os dados:', error);
        return null;
    }
};

const data = ref<Bioimpedance | null>(null);

onMounted(async () => {
    data.value = await fetchData();
});
</script>

<style scoped></style>