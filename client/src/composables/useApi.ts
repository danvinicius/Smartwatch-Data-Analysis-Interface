interface HeartRateDataPoint {
    value: number;
    time: number;
}

interface SpeedDataPoint {
    value: number;
    time: number;
}

interface StepCountDataPoint {
    value: number;
    time: number;
}

interface CaloriesRateDataPoint {
    value: number;
    time: number;
}
interface BioImpedance {
    height: number;
    weight: number;
    imc: number;
}
interface ResponseData {
    heartRate: {
        dataPoints: HeartRateDataPoint[];
    },
    caloriesRate: {
        dataPoints: CaloriesRateDataPoint[];
    },
    stepCountRate: {
        dataPoints: SpeedDataPoint[];
    }
    speedRate: {
        dataPoints: StepCountDataPoint[];
    }
    bioimpedance: BioImpedance
}

export function useApi() {
    const url = 'http://localhost:3000/api'
    const fetchApiData = async (): Promise<ResponseData> => {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    }
  
    // expose managed state as return value
    return { fetchApiData }
  }