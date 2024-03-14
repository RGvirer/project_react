import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  photosArr: []
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    saveAllFromServer: (state, action) => {
      state.photosArr = action.payload;
    },
    deletePhotoInState: (state, action) => {
      let index = state.photosArr.findIndex((item) => item.id === action.payload);
      state.photosArr.splice(index, 1);
    },
    addPhotoToState: (state, action) => {
        // state.photosArr.push(...action.payload);
        // state.photosArr = state.photosArr.concat(action.payload);
            const newPhotos = action.payload.filter(newPhoto => !state.photosArr.some(photo => photo._id === newPhoto._id));
            state.photosArr = state.photosArr.concat(newPhotos);        
    },
  },
});

export const { addPhotoToState, deletePhotoInState, saveAllFromServer } = photoSlice.actions;
export default photoSlice.reducer;
