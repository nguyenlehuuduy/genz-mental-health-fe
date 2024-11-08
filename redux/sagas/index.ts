import { all } from "redux-saga/effects";
import auth from "./auth";
import rooms from "./rooms";

function* rootSaga() {
  yield all([auth(), rooms()]);
}

export default rootSaga;
