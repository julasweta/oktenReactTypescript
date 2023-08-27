import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../../interfaces/authInterface";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authActions } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const LoginForm = (props: Props) => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const { errors } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login: SubmitHandler<IAuth> = async (user) => {
    //щоб витягнути інфо про успішний статус відправки запиту пишемо -  const {meta:{requestStatus}}  і витягуємо з нього інфо
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login({ user }));
    if (requestStatus == "fulfilled") {
      reset();
      navigate("/cars");
    }
  };

  console.log(errors && errors.response.data.detail);

  return (
    <div>
      LoginForm
      <form onSubmit={handleSubmit(login)}>
        <input type="text" placeholder={"username"} {...register("username")} />
        <input type="text" placeholder={"password"} {...register("password")} />
        <button>login</button>
        {errors?.response.data.detail ? <span>{errors.response.data.detail}</span> : ''}
      </form>
    </div>
  );
};

export { LoginForm };
