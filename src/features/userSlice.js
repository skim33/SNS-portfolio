import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  uid: null,
  displayName: null,
  profileURL: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.profileURL = action.payload.profileURL;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    logout: (state) => {
      state.email = null;
      state.uid = null;
      state.displayName = null;
      state.profileURL = null;
    }
  }
}); 

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// Selectors
export const selectEmail = (state) => state.user.email;
export const selectUid = (state) => state.user.uid;
export const selectDisplayName = (state) => state.user.displayName;
export const selectProfileURL = (state) => state.user.profileURL;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userSlice.reducer;
