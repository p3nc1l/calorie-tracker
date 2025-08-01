import Home from "./components/pages/Home.tsx";
import Foods from "./components/pages/Foods.tsx";
import Meals from "./components/pages/Meals.tsx";
import Profile from "./components/pages/Profile.tsx";
import Navbar from "./components/Navbar"
import Add from "./components/pages/Add.tsx";

import { useState } from "react";
import { Box } from "@mui/material";

import { AnimatePresence, motion } from "motion/react";
import PageLayout from "./components/pages/PageLayout.tsx";
import { usePrevious } from "@uidotdev/usehooks";
import { isMobile } from "react-device-detect";

interface Food {
  name: string,
  id: number | null,
  quantity: number,
  unit: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
}

export interface Meal {
  name: string,
  timestamp: number,
  foods: Food[]
}

function App() {
  const [page, setPage] = useState(0);
  const lastPage = usePrevious(page);
  const [addPage, setAddPage] = useState(false);

  return (
    <Box className={`w-screen h-screen overflow-x-hidden`}>
      <motion.div 
        initial={{x: `calc(-100vw * ${lastPage})`}} 
        animate={{x: `calc(-100vw * ${page})`}} 
        transition={{type: "tween"}}
        className="flex w-fit">
        <PageLayout active={page == 0 ? true : false}><Home /></PageLayout>
        <PageLayout active={page == 1 ? true : false}><Foods /></PageLayout>
        <PageLayout active={page == 2 ? true : false}><Meals /></PageLayout>
        <Profile />
      </motion.div>
      <Navbar page={page} setPage={(newPage) => setPage(newPage)} setAddPage={setAddPage} />
      <AnimatePresence>{addPage && <Add closePage={() => setAddPage(false)} variant={isMobile ? "mobile" : "desktop"} />}</AnimatePresence>
    </Box>
  )
}

export default App
