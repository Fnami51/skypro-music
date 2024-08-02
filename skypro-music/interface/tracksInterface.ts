export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  
 export interface Track {
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