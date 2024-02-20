import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const Dashboard = () => {
  const top5GasStation = ["Bharat Petroleum", "HP", "Reliance", "Indian Oil"];

  const [isSideBoxOpen, setIsSideBoxOpen] = useState(false);

  return (
    // parent box for dashboard
    <Box sx={{ display: "flex", height: "90vh" }}>
      {/* left side parent box  */}
      <Box sx={{ width: "25%", marginLeft: "0.5rem" }}>
        {/* total transporters box */}
        <Box
          sx={{
            paddingLeft: "0.25rem",
            backgroundColor: "#d4d4d4",
            // gap: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            border: "1px solid black",
          }}
        >
          {/* each list inside transporter box */}
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PeopleAltIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Transporters
              </Typography>
              <Typography sx={{ color: "blue" }} component={Link}>
                0
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalShippingIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Transporters
              </Typography>
              <Typography sx={{ color: "blue" }} component={Link}>
                0
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocationOnIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Transporters
              </Typography>
              <Typography sx={{ color: "green" }} component={Link}>
                0
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocationOffIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Transporters
              </Typography>
              <Typography sx={{ color: "red" }} component={Link}>
                0
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <WifiIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Transporters
              </Typography>
              <Typography sx={{ color: "green" }} component={Link}>
                0
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <WifiOffIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Transporters
              </Typography>
              <Typography sx={{ color: "red" }} component={Link}>
                0
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* trip summary box */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#90EE90",
            borderRadius: "0.3rem",
            marginTop: "0.4rem",
            padding: "0.4rem",
          }}
        >
          <Typography sx={{ fontWeight: "550" }}>Trip Summary</Typography>
        </Box>

        {/* total trips today box */}

        <Box
          sx={{
            // paddingLeft: "0.25rem",
            marginTop: "0.4rem",

            backgroundColor: "#6CB4EE",
            // gap: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            border: "1px solid black",
          }}
        >
          <Box sx={{ display: "flex", gap: "2rem", marginLeft: "0.25rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#318CE7",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PeopleAltIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Trips Today
              </Typography>
              <Typography component={Link}>0</Typography>
            </Box>
          </Box>

          {/* table inside trips box */}
          <Grid container sx={{ width: "100%", backgroundColor: "#90EE90" }}>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#90EE90",
                paddingLeft: "0.25rem",
                border: "1px solid #D3D3D3",
              }}
            >
              <Typography>Completed Trips</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ backgroundColor: "#90EE90", paddingLeft: "0.25rem" }}
            >
              <Typography>In Progress</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ backgroundColor: "#6CB4EE", paddingLeft: "0.25rem" }}
            >
              <Typography>0</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#6CB4EE",
                paddingLeft: "0.25rem",
                border: "1px solid #D3D3D3",
              }}
            >
              <Typography>0</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#90EE90",
                paddingLeft: "0.25rem",
                border: "1px solid #D3D3D3",
              }}
            >
              <Typography>Delayed Trips</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#90EE90",
                paddingLeft: "0.25rem",
                border: "1px solid #D3D3D3",
              }}
            >
              <Typography>On Time Trips</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#6CB4EE",
                paddingLeft: "0.25rem",
                border: "1px solid #D3D3D3",
              }}
            >
              <Typography>0</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#6CB4EE",
                paddingLeft: "0.25rem",
                border: "1px solid #D3D3D3",
              }}
            >
              <Typography>0</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Alert Box */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#F67280",
            borderRadius: "0.3rem",
            marginTop: "0.4rem",
            padding: "0.4rem",
          }}
        >
          <Typography sx={{ fontWeight: "550" }}>Alerts </Typography>
        </Box>

        {/* last individual list box */}
        <Box
          sx={{
            paddingLeft: "0.25rem",
            backgroundColor: "#ffe5b4",
            // gap: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            border: "1px solid black",
            marginTop: "0.25rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#EE4B2B",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ForkRightIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Route Deviations <span style={{ color: "red" }}>0</span>
              </Typography>
              <Typography>
                Vehicles <span sx={{ color: "red" }}>0</span>&nbsp; Trips
                {""} <span sx={{ color: "red" }}>0</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: "0.25rem",
            backgroundColor: "#fff",
            // gap: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            border: "1px solid black",
            marginTop: "0.25rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#EE4B2B",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PeopleAltIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Over Speeds {""}
              </Typography>
              <Typography>
                Vehicles <span>0</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: "0.25rem",
            backgroundColor: "#ffe5b4",
            // gap: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            border: "1px solid black",
            marginTop: "0.25rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#EE4B2B",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PeopleAltIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Tampered <span>0</span>
              </Typography>
              <Typography>
                Vehicles <span>0</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: "0.25rem",
            backgroundColor: "#fff",
            // gap: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            border: "1px solid black",
            marginTop: "0.25rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* icon */}
            <Box
              sx={{
                border: "1px solid black",
                bgcolor: "#EE4B2B",
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "3rem",
              }}
            >
              <PeopleAltIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // minHeigh: "20rem",
              }}
            >
              <Typography sx={{ fontWeight: "550" }}>
                Total Unauthorized Stops <span>0</span>
              </Typography>
              {/* <Typography sx={{ color: "blue" }}>{"  "}</Typography> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* middle parent box */}
      <Box
        sx={{
          // backgroundColor: "green",
          width: "75%",
          display: "flex",
          // justifyContent: "space-between",
          paddingLeft: "4rem",
          // gap: "2em",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top5GasStation}
          sx={{ width: 300 }}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="Select site" />
          )}
        />
        {/* container for mui checkbox */}
        <Box
          // sx={{ border: "1px solid black" }}
          sx={{ marginLeft: "2rem" }}
        >
          {" "}
          <FormControlLabel
            label="Show Chainages Name"
            control={<Checkbox defaultChecked />}
          />
          <FormControlLabel
            label="Show Mid Points"
            control={<Checkbox defaultChecked />}
          />
          <FormControlLabel
            label="Show Routes"
            control={<Checkbox defaultChecked />}
          />
          <FormControlLabel
            label="Show Vehicles"
            control={<Checkbox defaultChecked />}
          />
        </Box>
      </Box>

      {/* right side parent box */}
      {/* <Rightsidebar /> */}
      <Box
        sx={{
          backgroundColor: "#47217a",
          height: "100%",
          width: "3rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <LocalShippingIcon
            sx={{ color: "white" }}
            onClick={() => setIsSideBoxOpen(true)}
          />
        </IconButton>
      </Box>
      {/* right side fix position box */}
      {isSideBoxOpen && (
        <Box
          sx={{
            position: "fixed",
            right: 0,
            height: "80%",
            backgroundColor: "#d4d4d4",
            width: "17rem",
          }}
        >
          {/*Download option box*/}
          <Box
            sx={{
              display: "flex",
              backgroundColor: "black",
              padding: "0.4rem",
              paddingLeft: "0.5rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "white" }}>Vehcile List</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton>
                <DownloadIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton>
                <CloseIcon
                  sx={{ color: "white" }}
                  onClick={() => setIsSideBoxOpen(false)}
                />
              </IconButton>
            </Box>
          </Box>
          <TextField
            id="outlined-basic"
            // label="Search"
            placeholder="search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon
                      sx={{
                        fontSize: "29px",
                        fontWeight: 400,
                        color: "#858585",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
          {/* two checkbox */}
          <Box sx={{ paddingLeft: "0.5rem" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="On Trip"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Available"
              sx={{
                color: pink[800],
                "& .Mui-checked": {
                  color: pink[600],
                },
              }}
            />
          </Box>

          {/* three small different coloured divs */}
          {/* <Box sx={{display:"flex"}}></Box> */}
          <Box sx={{ padding: "0.2rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#6CB4EE",
                    borderRadius: "0.4rem",
                    height: "2.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* All(687) */}
                  <Typography>All(687)</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#90EE90",
                    borderRadius: "0.4rem",
                    height: "2.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography> All(345)</Typography>
                  {/* <Typography> In Network(345)</Typography> */}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#F67280",
                    borderRadius: "0.4rem",
                    height: "2.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography> All(345)</Typography>
                  {/* <Typography> Out of Network(345)</Typography> */}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* multi list scrollable parent box */}
          <Box
            sx={{
              height: "70%",
              width: "100%",
              // backgroundColor: "red",
              // maxHeight: "20px",
              overflowY: "auto",
            }}
          >
            {/* first child list */}
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#F67280",
                padding: "0.7rem",
              }}
            >
              <AltRouteIcon sx={{ color: "blue" }} />
              <LocationOnIcon />
              <Typography>8856789876 km/hr</Typography>
              <FiberManualRecordIcon sx={{ color: "green" }} />
              <LocalGasStationIcon sx={{ color: "red" }} />
            </Box>

            {/* second child */}
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#90EE90",
                padding: "0.7rem",
              }}
            >
              <AltRouteIcon sx={{ color: "blue" }} />
              <LocationOnIcon />
              <Typography>8856789876 km/hr</Typography>
              <FiberManualRecordIcon sx={{ color: "green" }} />
              <LocalGasStationIcon sx={{ color: "red" }} />
            </Box>

            {/* third child */}
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#F67280",
                padding: "0.7rem",
              }}
            >
              <AltRouteIcon sx={{ color: "blue" }} />
              <LocationOnIcon />
              <Typography>8856789876 km/hr</Typography>
              <FiberManualRecordIcon sx={{ color: "green" }} />
              <LocalGasStationIcon sx={{ color: "red" }} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
