import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useCreateQuiz } from "./useCreateQuiz";
import { useModal } from "../../ui/Modal";
import { useEditQuiz } from "./useEditCabin";

const initialOption = { text: "", imageUrl: "" };
const initialQuestion = {
  questionText: "",
  options: [initialOption, initialOption],
  correctOption: 0,
};

function useQuizForm(quiz = {}, onClose) {
  // Helper Hooks
  const { open, setData } = useModal();
  const { isCreating, createQuiz } = useCreateQuiz();
  const { isEditing, editQuiz } = useEditQuiz();
  const isWorking = isCreating || isEditing;

  // Destructure quiz
  const {
    id: quizId,
    title,
    timer: quizTimer,
    type: quizType,
    optionsType: quizOptionsType,
    ...otherValues
  } = quiz;

  //  If quizId is present then it is a edit session
  const isEditSession = Boolean(quizId);

  // If edit session, then pass quiz data as the default values
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: isEditSession
      ? { ...otherValues }
      : { questions: [initialQuestion] },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionsType, setOptionsType] = useState(
    isEditSession ? quizOptionsType : "text"
  );
  const [timer, setTimer] = useState(isEditSession ? quizTimer : 0);

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const options = watch(
    `questions.${currentQuestionIndex}.options`,
    questions[currentQuestionIndex]?.options || []
  );

  const correctOption = watch(
    `questions.${currentQuestionIndex}.correctOption`,
    questions[currentQuestionIndex]?.correctOption
  );

  const questionText = watch(
    `questions.${currentQuestionIndex}.questionText`,
    questions[currentQuestionIndex]?.questionText
  );

  useEffect(() => {
    const updatedOptions = options.map((option) => {
      if (optionsType === "text") {
        const { imageUrl, ...rest } = option;
        return rest;
      } else if (optionsType === "url") {
        return { imageUrl: option.imageUrl || "" };
      } else {
        return { text: option.text || "", imageUrl: option.imageUrl || "" };
      }
    });
    setValue(`questions.${currentQuestionIndex}.options`, updatedOptions);
  }, [optionsType, currentQuestionIndex, setValue]);

  const addOption = () => {
    const newOption =
      optionsType === "text"
        ? { text: "" }
        : optionsType === "url"
        ? { imageUrl: "" }
        : { text: "", imageUrl: "" };
    setValue(`questions.${currentQuestionIndex}.options`, [
      ...options,
      newOption,
    ]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setValue(`questions.${currentQuestionIndex}.options`, updatedOptions);
    if (index === correctOption) {
      setValue(`questions.${currentQuestionIndex}.correctOption`, 0);
    }
  };

  const switchQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const addQuestion = () => {
    append({ ...initialQuestion });
    setCurrentQuestionIndex(questions.length);
  };

  const removeQuestion = (index) => {
    remove(index);
    setCurrentQuestionIndex(index > 0 ? index - 1 : 0);
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      timer,
      optionsType,
      type: quizType,
      title,
      questions: data.questions.map((question) => {
        if (quizType === "q&a") {
          return question;
        } else {
          const { correctOption, ...rest } = question;
          return rest;
        }
      }),
    };

    if (isEditSession) {
      editQuiz(
        { newQuizData: finalData, id: quizId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
    if (!isEditSession) {
      createQuiz(
        { ...finalData },
        {
          onSuccess: (newQuiz) => {
            reset();
            open("quiz-share");
            setData({ quizId: newQuiz.id });
          },
        }
      );
    }
  };

  return {
    control,
    handleSubmit,
    setValue,
    questions,
    currentQuestionIndex,
    optionsType,
    timer,
    options,
    correctOption,
    questionText,
    addOption,
    removeOption,
    switchQuestion,
    addQuestion,
    removeQuestion,
    onSubmit,
    setOptionsType,
    setTimer,
    quizType,
    isWorking,
  };
}

export default useQuizForm;
