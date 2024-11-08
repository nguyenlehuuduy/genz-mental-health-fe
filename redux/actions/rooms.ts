import { MessageForResponse } from "@/service/messageService";
import { RoomMessageForCard } from "@/service/roomMessageService";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RoomsMessage {
  rooms: RoomMessageForCard[];
}

const initialState: RoomsMessage = {
  rooms: [],
};

const rooms = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoomsMessage: (state, action) => {},
    addRoomsMessageSuccess: (
      state,
      action: PayloadAction<RoomMessageForCard[]>,
    ) => {
      const newRooms = action.payload.map((room) => ({
        ...room,
        lastMessage: room.lastMessage ?? "",
        lastMessageTime: room.lastMessageTime ?? "",
      }));
      state.rooms = [...state.rooms, ...newRooms];
      state.rooms.sort((a, b) => {
        if (a.lastMessageTime < b.lastMessageTime) return 1;
        if (a.lastMessageTime > b.lastMessageTime) return -1;
        return 0;
      });
    },

    updateRoomsMessage: (state, action) => {},
    updateRoomsMessageSuccess: (
      state,
      action: PayloadAction<MessageForResponse>,
    ) => {
      const message = action.payload;
      const room = state.rooms.find((room) => room.id === message.roomId);
      if (room) {
        room.lastMessage = message.contentText;
        room.lastMessageTime = message.updated_at.toString();
        room.idLastSendingUser = message.owner.id;
        room.isSeen = false;
      }
      state.rooms.sort((a, b) => {
        if (a.lastMessageTime < b.lastMessageTime) return 1;
        if (a.lastMessageTime > b.lastMessageTime) return -1;
        return 0;
      });
    },

    seenMessage: (state, action) => {},
    seenMessageSuccess: (state, action: PayloadAction<string>) => {
      const roomId = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);

      if (room) {
        room.isSeen = true;
      }
    },
  },
});

export const {
  addRoomsMessage,
  addRoomsMessageSuccess,
  updateRoomsMessage,
  updateRoomsMessageSuccess,
  seenMessage,
  seenMessageSuccess,
} = rooms.actions;
export default rooms.reducer;
