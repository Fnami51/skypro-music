import Image from "next/image";
import styles from "./page.module.css";

import Header from "../../../../components/header";
import Centerblock from "../../../../components/centerblock";
import Sidebar from "../../../../components/sidebar";
import Soundbar from "../../../../components/bar";
import { getTracks } from "../../../../api/tracksApi";

import {Track} from '@interface/tracksInterface';

export default async function Home() {
  async function requestInApi() {

      const answerFromApi: Track[] = await getTracks()
      console.log(answerFromApi) // отладка
      //dispatch(setPlaylistAction(answerFromApi))
      return answerFromApi
  }

  const tracks: Track[] = await requestInApi();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
         
          <Header />

          <Centerblock key="indi-power-playlist" playlist={tracks.filter((track) => track.genre === "Рок музыка")} title={"Инди-заряд"}/>

          <Sidebar />

        </main>


        <Soundbar />


        <footer className="footer"></footer>
      </div>
    </div>
  );
}
