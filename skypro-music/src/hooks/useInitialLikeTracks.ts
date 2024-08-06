import { getFavotiteTracks } from "@/store/features/favoriteSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

export function useInitialLikeTracks() {
    const dispatch = useAppDispatch();
    const {access, refresh} = useAppSelector(state => state.favorite)

    useEffect(() => {
        if (access && refresh) {
            dispatch(getFavotiteTracks({access, refresh}))
        }
    }, [access, refresh, dispatch])
}