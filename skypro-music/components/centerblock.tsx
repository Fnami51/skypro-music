'use client';

import Image from "next/image"
import styles from "./style_components/centerblock.module.css"
import Track from "./track"
import classNames from "classnames"
import { getTracks } from "../api/tracksApi";
import { useEffect, useState } from "react";
import useTracks from "../context/TracksHooks";
import { setPlaylist as setPlaylistAction } from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

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
  const dispatch = useAppDispatch();
  const { playlist } = useAppSelector((state) => state.playlist);
  const [filter, setFilter] = useState<number>(0)

  useEffect(() => {
    async function requestInApi() {
      
      const answerFromApi: Track[] = await getTracks(/*token*/);

      console.log(answerFromApi)

      dispatch(setPlaylistAction(answerFromApi))
    }

    requestInApi();
  }, [dispatch])

  const filteredAuthors: string[] = playlist
  .map(track => track.author)
  .filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const filteredGenres: string[] = playlist
  .map(track => track.genre)
  .filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  function selectFilter(filterNumber: number) {
    if (filter !== filterNumber) {
      setFilter(filterNumber)
    } else if (filter === filterNumber) {
      setFilter(0)
    }
  } 

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
        <div>
          <button className={classNames(styles.filterBtn, styles.btnText)} onClick={() => selectFilter(1)}>
            исполнителю
          </button>
          <div className={styles.filterSelections} style={{ display: filter === 1 ? 'flex' : 'none' }}>
            {
              filteredAuthors.map(author => (
                <div key={author}>
                <input type="checkbox" name="author-select" id={author} className={styles.selectInput} />
                <label htmlFor={author} className={styles.selectLabel}>
                  {author}
                </label>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <button className={classNames(styles.filterBtn, styles.btnText)} onClick={() => selectFilter(2)}>
            году выпуска
          </button>
          <div className={styles.filterSelectionYear} style={{ display: filter === 2 ? 'flex' : 'none' }}>
            <input type="checkbox" name="year-select" id="defaultYearSelect" className={styles.selectInput}/>
            <label htmlFor="defaultYearSelect" className={styles.selectLabel}>
              По умолчанию
            </label>
            <input type="checkbox" name="year-select" id="newYearSelect" className={styles.selectInput}/>
            <label htmlFor="newYearSelect" className={styles.selectLabel}>
              Сначало новые
            </label>
            <input type="checkbox" name="year-select" id="oldYearSelect" className={styles.selectInput}/>
            <label htmlFor="oldYearSelect" className={styles.selectLabel}>
              Сначало старые
            </label>
          </div>
        </div>
        <div>
          <button className={classNames(styles.filterBtn, styles.btnText)} onClick={() => selectFilter(3)}>
            жанру
          </button>
          <div className={styles.filterSelections} style={{ display: filter === 3 ? 'flex' : 'none' }}>
            {
              filteredGenres.map(genre => (
                <div key={genre}>
                <input type="checkbox" name="author-select" id={genre} className={styles.selectInput} />
                <label htmlFor={genre} className={styles.selectLabel}>
                  {genre}
                </label>
                </div>
              ))
            }
          </div>
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
          {playlist.map(track => (
            <Track key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  )
}
