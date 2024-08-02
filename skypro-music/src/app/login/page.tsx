"use client";

import Image from "next/image";
import styles from "../page.module.css";
import loginStyle from "./login.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { toLogIn } from "../../../api/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setAccessToken, setRefreshToken, setUser } from "@/store/features/favoriteSlice";
import { getToken } from "../../../api/token";

interface User {
  email: string;
  username: string;
  _id: number; 
}

interface Token {
  access: string;
  refresh: string;
}

export default function Home() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const { user, refresh, access } = useAppSelector((state) => state.favorite);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Почта обязательна";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Неверный формат почты";
    }

    if (!password) {
      newErrors.password = "Пароль обязателен";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    return newErrors;
  };

  async function handleClick() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userFromApi: User = await toLogIn(email, password);
      console.log(userFromApi);
      dispatch(setUser(userFromApi));
      const tokens: Token = await getToken(email, password);
      console.log(tokens);
      dispatch(setAccessToken(tokens.access));
      dispatch(setRefreshToken(tokens.refresh));
      navigate.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={classNames(styles.main, loginStyle.position)}>
          <div className={loginStyle.block}>
            <Image 
              className={styles.image}
              src="/img/logo_modal.png" 
              alt={"Логотип"} 
              width={140} 
              height={21}
            />
            <div className={loginStyle.inputWrapper}>
              <input 
                type="email" 
                className={classNames(loginStyle.input, { [loginStyle.error]: errors.email })}
                placeholder="Почта" 
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                required
              />
            </div>
            <div className={loginStyle.inputWrapper}>
              <input 
                type="password" 
                className={classNames(loginStyle.input, { [loginStyle.error]: errors.password })}
                placeholder="Пароль" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                required
              />
            </div>
            <button 
              className={classNames(loginStyle.button, loginStyle.loginBtn)} 
              onClick={handleClick}
            >
              Войти
            </button>
            <Link 
              className={classNames(loginStyle.button, loginStyle.registrBtn)} 
              href="/signup"
            >
              Зарегистрироваться
            </Link>
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
