import { all } from "redux-saga/effects";
import campaignSaga from "../features/campaigns/campaignSaga";

export default function* rootSaga() {
  yield all([campaignSaga()]);
}
