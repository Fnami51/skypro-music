'use client';

import Image from "next/image"
import styles from "./style_components/header.module.css"
import React from "react";

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(true);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => { 
    setIsOpenMenu(!isOpenMenu);
  };

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
                  <a href="../signin.html" className={styles.link}>Войти</a>
                </li>
              </ul>
            </div>) : null }
            
          </nav>
    )
}