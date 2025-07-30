import Home from "./components/pages/Home.tsx";
import Foods from "./components/pages/Foods.tsx";
import Meals from "./components/pages/Meals.tsx";
import Profile from "./components/pages/Profile.tsx";
import Navbar from "./components/Navbar"
import Add from "./components/pages/Add.tsx";

import { useState } from "react";
import { Box, Backdrop } from "@mui/material";

import { AnimatePresence, motion } from "motion/react";
import PageLayout from "./components/pages/PageLayout.tsx";
import { usePrevious } from "@uidotdev/usehooks";

interface Food {
  name: string,
  id: number,
  brand: string | null,
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

const MotionAddPage = motion.create(Add);

function App() {
  const [page, setPage] = useState(0);
  const lastPage = usePrevious(page);
  const [addPage, setAddPage] = useState(false);
  const [addPageAnimating, setAddPageAnimating] = useState(false);

  return (
    <Box className={`relative w-screen h-screen overflow-x-hidden ${(addPage || addPageAnimating) && "overflow-y-hidden"}`}>
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
      <Backdrop open={addPage == true}></Backdrop>
      <AnimatePresence onExitComplete={() => setAddPageAnimating(false)}>{addPage && <MotionAddPage initial={{y: "100vh"}} animate={{y: 0}} exit={{y: "100vh"}} transition={{type: "tween"}} closePage={() => setAddPage(false)} onAnimationStart={() => setAddPageAnimating(true)} onAnimationComplete={() => setAddPageAnimating(false)} />}</AnimatePresence>
    </Box>
  )
}

export default App
