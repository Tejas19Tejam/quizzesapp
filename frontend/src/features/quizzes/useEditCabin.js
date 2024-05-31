import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditQuiz } from "../../services/apiQuizzes";

export function useEditQuiz() {
  const queryClient = useQueryClient();

  const { mutate: editQuiz, isLoading: isEditing } = useMutation({
    mutationFn: ({ newQuizData, id }) => createEditQuiz(newQuizData, id),
    onSuccess: () => {
      toast.success("Quiz successfully edited");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editQuiz };
}
