import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "../Features/Auth/authSlice";
import firmReducer from "../Features/Dashboard/dashboardSlice";
import todoReducer from "../Features/Todos/todoSlice";
import statReducer from "../Features/Statistics/statSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    firm: firmReducer,
    report: todoReducer,
    stat: statReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
