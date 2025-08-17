import { all, fork } from "redux-saga/effects";
import watchers from "./index";

export default function* rootSaga() {
  yield all([fork(watchers)]);
}
