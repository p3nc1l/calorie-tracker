import { Paper, Box, IconButton, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { Close } from "@mui/icons-material"
import type { RefObject } from "react"
import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect"
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import type { Meal } from "../../App";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';

interface Food {
  name: string,
  id: number,
  unit: string,
  quantity: number,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
}

const searchFoods = async (query: string) => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE_URL + "/search-foods", {
      params: { "q": query }
    });
    return response.data || "";
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
}

const getFood = async (id: number) => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE_URL + "/food-details", {
      params: { "id": id }
    });
    return response.data || "";
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
}

const Add = ({ closePage, ref }: { closePage: () => void, ref: RefObject<HTMLDivElement>}) => {
  const [currentMeals] = useLocalStorage<Meal[]>("meals", []);
  const mealsToday = currentMeals.filter((meal) => new Date(meal.timestamp).toLocaleDateString() == new Date().toLocaleDateString()).length;
  
  const [mealName, setMealName] = useState(`Meal #${mealsToday + 1} on ${new Date().toLocaleDateString()}`);

  const [mealTime, setMealTime] = useState(Date.now());

  const [foodsAdded, setFoodsAdded] = useState<Food[]>([]);

  const [foodQuery, setFoodQuery] = useState("");
  const [foodResults, setFoodResults] = useState([]);

  const debouncedFoodQuery = useDebounce(foodQuery, 500);

  const isMount = useRef(false);
  const [changesMade, setChangesMade] = useState(false);

  const [closeDialog, setCloseDialog] = useState(false);

  function CloseButton() {
    if (!changesMade) closePage();
    else setCloseDialog(true);
  }

  useEffect(() => {isMount.current = true}, []);

  useEffect(() => {
    if (!isMount.current) {console.log("changes made"); setChangesMade(true);}
    else isMount.current = false;
  }, [mealName, mealTime, foodsAdded])

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedFoodQuery.length > 2) {
        const result = await searchFoods(debouncedFoodQuery);
        setFoodResults(result.foods.food || []);
      } else {
        setFoodResults([]);
      }
    };
    fetchResults();
  }, [debouncedFoodQuery])

  async function AddFood(id: number) {
    const result = await getFood(id);
    setFoodsAdded(foodsAdded.concat({ name: result.food.food_name, id: id, unit: result.food.servings.serving.serving_description, quantity: 1, calories: result.food.servings.serving.calories, fat: result.food.servings.serving.fat, carbs: result.food.servings.serving.carbohydrate, protein: result.food.servings.serving.protein }));
  }

  return (
    <Paper ref={ref} className={`w-screen fixed bottom-0 left-0 overflow-auto overflow-x-hidden ${isMobile ? "h-19/20" : "h-screen"}`} elevation={0} sx={{borderRadius: isMobile ? "16px 16px 0 0" : 0}}>
      <Dialog open={closeDialog} onClose={() => setCloseDialog(false)}>
        <DialogTitle>Unsaved changes</DialogTitle>
        <DialogContent><DialogContentText>There are unsaved changes on this page. Are you sure you want to discard them?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={() => setCloseDialog(false)}>Cancel</Button>
          <Button color="error" onClick={closePage}>Discard</Button>
        </DialogActions>
      </Dialog>
      <Box className="w-full"><IconButton onClick={CloseButton} className="float-right" size="large"><Close /></IconButton></Box>
      <Box className={"w-screen flex-none flex flex-col items-center"}>
        <Box className="w-full max-w-7xl px-4 mb-16 flex flex-col gap-4">
          <Typography variant="h4" component={"h1"}>Add Meal</Typography>
          <TextField className="max-w-lg" fullWidth variant="outlined" margin="normal" label="Meal Name" value={mealName} onChange={(e) => setMealName(e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="max-w-md"><DateTimePicker label="Meal Time" value={dayjs(mealTime)} onChange={(newMealTime) => setMealTime(newMealTime?.valueOf() || Date.now())} /></Box>
          </LocalizationProvider>
          <TableContainer component={Box} className="border rounded-sm border-gray-300 max-w-3xl">
            <Table>
            <TableHead>
              <Box className="p-2"><Typography>Foods Added</Typography></Box>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat</TableCell>
                <TableCell align="right">Carbohydrates</TableCell>
                <TableCell align="right">Protein</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodsAdded.length > 0 ? 
              foodsAdded.map((food, index) => 
              <TableRow>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.unit}</TableCell>
                <TableCell align="right"><TextField fullWidth variant="standard" value={food.quantity} onChange={(e) => {const newFoodsAdded = [...foodsAdded]; newFoodsAdded[index].quantity = Number(e.target.value); setFoodsAdded(newFoodsAdded)}} /></TableCell>
                <TableCell align="right">{food.calories * food.quantity}</TableCell>
                <TableCell align="right">{food.fat * food.quantity}</TableCell>
                <TableCell align="right">{food.carbs * food.quantity}</TableCell>
                <TableCell align="right">{food.protein * food.quantity}</TableCell>
              </TableRow>) :
              <TableRow><TableCell colSpan={7}><Typography align="center">No foods added yet</Typography></TableCell></TableRow>}
            </TableBody>
          </Table>
          </TableContainer>
          <TextField className="max-w-xl" fullWidth variant="outlined" margin="normal" label="Search Food" value={foodQuery} onChange={(e) => setFoodQuery(e.target.value)} />
          <TableContainer component={Paper} className="max-w-2xl max-h-96">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodResults.map((food: { food_name: string, food_id:number , food_description: string, brand_name?: string }) => 
                <TableRow>
                  <TableCell padding="checkbox"><IconButton onClick={() => AddFood(food.food_id)}><AddIcon /></IconButton></TableCell>
                  <TableCell>{food.food_name}</TableCell>
                  <TableCell>{food.brand_name || "Non-branded"}</TableCell>
                  <TableCell>{food.food_description}</TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Paper>
  )
}

export default Add