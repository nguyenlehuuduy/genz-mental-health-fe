import { RoomMessageForCard } from "@/service/roomMessageService";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import {
  addRoomsMessage,
  addRoomsMessageSuccess,
  seenMessage,
  seenMessageSuccess,
  updateRoomsMessage,
  updateRoomsMessageSuccess,
} from "../actions/rooms";
import { MessageForResponse } from "@/service/messageService";

function* handleAddRoomsMessage(action: PayloadAction<RoomMessageForCard[]>) {
  yield put(addRoomsMessageSuccess(action.payload));
}

function* handleUpdateRoomsMessage(action: PayloadAction<MessageForResponse>) {
  yield put(updateRoomsMessageSuccess(action.payload));
}

function* handleSeenMessage(action: PayloadAction<string>) {
  yield put(seenMessageSuccess(action.payload));
}

export default function* rooms() {
  yield takeEvery(addRoomsMessage.type, handleAddRoomsMessage);
  yield takeEvery(updateRoomsMessage.type, handleUpdateRoomsMessage);
  yield takeEvery(seenMessage.type, handleSeenMessage);
}
