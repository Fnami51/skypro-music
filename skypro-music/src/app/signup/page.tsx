"use client";

import Image from "next/image";
import styles from "../page.module.css";
import signupStyle from "./signup.module.css";
import classNames from "classnames";
import { useState } from "react";
import { toLogIn, toSignUp } from "../../../api/authApi";
import { getToken } from "../../../api/token";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setAccessToken, setRefreshToken, setUser } from "@/store/features/favoriteSlice";

interface User {
  email: string;
  username: string;
  _id: number; 
}

interface Token {
  access: string;
  refresh: string;
}

interface SignUp {
  message: string;
  result: User;
  success: boolean;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { user, refresh, access } = useAppSelector((state) => state.favorite);
  const navigate = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string; verification?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string; verification?: string } = {};

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

    if (password !== verification) {
      newErrors.verification = "Пароли не совпадают";
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
      const complate: SignUp = await toSignUp(email, password);
      dispatch(setUser(complate.result));
      const tokens: Token = await getToken(email, password);
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
        <main className={classNames(styles.main, signupStyle.position)}>
          <div className={signupStyle.block}>
            <Image 
              className={styles.image}
              src="/img/logo_modal.png" 
              alt={"Логотип"} 
              width={140} 
              height={21}
            />
            <div className={signupStyle.inputWrapper}>
              <input 
                type="email" 
                id="email" 
                className={classNames(signupStyle.input, { [signupStyle.error]: errors.email })}
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
            <div className={signupStyle.inputWrapper}>
              <input 
                type="password" 
                id="password" 
                className={classNames(signupStyle.input, { [signupStyle.error]: errors.password })}
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
            <div className={signupStyle.inputWrapper}>
              <input 
                type="password" 
                id="verification" 
                className={classNames(signupStyle.input, { [signupStyle.error]: errors.verification })}
                placeholder="Повторите пароль" 
                value={verification} 
                onChange={(e) => {
                  setVerification(e.target.value);
                  if (errors.verification) {
                    setErrors({ ...errors, verification: "" });
                  }
                }}
                required
              />
            </div>
            <button 
              className={classNames(signupStyle.button, signupStyle.registrBtn)} 
              onClick={handleClick}
            >
              Зарегистрироваться
            </button>
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
