import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface PlaylistState {
    playlist: Track[];
    currentTrack: Track | null;
    isShuffle: boolean;
    shuffledPlaylist: Track[];
}

const initialState: PlaylistState = {
    playlist: [],
    currentTrack: null,
    isShuffle: false,
    shuffledPlaylist: []
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylist(state, action: PayloadAction<Track[]>) {
            state.playlist = action.payload;
        },
        addTrack(state, action: PayloadAction<Track>) {
            state.playlist.push(action.payload);
        },
        removeTrack(state, action: PayloadAction<number>) {
            state.playlist = state.playlist.filter(track => track.id !== action.payload);
        },
        playNextTrack(state) {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
            const currentIndex = playlist.findIndex(
                (track) => track.id === state.currentTrack?.id
            );
            const nextIndex = currentIndex + 1;
            if (nextIndex >= playlist.length) {
                state.currentTrack = playlist[0];
            } else {
               state.currentTrack = playlist[nextIndex];
            }
        },
        playPreviousTrack(state) {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
            const currentIndex = playlist.findIndex(
                (track) => track.id === state.currentTrack?.id
            );
            const prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                state.currentTrack = playlist[playlist.length - 1];
            } else {
               state.currentTrack = playlist[prevIndex];
            }
        },
        setShuffle(state, action: PayloadAction<boolean>) {
            state.isShuffle = action.payload;
        },
        setCurrentTrack(state, action: PayloadAction<{
            currentTrack: Track,
            playlist: Track[]
        }>) {
            state.currentTrack = action.payload.currentTrack;
            state.playlist = action.payload.playlist;
            state.shuffledPlaylist = [...action.payload.playlist].sort(() => 0.5 - Math.random())
        }
    },
});

export const { setPlaylist, addTrack, removeTrack, playNextTrack, playPreviousTrack, setShuffle, setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
