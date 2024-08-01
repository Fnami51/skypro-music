import { updateToken } from "./token";

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

export async function getTracks(/*token: string*/): Promise<Track[]>{
    const result = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/', {
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
    const result = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/', {
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