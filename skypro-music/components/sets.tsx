import Image from "next/image"
import styles from "./style_components/sidebar.module.css"

export default function Collections() {
    return (
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
    )
}