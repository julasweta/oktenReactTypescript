import React from "react";
import { CarForm } from "../components/CarForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { carsActions } from "../redux/slices/CarsSlice";
import { RootState } from "../redux/store";
import { CarPage } from "./CarPage";

const CarsPage = () => {
  const { cars, deleteTriger } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carsActions.getCars());
  }, [dispatch, deleteTriger]);

  return (
    <div>
      CarsPage
      <CarForm />
      <div className="cars">{cars && cars.map((car) => <CarPage key={car.id} car={car} />)}</div>
    </div>
  );
};
export { CarsPage };
