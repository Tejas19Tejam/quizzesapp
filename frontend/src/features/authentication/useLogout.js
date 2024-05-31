import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const { removeToken } = useAuth();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Remove the access token from local storage
      removeToken();

      // Remove all queries from the query client
      queryClient.removeQueries();

      // display toast
      toast.success("Logout successfully!");
    },
  });

  return { logout, isPending };
}
