import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box, Collapse, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocalStorage } from "@uidotdev/usehooks";
import type { Meal } from "../../App";
import { createContext, useContext, useState } from "react";

const MealsContext = createContext<Meal[]>([]);
const SetMealEditorContext = createContext<(index: number) => void>(() => {});
const SetDeleteDialogContext = createContext<(id: number) => void>(() => {});

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
        <TableCell>{new Date(meal.timestamp).toLocaleString()}</TableCell>
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

const MealsTable = () => {
  const meals = useContext(MealsContext);

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
          {meals.map((meal, index) => <MealRow index={index} key={index} meal={meal} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function DeleteDialog({ deleteDialog, setDeleteDialog, setMeals }: { deleteDialog: number | null, setDeleteDialog: (index: number | null) => void, setMeals: React.Dispatch<React.SetStateAction<Meal[]>> }) {
  const meals = useContext(MealsContext);

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
  const [meals, setMeals] = useLocalStorage<Meal[]>("meals", []);
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);

  /*const mealCategoryTimestamps = {
    today: Date.parse(new Date().toDateString()),
    yesterday: Date.parse(new Date().toDateString()) - 24 * 60 * 60 * 1000,
    lastWeek: Date.parse(new Date().toDateString()) - new Date(new Date().toDateString()).getDay() * 24 * 60 * 60 * 1000,
    lastMonth: new Date(new Date().toDateString()).setDate(1),
    lastYear: new Date(new Date().getFullYear()).getTime()
  }*/

  return (
    <MealsContext value={meals}><SetMealEditorContext value={setMealEditor}><SetDeleteDialogContext value={(id) => setDeleteDialog(id)}>
      <DeleteDialog deleteDialog={deleteDialog} setDeleteDialog={(index) => setDeleteDialog(index)} setMeals={setMeals} />
      {meals.length > 0 ? <MealsTable /> :
      <Box className="mt-12"><Typography variant="h4" component={"p"} align="center">You haven't logged any meals yet</Typography></Box>}
    </SetDeleteDialogContext></SetMealEditorContext></MealsContext>
  )
}

export default Meals