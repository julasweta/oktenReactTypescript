import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/store";
import { ICar } from "../interfaces";
import css from "./cars.module.css";

type Props = {};

const CarDetailPage = (props: Props) => {
  const { cars } = useAppSelector((state: RootState) => state.cars);
  const { id } = useParams<{ id: string }>();
  const [chCar, setChCar] = useState<ICar | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const car = cars && cars.find((item) => item.id === +id);
      setChCar(car);
    }
  }, [chCar, id, cars]);

  return (
    <div className={css.detail}>
      <h2 style={{ color: "red" }}>{chCar?.brand}</h2>
      <img alt={chCar?.brand} src={chCar?.photo}></img>
      <p style={{ color: "red" }}>{chCar?.year}</p>
      <p style={{ color: "blue" }}>{chCar?.price}</p>
    </div>
  );
};

export { CarDetailPage };
