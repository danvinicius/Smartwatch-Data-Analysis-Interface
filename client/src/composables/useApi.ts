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
  };
  caloriesRate: {
    dataPoints: CaloriesRateDataPoint[];
  };
  stepCountRate: {
    dataPoints: SpeedDataPoint[];
  };
  speedRate: {
    dataPoints: StepCountDataPoint[];
  };
  bioimpedance: BioImpedance;
}

export function useApi() {
  const url = "http://localhost:8080/api";
  const fetchHeartRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/heart`);
    const json = await res.json();
    return json;
  };
  const fetchSpeedRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/speed`);
    const json = await res.json();
    return json;
  };
  const fetchDistanceRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/distance`);
    const json = await res.json();
    return json;
  };
  const fetchStepCountRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/step-count`);
    const json = await res.json();
    return json;
  };
  const fetchCaloriesRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/calories`);
    const json = await res.json();
    return json;
  };
  const fetchBioimpedance = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/bioimpedance`);
    const json = await res.json();
    return json;
  };

  // expose managed state as return value
  return {
    fetchHeartRate,
    fetchSpeedRate,
    fetchDistanceRate,
    fetchStepCountRate,
    fetchCaloriesRate,
    fetchBioimpedance,
  };
}
