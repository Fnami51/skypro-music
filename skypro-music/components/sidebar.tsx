"use client";

import Image from "next/image"
import styles from "./style_components/sidebar.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const navigate = useRouter()
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = sessionStorage.getItem("name");
      setUserName(name ? String(name) : null);
    }
  }, []);

  function goToExit() {
    sessionStorage.clear()
    navigate.push('/login')
  }

    return (
        <div className={styles.background}>
            <div className={styles.user}>
              <p className={styles.userName}>{userName}</p>
              <button className={styles.icon} onClick={goToExit}>
                <svg>
                  <use xlinkHref="img/icon/sprite.svg#logout"></use>
                </svg>
              </button>
            </div>
            <div className={styles.block}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <a className={styles.link} href="#">
                    <Image
                      className={styles.img}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a className={styles.link} href="#">
                    <Image
                      className={styles.img}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a className={styles.link} href="#">
                    <Image
                      className={styles.img}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
    )
}