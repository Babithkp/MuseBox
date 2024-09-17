import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import iconImg from "../../assets/ICON.svg";
import UploadForm from "./UploadForm";
import { useEffect, useState } from "react";
import { getSongData } from "../../api/https";
interface SongType {
  id: string;
  songName: string;
  artist: string;
  audioType: string;
  albumName: string;
  language: string;
  duration: string;
  releaseDate: string;
  songUrl: string;
  thunbnailUrl: string;
}
export default function AdminPanel() {
  const [songlist, setSongList] = useState<SongType[]>([]);

  function formatDate(date: string) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [day, month, year].join("-");
  }

  useEffect(() => {
    songlist.map((song) => {
      song.releaseDate = formatDate(song.releaseDate);
    });
  }, [songlist]);

  useEffect(() => {
    async function fetch() {
      const response = await getSongData();
      if (response) {
        if (response.status === 200) {
          const fetchedList: SongType[] = response.data.data;
          fetchedList.map((song) => {
            song.releaseDate = formatDate(song.releaseDate);
          });
          setSongList(fetchedList);
        }
      }
    }
    fetch();
  }, []);

  return (
    <>
      <nav className="flex h-20 w-full items-center justify-between px-10">
        <div className="flex gap-3">
          <figure>
            <img src={iconImg} alt="Website icon" />
          </figure>
        </div>
        <figure>
          <CgProfile size={35} />
        </figure>
      </nav>

      {/* descptive items  */}
      <section className="mb-5 flex w-[94%] items-center justify-between">
        <h2 className="text-3xl font-semibold">Welcome Back!</h2>
        <div className="flex items-center gap-5">
          <p className="rounded-md border p-2 text-lg font-medium">
            Total Songs Published {songlist.length}
          </p>
          <button className="rounded-md border p-2 text-lg font-medium">
            + Add
          </button>
        </div>
      </section>

      <section className="flex h-[35rem] w-[95%] gap-10 ">
        {/* search section  */}
        <div className="flex w-[35%] flex-col gap-3 rounded-md bg-[#131313] p-5 overflow-y-auto">
          <div className="flex items-center gap-5 rounded-md bg-[#323232] p-1 font-medium">
            <IoMdSearch size={25} />
            <input
              placeholder="Search"
              className="bg-inherit focus:outline-none"
            />
          </div>

          {/* filters button */}
          <div className="flex gap-2 ">
            <span className="rounded-md border p-1 px-2">All</span>
            <span className="rounded-md bg-[#323232] p-1 px-2">Songs</span>
            <span className="rounded-md bg-[#323232] p-1 px-2">Albums</span>
          </div>

          {/* songs list */}
          <>
            {songlist?.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between gap-1 rounded-md bg-[#323232] p-3 text-xs"
              >
                <div className="size-10 rounded-md bg-[#D9D9D9]">
                  <img src={`https://musebox-s3bucket.s3.ap-south-1.amazonaws.com/museBox/thumbnails/${song.thunbnailUrl}`} />
                </div>
                <div className="flex flex-1 flex-col">
                  <p>{song.songName}</p>
                  <p>{song.artist}</p>
                  <p>Date Published {song.releaseDate}</p>
                </div>
                <button>
                  <TbEdit size={25} />
                </button>
              </div>
            ))}
          </>
        </div>

        {/* upload form  */}
        <UploadForm />
      </section>
    </>
  );
}
