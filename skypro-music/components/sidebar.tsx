import Image from "next/image"
import styles from "./style_components/sidebar.module.css"

export default function Sidebar() {
    return (
        <div className={styles.background}>
            <div className={styles.user}>
              <p className={styles.userName}>Sergey.Ivanov</p>
              <div className={styles.icon}>
                <svg>
                  <use xlinkHref="img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
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