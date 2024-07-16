import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  deletedUser: null,
  selectedUser: null,
  currentPageUsers: [], //["userId1", "userID2"]
  usersById: {
    //"customerId1":"info1..."
    //"customerId2":"info2..."
    //"customerId3":"info3..."
  },
  users: [],
  totalPages: 1,
  count: 0,
  numberOfUsers: 0,
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPages } = action.payload;

      // users.forEach((user) => {
      //   state.usersById[user._id] = user;
      // });
      // state.currentPageUsers = users.map((user) => user._id);
      // state.totalPages = totalPages;
      // state.count = count;

      state.users = users;
      state.totalPages = totalPages;
      state.count = count;
    },

    createUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newUser = action.payload;
      console.log(newUser);

      state.usersById[newUser._id] = newUser;
      state.currentPageUsers.unshift(newUser._id);
    },

    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPageUsers.forEach((user) => {
        if (user._id === action.payload._id) {
          user = action.payload;
        }
      });
      state.usersById[action.payload._id] = action.payload;
    },

    deleteUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deleteUser = action.payload;

      state.usersById[deleteUser._id] = deleteUser;
      state.currentPageUsers.filter((i) => i !== deleteUser._id);
    },
  },
});
export default slice.reducer;

export const getUserListAsync =
  ({ page = 1, limit = 12, search_params }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { search_params, page, limit };
      const response = await apiService.get(`/users`, { params });
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createUser = (data) => async (dispatch) => {
  console.log(data);
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/users", data);

    dispatch(slice.actions.createUserSuccess(response.data));
    dispatch(getUserListAsync({}));
    toast.success("Create User successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateUser =
  ({ username, password, role, email, description, reportTo, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/users/${userId}`, {
        username,
        password,
        email,
        description,
        reportTo,
        role,
      });
      dispatch(slice.actions.updateUserSuccess(response.data));
      dispatch(getUserListAsync({}));
      toast.success("Update User Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/users/${userId}`);

    toast.success("Delete User Successfully");
    dispatch(slice.actions.deleteUserSuccess(response.data));
    dispatch(getUserListAsync({}));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
