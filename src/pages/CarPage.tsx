import React from "react";
import { ICar } from "../interfaces";
import { carsActions } from "../redux/slices/CarsSlice";
import { useAppDispatch } from "../hooks/hooks";

type Props = {
  car?: ICar;
};

const CarPage = ({ car }: Props) => {
  const dispatch = useAppDispatch();

  const deleteCar = (car: ICar) => {
    dispatch(carsActions.deleteCar({ car }));
  };

  if (!car) {
    return <div>No car data</div>;
  }

  return (
    <div className="car-box">
      <h2>{car.brand}</h2>
      <p>{car.year}</p>
      <p>{car.price}</p>
      <button onClick={() => deleteCar(car)}>Delete</button>
      <button onClick={() => dispatch(carsActions.setCheckCar({ car }))}>update</button>
    </div>
  );
};

export { CarPage };