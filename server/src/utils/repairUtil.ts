import { jsonrepair } from "jsonrepair";

export const parseAndRepair = (jsonString: string) => {
  const repaired = jsonrepair(jsonString);
  return JSON.parse(repaired);
};
