import { url } from "./configURLforAPi";
import { updateToken } from "./token";

import {Track} from '@interface/tracksInterface';

export async function getTracks(/*token: string*/): Promise<Track[]>{
    const result = await fetch(url+'/catalog/track/all/', {
        method: "GET",
        /*headers: {
            Authorization: `Bearer ${key}`,
        }*/
    });
    if (!result.ok) {
        console.error('Error Api', result.status);
    };
    return result.json();
}

export async function fetchFavoriteTracks(access: string, refresh: string){
    const result = await fetch(url+'/catalog/track/favorite/all/', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access}`,
            
        }
    });
    if (!result.ok) {
        console.error('Error Api', result.status);
        if (result.status === 401) {
            const token: string = await updateToken(refresh)
            fetchFavoriteTracks(token, refresh)
        }
    };
    return result.json();
}