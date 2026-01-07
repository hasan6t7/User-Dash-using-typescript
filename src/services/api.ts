
import type { User } from "../types/user/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUser = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw Error("Failed to create new user");
  }
  return res.json();
};
