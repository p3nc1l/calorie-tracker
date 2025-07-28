import Home from "./components/pages/Home.tsx";
import Foods from "./components/pages/Foods.tsx";
import Meals from "./components/pages/Meals.tsx";
import Profile from "./components/pages/Profile.tsx";
import Navbar from "./components/Navbar"

import { useState } from "react";
import { Box } from "@mui/material";

import { motion } from "motion/react";
import PageLayout from "./components/pages/PageLayout.tsx";

function App() {
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  return (
    <Box className="relative w-screen h-screen overflow-x-hidden">
      <motion.div 
        initial={{x: `calc(-100vw * ${lastPage})`}} 
        animate={{x: `calc(-100vw * ${page})`}} 
        transition={{type: "tween"}}
        className="flex w-fit">
        <PageLayout active={page == 0 ? true : false}><Home /></PageLayout>
        <PageLayout active={page == 1 ? true : false}><Foods /></PageLayout>
        <Meals />
        <Profile />
      </motion.div>
      <Navbar page={page} setPage={(newPage) => {setLastPage(page); setPage(newPage)}}/>
    </Box>
  )
}

export default App
