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
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleEnded() {
    if (isLooping) {
      audioRef.current?.play();
    } else if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  }

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  }

  function handleLoadedMetadata() {
    setDuration(audioRef.current?.duration ?? 0);
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  function handleProgressChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTime = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  }

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && playlist.length > 0) {
      audio.src = playlist[currentTrackIndex].track_file;
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      if (isPlaying) {
        audio.play();
      }

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrackIndex, playlist, isPlaying]);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        
        <div>
          <input
            className={styles.progress}
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
          />
          <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span> / 
          <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
        </div>

        <div className={styles.block}>
          <div className={styles.player}>
            <audio ref={audioRef} controls style={{ display: "none" }}></audio>
            <div className={styles.controls}>
              <button className={styles.btnPrev} onClick={() => setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1))}>
                <svg className={styles.btnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button className={styles.btnPlay} onClick={togglePlay}>
                <svg className={styles.btnPlaySvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                </svg>
              </button>
              <button className={styles.btnNext} onClick={() => setCurrentTrackIndex((prev) => (prev < playlist.length - 1 ? prev + 1 : 0))}>
                <svg className={styles.btnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button className={classNames(styles.btnRepeat, styles.btnIcon)} onClick={() => setIsLooping(!isLooping)}>
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
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
