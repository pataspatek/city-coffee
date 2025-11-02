import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles.css";

import NavBar from "./components/NavBar";

import HomeView from "./views/HomeView";
import AddUserView from "./views/AddUserView";
import SettingsView from "./views/SettingsView";
import UserDetailView from "./views/UserDetailView";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/add_user" element={<AddUserView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/user_detail/:user_id" element={<UserDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
