import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async () => {
  try {
    const res = await api.get(`/posts`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};