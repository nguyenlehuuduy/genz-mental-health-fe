import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import {
  getCurrentUser,
  getCurrentUserSuccess,
  updateAvatar,
  updateAvatarSuccess,
  updateBanner,
  updateBannerSuccess,
} from "../actions/auth";
import { MyselfForCard } from "@/service/accountService";

function* handleGetCurrentUser(action: PayloadAction<MyselfForCard>) {
  yield put(getCurrentUserSuccess(action.payload));
}

function* handleUpdateAvatar(action: PayloadAction<string>) {
  yield put(updateAvatarSuccess(action.payload));
}

function* handleUpdateBanner(action: PayloadAction<string>) {
  yield put(updateBannerSuccess(action.payload));
}

export default function* auth() {
  yield takeEvery(getCurrentUser.type, handleGetCurrentUser);
  yield takeEvery(updateAvatar.type, handleUpdateAvatar);
  yield takeEvery(updateBanner.type, handleUpdateBanner);
}
