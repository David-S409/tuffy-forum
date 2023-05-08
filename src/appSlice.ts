/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  isAuth: boolean;
  user: UserState | null;
  course: CourseInfo | null;
}
export interface UserState {
  app: any;
  userId: number;
  firstName: string;
  lastName: string;
  googleID: string;
  email: string;
  profileImg: string;
  isExpert: boolean;
  isMod: boolean;
  isOnboard: boolean;
  year: string;
}

export interface CourseInfo {
  courseId: number;
  courseCode: string;
  name: string;
}

const initialState: IAppState = {
  isAuth: false,
  user: null,
  course: null,
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
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});

export const { setIsAuth, setUser, setCourse } = AppSlice.actions;

export default AppSlice.reducer;
