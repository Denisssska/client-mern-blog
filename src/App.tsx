import React, {useMemo} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./scenes/loginPage/LoginPage";
import HomePage from "./scenes/homePage/HomePage";
import ProfilePage from "./scenes/profilePage/ProfilePage";
import {useSelector} from "react-redux";
import {useAppSelector} from "./hooks/hooks";
import {createTheme, CssBaseline, PaletteMode, ThemeProvider} from "@mui/material";
import {themeSettings} from "./theme";
import NavBar from "./scenes/navbar/NavBar";

function App() {
    const mode = useAppSelector(state => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    //console.log(theme)
    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route path='/' element={<LoginPage/>}/>
                        <Route path='/home' element={<HomePage/>}/>
                        <Route path='/profile/:userId' element={<ProfilePage/>}/>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
