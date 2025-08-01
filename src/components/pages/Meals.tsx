import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocalStorage } from "@uidotdev/usehooks";
import type { Meal } from "../../App";
import { useState } from "react";

const Meals = () => {
  const [meals] = useLocalStorage<Meal[]>("meals", []);

  function MealRow({ meal }: { meal: Meal }) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow sx={{"& > *": {borderBottom: "none"}}}>
          <TableCell padding="checkbox"><IconButton onClick={() => setOpen(!open)}>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton></TableCell>
          <TableCell>{meal.name}</TableCell>
          <TableCell>{new Date(meal.timestamp).toLocaleString()}</TableCell>
          <TableCell align="right">{meal.foods.reduce((sum, food) => sum + food.calories * food.quantity, 0)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{paddingBlock: 0}} colSpan={4}>
            <Collapse in={open}>
              <Box className="my-2"><Typography variant="h6" component={"p"}>Foods</Typography></Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat</TableCell>
                    <TableCell align="right">Carbohydrates</TableCell>
                    <TableCell align="right">Protein</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meal.foods.map((food) => 
                  <TableRow key={food.name}>
                    <TableCell>{food.name}</TableCell>
                    <TableCell align="right">{+food.quantity.toFixed(2)} {food.unit}</TableCell>
                    <TableCell align="right">{+(food.calories * food.quantity).toFixed(2)}</TableCell>
                    <TableCell align="right">{+(food.fat * food.quantity).toFixed(2)} g</TableCell>
                    <TableCell align="right">{+(food.carbs * food.quantity).toFixed(2)} g</TableCell>
                    <TableCell align="right">{+(food.protein * food.quantity).toFixed(2)} g</TableCell>
                  </TableRow>
                  )}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }

  return (
    <>
      {meals.length > 0 ? <TableContainer component={Paper} className="mt-8 max-w-2xl mx-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Name</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="right">Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map((meal, index) => <MealRow key={index} meal={meal} />)}
          </TableBody>
        </Table>
      </TableContainer> :
      <Box className="mt-12"><Typography variant="h4" component={"p"} align="center">You haven't logged any meals yet</Typography></Box>}
    </>
  )
}

export default Meals