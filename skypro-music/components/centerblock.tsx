import Image from "next/image"
import styles from "./style_components/centerblock.module.css"
import Track from "./track"
import classNames from "classnames"

export default function Centerblock() {
    return (
        <div className={styles.background}>
            <div className={styles.search}>
              <svg className={styles.searchSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
              </svg>
              <input
                className={styles.input}
                type="search"
                placeholder="Поиск"
                name="search"
              />
            </div>
            <h2 className={styles.heading}>Треки</h2>
            <div className={styles.filter}>
              <div className={styles.filterTitle}>Искать по:</div>
              <div className={classNames(styles.filterBtn, styles.btnText)}>
                исполнителю
              </div>
              <div className={classNames(styles.filterBtn, styles.btnText)}>
                году выпуска
              </div>
              <div className={classNames(styles.filterBtn, styles.btnText)}>
                жанру
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>
                <div className={classNames(styles.playlistTitle, styles.column1)}>Трек</div>
                <div className={classNames(styles.playlistTitle, styles.column2)}>Исполнитель</div>
                <div className={classNames(styles.playlistTitle, styles.column3)}>Альбом</div>
                <div className={classNames(styles.playlistTitle, styles.column4)}>
                  <svg className={styles.playlistSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className={styles.playlist}>


                <Track />


              </div>
            </div>
          </div>
    )
}