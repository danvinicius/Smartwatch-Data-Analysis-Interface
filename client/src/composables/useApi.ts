export interface DataPoint {
  value: number;
  time: number;
}

export interface ResponseData {
  data: DataPoint[];
}

const url = "http://localhost:8080/api/data";

export function useApi() {
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
  async function fetchStepCountRate (): Promise<ResponseData> {
    const res = await fetch(`${url}/rate/step-count`);
    console.log(res);
    const json = await res.json();
    console.log(json);
    return json;
  };
  const fetchCaloriesRate = async (): Promise<ResponseData> => {
    const res = await fetch(`${url}/rate/calories`);
    
    const json = await res.json();
    return json;
  };
  const fetchBMI = async (): Promise<ResponseData> => {
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
    fetchBMI,
  };
}
