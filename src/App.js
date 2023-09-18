import "../src/css/index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from "./components/Login";
import LoginDet from "./components/LoginDet";
import AppProvider from "./context/AppContext";
import ADash from "./views/Admin/Dashboard";
import BarC from "./components/charts/BarC";
import ADept from "./views/Admin/ADept";
import ASubj from "./views/Admin/ASubj";
import AFacult from "./views/Admin/AFacult";

function App() {
  return (

    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/login/details" element={<LoginDet />} />
          <Route exact path="/admin" element={<ADash />} />
          <Route exact path="/admin/departments" element={<ADept />} />
          <Route exact path="/admin/subjects" element={<ASubj />} />
          <Route exact path="/admin/faculties" element={<AFacult />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>

  );
}

export default App;
