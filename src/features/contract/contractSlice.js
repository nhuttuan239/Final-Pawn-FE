import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  bills: {},
  selectedPayment: {},
  deletedContract: null,
  selectedContract: null,
  currentPageContracts: [], //["contractId1", "contractID2"]
  contractsById: {
    //"contractId1":"info1..."
    //"contractId2":"info2..."
    //"contractId3":"info3..."
  },
  totalPages: 1,
  count: 0,
  numberOfContracts: 0,
};
const slice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteBillSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deleteBill = action.payload;
      const currentBills = state.bills.bills;
      state.bills.bills = currentBills.filter(
        (bill) => bill._id !== deleteBill._id
      );
    },

    createBillSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getBillsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.bills = action.payload;
    },

    getPaymentInfoSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedPayment = action.payload;
    },

    getContractListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { contracts, count, totalPages } = action.payload;

      contracts.forEach((contract) => {
        state.contractsById[contract._id] = contract;
      });
      state.currentPageContracts = contracts.map((contract) => contract._id);
      state.totalPages = totalPages;
      state.count = count;
    },

    createContractSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newContract = action.payload;

      state.contractsById[newContract._id] = newContract;
      state.currentPageContracts.unshift(newContract._id);
    },

    updateContractSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPageContracts.forEach((contract) => {
        if (contract._id === action.payload._id) {
          contract = action.payload;
        }
      });
      state.contractsById[action.payload._id] = action.payload;
    },

    deleteContractSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deleteContract = action.payload;

      state.contractsById[deleteContract._id] = deleteContract;
      state.currentPageContracts.filter((i) => i !== deleteContract._id);
    },
  },
});
export default slice.reducer;

export const getContractListAsync =
  ({ name, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { name, page, limit };
      const response = await apiService.get(`/contracts`, { params });
      dispatch(slice.actions.getContractListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createContract = (data) => async (dispatch) => {
  console.log(data);
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/contracts", data);

    dispatch(slice.actions.createContractSuccess(response.data));
    toast.success("Create Contract successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateContract =
  ({
    fullname,
    phone,
    nationalId,
    address,
    interestType,
    product,
    description,
    price,
    contractId,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/contracts/${contractId}`, {
        fullname,
        phone,
        nationalId,
        address,
        interestType,
        product,
        description,
        price,
      });
      dispatch(slice.actions.updateContractSuccess(response.data));
      toast.success("Update Contract Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteContract = (contractId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/contracts/${contractId}`);

    toast.success("Delete Contract Successfully");
    dispatch(slice.actions.deleteContractSuccess(response.data));
    dispatch(getContractListAsync({}));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPaymentInfoAsync =
  (contractId, payDate) => async (dispatch) => {
    console.log(payDate);
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/payments/${contractId}`, {
        payDate,
      });

      dispatch(slice.actions.getPaymentInfoSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createBill =
  (contractId, payDate, typePay) => async (dispatch) => {
    console.log(payDate);
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/payments/bill/${contractId}`, {
        payDate,
        typePay,
      });

      dispatch(slice.actions.createBillSuccess(response.data));
      dispatch(getAllBillsAsync(contractId));

      toast.success("Create Bill successfully");
      // dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getAllBillsAsync =
  (contractId, page = 1, limit = 5) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/payments/bills/${contractId}`, {
        params,
      });

      dispatch(slice.actions.getBillsSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteBill = (billId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/payments/bill/${billId}`);

    dispatch(slice.actions.deleteBillSuccess(response.data));

    toast.success("Delete Bill Successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getContractByPhone =
  ({ phone, cnumber }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/checks`, { phone, cnumber });
      dispatch(slice.actions.getPaymentInfoSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
