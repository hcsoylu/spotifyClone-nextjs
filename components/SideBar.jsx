import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playListIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const SideBar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [playLists, setPlayLists] = useState();
  const [playListId, setPlayListId] = useRecoilState(playListIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlayLists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 pb-36  p-5 text-base border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen  w-60 hidden md:inline-flex">
      <div className="space-y-4 ">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center  space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playLists?.map((p) => (
          <p
            onClick={() => setPlayListId(p.id)}
            key={p.id}
            className="cursor-pointer hover:text-white"
          >
            {p.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
