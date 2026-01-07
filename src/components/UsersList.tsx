import {  useEffect, useState } from "react";
import type { User } from "../types/user/user";
import { getUser } from "../services/api";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUser();
        setUsers(data);
      } catch {
        setError("Failed to Fetch Users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
 

  if (loading)
    return (
      <div className="flex items-center justify-center text-2xl">
        loading...
      </div>
    );

  if (error)
    return (
      <div
        role="alert"
        className="flex items-center justify-center text-xl bg-red-100 text-red-600 p-4 border border-red-200"
      >
        {error}
      </div>
    );
  return (
    <div className="bg-white shadow-2xl">
      <div className="px-4 sm:px-6 mb-10 border-b border-indigo-200">
        <h1 className="text-lg font-medium py-1.5">Users</h1>
      </div>
      <ul className="divide-y divide-indigo-200">
        {users.map((user) => (
          <li key={user.id} className="px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0">
                <p>
                  <span className="font-bold text-lg truncate">Name:</span>{" "}
                  {user?.name}
                </p>
                <p>
                  <span className="font-bold text-lg truncate">Email:</span>{" "}
                  {user?.email}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="inline-flex px-4 py-1.5 items-center border border-transparent text-xs font-medium rounded-md text-indigo-500 bg-indigo-200 hover:bg-indigo-100 hover:text-indigo-400 cursor-pointer">
                  Update
                </button>
                <button className="inline-flex px-4 py-1.5 items-center border border-transparent text-xs font-medium rounded-md text-red-500 bg-red-200 hover:bg-red-100 hover:text-red-400 cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
