import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../../interfaces/authInterface";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { authActions } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const RegisterForm = (props: Props) => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const {errors} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser: SubmitHandler<IAuth> = async (user) => {
   const {meta:{requestStatus}}= await dispatch(authActions.register({ user }));
   if(requestStatus == 'fulfilled'){
    navigate('/auth')
   }
  };

  console.log(errors && errors)

  return (
    <div>
      RegiserForm
      <form onSubmit={handleSubmit(registerUser)}>
        <input type="text" placeholder={"username"} {...register("username")} />
        <input type="text" placeholder={"password"} {...register("password")} />
        <button>register</button>
        <p></p>
        {errors?.response.data.username == 'user model with this username already exists.'? <p> Імя вже зареєстровано</p> : ''}
        {errors?.response.data.password? <p>{errors.response.data.password}</p> : ''}
      </form>
    </div>
  );
};

export { RegisterForm };
