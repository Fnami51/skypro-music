import Image from "next/image"
import styles from "./style_components/sidebar.module.css"
import Link from "next/link";

export default function Collections() {
// Сделать ссылками на страницу колекций и там фильтровать 

    return (
        <div className={styles.block}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <Link className={styles.link} href={"/collection/today"}>
                    <Image
                      className={styles.img}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
                <div className={styles.item}>
                  <Link className={styles.link} href={"/collection/hits"}>
                    <Image
                      className={styles.img}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
                <div className={styles.item}>
                  <Link className={styles.link} href={"/collection/indi-power"}>
                    <Image
                      className={styles.img}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
              </div>
            </div>
    )
}