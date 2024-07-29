import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  deletedCustomer: null,
  selectedCustomer: null,
  currentPageCustomers: [], //["customerId1", "customerID2"]
  customersById: {
    //"customerId1":"info1..."
    //"customerId2":"info2..."
    //"customerId3":"info3..."
  },
  totalPages: 1,
  count: 0,
  numberOfCustomers: 0,
};
const slice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCustomerListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { customers, count, totalPages } = action.payload;

      customers.forEach((customer) => {
        state.customersById[customer._id] = customer;
      });
      state.currentPageCustomers = customers.map((customer) => customer._id);
      state.totalPages = totalPages;
      state.count = count;
    },

    createCustomerSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newCustomer = action.payload;
      //remove the final post of current page before push a new once
      //if num of currentPagePost fits postPerPage
      // if (state.currentPagePosts.length % POST_PER_PAGE === 0) {
      //     state.currentPagePosts.pop();
      // }
      //re-render list after creating
      state.customersById[newCustomer._id] = newCustomer;
      state.currentPageCustomers.unshift(newCustomer._id);
    },

    updateCustomerSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPageCustomers.forEach((customer) => {
        if (customer._id === action.payload._id) {
          customer = action.payload;
        }
      });
      state.customersById[action.payload._id] = action.payload;
    },

    deleteCustomerSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deleteCustomer = action.payload;

      state.customersById[deleteCustomer._id] = deleteCustomer;
      state.currentPageCustomers.filter((i) => i !== deleteCustomer._id);
    },
  },
});
export default slice.reducer;

export const getCustomerListAsync =
  ({ page = 1, limit = 12, search_params }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { search_params, page, limit };
      const response = await apiService.get(`/customers`, { params });
      dispatch(slice.actions.getCustomerListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const createCustomer = (form) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/customers", form);

    dispatch(slice.actions.createCustomerSuccess(response.data));
    toast.success("Create Customer successfully");
    // dispatch(getCurrentUserProfile());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateCustomer =
  ({ fullname, phone, nationalId, address, customerId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/customers/${customerId}`, {
        fullname,
        phone,
        nationalId,
        address,
      });
      dispatch(slice.actions.updateCustomerSuccess(response.data));
      toast.success("Update Customer Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteCustomer = (customerId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/customers/${customerId}`);

    toast.success("Delete Customer Successfully");
    dispatch(slice.actions.deleteCustomerSuccess(response.data));
    dispatch(getCustomerListAsync({}));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
