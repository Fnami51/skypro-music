'use client';

import Image from "next/image"
import styles from "./style_components/header.module.css"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setAccessToken, setFavoritePlaylist, setRefreshToken, setUser } from "@/store/features/favoriteSlice";

export default function Header() {
  const navigate = useRouter()
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.favorite);
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(true);


  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => { 
    setIsOpenMenu(!isOpenMenu);
  };

  function goToExit() {
    dispatch(setUser({_id: 0, email: "", username: ""}))
    dispatch(setAccessToken(""))
    dispatch(setRefreshToken(""))
    dispatch(setFavoritePlaylist(false))
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
                  <Link className={styles.link} href={"/"}>Главное</Link>
                </li>
                {user.username? (
                <li className={styles.item}>
                  <Link className={styles.link} href={"/favorite"}>Мой плейлист</Link>
                </li>
                ) : null}
                <li className={styles.item}>
                  <button className={styles.link} onClick={goToExit}>{user.username?"Выйти":"Войти"}</button>
                </li>
              </ul>
            </div>) : null }
            
          </nav>
    )
}