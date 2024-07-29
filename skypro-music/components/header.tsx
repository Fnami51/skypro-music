'use client';

import Image from "next/image"
import styles from "./style_components/header.module.css"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const navigate = useRouter()
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = sessionStorage.getItem("name");
      setUserName(name ? String(name) : null);
    }
  }, []);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => { 
    setIsOpenMenu(!isOpenMenu);
  };

  function goToExit() {
    sessionStorage.clear()
    navigate.push('/login')
  }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
              <Image 
                className={styles.image}
                src="/img/logo.png" 
                alt={"Логотип"} 
                width={114} 
                height={17}/>
            </div>
            <button onClick={handleClick} className={styles.burger}>
              <span className={styles.burgerLine}></span>
              <span className={styles.burgerLine}></span>
              <span className={styles.burgerLine}></span>
            </button>

            {isOpenMenu ? (<div className={styles.menu}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <a href="#" className={styles.link}>Главное</a>
                </li>
                <li className={styles.item}>
                  <a href="#" className={styles.link}>Мой плейлист</a>
                </li>
                <li className={styles.item}>
                  <button className={styles.link} onClick={goToExit}>{userName?"Выйти":"Войти"}</button>
                </li>
              </ul>
            </div>) : null }
            
          </nav>
    )
}