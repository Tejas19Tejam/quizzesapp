import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteQuiz as deleteQuizApi } from "../../services/apiQuizzes";

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteQuiz,
    isSuccess: isDeleted,
  } = useMutation({
    mutationFn: deleteQuizApi,
    onSuccess: () => {
      toast.success("Quiz successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteQuiz, isDeleted };
}
