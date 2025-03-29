import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setUsers } from "../redux/userSlice";
import { getUsers } from "../api/api";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, page, totalPages } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to access the user list.");
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers(page);
        dispatch(setUsers(data));
      } catch (err) {
        toast.error("Failed to fetch users. Please try again.");
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [dispatch, page, token, navigate]);

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        `${user.first_name} ${user.last_name} ${user.email}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        User List
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page <= 1}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page >= totalPages}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
