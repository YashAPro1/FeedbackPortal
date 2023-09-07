import "../src/css/index.css";              
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from "./components/Login";
import LoginDet from "./components/LoginDet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/login/details" element={<LoginDet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
