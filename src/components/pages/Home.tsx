import { Box, Grid, Typography } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LocalDining, Whatshot } from "@mui/icons-material";
import { useLocalStorage } from "@uidotdev/usehooks";

import { type Meal } from "../../App";

const Home = () => {
  const [nickname] = useLocalStorage("nickname", "user");
  const [dailyGoal] = useLocalStorage("dailyGoal", Infinity);
  const [meals] = useLocalStorage<Meal[]>("meals", []);

  const mealsToday = meals.filter((meal) => new Date(meal.timestamp).toLocaleDateString() == new Date().toLocaleDateString());

  const reachedToday = {
    calories: mealsToday.reduce((sumMeals, meal) => sumMeals + meal.foods.reduce((sumFoods, food) => sumFoods + food.calories * food.quantity, 0), 0) || 0,
    fat: mealsToday.reduce((sumMeals, meal) => sumMeals + meal.foods.reduce((sumFoods, food) => sumFoods + food.fat * food.quantity, 0), 0) || 0,
    carbs: mealsToday.reduce((sumMeals, meal) => sumMeals + meal.foods.reduce((sumFoods, food) => sumFoods + food.carbs * food.quantity, 0), 0) || 0,
    protein: mealsToday.reduce((sumMeals, meal) => sumMeals + meal.foods.reduce((sumFoods, food) => sumFoods + food.protein * food.quantity, 0), 0) || 0
  }

  return (
    <>
      <Box className="mt-20">
        <Typography sx={{ fontWeight: 600 }} variant="h3" component={"h1"}>Hi, <span className="bg-gradient-to-r from-green-700 to-yellow-500 text-transparent bg-clip-text">{nickname}</span><br />{dailyGoal > reachedToday.calories ? `${+(dailyGoal - reachedToday.calories).toFixed(2)} more calories to reach your daily goal` : `You have surpassed your daily goal with ${+(reachedToday.calories - dailyGoal).toFixed(2)} calories`}</Typography>
      </Box>
      <Box className="flex flex-row flex-wrap mt-20 gap-4">
        <Card>
          <CardContent>
            <Box className="flex flex-row items-start justify-center gap-12">
              <Box className="flex flex-col gap-16">
                <Box className="flex items-center justify-center w-max"><Whatshot color="primary" className="pb-0.5"/><Typography>Calories</Typography></Box>
                <Typography variant="h5" component={"p"}>{+reachedToday.calories.toFixed(2)} / {dailyGoal}</Typography>
              </Box>
              <Box className="w-32">
                <CircularProgressbar 
                  value={reachedToday.calories} 
                  maxValue={dailyGoal} 
                  text={`${Math.round(((reachedToday.calories) / (dailyGoal)) * 100).toFixed()}%`}
                  styles={buildStyles({
                    pathColor: 'rgba(34, 197, 94)',
                    textColor: '#000',
                    trailColor: '#eee',
                  })} />
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box className="flex items-center justify-center w-max"><LocalDining color="primary" className="pb-0.5"/><Typography>Nutrients Today</Typography></Box>
            <Grid container spacing={2} className="mt-4">
              <Grid size={8}><Typography>Fat</Typography></Grid><Grid size={4}><Typography align="right">{+reachedToday.fat.toFixed(2)} g</Typography></Grid>
              <Grid size={8}><Typography>Carbohydrates</Typography></Grid><Grid size={4}><Typography align="right">{+reachedToday.carbs.toFixed(2)} g</Typography></Grid>
              <Grid size={8}><Typography>Protein</Typography></Grid><Grid size={4}><Typography align="right">{+reachedToday.protein.toFixed(2)} g</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Home