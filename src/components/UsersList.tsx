import { useEffect, useState } from "react";
import type { User } from "../types/user/user";
import { createUser, getUser } from "../services/api";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });


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

  const handleCreateUser = async () => {
    try {
      
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    } catch {
      setError("Failed to Crate New User");
    } 
  };

  

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
    <div className="">
      <div className="bg-white shadow-2xl px-4 py-10 sm:px-6 mb-10 ">
        <h1 className="text-xl font-medium mb-4">Add new User</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <input
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            value={newUser.name}
            className="block w-full rounded-md border border-indigo-300 shadow-sm  focus:border-indigo-500 focus: ring-indigo-500 text-lg py-2 px-2"
            type="text"
            placeholder="Name"
          />
          <input
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            className="block w-full rounded-md border border-indigo-300 shadow-sm  focus:border-indigo-500 focus: ring-indigo-500 text-lg py-2 px-2"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            value={newUser.email}
            className="block w-full rounded-md border border-indigo-300 shadow-sm  focus:border-indigo-500 focus: ring-indigo-500 text-lg py-2 px-2"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mt-5">
          <button
            onClick={handleCreateUser}
            className="inline-flex justify-center px-5 py-1.5 rounded-md border-transparent bg-indigo-600 hover:bg-indigo-700 font-medium text-white"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white shadow-2xl px-4 py-10 sm:px-6">
        <h1 className="text-lg mb-10 font-medium py-1.5">Users</h1>
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
                  <button onClick={()=> handleDelete(user.id)} className="inline-flex px-4 py-1.5 items-center border border-transparent text-xs font-medium rounded-md text-red-500 bg-red-200 hover:bg-red-100 hover:text-red-400 cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
