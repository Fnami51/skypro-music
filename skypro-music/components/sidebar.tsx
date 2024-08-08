"use client";

import Image from "next/image"
import styles from "./style_components/sidebar.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Collections from "./sets";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setAccessToken, setFavoritePlaylist, setRefreshToken, setUser } from "@/store/features/favoriteSlice";
import { useInitialLikeTracks } from "@/hooks/useInitialLikeTracks";

export default function Sidebar() {
  const navigate = useRouter()
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.favorite);

  useInitialLikeTracks()

  function goToExit() {
    dispatch(setUser({_id: 0, email: "", username: ""}))
    dispatch(setAccessToken(""))
    dispatch(setRefreshToken(""))
    dispatch(setFavoritePlaylist(false))
    navigate.push('/login')
  }

    return (
        <div className={styles.background}>
            <div className={styles.user}>
              <p className={styles.userName}>{user.username}</p>
              <button className={styles.icon} onClick={goToExit}>
                <svg>
                  <use xlinkHref="img/icon/sprite.svg#logout"></use>
                </svg>
              </button>
            </div>
            
            <Collections />
          </div>
    )
}