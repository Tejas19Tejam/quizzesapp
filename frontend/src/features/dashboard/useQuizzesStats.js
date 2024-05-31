import { useQuery } from "@tanstack/react-query";
import { getQuizzesStats } from "../../services/apiQuizzes";

export function useQuizzesStats() {
  const { isLoading, data: stats } = useQuery({
    queryKey: ["quizzes-stats"],
    queryFn: getQuizzesStats,
    retry: false,
  });

  return { isLoading, stats };
}
