import type { User } from "../types/user/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUser = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};
