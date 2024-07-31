import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

interface User {
    email: string;
    username: string;
    _id: number; 
}

interface PlaylistState {
    access: string;
    refresh: string;
    isLike: boolean;
    user: User;
    isFavoritePlaylist: boolean;
}

const initialState: PlaylistState = {
    access: "",
    refresh: "",
    isLike: false,
    user: {
        email: "",
        username: "",
        _id: 0
    },
    isFavoritePlaylist: false
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
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload
        },
        setFavoritePlaylist(state, action: PayloadAction<boolean>){
            state.isFavoritePlaylist = action.payload
        },
    },
});

export const { setAccessToken, setRefreshToken, setLike, setUser, setFavoritePlaylist } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
