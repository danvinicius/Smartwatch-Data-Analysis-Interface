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

  return {
    groupDataByDay,
  };
};
