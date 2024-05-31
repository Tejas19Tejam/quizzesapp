import axios from "./axios";
import catchAsync from "../utils/catchAsync";

export const signup = catchAsync(
  async ({ name, email, password, confirmedPassword }) => {
    const { data } = await axios.post(`users/signup`, {
      name,
      email,
      password,
      confirmedPassword,
    });

    return data.data;
  }
);

export const login = catchAsync(async ({ email, password }) => {
  const { data } = await axios.post(`/users/login`, {
    email,
    password,
  });
  return data.data;
});

export const logout = catchAsync(async () => {
  const { data } = await axios.get(`/users/logout`);
  return data.data;
});
