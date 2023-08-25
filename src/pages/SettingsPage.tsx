import { useContext, useState } from "react";
import ThemeProvider, { Theme, setTheme } from "../Context/ThemeProvider";
import PromptMenu, { NestedMenuItem } from "../components/PromptMenu";
import { getpromptsData, summaryType } from "../utils/utilFunctions";
import { MarkdownDataHandler } from "../store/MarkdownDataHandler";

function SettingsPage() {
  const {currentTheme,setCurrentTheme} = useContext(ThemeProvider);
  const {changePrompt,changeExpectedResponse} = MarkdownDataHandler()



const getThemes:NestedMenuItem[] = Theme.map((title, index) => {
 if(title === currentTheme){
  return {title:title,id:index,isChecked:true}
 }
  return {
  title: title,
  isChecked: false,
  id: index
}}); 

const handleThemeChange = (item:NestedMenuItem)=>{
  setCurrentTheme(setTheme(item))
}
const handlePromptSelection = (item:NestedMenuItem) => {
  changeExpectedResponse(item.title) 
}
const handleSummaryTypeChange = (item:NestedMenuItem) => {
 changePrompt(item.id)
}

  return (
    <div className="h-screen">
      <ul className="menu bg-base-200 rounded-box">
        <PromptMenu title="Prompt" nestedChildData={getpromptsData} selectedItem={handleSummaryTypeChange}/>
        <PromptMenu title="Summary Type" nestedChildData={summaryType}selectedItem={handlePromptSelection}/>
        <PromptMenu title="Change Theme" nestedChildData={getThemes} selectedItem={handleThemeChange}/>
      </ul>
    </div>
  );
}

export default SettingsPage;
