import React, { useEffect } from "react";
import { CarForm } from "../components/CarForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/store";
import { CarPage } from "./CarPage";
import { Link, Outlet } from "react-router-dom";
import { carsActions } from "../redux/slices/CarsSlice";
import css from "./cars.module.css";

const CarsPage = () => {
  const { cars, deleteTriger, pages, activePage } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carsActions.getPages());
    dispatch(carsActions.getCars({ activePage }));
  }, [dispatch, deleteTriger, activePage]);

  const onPage = (act: string) => {
    dispatch(carsActions.setActivePage(act));
  };
console.log(cars)
  return (
    <div>
      CarsPage
      <CarForm />
      <div className={css.detail}><Outlet/></div>
      
      <div>
        <button onClick={() => onPage("back")}>back</button>
        <span>page: {activePage}</span>
        <button onClick={() => onPage("next")}>next</button>
      </div>
      <div className={css.items}>
      {cars && cars.map((car) => 
  <CarPage key={car.id} car={car} />
)}
      </div>
    </div>
  );
};
export { CarsPage };
