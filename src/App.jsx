import { Routes, Route } from "react-router"
import NotesPage from "./pages/NotesPage"
import Create from "./pages/Create"
import Header from "./components/Header"
import Nav from "./components/Nav"
import History from "./pages/History"
import { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import { useSelector } from "react-redux"



function App() {
    const [menuOpen, menuOpenStatus] = useState(false);
    const tasks=useSelector(state=>state.notes)


    const theme=createTheme({
        palette:{
            mode:tasks.theme,
            background:{
                paper:tasks.theme==="light"?"#F8F7FF":"black"
            },
            primary:{
                main:tasks.theme==="light"?"#0162FF":"#FE9900",
                saffron:"#F9C22E",
                shockRed:"#E4080A",
                slate:"#292929",
                iceBlue:"#E2EAF4",
                platinum:"#E5E7F0",
                jet:"#1E1F1F",
                jet2:"#323434"
            },
            secondary:{
                main:"#72BCFD"
            }
        }
    })
    return (
        <>
        <ThemeProvider theme={theme}>
         
                <Header menuOpenStatus={menuOpenStatus} menuOpen={menuOpen} />
                <Nav menuOpen={menuOpen} menuOpenStatus={menuOpenStatus} />
                <Routes>
                    <Route path="/" element={<NotesPage />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/history" element={<History/>}/>
                </Routes>
        </ThemeProvider>

        </>
    )
}

export default App
