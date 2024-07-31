'use client';

import Image from "next/image"
import styles from "./style_components/header.module.css"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFavoritePlaylist, setUser } from "@/store/features/favoriteSlice";

export default function Header() {
  const navigate = useRouter()
  const dispatch = useAppDispatch();
  const { user, isFavoritePlaylist } = useAppSelector((state) => state.favorite);
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = user.username
    setUserName(name ? String(name) : null);
  }, [user]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => { 
    setIsOpenMenu(!isOpenMenu);
  };

  function goToExit() {
    dispatch(setUser({_id: 0, email: "", username: ""}))
    dispatch(setFavoritePlaylist(false))
    navigate.push('/login')
  }

  function handleFavorite() {
      if (user) {
        dispatch(setFavoritePlaylist(true))
      } else {
        goToExit()
      }
  }

  function handleMain() {
        dispatch(setFavoritePlaylist(false))
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
                  <button className={styles.link} onClick={handleMain}>Главное</button>
                </li>
                <li className={styles.item}>
                  <button className={styles.link} onClick={handleFavorite}>Мой плейлист</button>
                </li>
                <li className={styles.item}>
                  <button className={styles.link} onClick={goToExit}>{userName?"Выйти":"Войти"}</button>
                </li>
              </ul>
            </div>) : null }
            
          </nav>
    )
}