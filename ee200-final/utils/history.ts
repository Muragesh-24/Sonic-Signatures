export function saveSongHistory(song:string){

    const oldHistory = JSON.parse(
        localStorage.getItem("song_history") || "[]"
    );


    const filtered = oldHistory.filter(
        (item:any)=>item.song !== song
    );


    const updated = [
        {
            song,
            time: Date.now()
        },
        ...filtered
    ].slice(0,20);


    localStorage.setItem(
        "song_history",
        JSON.stringify(updated)
    );

}

export function getSongHistory() {
  return JSON.parse(
    localStorage.getItem("song_history") || "[]"
  );
}

