import React, {useEffect} from "react";
import { CarForm } from "../components/CarForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/store";
import { CarPage } from "./CarPage";
import { Link } from "react-router-dom";
import { carsActions } from "../redux/slices/CarsSlice";

const CarsPage = () => {
  const { cars, deleteTriger } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch( carsActions.getCars());
  }, [dispatch, deleteTriger]);
  

  return (
    <div>
      CarsPage
      <CarForm />
      <div className="cars">
        {cars && cars.map((car) => (
            <Link to={`/cars/${car.id}`} className="car" key={car.id}>
              <CarPage key={car.id} car={car} />
            </Link>
          ))}
      </div>
    </div>
  );
};
export { CarsPage };
