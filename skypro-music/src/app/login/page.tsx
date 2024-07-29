"use client";

import Image from "next/image";
import styles from "../page.module.css";
import loginStyle from "./login.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { toLogIn } from "../../../api/authApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    try {
      toLogIn(email, password);
      navigate.push('/')
    } catch (error) {
      console.log(error)
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
            <input 
              type="email" 
              className={loginStyle.input} 
              placeholder="Почта" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              className={loginStyle.input} 
              placeholder="Пароль" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
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
