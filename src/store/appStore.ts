import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "../features/campaigns/campaignSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    campaign: campaignReducer,
    snackBar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
