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

import {Track} from '@interface/tracksInterface';
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const {access, refresh} = useAppSelector(state => state.favorite)
  const { playlist } = useAppSelector((state) => state.playlist);
  useEffect(() => {
    if(!refresh) {
      navigate.push('/');
    } else {
    fetchFavoriteTracks(access, refresh)
    .then((answerFromApi) => {
      console.log(answerFromApi); // отладка
      dispatch(setPlaylist(answerFromApi));
    })
    .catch((error) => {
      console.error("Error fetching favorite tracks:", error);
    });}
  }, [access, dispatch, refresh])

  const tracks: Track[] = playlist;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
         
          <Header />

          <Centerblock key="favorite-playlist" playlist={tracks} title={"Любимые треки"}/>

          <Sidebar />

        </main>


        {/* <Soundbar /> */}


        <footer className="footer"></footer>
      </div>
    </div>
  );
}
