import React, {useEffect} from "react";
import css from "./header.module.css";
import { Link } from "react-router-dom";
import { urls } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authService } from "../../services/authService";
import { authActions } from "../../redux/slices/AuthSlice";

type Props = {};

const Header = (props: Props) => {
  const { me } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

useEffect(()=>{
  if (authService.getAccessToken() && !me) {
    dispatch(authActions.me())
}
}, [])

  return (
    <div className={css.header}>
    {me !== null ? (
      <div className={css.userGreetings}>Welcome, {me.username}!</div>
    ) : (
      <div className={css.loginRegisterButtons}>
        <Link to={urls.auth.login}>
          <button className={css.button}>Login</button>
        </Link>
        <Link to={urls.auth.register}>
          <button className={css.button}>Register</button>
        </Link>
      </div>
    )}
  </div>
  
  );
};

export { Header };
