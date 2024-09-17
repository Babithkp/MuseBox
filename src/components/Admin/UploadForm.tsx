import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdOutlineCloudUpload } from "react-icons/md";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TbEdit } from "react-icons/tb";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { FaRegCircleCheck } from "react-icons/fa6";
import { uploadSong, uploadSongData, uploadThumbnail } from "../../api/https";
import { v4 } from "uuid";

type FormValues = {
  songName: string;
  artist: string;
  audioType: string;
  albumName: string;
  language: string;
  duration: string;
  releaseDate: string;
  songUrl: string;
  thunbnailUrl: string;
};

let S3SongName = "";
let S3ThumbnailName = "";

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();
  const [songFile, setSongFile] = useState<FileList | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<FileList | null>(null);
  const [releaseDate, setreleaseDate] = useState<Dayjs | null>(null);
  const [pubDateError, setpubDateError] = useState<
    DateValidationError | null | false | true
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [songName, setSongName] = useState("");
  const [audioType, setaudioType] = useState("");
  const [songDuration, setsongDuration] = useState<string | number>("");

  const errorMessage = useMemo(() => {
    switch (pubDateError) {
      case false: {
        return "Please select a valid date";
      }
      default: {
        return "";
      }
    }
  }, [pubDateError]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: grey[50],
      },
    },
  });

  const extractSongName = async (songFile: FileList) => {
    const formData = new FormData();
    formData.delete("file");
    const newSongName = v4() + songFile[0].name;
    formData.append("file", songFile[0], newSongName);
    const response = await uploadSong(formData);
    if (response) {
      if (response.status === 200) {
        toast.success("Song Uploaded Successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
    S3SongName = newSongName;
  };

  const extractThumbnailName = async (thumbnailFile: FileList) => {
    const formData = new FormData();
    formData.delete("file");
    const newThumbnailName = v4() + thumbnailFile[0].name;
    formData.append("file", thumbnailFile[0], newThumbnailName);
    const response = await uploadThumbnail(formData);
    if (response) {
      if (response.status === 200) {
        toast.success("Thumbnail Uploaded Successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
    S3ThumbnailName = newThumbnailName;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setpubDateError(true);
    if (releaseDate === null) {
      toast.warning("Please Enter the Published Date");
      setpubDateError(false);
      setIsLoading(false);
      return;
    }

    if (songFile === null) {
      toast.warning("Please upload a song file");
      setIsLoading(false);
      return;
    }

    if (thumbnailFile === null) {
      toast.warning("Please Upload the Thumbnail");
      setIsLoading(false);
      return;
    }

    await extractSongName(songFile);
    await extractThumbnailName(thumbnailFile);

    data.releaseDate = releaseDate.format();
    data.songName = songName;
    data.songUrl = S3SongName;
    data.thunbnailUrl = S3ThumbnailName;

    console.log(data);

    const response = await uploadSongData(data);
    if (response) {
      if (response.status === 200) {
        toast.success("Song Data Uploaded Successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
    resetHandler();
    setIsLoading(false);
    window.location.reload();
  };

  const resetHandler = () => {
    reset();
    setSongFile(null);
    setThumbnailFile(null);
    setpubDateError(false);
    setSongName("");
    setaudioType("");
    setsongDuration("");
  };

  useEffect(() => {
    if (songFile) {
      if (songFile[0].size > 5000000) {
        toast.warning("Song size should be less than 5 MB");
        setSongFile(null);
        return;
      }

      setValue("songName", songFile[0].name.split(".")[0]);
      setValue("audioType", songFile[0].type);
      setSongName(songFile[0].name.split(".")[0]);
      setaudioType(songFile[0].type);
      const audio = new Audio(URL.createObjectURL(songFile[0]));
      audio.addEventListener("loadedmetadata", () => {
        setValue(
          "duration",
          (audio.duration / 60).toLocaleString().replace(".", ":"),
        );
        setsongDuration(
          (audio.duration / 60).toLocaleString().replace(".", ":"),
        );
      });
    }
  }, [songFile, setValue]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex w-full flex-col justify-evenly rounded-md bg-[#131313]">
        <div className="flex items-center justify-center gap-5">
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={""}
            className="upload-button flex size-[10rem] items-center justify-center rounded-md"
            disabled={songFile ? true : false}
          >
            {!songFile && (
              <>
                <MdOutlineCloudUpload size={25} className="mr-2" /> Audio
              </>
            )}
            {songFile && <FaRegCircleCheck size={60} className="mr-2" />}

            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setSongFile(event.target.files)}
            />
          </Button>
          <figure className="flex size-[10rem] items-center justify-center gap-2 rounded-md bg-[#323232]">
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={""}
              className="upload-button flex size-[10rem] items-center justify-center rounded-md"
            >
              {!thumbnailFile && (
                <>
                  <TbEdit size={25} className="mr-2" /> Thumbnail
                </>
              )}
              {thumbnailFile && (
                <figure className="size-full">
                  <img
                    src={
                      thumbnailFile
                        ? URL.createObjectURL(thumbnailFile[0] as Blob)
                        : ""
                    }
                    className="size-full"
                  />
                </figure>
              )}
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => setThumbnailFile(event.target.files)}
              />
            </Button>
          </figure>
        </div>
        <form
          className="flex flex-wrap justify-around gap-5 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="Outlined"
            color="primary"
            label="Song Name"
            variant="outlined"
            className="customTextField w-[40%]"
            InputLabelProps={{ className: "outlined_label" }}
            {...register("songName", { required: true, minLength: 3 })}
            helperText={`${errors.songName ? "Please enter the song name with minimum 3 characters" : ""}`}
            error={errors.songName ? true : false}
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <TextField
            id="Outlined"
            color="primary"
            label="Artist"
            variant="outlined"
            className="customTextField w-[40%]"
            InputLabelProps={{ className: "outlined_label" }}
            {...register("artist", { required: true, minLength: 3 })}
            helperText={`${errors.artist ? "Please enter the artist name with minimum 3 characters" : ""}`}
            error={errors.artist ? true : false}
          />
          <TextField
            id="Outlined"
            color="primary"
            label="Audio Type"
            variant="outlined"
            className="customTextField w-[40%]"
            InputLabelProps={{ className: "outlined_label" }}
            {...register("audioType", { required: true, minLength: 3 })}
            helperText={`${errors.audioType ? "Please enter the Audio Type with minimum 3 characters" : ""}`}
            error={errors.audioType ? true : false}
            value={audioType}
            onChange={(e) => setaudioType(e.target.value)}
          />
          <TextField
            id="Outlined"
            color="primary"
            label="Album Name"
            variant="outlined"
            className="customTextField w-[40%]"
            InputLabelProps={{ className: "outlined_label" }}
            {...register("albumName", { required: true, minLength: 3 })}
            helperText={`${errors.albumName ? "Please enter Atleast 'None'" : ""}`}
            error={errors.albumName ? true : false}
          />
          <TextField
            id="Outlined"
            color="primary"
            label="Language"
            variant="outlined"
            className="customTextField w-[40%]"
            InputLabelProps={{ className: "outlined_label" }}
            {...register("language", { required: true, minLength: 3 })}
            helperText={`${errors.language ? "Please enter the language with minimum 3 characters" : ""}`}
            error={errors.language ? true : false}
          />
          <TextField
            id="Outlined"
            color="primary"
            label="Duration in Minutes"
            disabled={false}
            placeholder="00H:00M:00S"
            variant="outlined"
            className="customTextField w-[40%]"
            InputLabelProps={{ className: "outlined_label" }}
            {...register("duration", { required: true })}
            error={errors.duration ? true : false}
            helperText={`${errors.language ? "Please enter the Duration manually" : ""}`}
            value={songDuration}
            onChange={(e) => setsongDuration(e.target.value)}
          />
          <div className="w-[40%]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DemoItem>
                  <DatePicker
                    className="date-picker w-full"
                    label={"Published Date"}
                    disableFuture
                    onError={(e) => setpubDateError(e)}
                    slotProps={{
                      textField: {
                        helperText: errorMessage,
                      },
                    }}
                    onChange={(value) => setreleaseDate(value)}
                    value={releaseDate}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex w-[40%] justify-end gap-5 py-1">
            <Button
              variant="outlined"
              color="error"
              className="h-[3.5rem] w-full text-white"
              type="button"
              onClick={resetHandler}
              disabled={isLoading}
            >
              cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="outlined"
              className="h-[3.5rem] w-full"
              type="submit"
            >
              {isLoading ? <CircularProgress /> : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}
