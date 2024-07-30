import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

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
    access: string;
    refresh: string;
    isLike: boolean;
}

const initialState: PlaylistState = {
    access: "",
    refresh: "",
    isLike: false,
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>){
            state.access = action.payload
        },
        setRefreshToken(state, action: PayloadAction<string>){
            state.access = action.payload
        },
        setLike(state, action: PayloadAction<boolean>){
            state.isLike = action.payload
        },
    },
});

export const { setAccessToken, setRefreshToken, setLike } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
