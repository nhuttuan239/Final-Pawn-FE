import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  selectedInterest: null,

  currentPageInterests: [], //["interestId1", "interestID2"]
  interestsById: {
    //"interestId1":"info1..."
    //"interestId2":"info2..."
    //"interestId3":"info3..."
  },
  totalPages: 1,
  count: 0,
  numberOfInterests: 0,
};
const slice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getInterestListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { interests, count, totalPages } = action.payload;

      interests.forEach((interest) => {
        state.interestsById[interest._id] = interest;
      });
      state.currentPageInterests = interests.map((interest) => interest._id);
      state.totalPages = totalPages;
      state.count = count;
    },

    createInterestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newInterest = action.payload;
      //remove the final post of current page before push a new once
      //if num of currentPagePost fits postPerPage
      // if (state.currentPagePosts.length % POST_PER_PAGE === 0) {
      //     state.currentPagePosts.pop();
      // }
      //re-render list after creating
      state.interestsById[newInterest._id] = newInterest;
      state.currentPageInterests.unshift(newInterest._id);
    },

    updateInterestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPageInterests.forEach((interest) => {
        if (interest._id === action.payload._id) {
          interest = action.payload;
        }
      });
      state.interestsById[action.payload._id] = action.payload;
    },

    deleteInterestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deleteInterest = action.payload;
      //remove the final post of current page before push a delete once
      //if num of currentPagePost fits postPerPage
      // if (state.currentPagePosts.length % POST_PER_PAGE === 0) {
      //     state.currentPagePosts.pop();
      // }
      //re-render list after creating
      state.interestsById[deleteInterest._id] = deleteInterest;
      state.currentPageInterests.filter((i) => i !== deleteInterest._id);
    },
  },
});
export default slice.reducer;

export const getInterestListAsync =
  ({ name, page = 1, limit = 20 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { name, page, limit };
      const response = await apiService.get(`/interests`, { params });
      dispatch(slice.actions.getInterestListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createInterest = (form) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/interests", form);

    if (response.errors) {
      toast.success(response.errors);
    } else {
      toast.success(response.message);
      dispatch(slice.actions.createInterestSuccess(response.data));
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateInterest =
  ({
    interest,
    dateEnd,
    dateStart,
    description,
    interestType,
    interestCode,
    interestId,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/interests/${interestId}`, {
        interest,
        dateEnd,
        dateStart,
        description,
        interestType,
        interestCode,
      });
      toast.success("Update Interest Successfully");
      dispatch(slice.actions.updateInterestSuccess(response.data));

      // dispatch(getInterestListAsync({}));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteInterest = (interestId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/interests/${interestId}`);

    toast.success("Delete Interest Successfully");
    dispatch(slice.actions.deleteInterestSuccess(response.data));
    dispatch(getInterestListAsync({}));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
