import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";

export default function AdminPanel() {
  const theme = createTheme({
    palette: {
      mode:"dark",
      primary: {
        main: grey[50],
      },
    },
  });
  console.log("Babith");
  
  return (
    <>
      <nav className="flex h-20 w-full items-center justify-between px-10">
        <div className="flex gap-3">
          <figure>""""</figure>
          <h1 className="text-3xl font-bold">MuseBox</h1>
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
        <div className="w-full rounded-md bg-[#131313]">
          <div className="flex h-[15rem] items-center justify-center">
            <figure className="flex size-[10rem] items-center justify-center rounded-md bg-[#323232]">
              <TbEdit size={25} />
            </figure>
          </div>
            <ThemeProvider theme={theme}>
          <form className="flex flex-wrap p-5 justify-around gap-5">
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
                variant="outlined"
                className="customTextField w-[40%]"
                InputLabelProps={{ className: "outlined_label" }}
              />
              <div className="w-[90%] flex gap-5 justify-end">
                <Button variant="outlined" color="error">cancel</Button>
                <Button variant="outlined">Add</Button>
              </div>
          </form>
            </ThemeProvider>
        </div>
      </section>
    </>
  );
}
