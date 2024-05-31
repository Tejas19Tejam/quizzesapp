import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditQuiz } from "../../services/apiQuizzes";

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  const { mutate: createQuiz, isLoading: isCreating } = useMutation({
    mutationFn: createEditQuiz,
    onSuccess: () => {
      toast.success("New quiz successfully created");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createQuiz };
}
