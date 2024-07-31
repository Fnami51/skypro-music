"use client";

import Image from "next/image";
import styles from "../page.module.css";
import signupStyle from "./signup.module.css"
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
  const navigate = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");

  async function handleClick() {
    if (password !== verification) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      const complate: SignUp = await toSignUp(email, password)
      dispatch(setUser(complate.result))
      const tokens: Token = await getToken(email, password)
      dispatch(setAccessToken(tokens.access))
      dispatch(setRefreshToken(tokens.refresh))
      navigate.push('/')      
    } catch (error) {
      console.log(error)   
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
            <input 
              type="email" 
              id="email" 
              className={signupStyle.input} 
              placeholder="Почта" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              id="password" 
              className={signupStyle.input} 
              placeholder="Пароль" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              type="password" 
              id="verification" 
              className={signupStyle.input} 
              placeholder="Повторите пароль" 
              value={verification} 
              onChange={(e) => setVerification(e.target.value)}
            />
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
