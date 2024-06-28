'use client';

import Image from "next/image"
import styles from "./style_components/centerblock.module.css"
import Track from "./track"
import classNames from "classnames"
import { getTracks } from "../api/tracksApi";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Track {
  id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  logo: string;
  track_file: string;
  started_user: User[];
}

export default function Centerblock() {
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    async function requestInApi() {
      const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxOTU3NDU4NywiaWF0IjoxNzE5NDg4MTg3LCJqdGkiOiI0M2JiNTNmZWViZmI0NGQwOWRmMzM3YWFiNzUzYjMxNyIsInVzZXJfaWQiOjQxMDJ9.XORoN0mHybvru7KwGzb5mBrl6IVtFlzDaYe7byys4T0";
      
      const answerFromApi: Track[] = await getTracks(token);

      console.log(answerFromApi)

      setTracks(answerFromApi);
    }

    requestInApi();
  }, [])

  return (
    <div className={styles.background}>
      <div className={styles.search}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.input}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.heading}>Треки</h2>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={classNames(styles.filterBtn, styles.btnText)}>
          исполнителю
        </div>
        <div className={classNames(styles.filterBtn, styles.btnText)}>
          году выпуска
        </div>
        <div className={classNames(styles.filterBtn, styles.btnText)}>
          жанру
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitle, styles.column1)}>Трек</div>
          <div className={classNames(styles.playlistTitle, styles.column2)}>Исполнитель</div>
          <div className={classNames(styles.playlistTitle, styles.column3)}>Альбом</div>
          <div className={classNames(styles.playlistTitle, styles.column4)}>
            <svg className={styles.playlistSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.playlist}>
          {tracks.map(track => (
            <Track key={track.id} {...track} />
          ))}
        </div>
      </div>
    </div>
  )
}
