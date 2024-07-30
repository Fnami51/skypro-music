"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../src/store/store";
import {
  playNextTrack,
  playPreviousTrack,
  setShuffle,
  setCurrentTrack,
  setIsPlaying,
  setRepeat,
} from "../src/store/features/playlistSlice";
import styles from "./style_components/bar.module.css";
import classNames from "classnames";
import useTracks from "../context/TracksHooks";
import { useAppSelector } from "../src/store/store";
import Progress from "./progress";
import { useClickTrack } from "../context/ClickTrackContext";

export default function Soundbar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useAppDispatch();
  const { isShuffle, isRepeat, currentTrack, isPlaying, playlist } = useAppSelector((state) => state.playlist);
  const {isClick} = useClickTrack()
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  

  const togglePlay = () => {
    if (audioRef.current) {

      if (!isPlaying) {
        dispatch(setIsPlaying(true))
        audioRef.current.play();
      } else { 
        dispatch(setIsPlaying(false))
        audioRef.current.pause();
      } 
    }
  };

  const handleEnded = useCallback(() => {
    
    dispatch(playNextTrack())
    
  }, []);

  const handleRepeat = useCallback(() => {
    const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
  }, []);

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


  useEffect(() => {
    const audio = audioRef.current;

    if (audio && playlist.length > 0 && currentTrack) {
      audio.src = currentTrack.track_file;
      audio.addEventListener('ended', (isRepeat? handleRepeat : handleEnded));
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('ended', (isRepeat? handleRepeat : handleEnded));
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack, isRepeat]);

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
              onTimeUpdate={(e) => {setCurrentTime(e.currentTarget.currentTime);}}
              autoPlay>
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
              <button className={classNames(styles.btnRepeat, styles.btnIcon)} onClick={() => dispatch(setRepeat(!isRepeat))}>
                <svg className={classNames(styles.btnRepeatSvg, isRepeat? styles.btnActive : null)}>
                  <use xlinkHref={"img/icon/sprite.svg#icon-repeat"}></use>
                </svg>
              </button>
              <button className={classNames(styles.btnShuffle, styles.btnIcon)} onClick={() => dispatch(setShuffle(!isShuffle))}>
                <svg className={classNames(styles.btnShuffleSvg, isShuffle? styles.btnActive : null)}>
                  <use xlinkHref={"img/icon/sprite.svg#icon-shuffle"}></use>
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
