export interface Player{
    id:string,
    gamerID:string,
    name:string,
    role:string,
    team:string,
    kills:number,
    deaths:number,
    mapsPlayed:number,
    mapsWon:number,
    mapsLost:number,
    totalDamage:number,
    seriesPlayed:number,
    seriesWon:number,
    seriesLost:number,
    currentSeriesID:string,
    playingInSeries:boolean
}