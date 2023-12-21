export interface DataPoint {
  value: number;
  time: number;
}

export interface ResponseData {
  data: DataPoint[];
}

export interface BMI {
  weight: number;
  height: number;
  imc: number;
}

const url = "http://localhost:8080/api/data";

export function useApi() {
  const fetchHeartRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/heart`);
    const json = await res.json();
    return json;
  };
  const fetchDistanceRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/distance`);
    const json = await res.json();
    return json;
  };
  async function fetchStepCountRate (): Promise<ResponseData> {
    const res = await fetch(`${url}/rate/step-count`);
    const json = await res.json();
    return json;
  };
  const fetchCaloriesRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/calories`);
    
    const json = await res.json();
    return json;
  };
  const fetchBMI = async (): Promise<BMI> => {
    const res = await fetch(`${url}/bioimpedance`);
    const json = await res.json();
    return json;
  };

  return {
    fetchHeartRate,
    fetchDistanceRate,
    fetchStepCountRate,
    fetchCaloriesRate,
    fetchBMI,
  };
}
