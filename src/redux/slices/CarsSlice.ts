import { ICar } from './../../interfaces/carInterface';
import { IPageInterface } from './../../interfaces/pageInterface';
import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carService } from '../../services';
import { AxiosError } from 'axios';
import { IPagination } from "../../interfaces/paginationInterface";

interface CarsState {
  cars: ICar[],
  deleteTriger: boolean,
  checkCar: ICar | null,
  pages: number,
  activePage: number
}


const initialState: CarsState = {
  cars: [],
  deleteTriger: true,
  checkCar: null,
  pages: null,
  activePage: 1
}


const getCars = createAsyncThunk<IPageInterface<ICar>, { activePage: number }>(
  'carsSlice/getCars',
  async ({ activePage }, { rejectWithValue, dispatch }) => {
    console.log(activePage)
    try {
      const { data } = await carService.getAll(activePage);
      return data
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)

const update = createAsyncThunk<void, { id: number, car: ICar }>(
  'carsSlice/update',
  async ({ id, car }, { rejectWithValue, dispatch }) => {
    try {
      await carService.update(id, car);
      dispatch(actions.setCheckCar([]))
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)

const getPages = createAsyncThunk(
  'carsSlice/getPages',
  async (_, { rejectWithValue }): Promise<IPagination<ICar>> => {
    const { data } = await carService.getPages();
    return data;

  }
)



const create = createAsyncThunk<void, { data: ICar }>(
  'carsSlice/create',
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      await carService.create(data);
      dispatch(actions.setCheckCar([]))
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)

const deleteCar = createAsyncThunk<void, { car: ICar }>(
  'carsSlice/deleteCar',
  async ({ car }, { rejectWithValue, dispatch }) => {
    try {
      await carService.delete(car.id);
      dispatch(actions.setDeleteTriger());
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err)
    }
  }
)

export const CarsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setDeleteTriger: (state) => {
      state.deleteTriger = !state.deleteTriger
    },
    setCheckCar: (state, action) => {
      state.checkCar = action.payload.car
    },
    setActivePage: (state, action) => {
      if (action.payload === 'next' && state.activePage < state.pages) {
        state.activePage = state.activePage + 1
      }
      if (action.payload === 'back' && state.activePage != 1) {
        state.activePage = state.activePage - 1
      } else {
        state.activePage = state.activePage
      }
    },

  },


  extraReducers: (builder) =>
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.cars = action.payload.items;
    })
      .addCase(getPages.fulfilled, (state, action) => {

        state.pages = Math.ceil(Number(action.payload.total_items) / 6);

      })
      .addCase(update.rejected, (state, action) => {
        alert(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        alert(action.payload)
      })
})

const { reducer: carsReducer, actions, } = CarsSlice;

const carsActions = {
  ...actions,
  getCars,
  getPages,
  update,
  create,
  deleteCar

}

export {
  carsActions,
  carsReducer,
}