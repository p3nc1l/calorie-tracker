import { Paper, Box, IconButton, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, InputAdornment, Skeleton, CircularProgress, Backdrop } from "@mui/material"
import { Close } from "@mui/icons-material"
import { useEffect, useState, useRef, createContext, useContext } from "react";
import { useDebounce, useWindowSize } from "@uidotdev/usehooks";
import type { Meal } from "../../App";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { Remove } from "@mui/icons-material";
import { motion } from "motion/react";

const MealIndexContext = createContext<number | undefined>(undefined);
const ChangeMadeContext = createContext<() => void>(() => {});

interface Food {
  name: string,
  id: number | null,
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

const CloseDialog = ({ visible, closeThis, closePage }: { visible: boolean, closeThis: () => void, closePage: () => void }) => {
  return (
    <>
      <Dialog open={visible} onClose={closeThis}>
        <DialogTitle>Unsaved changes</DialogTitle>
        <DialogContent><DialogContentText>There are unsaved changes on this page. Are you sure you want to discard them?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={closeThis}>Cancel</Button>
          <Button color="error" onClick={closePage}>Discard</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const CloseButtonBar = ({ closeButton }: { closeButton: () => void }) => {
  return (
    <Box className="w-full flex justify-end"><IconButton onClick={closeButton} size="large"><Close /></IconButton></Box>
  )
}

const FoodsAddedTable = ({ foodsAdded, foodsAddedStatus, removeFood, addCustomFood, setFoodsAdded }: { foodsAdded: Food[], foodsAddedStatus: string, removeFood: (id: number) => void, addCustomFood: () => void, setFoodsAdded: React.Dispatch<React.SetStateAction<Food[]>> }) => {
  return (
    <TableContainer component={Box} className="border rounded-sm border-gray-300 max-w-3xl">
      <Table>
        <TableHead>
          <TableRow><TableCell sx={{borderBottom: "none"}} colSpan={7}><Typography>Foods Added</Typography></TableCell></TableRow>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Name</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat</TableCell>
            <TableCell align="right">Carbohydrates</TableCell>
            <TableCell align="right">Protein</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodsAddedStatus == "display" && (foodsAdded.length > 0 ? 
          foodsAdded.map((food, index) => 
          (food.id != null ? <TableRow key={index}>
            <TableCell padding="checkbox"><IconButton onClick={() => removeFood(index)}><Remove /></IconButton></TableCell>
            <TableCell>{food.name}</TableCell>
            <TableCell align="right"><TextField sx={{width: 100}} variant="standard" value={food.quantity} onChange={(e) => {const newFoodsAdded = [...foodsAdded]; newFoodsAdded[index].quantity = Number(e.target.value); setFoodsAdded(newFoodsAdded)}} slotProps={{input: {endAdornment: <InputAdornment position="end">{food.unit}</InputAdornment>}}}/></TableCell>
            <TableCell align="right">{+(food.calories * food.quantity).toFixed(2)}</TableCell>
            <TableCell align="right">{+(food.fat * food.quantity).toFixed(2)} g</TableCell>
            <TableCell align="right">{+(food.carbs * food.quantity).toFixed(2)} g</TableCell>
            <TableCell align="right">{+(food.protein * food.quantity).toFixed(2)} g</TableCell>
          </TableRow> : <TableRow key={index}>
            <TableCell padding="checkbox"><IconButton onClick={() => removeFood(index)}><Remove /></IconButton></TableCell>
            <TableCell><TextField variant="standard" value={food.name} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, name: e.target.value } : v ))} /></TableCell>
            <TableCell>
              <TextField className="w-4/10" sx={{marginRight: 1}} variant="standard" value={food.quantity} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, quantity: +e.target.value } : v ))} />
              <TextField className="w-5/10" variant="standard" value={food.unit} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, unit: e.target.value } : v ))} />
            </TableCell>
            <TableCell><TextField variant="standard" value={+(food.calories * food.quantity).toFixed(2)} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, calories: +e.target.value / food.quantity } : v ))} /></TableCell>
            <TableCell><TextField slotProps={{input: {endAdornment: <InputAdornment position="end">g</InputAdornment>}}} variant="standard" value={+(food.fat * food.quantity).toFixed(2)} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, fat: +e.target.value / food.quantity } : v ))} /></TableCell>
            <TableCell><TextField slotProps={{input: {endAdornment: <InputAdornment position="end">g</InputAdornment>}}} variant="standard" value={+(food.carbs * food.quantity).toFixed(2)} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, carbs: +e.target.value / food.quantity } : v ))} /></TableCell>
            <TableCell><TextField slotProps={{input: {endAdornment: <InputAdornment position="end">g</InputAdornment>}}} variant="standard" value={+(food.protein * food.quantity).toFixed(2)} onChange={(e) => setFoodsAdded(foodsAdded.map((v, i) => i === index ? { ...v, protein: +e.target.value / food.quantity } : v ))} /></TableCell>
          </TableRow>)) :
          <TableRow><TableCell colSpan={7}><Typography align="center">No foods added yet</Typography></TableCell></TableRow>)}
          {foodsAddedStatus == "loading" && <TableRow><TableCell colSpan={7}><Box className="w-max mx-auto"><CircularProgress /></Box></TableCell></TableRow>}
          <TableRow><TableCell colSpan={7} align="center"><Button onClick={addCustomFood}><AddIcon />Add custom food</Button></TableCell></TableRow>
          {foodsAddedStatus == "display" && foodsAdded.length > 0 && <TableRow>
            <TableCell colSpan={3} align="right">Total: </TableCell>
            <TableCell align="right">{+foodsAdded.reduce((sum, food) => sum + food.calories * food.quantity, 0).toFixed(2)}</TableCell>
            <TableCell align="right">{+foodsAdded.reduce((sum, food) => sum + food.fat * food.quantity, 0).toFixed(2)} g</TableCell>
            <TableCell align="right">{+foodsAdded.reduce((sum, food) => sum + food.carbs * food.quantity, 0).toFixed(2)} g</TableCell>
            <TableCell align="right">{+foodsAdded.reduce((sum, food) => sum + food.protein * food.quantity, 0).toFixed(2)} g</TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const SearchTable = ({ foodResults, foodSearchStatus, addFood }: { foodResults: [], foodSearchStatus: string, addFood: (id: number) => void }) => {
  return (
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
          {foodSearchStatus == "display" && foodResults.map((food: { food_name: string, food_id:number , food_description: string, brand_name?: string }, index) => 
          <TableRow key={index}>
            <TableCell padding="checkbox"><IconButton onClick={() => addFood(food.food_id)}><AddIcon /></IconButton></TableCell>
            <TableCell>{food.food_name}</TableCell>
            <TableCell>{food.brand_name || "Non-branded"}</TableCell>
            <TableCell>{food.food_description}</TableCell>
          </TableRow>)}
          {foodSearchStatus == "loading" &&
          Array.from({ length: 5 }).map((_, index) => <TableRow key={index}>
            <TableCell></TableCell>
            <TableCell><Skeleton width={"100%"} /></TableCell>
            <TableCell><Skeleton width={"100%"} /></TableCell>
            <TableCell><Skeleton width={"100%"} /><Skeleton width={"100%"} /><Skeleton width={"100%"} /></TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Form = ({ closePage }: { closePage: () => void }) => {
  const mealIndex = useContext(MealIndexContext);
  const changeMade = useContext(ChangeMadeContext);
  
  const [meals] = useState<Meal[]>(JSON.parse(localStorage.getItem("meals") || "[]"));
  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState(0);
  const [foodsAdded, setFoodsAdded] = useState<Food[]>([]);

  const [foodQuery, setFoodQuery] = useState("");
  const debouncedFoodQuery = useDebounce(foodQuery, 500);
  const [foodResults, setFoodResults] = useState<[]>([]);
  const [foodSearchStatus, setFoodSearchStatus] = useState<"none" | "loading" | "display">("none");
  const [foodsAddedStatus, setFoodsAddedStatus] = useState<"loading" | "display">("display");

  const RemoveFood = (index: number) => {
    setFoodsAdded(prevFoodsAdded => prevFoodsAdded.toSpliced(index, 1));
    changeMade();
  };

  const SaveMeal = () => {
    const foods = foodsAdded.map((foodAdded) => { 
      return { name: foodAdded.name, id: foodAdded.id, calories: foodAdded.calories, quantity: foodAdded.quantity, unit: foodAdded.unit, fat: foodAdded.fat, carbs: foodAdded.carbs, protein: foodAdded.protein }
    })
    const newMeal: Meal = { name: mealName, timestamp: mealTime, foods: foods };
    localStorage.setItem("meals", JSON.stringify(meals.concat(newMeal)));
    closePage();
  }

  const AddFood = async (id: number | null) => {
    if (id == null) {
      setFoodsAdded(prevFoodsAdded => prevFoodsAdded.concat({ name: "", id: null, unit: "", quantity: 1, calories: 0, fat: 0, carbs: 0, protein: 0}));
      changeMade();
      return;
    }

    const exists = foodsAdded.findIndex((food) => food.id == id);

    if (exists != -1) setFoodsAdded(prevFoodsAdded => prevFoodsAdded.map((value, i) => i === exists ? { ...value, quantity: value.quantity + 1 } : value));
    else {
      setFoodsAddedStatus("loading");
      const result = await getFood(id);

      const food = result.food;
      const serving = result.food.servings.serving.calories != null ? result.food.servings.serving : result.food.servings.serving[0];
      const num = +serving.number_of_units;

      setFoodsAdded(prevFoodsAdded => prevFoodsAdded.concat({ name: food.food_name, id: id, unit: serving.measurement_description, quantity: num, calories: serving.calories / num, fat: serving.fat / num, carbs: serving.carbohydrate / num, protein: serving.protein / num }));
    }

    setFoodsAddedStatus("display");
    changeMade();
  }

  useEffect(() => {
    const LoadMeal = (mealIndex?: number) => {
      if (mealIndex) {
        setMealName(meals[mealIndex].name);
        setMealTime(meals[mealIndex].timestamp);
        setFoodsAdded(meals[mealIndex].foods.map((food) => { return {
          name: food.name,
          id: food.id,
          unit: food.unit,
          quantity: food.quantity,
          calories: food.calories,
          fat: food.fat,
          carbs: food.carbs,
          protein: food.protein
        }}));
      }
      else {
        const mealsToday = meals.filter((meal) => new Date(meal.timestamp).toLocaleDateString() == new Date().toLocaleDateString()).length;
        setMealName(`Meal #${mealsToday + 1} on ${new Date().toLocaleDateString()}`);
        setMealTime(Date.now());
        setFoodsAdded([]);
      }
    }

    LoadMeal(mealIndex);
  }, [mealIndex, meals]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedFoodQuery.length > 2) {
        setFoodSearchStatus("loading");
        const result = await searchFoods(debouncedFoodQuery);
        setFoodResults(result.foods.food || []);
        setFoodSearchStatus("display");
      } else {
        setFoodResults([]);
        setFoodSearchStatus("none");
      }
    };
    fetchResults();
  }, [debouncedFoodQuery]);
  
  return (
    <Box className={"w-screen flex-none flex flex-col items-center"}>
      <Box className="w-full max-w-7xl px-4 mb-16 flex flex-col gap-4">
        <Typography variant="h4" component={"h1"}>{`${mealIndex ? "Edit" : "Add"} Meal`}</Typography>
        <TextField className="max-w-lg" fullWidth variant="outlined" margin="normal" label="Meal Name" value={mealName} onChange={(e) => {setMealName(e.target.value); changeMade()}} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="max-w-md"><DateTimePicker label="Meal Time" value={dayjs(mealTime)} onChange={(newMealTime) => {setMealTime(newMealTime?.valueOf() || Date.now()); changeMade()}} /></Box>
        </LocalizationProvider>
        <FoodsAddedTable foodsAdded={foodsAdded} foodsAddedStatus={foodsAddedStatus} removeFood={(id) => RemoveFood(id)} addCustomFood={() => AddFood(null)} setFoodsAdded={setFoodsAdded} />
        <TextField className="max-w-xl" fullWidth variant="outlined" margin="normal" label="Search Food" value={foodQuery} onChange={(e) => setFoodQuery(e.target.value)} />
        <SearchTable foodResults={foodResults} foodSearchStatus={foodSearchStatus} addFood={(id) => AddFood(id)} />
        <Box><Button variant="contained" disabled={foodsAdded.length == 0 || mealName == ""} onClick={SaveMeal}>Save</Button></Box>
      </Box>
    </Box>
  )
}

const PageContent = ({ closeButton, closePage }: { closeButton: () => void, closePage: () => void }) => {
  return (
    <>
      <CloseButtonBar closeButton={closeButton} />
      <Form closePage={closePage} />
    </>
  )
}

const MealEditor = ({ closePage, mobile = false, mealIndex }: { closePage: () => void, mobile: boolean, mealIndex?: number }) => {
  const [closeDialog, setCloseDialog] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const [constraintsHeight, setConstraintsHeight] = useState(0);
  const [changesMade, setChangesMade] = useState(false);

  const CloseButton = () => {
    if (!changesMade) closePage();
    else setCloseDialog(true);
  }
  
  useEffect(() => {
    const updateHeight = () => {
      if (constraintsRef.current) {
        const newHeight = constraintsRef.current.getBoundingClientRect().height;
        setConstraintsHeight(newHeight);
      }
    }

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (constraintsRef.current) {
      resizeObserver.observe(constraintsRef.current);
    }
  }, []);

  return (
    <>
      <CloseDialog visible={closeDialog} closeThis={() => setCloseDialog(false)} closePage={closePage} />
      {!mobile &&
      <motion.div 
        initial={{y: "100vh"}}
        animate={{y: 0}}
        exit={{y: "100vh"}}
        transition={{type: "tween"}}
        className="w-screen h-screen fixed top-0 left-0 overflow-y-auto overflow-x-hidden"
      >
        <Paper elevation={0}>
          <MealIndexContext value={mealIndex}><ChangeMadeContext value={() => setChangesMade(true)} ><PageContent closeButton={CloseButton} closePage={closePage} /></ChangeMadeContext></MealIndexContext>
        </Paper>
      </motion.div>}
      {mobile &&
      <>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}><Backdrop open /></motion.div>
        <motion.div 
          initial={{y: "100vh"}}
          animate={{y: 1}}
          drag={"y"}
          dragConstraints={{top: ((windowSize.height || 0) - constraintsHeight), bottom: 0}}
          dragElastic={{top: 0.0001, bottom: 1}}
          ref={pageRef}
          onDragEnd={() => (pageRef.current?.getBoundingClientRect().y || 0) > 400 && closePage()}
          exit={{y: "100vh"}}
          transition={{type: "tween"}}
          className="w-screen h-screen fixed top-0 left-0 overflow-visible"
        >
          <div ref={constraintsRef}>
            <div className="w-full h-12" />
            <Paper elevation={0} sx={{borderRadius: "20px 20px 0 0"}}>
              <MealIndexContext value={mealIndex}><ChangeMadeContext value={() => setChangesMade(true)} ><PageContent closeButton={CloseButton} closePage={closePage} /></ChangeMadeContext></MealIndexContext>
            </Paper>
          </div>
        </motion.div>
      </>}
    </>
  )
}

export default MealEditor;