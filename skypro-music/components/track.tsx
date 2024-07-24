import Image from "next/image"
import styles from "./style_components/track.module.css"
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCurrentTrack } from "@/store/features/playlistSlice";

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

interface TrackProps {
  track: Track
}

export default function Track({track}: TrackProps) {
    const dispatch = useAppDispatch();
    const playlist = useAppSelector(state => state.playlist.playlist)
    const {id, name, author, release_date, genre, duration_in_seconds, logo, track_file, started_user} = track;
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function headleClick() {
        dispatch(setCurrentTrack({
            currentTrack: track,
            playlist
        }))
    }

    return (
        <div className={styles.background} onClick={headleClick}>
            <div className={styles.track}>
                <div className={classNames(styles.title, styles.column1)}>
                    <div className={styles.picture}>
                        <svg className={styles.titleSvg}>
                            <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                        </svg>
                    </div>
                    <div>
                        <span className={styles.titleLink}>{name} <span className={styles.titleSpan}></span></span>
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
