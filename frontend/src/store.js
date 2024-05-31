// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import quizzesSlice from "./features/analytics/quizzesSlice";

const store = configureStore({
  reducer: {
    quizzes: quizzesSlice,
  },
});

export default store;
