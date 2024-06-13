// AuthForm.js
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

import validator from "validator";
import { useLogin } from "./useLogin";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-300);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-grey-100);
  padding: 6.4rem 2.4rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 98rem;
  width: 100%;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: space-around;
  margin-bottom: 3.2rem;
`;

const Tab = styled(Button)`
  font-size: 2rem;
  color: var(--color-grey-800);

  ${({ active }) =>
    active
      ? css`
          box-shadow: 3px 0px 12px 12px rgba(152, 115, 235, 0.1);
        `
      : css`
          box-shadow: none;
        `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 56rem;
  width: 100%;
  gap: 2.4rem;

  & button {
    align-self: center;
    background-color: var(--color-purple-500);
    color: var(--color-grey-800);
    margin-top: 3.2rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid
    ${(props) => (props.error ? "var(--color-red-700)" : "#ccc")};
  background: var(--color-grey-100);
  border-top-right-radius: var(--border-radius-lg);
  border-top-left-radius: var(--border-radius-lg);
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.error && "var(--color-red-700)"};
  }

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const { isCreating, signup, isCreated } = useSignup();
  const { isLoading, login } = useLogin();

  const isWorking = isCreating || isLoading;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  function onSubmit(data) {
    if (isSignUp) {
      // If sign up page then signup the user
      return signup(data);
    } else {
      login(data);
      reset();
    }
  }

  useEffect(() => {
    // If account is created then redirect/toggle to login page
    if (!isCreated) return;
    setIsSignUp(false);
    // Reset form fields
    reset();
  }, [isCreated, reset]);

  const handleToggleTab = (isSignUp) => {
    setIsSignUp(isSignUp);
    reset(); // Resets the form fields
  };

  return (
    <FormWrapper>
      <FormContainer>
        <Logo />
        <Tabs>
          <Tab
            size="large"
            active={isSignUp}
            onClick={() => handleToggleTab(true)}
          >
            <span>Sign Up</span>
          </Tab>
          <Tab
            size="large"
            active={!isSignUp}
            onClick={() => handleToggleTab(false)}
          >
            <span>Log In</span>
          </Tab>
        </Tabs>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
            <FormRow label="Name">
              <Input
                type="text"
                placeholder={errors?.name?.message}
                {...register("name", {
                  required: "User must have a name.",
                })}
                error={errors?.name}
              />
            </FormRow>
          )}
          <FormRow label="Email">
            <Input
              type="email"
              placeholder={errors?.email?.message}
              {...register("email", {
                required: "User must have a mail.",
                validate: (value) =>
                  validator.isEmail(value) || "Invalid email",
              })}
              error={errors.email}
            />
          </FormRow>
          <FormRow label="Password">
            <Input
              type="password"
              placeholder={errors?.password?.message}
              {...register("password", {
                required: "Please provide a password.",
                minLength: {
                  value: 8,
                  message: "Weak password",
                },
              })}
              error={errors.password}
            />
          </FormRow>

          {isSignUp && (
            <FormRow label="Confirm Password">
              <Input
                type="password"
                placeholder={errors?.confirmedPassword?.message}
                {...register("confirmedPassword", {
                  required: "Please provide a confirmedPassword.",
                  validate: (value) =>
                    value === watch("password") || "Passwords don't match",
                })}
                error={errors.confirmedPassword}
              />
            </FormRow>
          )}
          <Button type="submit" size="extra-large" disabled={isWorking}>
            {isSignUp
              ? isWorking
                ? "Creating..."
                : "Sign Up"
              : isWorking
              ? "Processing..."
              : "Log In"}
          </Button>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
}

export default AuthForm;
