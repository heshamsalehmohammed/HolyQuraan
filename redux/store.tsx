import "react-native-get-random-values";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import utilitiesReducer from "./slices/utilities/utilitiesSlice";
import ReduxDispatchSingleton from "../services/reduxDispatchSingleton";

const store = configureStore({
  reducer: {
    auth: authReducer,
    utilities: utilitiesReducer,
  },
});

ReduxDispatchSingleton.setDispatch(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
