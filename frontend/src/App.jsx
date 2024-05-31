import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Theme from "./Theme";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QuizProvider } from "./context/QuizProvider";

// Pages

import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ShowQuiz from "./pages/ShowQuiz";
import QuizAnalysis from "./features/analytics/QuizAnalysis";
import Authenticate from "./pages/Authenticate";
import { AuthProvider } from "./features/authentication/AuthProvider";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });

  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AuthProvider>
                  <AppLayout />
                </AuthProvider>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="analytics/:id" element={<QuizAnalysis />} />
            </Route>
            <Route path="auth" element={<Authenticate />} />

            <Route
              path="quiz/:id"
              element={
                <QuizProvider>
                  <ShowQuiz />
                </QuizProvider>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
        />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
