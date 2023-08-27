import React, { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICar } from "../interfaces";
import { carsActions } from "../redux/slices/CarsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/store";
import css from "./components.module.css";

const CarForm: FC = () => {
  const { checkCar } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, reset } = useForm<ICar>();

  useEffect(() => {
    if (checkCar != null) {
      setValue("id", checkCar.id);
      setValue("brand", checkCar.brand);
      setValue("price", checkCar.price);
      setValue("year", checkCar.year);
    }
  }, [checkCar, setValue]);

  const update: SubmitHandler<ICar> = async (data) => {
    const car = {
      id: data.id,
      brand: data.brand,
      price: +data.price,
      year: +data.year,
    };
    await dispatch(carsActions.update({ id: car.id, car }));
    dispatch(carsActions.setDeleteTriger());
    reset();
  };

  const add: SubmitHandler<ICar> = async (data) => {
    await dispatch(carsActions.create({ data }));
    dispatch(carsActions.setDeleteTriger());
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(checkCar != null ? update : add)} className={css.formContainer}>
        <input type="text" placeholder="id" {...register("id")} className={css.inputField} disabled />
        <input type="text" placeholder="brand" {...register("brand")} className={css.inputField} />
        <input type="text" placeholder="price" {...register("price")} className={css.inputField} />
        <input type="text" placeholder="year" {...register("year")} className={css.inputField} />
        <input type="submit" value={checkCar != null ? "update" : "add"} className={css.submitButton} />
      </form>
    </div>
  );
};

export { CarForm };
