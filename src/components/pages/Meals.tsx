import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box, Collapse, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { Meal } from "../../App";
import { createContext, useContext, useState } from "react";
import SavedDataContext from "../../SavedDataContext";

const SetMealEditorContext = createContext<(index: number) => void>(() => {});
const SetDeleteDialogContext = createContext<(id: number) => void>(() => {});

interface MealsCategorised {
  today: number[],
  yesterday: number[],
  thisWeek: number[],
  thisMonth: number[],
  thisYear: number[],
  other: number[]
}

const MealTable = ({ meal }: { meal: Meal }) => {
  return (
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
  )
}

const MealRow = ({ meal, index }: { meal: Meal, index: number }) => {
  const [open, setOpen] = useState(false);
  const setMealEditor = useContext(SetMealEditorContext);
  const setDeleteDialog = useContext(SetDeleteDialogContext);

  return (
    <>
      <TableRow sx={{"& > *": {borderBottom: "none"}}}>
        <TableCell padding="checkbox"><IconButton onClick={() => setOpen(!open)}>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton></TableCell>
        <TableCell>{meal.name}</TableCell>
        <TableCell>{new Date(meal.timestamp).toLocaleString(undefined, {dateStyle: "medium", timeStyle: "short"})}</TableCell>
        <TableCell align="right">{meal.foods.reduce((sum, food) => sum + food.calories * food.quantity, 0)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{paddingBlock: 0}} colSpan={4}>
          <Collapse in={open}>
            <Box className="my-2"><Typography variant="h6" component={"p"}>Foods</Typography></Box>
            <MealTable meal={meal} />
            <Box className="flex flex-row-reverse gap-2 p-2">
              <Box className="w-max"><Button variant="contained" color="error" onClick={() => setDeleteDialog(index)}>Delete</Button></Box>
              <Box className="w-max"><Button variant="outlined" onClick={() => setMealEditor(index)}>Edit</Button></Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const MealsTable = ({ mealIndexes }: { mealIndexes: number[] }) => {
  const meals = useContext(SavedDataContext).meals;
  
  return (
    <TableContainer component={Paper} className="mt-8 max-w-2xl mx-auto">
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
          {mealIndexes.map((mealIndex, index) => <MealRow index={mealIndex} key={index} meal={meals[mealIndex]} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

//manages all the different tables for the different grouping catagories
const CategoryTables = ({ mealsCategorised }: { mealsCategorised: MealsCategorised }) => {
  return (
    <>
      {mealsCategorised.today.length > 0 &&
      <Box className="my-12">
        <Box className="max-w-2xl mx-auto"><Typography variant="h5" component={"span"}>Today</Typography></Box>
        <MealsTable mealIndexes={mealsCategorised.today}></MealsTable>
      </Box>}
      {mealsCategorised.yesterday.length > 0 &&
      <Box className="my-12">
        <Box className="max-w-2xl mx-auto"><Typography variant="h5" component={"span"}>Yesterday</Typography></Box>
        <MealsTable mealIndexes={mealsCategorised.yesterday}></MealsTable>
      </Box>}
      {mealsCategorised.thisWeek.length > 0 &&
      <Box className="my-12">
        <Box className="max-w-2xl mx-auto"><Typography variant="h5" component={"span"}>This Week</Typography></Box>
        <MealsTable mealIndexes={mealsCategorised.thisWeek}></MealsTable>
      </Box>}
      {mealsCategorised.thisMonth.length > 0 &&
      <Box className="my-12">
        <Box className="max-w-2xl mx-auto"><Typography variant="h5" component={"span"}>This Month</Typography></Box>
        <MealsTable mealIndexes={mealsCategorised.thisMonth}></MealsTable>
      </Box>}
      {mealsCategorised.thisYear.length > 0 &&
      <Box className="my-12">
        <Box className="max-w-2xl mx-auto"><Typography variant="h5" component={"span"}>This Year</Typography></Box>
        <MealsTable mealIndexes={mealsCategorised.thisYear}></MealsTable>
      </Box>}
      {mealsCategorised.other.length > 0 &&
      <Box className="my-12">
        <Box className="max-w-2xl mx-auto"><Typography variant="h5" component={"span"}>Other</Typography></Box>
        <MealsTable mealIndexes={mealsCategorised.other}></MealsTable>
      </Box>}
    </>
  )
}

function DeleteDialog({ deleteDialog, setDeleteDialog, setMeals }: { deleteDialog: number | null, setDeleteDialog: (index: number | null) => void, setMeals: React.Dispatch<React.SetStateAction<Meal[]>> }) {
  const meals = useContext(SavedDataContext).meals;

  if (deleteDialog == null) return;

  function closeDialog() {
    setDeleteDialog(null);
  }

  function DeleteMeal(index: number) {
    setMeals(prevMeals => prevMeals.toSpliced(index, 1));
  }

  return (
    <Dialog open={deleteDialog != null} onClose={closeDialog}>
      <DialogTitle>Remove Meal</DialogTitle>
      <DialogContent><DialogContentText>Are you sure you want to delete "{meals[deleteDialog].name}"?</DialogContentText></DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button color="error" onClick={() => {DeleteMeal(deleteDialog); closeDialog()}}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

const Meals = ({ setMealEditor }: { setMealEditor: (index: number) => void }) => {
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);
  const meals = useContext(SavedDataContext).meals;
  
  const CategoriseMeals = (meals: Meal[]) => {
    const mealsCategorised: MealsCategorised = {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      thisYear: [],
      other: []
    }
    const mealCategoryTimestamps = {
      today: Date.parse(new Date().toDateString()),
      yesterday: Date.parse(new Date().toDateString()) - 24 * 60 * 60 * 1000,
      thisWeek: Date.parse(new Date().toDateString()) - new Date(new Date().toDateString()).getDay() * 24 * 60 * 60 * 1000,
      thisMonth: new Date(new Date().toDateString()).setDate(1),
      thisYear: new Date(new Date().getFullYear(), 0).getTime()
    }

    meals.map((meal, index) => {
      if (meal.timestamp <= Date.now() && meal.timestamp >= mealCategoryTimestamps.today) mealsCategorised.today.push(index);
      else if (meal.timestamp < mealCategoryTimestamps.today && meal.timestamp >= mealCategoryTimestamps.yesterday) mealsCategorised.yesterday.push(index);
      else if (meal.timestamp < mealCategoryTimestamps.yesterday && meal.timestamp >= mealCategoryTimestamps.thisWeek) mealsCategorised.thisWeek.push(index);
      else if (meal.timestamp < mealCategoryTimestamps.thisWeek && meal.timestamp >= mealCategoryTimestamps.thisMonth) mealsCategorised.thisMonth.push(index);
      else if (meal.timestamp < mealCategoryTimestamps.thisMonth && meal.timestamp >= mealCategoryTimestamps.thisYear) mealsCategorised.thisYear.push(index);
      else mealsCategorised.other.push(index);
    })

    return mealsCategorised;
  }

  const mealsCategorised = CategoriseMeals(meals);

  return (
    <SetMealEditorContext value={setMealEditor}><SetDeleteDialogContext value={(id) => setDeleteDialog(id)}>
      <DeleteDialog deleteDialog={deleteDialog} setDeleteDialog={(index) => setDeleteDialog(index)} setMeals={useContext(SavedDataContext).setMeals} />
      {meals.length > 0 ? <CategoryTables mealsCategorised={mealsCategorised} /> :
      <Box className="mt-12"><Typography variant="h4" component={"p"} align="center">You haven't logged any meals yet</Typography></Box>}
    </SetDeleteDialogContext></SetMealEditorContext>
  )
}

export default Meals