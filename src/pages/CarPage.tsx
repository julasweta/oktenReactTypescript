import React, { useRef, useState } from "react";
import { ICar } from "../interfaces";
import { carsActions } from "../redux/slices/CarsSlice";
import { useAppDispatch } from "../hooks/hooks";
import { carService } from "../services";
import photo from "../assets/images/auto.jpg";
import empty from "../assets/images/auto2.jpg";
import css from "./cars.module.css";
import axios, { AxiosError, isAxiosError } from "axios";
import { Link } from "react-router-dom";

type Props = {
  car?: ICar;
};

const CarPage = ({ car }: Props) => {
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>();
  const [image, setImage] = useState<string>(null);

  const deleteCar = (car: ICar) => {
    dispatch(carsActions.deleteCar({ car }));
  };

  if (!car) {
    return <div>No car data</div>;
  }

  const addPhoto = async () => {
    const file: Blob = fileInput.current.files[0];
    const newFormData = new FormData(); // Створюємо новий об'єкт FormData
    newFormData.append("photo", file);

    try {
      await carService.addPhoto(car.id, newFormData); // Використовуємо новий об'єкт FormData
      dispatch(carsActions.setDeleteTriger());
      setImage(URL.createObjectURL(file));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className={css.item}>
      <h2><i>Brand:</i> {car.brand}</h2>
      <p><b>year:</b> {car.year}</p>
      <p><b>price:</b> {car.price}</p>
      <img
        className={css.img}
        src={car.photo || empty}
        alt={"brand"}
        style={{ cursor: "pointer" }}
        onClick={() => fileInput.current.click()}
      />

      <input type="file" accept={"image/jpeg, image/png"} style={{ display: "none" }} onChange={addPhoto} ref={fileInput} />

      <div>
        <button onClick={() => deleteCar(car)}>Delete</button>
        <button onClick={() => dispatch(carsActions.setCheckCar({ car }))}>Update</button>
       <Link to={`/cars/${car.id}`}><button className={css.btnDetail}>Детальніше</button></Link>
      </div>
    </div>
  );
};

export { CarPage };
