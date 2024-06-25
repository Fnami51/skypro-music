import Image from "next/image"
import styles from "./style_components/track.module.css"

export default function Track() {
    return (
        <div className={styles.background}>
                  <div className={styles.track}>
                    <div className={styles.title}>
                      <div className={styles.picture}>
                        <svg className={styles.titleSvg}>
                          <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div>
                        <a className={styles.titleLink} href="http://">Elektro <span className={styles.titleSpan}></span></a>
                      </div>
                    </div>
                    <div className={styles.author}>
                      <a className={styles.authorLink} href="http://">Dynoro, Outwork, Mr. Gee</a>
                    </div>
                    <div className={styles.album}>
                      <a className={styles.albumLink} href="http://">Elektro</a>
                    </div>
                    <div>
                      <svg className={styles.timeSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={styles.timeText}>2:22</span>
                    </div>
                  </div>
                </div>
    )
}