import { MyselfForCard } from "@/service/accountService";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CurrentUser {
  user?: MyselfForCard;
}

const initialState: CurrentUser = {};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, action) => {},
    getCurrentUserSuccess: (state, action: PayloadAction<MyselfForCard>) => {
      state.user = action.payload;
    },

    updateAvatar: (state, action) => {},
    updateAvatarSuccess: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avata =
          "https://mygenzmentalheath.s3.ap-southeast-2.amazonaws.com/" +
          action.payload;
      }
    },

    updateBanner: (state, action) => {},
    updateBannerSuccess: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.banner =
          "https://mygenzmentalheath.s3.ap-southeast-2.amazonaws.com/" +
          action.payload;
      }
    },
  },
});

export const {
  getCurrentUser,
  getCurrentUserSuccess,
  updateAvatar,
  updateAvatarSuccess,
  updateBanner,
  updateBannerSuccess,
} = auth.actions;
export default auth.reducer;
