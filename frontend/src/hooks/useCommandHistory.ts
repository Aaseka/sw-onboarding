import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CommandHistory } from "../utils/types";

const API_URL = "http://localhost:8001/api/commands";
const REFETCH_INTERVAL = 5000;

export function useCommandHistory(
  commandId: string,
): UseQueryResult<CommandHistory[]> {
  return useQuery({
    queryKey: ["commandHistory", commandId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${commandId}/history`);
      if (response.status === 404) {
        return [];
      }
      if (!response.ok) {
        throw new Error(`Failed to load history (status ${response.status})`);
      }
      const body: { data: CommandHistory[] } = await response.json();
      return body.data;
    },
    enabled: commandId !== "",
    refetchInterval: REFETCH_INTERVAL,
  });
}
