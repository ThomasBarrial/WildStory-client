import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '.';

export interface UserState {
  id?: string;
  profilTitle?: string;
  username?: string;
  email?: string;
  password?: string;
  city?: string;
  birthDate?: string | undefined;
  avatarUrl?: string;
  landimageUrl?: string;
  idFormation?: string;
  logged?: boolean;
}

interface UserStateWithLogged extends UserState {
  logged: boolean;
}

// TODO: improve dispatch types
interface ReturnUseUserFromStore {
  user: UserState;
  dispatchLogin: (payload: UserState) => {
    type: string;
    payload: UserState;
  };
  dispatchLogout: () => {
    type: string;
  };
  dispatchUser: (payload: UserState) => {
    type: string;
    payload: UserState;
  };
}

const initialState: UserStateWithLogged = {
  logged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => ({
      ...action.payload,
      logged: true,
    }),
    logout: () => initialState,
    update: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { login, logout, update } = userSlice.actions;

export const useUserFromStore = (): ReturnUseUserFromStore => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const dispatchLogin = (payload: UserState) => dispatch(login(payload));
  const dispatchLogout = () => dispatch(logout());
  const dispatchUser = (payload: UserState) => dispatch(update(payload));

  return {
    user,
    dispatchLogin,
    dispatchLogout,
    dispatchUser,
  };
};

export default userSlice.reducer;
