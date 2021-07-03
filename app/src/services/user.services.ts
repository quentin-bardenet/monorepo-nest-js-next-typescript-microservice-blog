import axios from "axios";
import UserLogin from "../Types/UserLogin";

export async function login(form: UserLogin) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`, form, {
    withCredentials: true,
  });
}

export async function getProfile() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/profile`, {
    withCredentials: true,
  });
}
