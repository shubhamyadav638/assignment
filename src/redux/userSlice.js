import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  page: 1,
  totalPages: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
      state.totalPages = action.payload.total_pages;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setUsers, setPage } = userSlice.actions;
export default userSlice.reducer;
