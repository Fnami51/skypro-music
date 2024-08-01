"use client";

import Image from "next/image";
import styles from "./page.module.css";

import Header from "../../../components/header";
import Centerblock from "../../../components/centerblock";
import Sidebar from "../../../components/sidebar";
import Soundbar from "../../../components/bar";
import { getTracks } from "../../../api/tracksApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchFavoriteTracks } from "../../../api/tracksApi";
import { setPlaylist } from "@/store/features/playlistSlice";
import { useEffect } from "react";

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

export default function Home() {
  const dispatch = useAppDispatch();
  const {access, refresh} = useAppSelector(state => state.favorite)
  const { playlist } = useAppSelector((state) => state.playlist);
  useEffect(() => {
    fetchFavoriteTracks(access, refresh)
    .then((answerFromApi) => {
      console.log(answerFromApi.data); // отладка
      dispatch(setPlaylist(answerFromApi.data));
    })
    .catch((error) => {
      console.error("Error fetching favorite tracks:", error);
    });
  }, [])

  const tracks: Track[] = playlist;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
         
          <Header />

          <Centerblock playlist={tracks}/>

          <Sidebar />

        </main>


        <Soundbar />


        <footer className="footer"></footer>
      </div>
    </div>
  );
}
