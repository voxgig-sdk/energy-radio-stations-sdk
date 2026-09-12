export interface Playout {
    album?: string;
    artist: string;
    coverArt?: string;
    duration?: number;
    id?: string;
    playedAt: string;
    title: string;
}
export interface PlayoutListMatch {
    station: string;
    limit?: number;
}
