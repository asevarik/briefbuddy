import { Dispatch, SetStateAction, createContext } from "react";
import { DEFAULT_THEME } from "../utils/contants";
import { NestedMenuItem } from "../components/PromptMenu";

export const getIntialTheme = (): string => {
    const currentTheme = localStorage.getItem(DEFAULT_THEME);
    if (currentTheme) {
        return currentTheme
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark"
        } else {
            return "light"
        }
    }
}
export interface ThemeContextValue {
    currentTheme: string;
    setCurrentTheme: Dispatch<SetStateAction<string>>;
    currentTab:string;
    setCurrentTab: Dispatch<SetStateAction<string>>;
}

const ThemeProvider = createContext<ThemeContextValue>({ currentTheme: "", setCurrentTheme: () => { } ,currentTab:"",setCurrentTab:()=>{} });
export default ThemeProvider


export const Theme = ["light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",];

export const setTheme = (currenttheme:NestedMenuItem) => {
    localStorage.setItem(DEFAULT_THEME, currenttheme.title);
    return currenttheme.title
}
