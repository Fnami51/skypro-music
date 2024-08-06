"use client";

import Image from "next/image"
import styles from "./style_components/track.module.css"
import dot from "./style_components/dot.module.css"
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { updateToken } from "../api/token";
import { useEffect, useState } from "react";
import { addFavotite, deleteFavotite } from "../api/favoriteApi";
import { setLike } from "@/store/features/favoriteSlice";

import {Track} from '@interface/tracksInterface';

interface TrackProps {
  track: Track
  playlist: Track[]
}

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default function Sound({track, playlist}: TrackProps) {
    const dispatch = useAppDispatch();
    const {/*playlist*/ currentTrack, isPlaying} = useAppSelector(state => state.playlist)
    const {isLiked, access, refresh, user} = useAppSelector(state => state.favorite)
    // const {track} = track;
    
    const [trackDot, setTrackDot] = useState({isPulse: false, isSelect: false})

    function headleClick() {
        dispatch(setCurrentTrack({
            currentTrack: track,
            playlist
        }))
    }

    async function sendLike() {
        if (!refresh && !access) {
            return alert("Сначало войдите")
        }
        console.log(access)
        addFavotite(access, track.id, refresh).then((result) => {
            const updatedLikes = isLiked.includes(track.id) 
                ? isLiked.filter(likeId => likeId !== track.id)
                : [...isLiked, track.id];
            dispatch(setLike(updatedLikes));
            console.log(result)
        })
    } 

    async function sendDislike() {
        if (!refresh && !access) {
            return alert("Сначало войдите")
        }
        console.log(access)
        deleteFavotite(access, track.id, refresh).then((result) => {
            const updatedLikes = isLiked.includes(track.id) 
                ? isLiked.filter(likeId => likeId !== track.id)
                : [...isLiked, track.id];
            dispatch(setLike(updatedLikes));
            console.log(result)
        })
    } 

    useEffect(() => {
        if (currentTrack) {
            if (currentTrack.id === track.id) {
                setTrackDot(prevTrackDot => ({
                    ...prevTrackDot,
                    isSelect: true,
                    isPulse: isPlaying,
                }))
            } else {
                setTrackDot(prevTrackDot => ({
                    ...prevTrackDot,
                    isSelect: false,
                }))
            }
        }
    }, [currentTrack, track.id, isPlaying])

    function findLike() {
        const foundId: number | undefined = isLiked.find(trackId => trackId === track.id);
        if (foundId) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.track}>
                <div className={classNames(styles.title, styles.column1)}  onClick={headleClick}>
                    <div className={styles.picture}>
                        { trackDot.isSelect ? (trackDot.isPulse ? (
                            <div className={classNames(dot.dot, dot.playingDot)}></div>
                        ):(
                            <div className={dot.dot}></div>
                        )):(
                            <svg className={styles.titleSvg}>
                                <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                            </svg>
                        )}
                    </div>
                    <div>
                        <span className={styles.titleLink}>{track.name} <span className={styles.titleSpan}></span></span>
                    </div>
                </div>
                <div className={classNames(styles.author, styles.column2)}>
                    <a className={styles.authorLink} href="http://">{track.author}</a>
                </div>
                <div className={styles.column3}>
                    <a className={styles.albumLink} href="http://">{track.genre}</a>
                </div>
                <div className={styles.column4}>
                    
                    {findLike() ? (
                        <button className={styles.btnLike} onClick={sendDislike}>
                        <svg className={classNames(styles.timeSvg, styles.active)}>
                            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        </button>
                    ) : (
                        <button className={styles.btnLike} onClick={sendLike}>
                    <svg className={classNames(styles.timeSvg, findLike() ? styles.active : null)}>
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    </svg>
                    </button>
                    )}

                    <span className={styles.timeText}>{formatDuration(track.duration_in_seconds)}</span>
                </div>
            </div>
        </div>
    )
}
