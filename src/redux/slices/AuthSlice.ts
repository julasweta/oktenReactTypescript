
import { IAuth } from './../../interfaces/authInterface';
import { createAsyncThunk, createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces';

interface AuthState {
  deleteTriger: boolean,
  errors:any,
  me:IUser | null
}


const initialState: AuthState = {
  deleteTriger: true,
  errors: null,
  me:null
}




const register = createAsyncThunk<void, { user: IAuth }>(
  'carsSlice/register',
  async ({ user }, { rejectWithValue, dispatch }) => {
    try {
      console.log(user)
      await authService.register(user);
      // other code
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)

const login = createAsyncThunk<IUser, { user: IAuth }>(
  'authSlice/login',
  async ({ user }, { rejectWithValue, dispatch }) => {
    try {
     const us2 = await authService.login(user);
     return us2
      // other code
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)

const me = createAsyncThunk<IUser>(
  'authSlice/me',
  async (_, { rejectWithValue, dispatch }) => {
    try {
     const {data} = await authService.me();
     return data
      // other code
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)



export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setDeleteTriger: (state) => {
      state.deleteTriger = !state.deleteTriger
    },


  },


  extraReducers: (builder) =>
    builder
    .addCase(login.fulfilled, (state, action)=>{
      state.me = action.payload
    })
    .addCase(me.fulfilled, (state, action)=>{
      state.me = action.payload
    })
    .addMatcher(isRejected, (state, action) => {
     state.errors = action.payload;
    })
    .addMatcher(isFulfilled, (state, action) => {
      state.errors = null;
     })

})

const { reducer: authReducer, actions, } = AuthSlice;

const authActions = {
  ...actions,
  register,
  login,
  me
}

export {
  authActions,
  authReducer,
}