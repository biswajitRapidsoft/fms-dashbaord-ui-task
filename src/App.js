import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <div style={{ marginTop: "4rem" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default App;

// fms dashboard container(vw)
// 21
