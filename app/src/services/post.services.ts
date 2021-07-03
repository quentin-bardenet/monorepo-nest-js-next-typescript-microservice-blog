import axios from "axios";
import Post from "../Types/Post";

export async function createPost(form: Post) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}posts`, form, {
    withCredentials: true,
  });
}
