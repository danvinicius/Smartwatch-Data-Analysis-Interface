<template>
    <section class="container animeLeft fourth">
        <TheTitle>Bioimpedância</TheTitle>
        <div class="flex align-start gap-1 flex-column margin-bottom-1">
            <div class="flex align-center gap-5">
                <Weight></Weight>
                <span class="data">
                    {{ weight }}kg
                </span>
            </div>
            <div class="flex align-center gap-5">
                <Height></Height>
                <span class="data">
                    {{ height }}m
                </span>
            </div>
        </div>

        <div class="info margin-bottom-1">
            <p v-if="imc <= 18.5">Seu IMC está <span class="not-normal">abaixo do normal.</span></p>
            <p v-else-if="imc >= 18.6 && imc < 24.9">Seu IMC está <span class="not-normal">normal.</span></p>
            <p v-else-if="imc >= 25 && imc < 29">Seu IMC está <span class="warning">levemente acima do normal.</span></p>
            <p v-else-if="imc >= 30 && imc < 34.9">Seu IMC está <span class="not-normal">acima do normal.</span></p>
            <p v-else-if="imc >= 35 && imc < 39.9">Seu IMC está <span class="not-normal">muito acima normal.</span></p>
            <p v-else-if="imc >= 40">Seu IMC está <span class="not-normal">extremamente acima do normal. Procure um
                    profissional de saúde.</span></p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import Weight from '../assets/icons/weight.svg'
import Height from '../assets/icons/height.svg'

const height = ref(1.7999999523162842);
const weight = ref(90.0);
const imc = ref(27.77777924949746);
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