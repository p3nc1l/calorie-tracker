import { createContext } from "react";
import type { Meal } from "./App";

interface SavedData {
  meals: Meal[],
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>,
  dailyGoal: number,
  setDailyGoal: React.Dispatch<React.SetStateAction<number>>,
  nickname: string,
  setNickname: React.Dispatch<React.SetStateAction<string>>,
}

const SavedDataContext = createContext<SavedData>({
  meals: [],
  setMeals: () => {

  },
  dailyGoal: Infinity,
  setDailyGoal: () => {

  },
  nickname: "",
  setNickname: () => {
    
  }
});

export default SavedDataContext;