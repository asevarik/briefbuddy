import {  Routes, Route } from "react-router-dom";
import Home from "./home";
import SettingsPage from "./SettingsPage";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import ThemeProvider from "../Context/ThemeProvider";
export default function Router() {
    const {currentTheme} = useContext(ThemeProvider);
    return (
      <div data-theme={currentTheme}>
      <Navbar title="BriefBuddy" />
        <Routes >
          <Route path="/"  element={<Home />} />
          <Route path="/settings" element={<SettingsPage/>}/>
        </Routes>
      </div> 
    );
  }