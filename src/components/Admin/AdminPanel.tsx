import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import iconImg from "../../assets/ICON.svg";
import { MdOutlineCloudUpload } from "react-icons/md";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AdminPanel() {
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
          <p className="rounded-md border p-2 text-xl font-medium">
            Total Songs Published 500
          </p>
          <button className="rounded-md border p-2 text-xl font-medium">
            + Add
          </button>
        </div>
      </section>

      <section className="flex h-[35rem] w-[95%] gap-10">
        {/* search section  */}
        <div className="flex w-[35%] flex-col gap-3 rounded-md bg-[#131313] p-5">
          <div className="flex items-center gap-5 rounded-md bg-[#323232] p-1 font-medium">
            <IoMdSearch size={25} />
            <input
              placeholder="Search"
              className="bg-inherit focus:outline-none"
            />
          </div>

          {/* filters button */}
          <div className="flex gap-2">
            <span className="rounded-md border p-1 px-2">All</span>
            <span className="rounded-md bg-[#323232] p-1 px-2">Songs</span>
            <span className="rounded-md bg-[#323232] p-1 px-2">Albums</span>
          </div>

          {/* songs list */}
          <>
            <div className="flex items-center justify-between rounded-md bg-[#323232] p-3 text-sm">
              <div className="size-10 rounded-md bg-[#D9D9D9]"></div>
              <div>
                <p>Song Name</p>
                <p>Artist Name</p>
                <p>Date Published - DD/MM/YY</p>
              </div>
              <button>
                <TbEdit size={25} />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md bg-[#323232] p-3 text-sm">
              <div className="size-10 rounded-md bg-[#D9D9D9]"></div>
              <div>
                <p>Song Name</p>
                <p>Artist Name</p>
                <p>Date Published - DD/MM/YY</p>
              </div>
              <button>
                <TbEdit size={25} />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md bg-[#323232] p-3 text-sm">
              <div className="size-10 rounded-md bg-[#D9D9D9]"></div>
              <div>
                <p>Song Name</p>
                <p>Artist Name</p>
                <p>Date Published - DD/MM/YY</p>
              </div>
              <button>
                <TbEdit size={25} />
              </button>
            </div>
          </>
        </div>

        {/* upload form  */}
        <ThemeProvider theme={theme}>
          <div className="w-full rounded-md bg-[#131313]">
            <div className="flex h-[15rem] items-center justify-center gap-5">
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={""}
                className="upload-button flex size-[10rem] items-center justify-center rounded-md"
              >
                <MdOutlineCloudUpload size={25} className="mr-2" /> Audio
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                />
              </Button>
              <figure className="flex size-[10rem] items-center justify-center rounded-md bg-[#323232]">
                <TbEdit size={25} />
              </figure>
            </div>
            <form className="flex flex-wrap justify-around gap-5 p-5">
              <TextField
                id="Outlined"
                color="primary"
                label="Song Name"
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <TextField
                id="Outlined"
                color="primary"
                label="Artist"
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <TextField
                id="Outlined"
                color="primary"
                label="Audio Type"
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <TextField
                id="Outlined"
                color="primary"
                label="Album Name"
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <TextField
                id="Outlined"
                color="primary"
                label="Language"
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <TextField
                id="Outlined"
                color="primary"
                label="Duration"
                disabled={false}
                placeholder="00H:00M:00S"
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <div className="w-[40%]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem>
                      <DatePicker
                        className="date-picker w-full"
                        label={"Published Date"}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex w-[40%] justify-end gap-5">
                <Button
                  variant="outlined"
                  color="error"
                  className="w-full text-white"
                  type="button"
                >
                  cancel
                </Button>
                <Button variant="outlined" className="w-full" type="submit">
                  Add
                </Button>
              </div>
            </form>
          </div>
        </ThemeProvider>
      </section>
    </>
  );
}
