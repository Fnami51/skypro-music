import Image from "next/image";
import styles from "./page.module.css";

import Header from "../../components/header";
import Centerblock from "../../components/centerblock";
import Sidebar from "../../components/sidebar";
import Soundbar from "../../components/bar";
import { TracksProvider } from "../../context/TracksContext";
import { ClickTrackProvider } from "../../context/ClickTrackContext";

export default function Home() {
  return (
    <TracksProvider>
    <ClickTrackProvider>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
         
          <Header />

          <Centerblock />

          <Sidebar />

        </main>


        <Soundbar />


        <footer className="footer"></footer>
      </div>
    </div>
    </ClickTrackProvider>
    </TracksProvider>
  );
}
