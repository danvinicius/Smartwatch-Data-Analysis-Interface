import { DataPoint } from "../composables/useApi";

interface GroupedData {
  [date: string]: DataPoint[];
}
export const useData = () => {
  const groupDataByDay = (data: DataPoint[]): GroupedData => {
    const groupedData: GroupedData = {};

    data.forEach((point) => {
      const dateKey = new Date(+point.time.toString().slice(0, 13))
        .toISOString()
        .split("T")[0];
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }
      groupedData[dateKey].push(point);
    });

    return groupedData;
  };

  const useChartData = (groupedData: any) => {
    return Object.keys(groupedData).map((date) => {
      const sum = groupedData[date].reduce(
        (acc: number, point: {value: number}) => acc + point.value,
        0
      );
      return { x: date, y: Math.floor(sum) };
    });
  };

  return {
    groupDataByDay,
    useChartData
  };
};
