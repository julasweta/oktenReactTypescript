import React, { FC, PropsWithChildren } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { decrement, increment } from '../redux/slices/CarsSlice'

interface IProps extends PropsWithChildren {

}

const CarForm:FC<IProps> = (props: IProps) => {
    const cars = useAppSelector((state) => state.cars)
    const dispatch = useAppDispatch()

    console.log(cars) 

  return (
    <div>CarForm</div>
  )
}

export  {CarForm}






