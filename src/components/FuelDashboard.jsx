import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Checkbox from "@mui/material/Checkbox";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import DynamicBreadcrumb from "./DynamicBreadcrumb";
import CableIcon from "@mui/icons-material/Cable";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import dataFuelDashboard from "../data/dataFuelDashboard";
import fmsData from "../data/fmsData";
import fmsSiteData from "../data/fmsSiteData";
import fmsAllVehicleData from "../data/fmsAllVehicleData";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import config from "../config/config";
import axios from "axios";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { utils, writeFile } from "xlsx";

import MenuItem from "@mui/material/MenuItem";
import { FuelDashboardAction } from "../actions/FuelDashboardAction";

import "../css/FuelDashboard.css";
//loader
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Progressbar = ({ total, currentVal, remaining }) => {
  return (
    <div
      style={{
        maxWidth: "75px",
        backgroundColor: "rgba(160, 160, 160, 0.6)",
        borderRadius: "0.5rem",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: (currentVal / total) * 100 > 20 ? "red" : "green",
          borderRadius: "0.5rem",
          width: "50%",
          color: "white",
          maxWidth: "fit-content",
        }}
      >
        {remaining}
      </div>
    </div>
  );
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FuelDashboard = () => {
  const isSideBarPinned = false;
  const isOpenforGridTable = false;
  // const breadcrumbs = [{ name: "Dashboard", path: "/" }];
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState({});
  const [vehicleData, setVehicleData] = useState([]);

  const [startDate, setStartDate] = useState(
    moment().startOf("day").format("YYYY-MM-DD hh:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("day").format("YYYY-MM-DD hh:mm:ss")
  );
  const [siteData, setSiteData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);

  const [vehicleType, setVehicleType] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);

  const [allVehicle, setAllVehicle] = useState([]);
  const [selectedAllVehicle, setSelectedAllVehicle] = useState(null);

  //pagination and filter

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isChecked, setIsChecked] = useState();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isDashboardChecked, setIsDashboardChecked] = useState(
    sessionStorage.getItem("checkbox") === "true" ? true : false
  );
  // sessionStorage.getItem("checkbox") === "false" ? true : false

  //loader
  const [open, setOpen] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDashboardCheckboxChange = () => {
  //   setIsDashboardChecked(!isDashboardChecked);
  //   sessionStorage.setItem("checkbox", isDashboardChecked);
  // };

  const handleDashboardCheckboxChange = () => {
    const newCheckedState = !isDashboardChecked;
    setIsDashboardChecked(newCheckedState);
    sessionStorage.setItem("checkbox", newCheckedState.toString());
  };

  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function calculateSerialNumber(page, rowsPerPage, index) {
    return page * rowsPerPage + index + 1;
  }

  const fetchData = async () => {
    setOpen(true);
    const fromDate = startDate ? new Date(startDate).getTime() : null;
    const toDate = endDate ? new Date(endDate).getTime() : null;

    const selectedSiteId = selectedSite ? selectedSite.id : null;

    const selectedVehicleTypeId = selectedVehicleType
      ? selectedVehicleType.id
      : null;
    const selectedVehicleId = selectedAllVehicle ? selectedAllVehicle.id : null;

    // const url =
    //   config.baseUrl +
    //   config.apiEndPoints.getDetails +
    //   `?pageNo=${page}&pageSize=${rowsPerPage}`;

    const payload = {
      // fromDate: 1708473600000,
      fromDate: fromDate,
      // toDate: 1708559940000,
      toDate: toDate,
      // vehicles: [
      //   {
      //     id: 671,
      //   },
      // ],

      vehicles: selectedVehicleId ? [{ id: selectedVehicleId }] : [],
      companyId: 1,
      siteIds: [
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 50, 52, 53,
      ],
      userId: 1,
      fuelSensorEnabled: true,
      // sourceSite: [
      //   {
      //     id: 13,
      //   },
      // ],

      sourceSite: selectedSiteId ? [{ id: selectedSiteId }] : [],
      vendorId: [],
      // vehicleType: [
      //   // {
      //   //   id: 1,
      //   // },

      // ],
      vehicleType: selectedVehicleTypeId ? [{ id: selectedVehicleTypeId }] : [],
      // isFuelWirecut: false,
      isFuelWirecut: isChecked,
    };
    try {
      // const response = await axios.post(url, payload, {
      //   headers: {
      //     Authorization:
      //       "Bearer " +
      //       "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBua2Nwcm9qZWN0LmNvbSIsImV4cCI6MTcwODY3MDY4NCwiaWF0IjoxNzA4NjUyNjg0fQ.pj2F9IOsPyeKfFMhCGtlLm3AoYapVMHVLdybOzNs0galCb-PG6CvWaB1X5_cesKU7Sg1R9CenmbLGBpJbKK8fw",
      //   },
      // });

      const response = await FuelDashboardAction.FuelDashboard(
        payload,
        page,
        rowsPerPage
      );

      if (response.data.data) {
        // setPage(0);

        setTotalElements(response.data.totalElements);
        setData(response.data.data);

        setVehicleData(response.data.data.vehicleDetails);
      }
    } catch (error) {
      // setOpen(false);

      console.log(error);
    }
    setOpen(false);
  };

  const generatePDF = (vehicleData) => {
    // const doc = new jsPDF();

    // doc.text("Vehicle Data", 10, 10);

    // let startY = 20;

    // vehicleData.forEach((row, index) => {
    //   const y = startY + index * 10;

    //   doc.text(`#${index + 1}`, 10, y);
    //   doc.text(`${row.number} - ${row.vehicleType.name}`, 30, y);
    //   doc.text(`${row.driver.name} - ${row.driver.phoneNumber}`, 70, y);
    //   doc.text(
    //     `Fuel: ${row.currentFuelValue}/${row.fuelTankCapacity} Ltrs`,
    //     120,
    //     y
    //   );
    //   doc.text(`Distance: ${row.distance} Kms`, 170, y);
    //   // Add more fields as needed

    //   // Add new page if necessary
    //   if (y > 250) {
    //     doc.addPage();
    //     startY = 10;
    //   }
    // });

    const doc = new jsPDF();

    doc.autoTable({
      head: [
        [
          "Vehicle Details",
          "Driver Details",
          "Current Fuel(Ltrs)",
          "Running Distance(Kms)",
          "Consumption Analysis",
          "Droppage Analysis",
          " Fill",
        ],
      ],
      body: vehicleData?.map((d) => [
        {
          content: `${d.number}\n${d?.vehicleType?.name}\nSite:${d?.site?.name}`,
          styles: { valign: "middle" },
        },
        {
          content: `${d.driver.name}\n${d.driver.phoneNumber}`,
          // styles: { valign: "middle" },
        },
        {
          content: `  Tank:${d.fuelTankCapacity}\n${d.remainingFuel}`,
          styles: { valign: "middle" },
        },
        {
          content: `Start km:${d?.startKm}\n End km:${d?.endKm}`,
          // styles: { valign: "middle" },
        },
        {
          content: `Expected:${d.expectedConsumption} km/lt \n Actual:${d.actualConsumption} km/lt \n Deviation:${d.deviation} km/lt `,
          styles: { valign: "middle" },
        },
        {
          content: `Confirmed:${d.confirmDropage?.toFixed(
            2
          )} Ltrs \n Unchecked:${d?.unattendedDropage?.toFixed(2)} Ltrs `,
          styles: { valign: "middle" },
        },
        {
          content: `${d?.fuelFill}`,
          // styles: { valign: "middle" },
        },
      ]),
    });

    doc.save("vehicle_data.pdf");
  };

  const exportData = () => {
    let tableHeaders = [
      "Vehicle Details",
      "",

      "Driver Name",
      "",

      "Driver PhoneNumber",
      "",

      "Total Capacity",
      "",

      "Current Fuel(Ltrs)",
      "",

      "Distance",
      "",

      "Engine Hours",
      "",

      "Start km",
      "",

      "End km",
      "",

      "Expected",
      "",

      "Actual",
      "",

      "Deviation",
      "",

      "Confirmed",
      "",

      "Unchecked",
      "",

      "Fill",
      "",
    ];

    let tableRows = vehicleData?.flatMap((d) => [
      [
        `${d?.number}`,
        "",

        `${d?.driver?.name}`,
        "",
        `${d?.driver?.phoneNumber}`,
        "",
        `${d?.fuelTankCapacity}`,
        "",
        `${d?.remainingFuel}`,
        "",
        `${d?.distance}`,
        "",
        `${d?.engineHours}`,
        "",
        `${d?.startKm}`,
        "",
        `${d?.endKm}`,
        "",

        `${d?.expectedConsumption} km/lt 
                                  (${d?.kmPerLiter} km/lt)`,
        "",
        `${d?.actualConsumption}km/lt`,
        "",
        `${d?.deviation} km/lt`,
        "",
        `${d?.confirmDropage?.toFixed(2)} Ltrs`,
        "",
        `${d?.unattendedDropage?.toFixed(2)} Ltrs`,
        "",
        `${d?.fuelFill} Ltrs`,
        "",
      ],
    ]);

    let wsData = [tableHeaders, ...tableRows];

    let wb = utils.book_new();
    let ws = utils.aoa_to_sheet(wsData);

    utils.book_append_sheet(wb, ws, "items");
    writeFile(wb, "vehicle_data.xlsx");
  };

  const handleYesterday = () => {
    const dateStart = moment(new Date())
      .subtract(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    const dateEnd = moment(new Date())
      .subtract(1, "days")
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    setStartDate(dateStart);
    setEndDate(dateEnd);
  };

  const handleToday = () => {
    const dateStart = moment(new Date())
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    const dateEnd = moment(new Date())
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    setStartDate(dateStart);
    setEndDate(dateEnd);
  };

  const handleStartDateChange = (e) => {
    // const timestamp = e.target.value;
    // console.log(timestamp, "timestamp");

    // const time = new Date(e.target.value).getTime();
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    // const timestamp = e.target.value;
    // console.log(timestamp, "timestamp");

    // const time = new Date(e.target.value).getTime();
    setEndDate(e.target.value);
  };

  const handleSiteChange = (event, newValue) => {
    if (!newValue) {
      setSelectedSite(null);
    } else {
      setSelectedSite(newValue);
    }
  };

  const handleVehicleTypeChange = (event, newValue) => {
    if (!newValue) {
      setSelectedVehicleType(null);
    } else {
      setSelectedVehicleType(newValue);
    }
  };

  const handleVehicleChange = (event, newValue) => {
    if (!newValue) {
      setSelectedAllVehicle(null);
    } else {
      setSelectedAllVehicle(newValue);
    }
  };

  // const handleExportPDF = () => {
  //   const doc = new jsPDF();
  //   // Loop through each page of the table and add it to the PDF
  //   // You may need to adjust the position and styling based on your table structure
  //   // Example:
  //   const table = document.getElementById("table");
  //   for (let i = 0; i < table.rows.length; i++) {
  //     const rowData = [];
  //     for (let j = 0; j < table.rows[i].cells.length; j++) {
  //       rowData.push(table.rows[i].cells[j].innerText);
  //     }
  //     doc.text(10, 10 + i * 10, rowData.join(", "));
  //     // Check if a new page is needed based on the number of rows per page
  //     if ((i + 1) % rowsPerPage === 0 && i !== table.rows.length - 1) {
  //       doc.addPage();
  //     }
  //   }
  //   // Save the PDF
  //   doc.save("table_data.pdf");
  // };

  useEffect(() => {
    fetchData();

    if (fmsData) {
      setVehicleType(fmsData);
    }

    if (fmsSiteData) {
      // const autocompleteOptionsToSet = fmsSiteData.map((item, index) => ({
      //   label: item.site.name,
      //   id: item.id,
      //   // siteId: item.site.id,
      // }));
      setSiteData(fmsSiteData);
    }

    if (fmsAllVehicleData) {
      setAllVehicle(fmsAllVehicleData);
    }
  }, [
    // fmsData,
    startDate,
    endDate,
    page,
    rowsPerPage,

    // fmsSiteData,
    isChecked,
    // selectedAllVehicle,
    // selectedSite,
    // selectedVehicleType,
  ]);

  // useEffect(() => {
  //   handleToday();
  // }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: theme.palette.common.black,
      // border: "1px solid green",
      fontWeight: "bolder",
      borderTop: "1px solid green",
      borderBottom: "1px solid green",
      backgroundColor: "rgb(240 248 255)",

      color: "black",
      height: "30px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor: "rgba(60, 179, 113, 0.3)",
      // backgroundColor: "",
      borderBottom: "2px solid white",
      height: "5em",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      marginTop: "10px",

      // backgroundColor: "",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(index, name, calories, fat, carbs, protein) {
    return { index, name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0, 9.0, 9.0, 9.0),
    createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3, 9.0, 9.0, 9.0),
    createData(3, "Eclair", 262, 16.0, 24, 6.0, 9.0, 9.0, 9.0),
    createData(4, "Cupcake", 305, 3.7, 67, 4.3, 9.0, 9.0, 9.0),
    createData(5, "Gingerbread", 356, 16.0, 49, 3.9, 9.0, 9.0, 9.0),
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#f1f1f1",
          display: "flex",
          flexGrow: 1,
          px: 3,
          pl: "4em",
          overflowY: "auto",
          // paddingTop: 10,

          //   backgroundColor: "pink",
        }}
      >
        <Grid container spacing={2} sx={{ backgroundColor: "", mt: 1 }}>
          <Grid item xs={12} md={12} lg={12}></Grid>

          <Grid item xs={12} md={12} lg={12}>
            {/* <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                mb: "2em",
                gap: 2,
              }}
            >
              <Box>
                <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
              </Box>
            </Box> */}
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                borderRadius: "5px",
                // overflowX: "hidden",
                flexDirection: "column",

                maxWidth: isSideBarPinned
                  ? isOpenforGridTable
                    ? "83.5vw"
                    : "95.5vw"
                  : "95.5vw",
                flexGrow: 1,
                height: "87vh", //75
                backgroundColor: "",

                // height: "85vh",

                // pb: "0.5em",
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{
                  width: "100%",
                  backgroundColor: "",
                  // ml: 0,
                }}
              >
                <Grid item>
                  <Button
                    sx={{
                      width: "15vw",
                      height: "35px",
                      minHeight: "35px",
                      m: 1,

                      border: "1px solid #40a6a6",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      textTransform: "none",
                    }}
                  >
                    <Checkbox
                      {...label}
                      value={isDashboardChecked}
                      defaultChecked={isDashboardChecked}
                      onChange={handleDashboardCheckboxChange}
                    />
                    <span style={{ color: "black" }}>
                      Make default dashboard
                    </span>
                  </Button>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      mt: 1,
                      backgroundColor: "",
                      width: "8vw",
                      height: "35px",
                      // border: "1px solid black",
                      borderRadius: "5px",
                      display: "flex", // Added flex display
                      alignItems: "center", // Vertically center content
                      justifyContent: "center", // Ho
                    }}
                  >
                    <Button
                      variant=""
                      sx={{
                        width: "100%",
                        color: "",
                        backgroundColor: "",
                        border: "1px solid #40a6a6",
                        textTransform: "none",
                      }}
                      onClick={handleYesterday}
                    >
                      <Typography
                        sx={{ alignSelf: "center", fontSize: "14px" }}
                      >
                        Yesterday
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      mt: 1,
                      backgroundColor: "",
                      width: "8vw",
                      height: "35px",

                      borderRadius: "5px",
                      display: "flex", // Added flex display
                      alignItems: "center", // Vertically center content
                      justifyContent: "center", // Ho
                    }}
                  >
                    <Button
                      variant=""
                      sx={{
                        width: "100%",
                        color: "",
                        backgroundColor: "",
                        border: "1px solid #40a6a6",

                        textTransform: "none",
                      }}
                      onClick={handleToday}
                    >
                      <Typography
                        sx={{ alignSelf: "center", fontSize: "14px" }}
                      >
                        Today
                      </Typography>
                    </Button>
                  </Box>
                </Grid>

                <Grid item>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      mt: 1,
                      //   minHeight: "30px",
                      border: "1px solid #40a6a6",
                      borderRadius: "4px",

                      paddingRight: "2px",
                    }}
                  >
                    <TextField
                      name="fromDate"
                      type="datetime-local"
                      variant="outlined"
                      sx={{
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      onChange={(event) => handleStartDateChange(event)}
                      value={startDate}

                      //   className="w-100 dateTime"
                    />
                  </Box>
                </Grid>

                <Grid item>
                  <Box
                    sx={{
                      backgroundColor: "",
                      mt: 1,
                      //   minHeight: "30px",
                      //   fontSize: "12px",
                      border: "1px solid #40a6a6",
                      borderRadius: "4px",

                      paddingRight: "2px",
                    }}
                  >
                    <TextField
                      name="fromDate"
                      type="datetime-local"
                      variant="outlined"
                      sx={{
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      onChange={(event) => handleEndDateChange(event)}
                      value={endDate}

                      //   className="w-100 dateTime"
                    />
                  </Box>
                </Grid>

                <Grid item>
                  <Box
                    sx={{
                      width: "12vw",
                      height: "",
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      // options={siteData}

                      key={(option) => option.id}
                      // value={selectedSite}
                      options={Array.isArray(siteData) ? siteData : []}
                      getOptionLabel={(option) => option.site.name}
                      // getOptionSelected={(option, value) =>
                      //   option.id === value.id
                      // }
                      onChange={handleSiteChange}
                      sx={{
                        mt: 1,
                        height: "100%",
                        width: "100%",
                        fontSize: "0.75rem",
                        "& fieldset": {
                          border: "none",
                        },
                        // border: "1px solid #40a6a6",
                      }} // Set height and width to 100%
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="All Site"
                          sx={{
                            fontSize: "0.75rem",
                            border: "1px solid #40a6a6",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      // renderOption={(props, option) => (
                      //   <MenuItem key={option.id} value={option.id} {...props}>
                      //     {option.label}
                      //   </MenuItem>
                      // )}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.site.name}
                          </li>
                        );
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ width: "12vw", height: "35px" }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      // options={top100Films}
                      sx={{
                        mt: 1,
                        height: "100%",
                        width: "100%",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      options={vehicleType}
                      // value={selectedVehicleType}
                      onChange={handleVehicleTypeChange}
                      getOptionLabel={(option) => option.name}
                      // Set height and width to 100%
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="All Vehicle Type"
                          size="small"
                          sx={{
                            border: "1px solid #40a6a6",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.name}
                          </li>
                        );
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ width: "8vw", height: "35px" }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={allVehicle}
                      // value={selectedAllVehicle}
                      onChange={handleVehicleChange}
                      getOptionLabel={(option) => option.number}
                      sx={{
                        mt: 1,
                        height: "100%",
                        width: "100%",
                        "& fieldset": {
                          border: "none",
                        },
                      }} // Set height and width to 100%
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="All Vehicle"
                          size="small"
                          sx={{
                            border: "1px solid #40a6a6",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.number}
                          </li>
                        );
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item>
                  <Box
                    sx={{
                      mt: 1,
                      mr: 0,
                      ml: 2,
                      // ml: 3.4,
                      backgroundColor: "",
                      width: "100%",

                      //   border: "1px solid black",
                      borderRadius: "5px",
                      backgroundColor: "#47217a",
                    }}
                  >
                    <Button
                      variant=""
                      sx={{
                        width: "100%",
                        p: 1,
                        color: "white",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        setPage(0);
                        fetchData();
                      }}
                    >
                      Show
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "",
                  // width: "100%",
                  //   mt: 0.5,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ marginLeft: 3 }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      Fuel Wirecut
                    </label>
                  </div>
                </Box>
                <Box sx={{ backgroundColor: "", mr: 1, mt: 0.5 }}>
                  <Button
                    sx={{
                      backgroundColor: "#47217a",
                      color: "white",
                      mr: 1,
                      textTransform: "none",
                      p: 1,
                      width: "7vw",
                      "&:hover": {
                        backgroundColor: "#47217a",
                      },
                    }}
                    onClick={() => generatePDF(vehicleData)}
                  >
                    Export PDF
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#47217a",
                      color: "white",
                      textTransform: "none",
                      width: "7vw",
                      "&:hover": {
                        backgroundColor: "#47217a",
                      },
                    }}
                    onClick={exportData}
                  >
                    Export Excel
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={0.3} sx={{ mt: 0.2 }}>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(135, 206, 250, 0.6)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(89, 168, 217, 0.6)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          transform: "translate(-50%, -50%) rotate(90deg)", // Center and rotate the icon
                        }}
                      >
                        <CableIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Total Wirecut</Typography>
                      <Typography sx={{ marginLeft: 4, fontWeight: "bolder" }}>
                        {data.fuelWirecut}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(255, 192, 203, 0.7)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(214, 121, 137, 0.7)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          transform: "translate(-50%, -50%) rotate(90deg)", // Center and rotate the icon
                        }}
                      >
                        <CableIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Confirmed Droppage</Typography>

                      <Typography sx={{ marginLeft: 4, fontWeight: "bolder" }}>
                        {data?.confirmedDropage?.toFixed(2)} Ltrs
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(255, 192, 203, 0.7)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(214, 121, 137, 0.7)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          transform: "translate(-50%, -50%) rotate(90deg)", // Center and rotate the icon
                        }}
                      >
                        <CableIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Unchecked Droppage</Typography>
                      <Typography sx={{ marginLeft: 4, fontWeight: "bolder" }}>
                        {data?.unattendedDropage?.toFixed(2)} Ltrs
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(60, 179, 113, 0.3)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(38, 238, 12, 0.3)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          transform: "translate(-50%, -50%) rotate(90deg)", // Center and rotate the icon
                        }}
                      >
                        <CableIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Expected Consumption</Typography>
                      <Typography sx={{ marginLeft: 4, fontWeight: "bolder" }}>
                        {data?.expectedConsumption?.toFixed(2)} Ltrs
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(60, 179, 113, 0.3)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(38, 238, 12, 0.3)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          transform: "translate(-50%, -50%) rotate(90deg)", // Center and rotate the icon
                        }}
                      >
                        <CableIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Actual Consumption</Typography>
                      <Typography sx={{ marginLeft: 4, fontWeight: "bolder" }}>
                        {data?.actualConsumption?.toFixed(2)} Ltrs
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(60, 179, 113, 0.3)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(38, 238, 12, 0.3)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          transform: "translate(-50%, -50%) rotate(90deg)", // Center and rotate the icon
                        }}
                      >
                        <CableIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Total Deviation</Typography>
                      <Typography
                        sx={{
                          //   marginLeft: 1,
                          fontWeight: "bolder",
                          color: "red",
                        }}
                      >
                        {data?.deviation?.toFixed(2)} Ltrs
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "13vw",
                      height: "8vh",

                      ml: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "rgba(135, 206, 250, 0.6)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        backgroundColor: "rgba(89, 168, 217, 0.6)",
                        borderRadius: "50%",
                        height: "5vh",
                        width: "2.5vw",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "53%",
                          left: "50%",
                          transform: "translate(-50%, -50%) ", // Center and rotate the icon
                        }}
                      >
                        <WaterDropIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div style={{ backgroundColor: "" }}>
                      <Typography>Total Fuel Fill</Typography>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        {data?.tFuelFill?.toFixed(2)} Ltrs
                      </Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>

              {/* <Grid container>
                <Grid item sx={{ m: 1 }}> */}
              <TableContainer
                // component={Paper}
                id="table"
                sx={{
                  m: 1,
                  width: "99%",

                  backgroundColor: "",
                  overflowY: "auto",
                  minHeight: "55vh",
                  maxHeight: { sm: "55vhzIndex: 1,", lg: "61vh" },
                }}
              >
                <Table aria-label="customized table">
                  <TableHead
                    sx={{
                      border: "1px solid green",
                      backgroundColor: "",
                      // height: "20px !important",
                    }}
                  >
                    <TableRow>
                      <StyledTableCell
                        style={{ minWidth: "50px", backgroundColor: "" }}
                      >
                        #&nbsp;
                      </StyledTableCell>
                      <StyledTableCell style={{ backgroundColor: "" }}>
                        Vehicle Details
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Driver Details
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Current Fuel(Ltrs)
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Running Distance(Kms)
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Consumption Analysis
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Droppage Analysis
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Fill
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ backgroundColor: "" }}
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(vehicleData) &&
                      vehicleData.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {calculateSerialNumber(page, rowsPerPage, index)}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ backgroundColor: "" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(0, 102, 255)",
                                  fontSize: "0.875rem;",
                                }}
                              >
                                {row?.number}
                              </Typography>
                              <span style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                                {row?.vehicleType?.name}
                              </span>
                              <Typography sx={{ fontSize: "0.75rem" }}>
                                Site:
                                <span style={{ fontWeight: "bold" }}>
                                  {row?.site?.name}
                                </span>
                              </Typography>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography sx={{ color: "rgb(0, 102, 255)" }}>
                                {row.driver.name}
                              </Typography>

                              <Typography>{row.driver.phoneNumber}</Typography>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "bolder",
                                  fontSize: "0.875rem",
                                }}
                              >
                                Tank:{row.fuelTankCapacity}
                              </Typography>

                              <Progressbar
                                total={row.fuelTankCapacity}
                                currentVal={row.currentFuelValue}
                                remaining={row.remainingFuel}
                              />
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.875rem;",
                                  fontWeight: "bold",
                                }}
                              >
                                {row.distance}{" "}
                                <span
                                  style={{
                                    fontSize: "0.875rem",
                                    fontWeight: "normal",
                                  }}
                                >
                                  ({row.engineHours ? row.engineHours : "---"})
                                </span>
                              </Typography>

                              <Typography sx={{ fontSize: "0.875rem" }}>
                                Start Km:
                                <span style={{ fontWeight: "bold" }}>
                                  {row?.startKm} ({data?.tAlreadyInTankValue}{" "}
                                  Ltrs )
                                </span>
                              </Typography>
                              <Typography sx={{ fontSize: "0.875rem" }}>
                                End Km:
                                <span style={{ fontWeight: "bold" }}>
                                  {" "}
                                  {row?.endKm} ({data?.tCurrentTankValue} Ltrs)
                                </span>
                              </Typography>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography sx={{ fontSize: "0.875rem" }}>
                                Expected:
                                <span style={{ fontWeight: "bold" }}>
                                  {row.expectedConsumption} km/lt (
                                  {row.kmPerLiter} km/lt)
                                </span>
                              </Typography>
                              <Typography sx={{ fontSize: "0.875rem" }}>
                                Actual:
                                <span style={{ fontWeight: "bold" }}>
                                  {" "}
                                  {row.actualConsumption} km/lt
                                </span>
                              </Typography>
                              <Typography sx={{ fontSize: "0.875rem" }}>
                                Deviation:
                                <span style={{ fontWeight: "bold" }}>
                                  {" "}
                                  {row.deviation} km/lt
                                </span>
                              </Typography>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography sx={{ fontSize: "0.875rem" }}>
                                Confirmed:
                                <span
                                  style={{ fontWeight: "bold", color: "red" }}
                                >
                                  {row?.confirmDropage?.toFixed(2)} Ltrs
                                </span>
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                }}
                              >
                                Unchecked:
                                <span style={{ fontWeight: "bold" }}>
                                  {row?.unattendedDropage?.toFixed(2)} Ltrs
                                </span>
                              </Typography>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Typography
                              sx={{
                                fontSize: "0.875rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {row?.fuelFill} Ltrs
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TrendingUpIcon
                              sx={{ color: "rgb(0, 102, 255)" }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 20, 50, 100]}
                  component="div"
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ backgroundColor: "" }}
                />
              </Box>

              {/* </Grid>
              </Grid> */}
            </Paper>
          </Grid>
        </Grid>

        <div>
          {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
          <Backdrop
            // style={{ zIndex: 1 }}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </Box>
    </>
  );
};

export default FuelDashboard;
