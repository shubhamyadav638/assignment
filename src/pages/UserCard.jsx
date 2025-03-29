import React, { useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { deleteUser, updateUser } from "../api/api";
import { toast } from "react-hot-toast";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (
      !editedUser.first_name.trim() ||
      !editedUser.last_name.trim() ||
      !editedUser.email.trim()
    ) {
      toast.error("All fields are required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUser.email)) {
      toast.error("Invalid email format!");
      return false;
    }
    return true;
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUser(user.id);
      const updatedUsers = users.filter((u) => u.id !== user.id);
      dispatch(setUsers({ data: updatedUsers, total_pages: 2 }));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await updateUser(user.id, editedUser);
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...editedUser } : u
      );
      dispatch(setUsers({ data: updatedUsers, total_pages: 2 }));
      setIsEditing(false);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user", error);
      toast.error("Failed to update user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 ease-in-out">
      <div className="flex justify-center pt-6">
        <Suspense
          fallback={
            <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse"></div>
          }
        >
          <img
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            src={user.avatar}
            alt={user.first_name}
            loading="lazy"
          />
        </Suspense>
      </div>

      <div className="text-center py-4">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="first_name"
              value={editedUser.first_name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, first_name: e.target.value })
              }
              className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={editedUser.last_name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, last_name: e.target.value })
              }
              className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
              placeholder="Email"
            />
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300 ${
                isLoading ? "bg-blue-300 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition duration-300"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 ${
              isLoading ? "bg-red-300 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
