import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteTracks } from '../../../api/tracksApi';

interface User {
    email: string;
    username: string;
    _id: number; 
}

interface Users {
    _id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface Track {
    _id: number;
    name: string;
    author: string;
    release_date: string;
    genre: string;
    duration_in_seconds: number;
    logo: string;
    track_file: string;
    started_user: Users[];
}

interface PlaylistState {
    access: string;
    refresh: string;
    isLiked: number[];
    user: User;
    isFavoritePlaylist: boolean;
}

const initialState: PlaylistState = {
    access: "",
    refresh: "",
    isLiked: [],
    user: {
        email: "",
        username: "",
        _id: 0
    },
    isFavoritePlaylist: false
};

export const getFavotiteTracks = createAsyncThunk('favorite/getFavotiteTracks', 
    async(tokens: {access: string, refresh: string}) => {
        const favoriteTrack = await fetchFavoriteTracks(tokens.access, tokens.refresh)
        return favoriteTrack.data
    }
)

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>){
            state.access = action.payload
        },
        setRefreshToken(state, action: PayloadAction<string>){
            state.refresh = action.payload
        },
        setLike(state, action: PayloadAction<number[]>){
            state.isLiked = action.payload
        },
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload
        },
        setFavoritePlaylist(state, action: PayloadAction<boolean>){
            state.isFavoritePlaylist = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getFavotiteTracks.fulfilled, (state, action) => {
            state.isLiked = action.payload.map((track: Track) => track._id)
        })
    }
});

export const { setAccessToken, setRefreshToken, setLike, setUser, setFavoritePlaylist } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
