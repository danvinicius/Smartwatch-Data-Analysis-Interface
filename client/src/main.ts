import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import './style.scss'

const app = createApp(App)
app.use(VueApexCharts).mount('#app');