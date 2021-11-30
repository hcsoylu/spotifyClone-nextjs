import React from "react";
import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playList = useRecoilValue(playListState);

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playList?.tracks.items.map((track, i) => (
        <Song key={track.track.id} order={i} track={track} />
      ))}
    </div>
  );
};

export default Songs;
