import { queryKeys } from "@/lib/query-keys";
import { createThread, getThreadsForConnection } from "@/service/api/thread";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetThreads = (connection_id: string) => {
  return useQuery({
    queryKey: queryKeys.threads(connection_id),
    queryFn: () => getThreadsForConnection(connection_id),
    enabled: !!connection_id,
  });
};

interface CreateThreadArgs {
  connection_id: string;
  title: string;
}

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ connection_id, title }: CreateThreadArgs) =>
      createThread(connection_id, title),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.threads(variables.connection_id),
      });
    },
  });
};
