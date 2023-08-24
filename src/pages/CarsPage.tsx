import React from "react";
import { CarForm } from "../components/CarForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { carsActions } from "../redux/slices/CarsSlice";
import { RootState } from "../redux/store";
import { CarPage } from "./CarPage";
import { Link, Outlet } from "react-router-dom";

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
      <Outlet/>
     
        <div className="cars">{cars && cars.map((car) => <Link to={`/cars/${car.id}`} className="car">
  <CarPage key={car.id} car={car} />
</Link>)}</div>
     
    </div>
  );
};
export { CarsPage };
