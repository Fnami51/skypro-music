import styles from "./style_components/bar.module.css"
import classNames from "classnames"

export default function Soundbar() {
    return (
        <div className={styles.background}>
          <div className={styles.content}>
            <div className={styles.progress}></div>
            <div className={styles.block}>
              <div className={styles.player}>
                <div className={styles.controls}>
                  <div className={styles.btnPrev}>
                    <svg className={styles.btnPrevSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className={styles.btnPlay}>
                    <svg className={styles.btnPlaySvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className={styles.btnNext}>
                    <svg className={styles.btnNextSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.btnRepeat, styles.btnIcon)}>
                    <svg className={styles.btnRepeatSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.btnShuffle, styles.btnIcon)}>
                    <svg className={styles.btnShuffleSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className={styles.trackPlay}>
                  <div className={styles.contain}>
                    <div className={styles.image}>
                      <svg className={styles.svg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                      </svg>
                    </div>
                    <div className={styles.author}>
                      <a className={styles.authorLink} href="http://">Ты та...</a>
                    </div>
                    <div className={styles.album}>
                      <a className={styles.albumLink} href="http://">Баста</a>
                    </div>
                  </div>

                  <div className={styles.likes}>
                    <div className={classNames(styles.like, styles.btnIcon)}>
                      <svg className={styles.likeSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className={classNames(styles.dislike, styles.btnIcon)}>
                      <svg className={styles.dislikeSvg}>
                        <use
                          xlinkHref="img/icon/sprite.svg#icon-dislike"
                        ></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.volume}>
                <div className={styles.volContent}>
                  <div className={styles.volIcon}>
                    <svg className={styles.volSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.volProgress, styles.btn)}>
                    <input
                      className={classNames(styles.volProgress, styles.btn)}
                      type="range"
                      name="range"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}