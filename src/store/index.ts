import { configureStore, AnyAction } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { Dispatch } from "redux";
import globalAction from "./actions";
import rootReducer from "./reducer";

// ==============================|| REDUX - MAIN STORE ||============================== //
const store = configureStore({
  reducer: rootReducer,
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch<Dispatch<AnyAction>>();
const useSelector = useAppSelector;

export { store, globalAction, dispatch, useSelector, useDispatch };
