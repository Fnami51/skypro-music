import Image from "next/image";
import styles from "./page.module.css";

import Header from "../../../../components/header";
import Centerblock from "../../../../components/centerblock";
import Sidebar from "../../../../components/sidebar";
import Soundbar from "../../../../components/bar";
import { getTracks } from "../../../../api/tracksApi";

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

          <Centerblock playlist={tracks.filter((track) => track.genre === "Рок музыка")}/>

          <Sidebar />

        </main>


        <Soundbar />


        <footer className="footer"></footer>
      </div>
    </div>
  );
}
