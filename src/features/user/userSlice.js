import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },

    reloadUser: (state) => {
      let user = localStorage.getItem("user");
      if (user) state.user = JSON.parse(user);
    },

  },
});

export const { reloadUser, saveUser, signOut } = userSlice.actions;
export default userSlice.reducer;
