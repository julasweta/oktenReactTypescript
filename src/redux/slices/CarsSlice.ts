import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carService } from '../../services';
import { ICar } from "../../interfaces";
import { AxiosError } from 'axios';

interface CarsState {
  cars: ICar[],
  deleteTriger: boolean,
  checkCar: ICar | null,
}


const initialState: CarsState = {
  cars: [],
  deleteTriger: true,
  checkCar: null
}

const getCars = createAsyncThunk("CarsSlice/getCars", async (_, thunkAPI) => {
  try {
    const { data } = await carService.getAll();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

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

const create = createAsyncThunk<void, { data: ICar }>(
  'carsSlice/create',
  async ({ data }, { rejectWithValue, dispatch }) => {
    console.log(data)
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
   
  },


  extraReducers: (builder) =>
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.cars = action.payload;
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
  update,
  create,
  deleteCar

}

export {
  carsActions,
  carsReducer,
}