import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "../../services/apiQuizzes";

export function useQuizzes() {
  const { isLoading, data: quizzes } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });

  return {
    quizzes,
    isLoading,
    isEmpty: !isLoading && quizzes.length === 0,
  };
}
