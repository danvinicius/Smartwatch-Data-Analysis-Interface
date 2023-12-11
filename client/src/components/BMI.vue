<template>
    <section class="container animeLeft fourth">
        <TheTitle>IMC</TheTitle>
        <div class="flex align-start gap-1 flex-column margin-bottom-1">
            <div class="flex align-center gap-5" v-if="bmi">
                <Weight></Weight>
                <span class="data">
                    {{ bmi.weight.toFixed(1) }}kg
                </span>
            </div>
            <div class="flex align-center gap-5" v-if="bmi">
                <Height></Height>
                <span class="data">
                    {{ bmi.height.toFixed(2) }}m
                </span>
            </div>
        </div>

        <div class="info margin-bottom-1" v-if="bmi">
            <p v-if="bmi.imc <= 18.5">Seu IMC está <span class="warning">abaixo do normal.</span></p>
            <p v-else-if="bmi.imc >= 18.6 && bmi.imc < 24.9">Seu IMC está <span class="normal">normal.</span></p>
            <p v-else-if="bmi.imc >= 25 && bmi.imc < 29">Seu IMC está <span class="warning">levemente acima do normal.</span></p>
            <p v-else-if="bmi.imc >= 30 && bmi.imc < 34.9">Seu IMC está <span class="not-normal">acima do normal.</span></p>
            <p v-else-if="bmi.imc >= 35 && bmi.imc < 39.9">Seu IMC está <span class="not-normal">muito acima normal.</span></p>
            <p v-else-if="bmi.imc >= 40">Seu IMC está <span class="not-normal">extremamente acima do normal. Procure um
                    profissional de saúde.</span></p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheTitle from './layout/TheTitle.vue';
import Weight from '../assets/icons/weight.svg'
import Height from '../assets/icons/height.svg'

type BMI = {
    weight: number;
    height: number;
    imc: number;
}

const bmi = ref<BMI>();

onMounted(async () => {
    const response = await fetch('src/api/bmi.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const responseData = await response.json();
    
    if (responseData) {
        bmi.value = responseData;
    }
})
</script>

<style scoped></style>