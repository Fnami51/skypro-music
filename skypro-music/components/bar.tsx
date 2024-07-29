"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/store/store";
import {
  playNextTrack,
  playPreviousTrack,
  setShuffle,
  setCurrentTrack,
} from "../src/store/features/playlistSlice";
import styles from "./style_components/bar.module.css";
import classNames from "classnames";
import useTracks from "../context/TracksHooks";
import { useAppSelector } from "../src/store/store";
import Progress from "./progress";
import { useClickTrack } from "../context/ClickTrackContext";

export default function Soundbar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  const [isRepeat, setIsRepeat] = useState(false);
  const {isClick} = useClickTrack()
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPlaying((prev) => !prev);
    }
  }, [isPlaying]);

  const handleEnded = useCallback(() => {
    const audio = audioRef.current;
    if (isRepeat) {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    } else {
      dispatch(playNextTrack())
    }
  }, [dispatch]);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0);
  }, []);

  const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const handleProgressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  }, []);

  // const handleTrackClick = useCallback(
  //   () => {
  //     dispatch(setCurrentTrack());
  //     setIsPlaying(true);
  //   },
  //   [dispatch]
  // );

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && playlist.length > 0 && currentTrack) {
      audio.src = currentTrack.track_file;
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      // togglePlay()

      //  if (isPlaying) {
      //    audio.pause();
      //  } else {
      //    audio.play();
      //  }

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack, playlist, isPlaying, handleEnded, handleTimeUpdate, handleLoadedMetadata]);

  // useEffect(() => {
  //   togglePlay();
  // }, [isClick]);

if (!currentTrack) {
  return null
}

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        
        <div>
            <Progress 
              max={duration}
              value={currentTime}
              step={0.1}
              onChange={handleProgressChange}
            />
            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span> / 
            <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
        </div>

        <div className={styles.block}>
          <div className={styles.player}>

            <audio ref={audioRef} 
              onTimeUpdate={(e) => {setCurrentTime(e.currentTarget.currentTime);}}>

              </audio>

            <div className={styles.controls}>
              <button className={styles.btnPrev} onClick={() => dispatch(playPreviousTrack())}>
                <svg className={styles.btnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button className={styles.btnPlay} id="pauseBtn" onClick={togglePlay}>
                <svg className={styles.btnPlaySvg}>
                  <use xlinkHref={isPlaying ? "img/icon/sprite.svg#icon-pause" : "img/icon/sprite.svg#icon-play"}></use>
                </svg>
              </button>
              <button className={styles.btnNext} onClick={() => dispatch(playNextTrack())}>
                <svg className={styles.btnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button className={classNames(styles.btnRepeat, styles.btnIcon)} onClick={() => setIsRepeat(!isRepeat)}>
                <svg className={styles.btnRepeatSvg}>
                  <use xlinkHref={isRepeat ? "img/icon/sprite.svg#icon-repeatActive" : "img/icon/sprite.svg#icon-repeat"}></use>
                </svg>
              </button>
              <button className={classNames(styles.btnShuffle, styles.btnIcon)} onClick={() => dispatch(setShuffle(!isShuffle))}>
                <svg className={styles.btnShuffleSvg}>
                  <use xlinkHref={isShuffle ? "img/icon/sprite.svg#icon-shuffleActive" : "img/icon/sprite.svg#icon-shuffle"}></use>
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
                  <a className={styles.authorLink}>
                    {currentTrack.name ?? "Неизвестный трек"}
                  </a>
                </div>
                <div className={styles.album}>
                  <a className={styles.albumLink}>
                    {currentTrack.author ?? "Неизвестный исполнитель"}
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
    </div>
  );
}
