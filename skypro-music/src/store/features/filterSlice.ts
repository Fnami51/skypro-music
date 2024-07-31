import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';


interface PlaylistState {
    genres: string[];
    authors: string[];
}

const initialState: PlaylistState = {
    genres: [],
    authors: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        getGeneres(state, action: PayloadAction<string[]>){
            state.genres = action.payload
        },
        getFirstSet(state){
            state.genres = ["Классическая музыка"]
        },
        getSecondSet(state){
            state.genres = ["Электронная музыка"]
        },
        getThirdSet(state){
            state.genres = ["Рок музыка"]
        },
        deleteFilter(state){
            state.genres = [];
            state.authors = [];
        },
    },
});

export const { getGeneres, getFirstSet, getSecondSet, getThirdSet, deleteFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
