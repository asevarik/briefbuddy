/*global chrome*/
import React, { useEffect, useState } from 'react';
import './App.css';
import  ThemeProvider, { getIntialTheme } from './Context/ThemeProvider';
import Router from './pages/Router';
import { HashRouter } from 'react-router-dom';

function App() {
  const [currentTheme,setCurrentTheme] = useState<string>(getIntialTheme());
  const [currentTab,setCurrentTab] = useState<string>("");
  useEffect(()=>{
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      setCurrentTab(tabs[0].url ?? "url is not set")
      console.log(tabs[0].url ?? "hello there url found");  
    });
  },[])
  return (
    <ThemeProvider.Provider value={{currentTheme,setCurrentTheme,currentTab,setCurrentTab}}>
      <HashRouter>
     <Router/>
     </HashRouter>
    </ThemeProvider.Provider> 
  );
 }
  

export default App;
