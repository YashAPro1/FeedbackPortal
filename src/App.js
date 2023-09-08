import "../src/css/index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from "./components/Login";
import LoginDet from "./components/LoginDet";
import AppProvider from "./context/AppContext";

function App() {
  return (

    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/login/details" element={<LoginDet />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>

  );
}

export default App;
