/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  isAuth: boolean;
  user: UserState | null;
}
export interface UserState {
  app: any;
  id: number;
  firstName: string;
  lastName: string;
  googleID: string;
  email: string;
  profileImg: string;
}

const initialState: IAppState = {
  isAuth: false,
  user: null,
};
export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, setUser } = AppSlice.actions;

export default AppSlice.reducer;
