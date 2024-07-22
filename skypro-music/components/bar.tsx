'use client';

import { useRef, useState, useEffect } from "react";
import styles from "./style_components/bar.module.css";
import classNames from "classnames";
import useTracks from "../context/TracksHooks";

export default function Soundbar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playlist } = useTracks();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  }

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && playlist.length > 0) {
      audio.src = playlist[currentTrackIndex].track_file;
      audio.addEventListener('ended', handleEnded);

      audio.play();

      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrackIndex, playlist]);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        
        <div className={styles.progress}></div>

        <div className={styles.block}>
          <div className={styles.player}>
            <audio ref={audioRef} controls style={{ display: "none" }}></audio>
            <div className={styles.controls}>
              <button className={styles.btnPrev}>
                <svg className={styles.btnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button className={styles.btnPlay} onClick={togglePlay}>
                <svg className={styles.btnPlaySvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                </svg>
              </button>
              <button className={styles.btnNext}>
                <svg className={styles.btnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button className={classNames(styles.btnRepeat, styles.btnIcon)}>
                <svg className={styles.btnRepeatSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </button>
              <button className={classNames(styles.btnShuffle, styles.btnIcon)}>
                <svg className={styles.btnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </button>
            </div>

            <div className={styles.trackPlay}>
              <div className={styles.contain}>
                <div className={styles.image}>
                  <svg className={styles.svg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.author}>
                  <a className={styles.authorLink} href="#">
                    {playlist[currentTrackIndex]?.name ?? "Неизвестный трек"}
                  </a>
                </div>
                <div className={styles.album}>
                  <a className={styles.albumLink} href="#">
                    {playlist[currentTrackIndex]?.author ?? "Неизвестный исполнитель"}
                  </a>
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
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
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
  );
}
