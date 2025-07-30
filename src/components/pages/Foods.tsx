import { Box, Skeleton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const Foods = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<[]>([]);
  const [status, setStatus] = useState<"none" | "loading" | "display">("none");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 2) {
        setStatus("loading");
        const result = await searchFoods(debouncedQuery);
        setResults(result.foods.food || []);
        setStatus("display");
      } else {
        setResults([]);
        setStatus("none")
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  return (
    <>
      <Box className="mt-16 max-w-2xl mx-auto">
        <TextField fullWidth label="Search Foods" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} />
      </Box>
      {status == "display" && results.length > 0 && <TableContainer component={Paper} className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((food: { food_name: string, food_description: string, brand_name?: string }) => (
              <TableRow key={food.food_name}>
                <TableCell>{food.food_name}</TableCell>
                <TableCell align="right">{food.brand_name || "Non-branded"}</TableCell>
                <TableCell align="right">{food.food_description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {status == "display" && results.length == 0 && <Box className="mt-4"><Typography align="center">No results matching your search term.</Typography></Box>}
      {status == "loading" && 
      <>
        <Box className="h-8"></Box>
        <Skeleton variant="rectangular" width={"100%"} height={56.36} />
        {Array.from({ length: 20 }).map((_, index) => <Skeleton sx={{marginTop: "2.74px"}} key={index} variant="rectangular" width={"100%"} height={50} />)}
      </>}
    </>
  )
}

export default Foods