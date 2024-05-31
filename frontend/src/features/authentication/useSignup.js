import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const {
    mutate: signup,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please login using registered email id and password."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isCreating, isCreated };
}
