import { queryKeys } from "@/lib/query-keys";
import {
  createConnection,
  deleteConnection,
  listConnections,
} from "@/service/api/connection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConnection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.connections,
      });
    },
  });
};

export const useListConnections = () => {
  return useQuery({
    queryKey: queryKeys.connections,
    queryFn: listConnections,
  });
};

export function useDeleteConnection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConnection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.connections,
      });
    },
  });
}
