import axios, { axiosPrivate } from "../services/axios";
import catchAsync from "./../utils/catchAsync";

// Private methods (Needed authentication)

export const createEditQuiz = catchAsync(async (newQuiz, id) => {
  let query;

  if (id) query = axiosPrivate.patch("/quizzes", { id, newQuiz });
  if (!id) query = axiosPrivate.post("/quizzes", newQuiz);

  const { data } = await query;
  return data?.data?.result;
});

export const getQuizzesStats = catchAsync(async () => {
  const { data } = await axiosPrivate.get("/quizzes/stats");
  console.log(data?.data?.result);
  return data?.data?.result;
});

export const deleteQuiz = catchAsync(async (id) => {
  const { data } = await axiosPrivate.delete(`/quizzes/${id}`);
  return data?.data?.result;
});

export const getQuizzes = catchAsync(async () => {
  const { data } = await axiosPrivate.get("/quizzes");
  console.log(data?.data?.result);
  return data?.data?.result;
});

// Public Methods (Authentication not needed)

export const submitQuiz = catchAsync(async (id, data) => {
  const { data: responseData } = await axios.post(
    `/quizzes/${id}/submit`,
    data
  );
  return responseData?.data?.result;
});

export const getQuiz = catchAsync(async (id) => {
  const { data } = await axios.get(`/quizzes/${id}`);
  return data?.data?.result;
});
