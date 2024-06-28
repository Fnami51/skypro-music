import Image from "next/image"
import styles from "./style_components/track.module.css"
import classNames from "classnames";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface TrackProps {
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

export default function Track({ id, name, author, release_date, genre, duration_in_seconds, logo, track_file, started_user }: TrackProps) {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    return (
        <div className={styles.background}>
            <div className={styles.track}>
                <div className={classNames(styles.title, styles.column1)}>
                    <div className={styles.picture}>
                        <svg className={styles.titleSvg}>
                            <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                        </svg>
                    </div>
                    <div>
                        <a className={styles.titleLink} href={track_file}>{name} <span className={styles.titleSpan}></span></a>
                    </div>
                </div>
                <div className={classNames(styles.author, styles.column2)}>
                    <a className={styles.authorLink} href="http://">{author}</a>
                </div>
                <div className={styles.column3}>
                    <a className={styles.albumLink} href="http://">{genre}</a>
                </div>
                <div className={styles.column4}>
                    <svg className={styles.timeSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    </svg>
                    <span className={styles.timeText}>{formatDuration(duration_in_seconds)}</span>
                </div>
            </div>
        </div>
    )
}
