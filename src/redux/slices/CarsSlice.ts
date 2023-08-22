import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CarsState {
  cars: number
}

// Define the initial state using that type
const initialState: CarsState = {
  cars: 4,
}

export const CarsSlice = createSlice({
  name: 'cars',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.cars += 1
    },
    decrement: (state) => {
      state.cars -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.cars += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = CarsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cars.cars

export default CarsSlice.reducer