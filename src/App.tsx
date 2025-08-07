import Home from "./components/pages/Home.tsx";
import Foods from "./components/pages/Foods.tsx";
import Meals from "./components/pages/Meals.tsx";
import Profile from "./components/pages/Profile.tsx";
import Navbar from "./components/Navbar"
import MealEditor from "./components/pages/MealEditor.tsx";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SavedDataContext from "./SavedDataContext.ts";
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
  const [mealEditorIndex, setMealEditorIndex] = useState<number | undefined>();

  const [meals, setMeals] = useState<Meal[]>(JSON.parse(localStorage.getItem("meals") || "[]"));
  const [dailyGoal, setDailyGoal] = useState(JSON.parse(localStorage.getItem("dailyGoal") || `0`));
  const [nickname, setNickname] = useState(JSON.parse(localStorage.getItem("nickname") || `""`));

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
    localStorage.setItem("dailyGoal", JSON.stringify(dailyGoal));
    localStorage.setItem("nickname", JSON.stringify(nickname));
  }, [meals, dailyGoal, nickname])

  return (
    <SavedDataContext value={{meals: meals, setMeals: setMeals, dailyGoal: dailyGoal, setDailyGoal: setDailyGoal, nickname: nickname, setNickname: setNickname}}>
      <Box className={`w-screen h-screen overflow-x-hidden`}>
        <motion.div 
          initial={{x: `calc(-100vw * ${lastPage})`}} 
          animate={{x: `calc(-100vw * ${page})`}} 
          transition={{type: "tween"}}
          className="flex w-fit">
          <PageLayout active={page == 0 ? true : false}><Home /></PageLayout>
          <PageLayout active={page == 1 ? true : false}><Foods /></PageLayout>
          <PageLayout active={page == 2 ? true : false}><Meals setMealEditor={(index) => setMealEditorIndex(index)} /></PageLayout>
          <Profile />
        </motion.div>
        <Navbar page={page} setPage={(newPage) => setPage(newPage)} setAddPage={setAddPage} />
        <AnimatePresence>{(addPage || mealEditorIndex != undefined) && <MealEditor closePage={() => {setAddPage(false); setMealEditorIndex(undefined)}} mobile={isMobile} mealIndex={mealEditorIndex} />}</AnimatePresence>
      </Box>
    </SavedDataContext>
  )
}

export default App
