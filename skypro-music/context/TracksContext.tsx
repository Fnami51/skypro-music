'use client';

import { useState, createContext, ReactNode } from "react";

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

interface TracksContextType {
    playlist: Track[];
    setPlaylist: React.Dispatch<React.SetStateAction<Track[]>>;
}

export const TracksContext = createContext<TracksContextType | null>(null);

interface TracksProviderProps {
    children: ReactNode;
}

export function TracksProvider({ children }: TracksProviderProps) {
    const [playlist, setPlaylist] = useState<Track[]>([]);

    return (
        <TracksContext.Provider value={{ playlist, setPlaylist }}>
            {children}
        </TracksContext.Provider>
    );
}
