import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import customerReducer from "../features/customer/customerSlice";
import interestReducer from "../features/interest/interestSlice";
import contractReducer from "../features/contract/contractSlice";
const rootReducer = {
  user: userReducer,
  customer: customerReducer,
  interest: interestReducer,
  contract: contractReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
